/* ============================================
   MEDIA STORAGE — IndexedDB & Server Upload Helper
   Stores large video and photo Blobs locally in IndexedDB
   and optionally uploads to backend /api/upload
   ============================================ */

(function () {
    'use strict';

    const DB_NAME = 'PrasannaDeviMediaDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'media_blobs';

    let dbInstance = null;

    /* ============================================
       INDEXEDDB INITIALIZATION
       ============================================ */
    function getDB() {
        return new Promise((resolve, reject) => {
            if (dbInstance) return resolve(dbInstance);

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };

            request.onsuccess = (event) => {
                dbInstance = event.target.result;
                resolve(dbInstance);
            };

            request.onerror = (event) => {
                console.error('IndexedDB open error:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    /* ============================================
       SAVE BLOB
       ============================================ */
    async function saveMedia(key, fileOrBlob) {
        try {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction([STORE_NAME], 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const req = store.put(fileOrBlob, key);

                req.onsuccess = () => resolve(true);
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            console.error('saveMedia failed:', e);
            return false;
        }
    }

    /* ============================================
       GET BLOB
       ============================================ */
    async function getMedia(key) {
        try {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction([STORE_NAME], 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const req = store.get(key);

                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            console.error('getMedia failed:', e);
            return null;
        }
    }

    /* ============================================
       GET BLOB OBJECT URL
       ============================================ */
    async function getMediaUrl(key) {
        const blob = await getMedia(key);
        if (!blob) return null;
        return URL.createObjectURL(blob);
    }

    /* ============================================
       DELETE BLOB
       ============================================ */
    async function deleteMedia(key) {
        try {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction([STORE_NAME], 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const req = store.delete(key);

                req.onsuccess = () => resolve(true);
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            console.error('deleteMedia failed:', e);
            return false;
        }
    }

    /* ============================================
       UPLOAD TO SERVER (if available)
       ============================================ */
    async function uploadToServer(file, type = 'videos') {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                if (data && data.url) {
                    return data.url;
                }
            }
        } catch (e) {
            // Server API not running, fallback to IndexedDB
        }
        return null;
    }

    /* ============================================
       RESOLVE MEDIA URL (Handles idb: and standard URLs)
       ============================================ */
    async function resolveMediaUrl(urlOrKey) {
        if (!urlOrKey) return '';
        if (typeof urlOrKey === 'string' && urlOrKey.startsWith('idb:')) {
            const key = urlOrKey.replace('idb:', '');
            const objectUrl = await getMediaUrl(key);
            return objectUrl || '';
        }
        return urlOrKey;
    }

    // Export globally
    window.MediaStorage = {
        saveMedia,
        getMedia,
        getMediaUrl,
        deleteMedia,
        uploadToServer,
        resolveMediaUrl
    };

})();
