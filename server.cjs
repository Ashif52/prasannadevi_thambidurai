/* ============================================
   PRASANNA DEVI — Production Node.js Server
   Static file server with Video Streaming + REST API & File Uploads
   No external dependencies required (Pure Node.js built-ins)
   ============================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = __dirname;
const DATA_FILE = path.join(ROOT_DIR, 'data', 'shoots.json');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');
const VIDEOS_DIR = path.join(UPLOADS_DIR, 'videos');
const IMAGES_DIR = path.join(UPLOADS_DIR, 'images');

// Ensure directories exist
[UPLOADS_DIR, VIDEOS_DIR, IMAGES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// MIME Types map
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'video/ogg',
    '.mov': 'video/quicktime',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.xml': 'application/xml'
};

// Helper: send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(data));
}

// Helper: read shoots JSON
function readShoots() {
    try {
        if (!fs.existsSync(DATA_FILE)) return [];
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(content || '[]');
    } catch (e) {
        console.error('Error reading shoots.json:', e);
        return [];
    }
}

// Helper: write shoots JSON
function writeShoots(shoots) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(shoots, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error('Error writing shoots.json:', e);
        return false;
    }
}

// Helper: handle multipart or raw file upload
function handleUpload(req, res) {
    const contentType = req.headers['content-type'] || '';

    // Multipart form parser (pure Node.js)
    if (contentType.includes('multipart/form-data')) {
        const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
        if (!boundaryMatch) {
            return sendJSON(res, 400, { error: 'Missing multipart boundary' });
        }

        const boundary = boundaryMatch[1] || boundaryMatch[2];
        const chunks = [];

        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const boundaryBuffer = Buffer.from('--' + boundary);

            // Simple parser for multipart payload
            let start = 0;
            let fileSaved = null;

            while ((start = buffer.indexOf(boundaryBuffer, start)) !== -1) {
                start += boundaryBuffer.length;
                if (buffer.slice(start, start + 2).toString() === '--') break; // End of parts

                // Skip CRLF
                if (buffer[start] === 13 && buffer[start + 1] === 10) start += 2;

                const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), start);
                if (headerEnd === -1) break;

                const headers = buffer.slice(start, headerEnd).toString('utf8');
                const contentStart = headerEnd + 4;

                const nextBoundary = buffer.indexOf(boundaryBuffer, contentStart);
                if (nextBoundary === -1) break;

                const contentEnd = nextBoundary - 2; // trim trailing CRLF
                const partData = buffer.slice(contentStart, contentEnd);

                const filenameMatch = headers.match(/filename="([^"]+)"/i);
                if (filenameMatch) {
                    const originalName = filenameMatch[1];
                    const ext = path.extname(originalName).toLowerCase() || '.bin';
                    const isVideo = ['.mp4', '.webm', '.mov', '.ogg', '.mkv'].includes(ext);
                    const destDir = isVideo ? VIDEOS_DIR : IMAGES_DIR;
                    const safeName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
                    const filePath = path.join(destDir, safeName);

                    fs.writeFileSync(filePath, partData);
                    const relativeUrl = `/uploads/${isVideo ? 'videos' : 'images'}/${safeName}`;
                    fileSaved = { url: relativeUrl, name: originalName, size: partData.length };
                }

                start = nextBoundary;
            }

            if (fileSaved) {
                return sendJSON(res, 200, fileSaved);
            } else {
                return sendJSON(res, 400, { error: 'No file found in upload' });
            }
        });
    } else {
        // Raw binary upload
        const urlObj = url.parse(req.url, true);
        const originalName = urlObj.query.filename || 'upload.bin';
        const ext = path.extname(originalName).toLowerCase();
        const isVideo = ['.mp4', '.webm', '.mov', '.ogg', '.mkv'].includes(ext);
        const destDir = isVideo ? VIDEOS_DIR : IMAGES_DIR;
        const safeName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext || (isVideo ? '.mp4' : '.jpg')}`;
        const filePath = path.join(destDir, safeName);

        const writeStream = fs.createWriteStream(filePath);
        req.pipe(writeStream);

        writeStream.on('finish', () => {
            const relativeUrl = `/uploads/${isVideo ? 'videos' : 'images'}/${safeName}`;
            sendJSON(res, 200, { url: relativeUrl });
        });

        writeStream.on('error', err => {
            console.error('File write error:', err);
            sendJSON(res, 500, { error: 'Failed to write file' });
        });
    }
}

// HTTP Server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        return res.end();
    }

    // ==================== API ROUTES ====================

    // Upload endpoint
    if (pathname === '/api/upload' && req.method === 'POST') {
        return handleUpload(req, res);
    }

    // Get all shoots
    if (pathname === '/api/shoots' && req.method === 'GET') {
        const shoots = readShoots();
        const activeOnly = parsedUrl.query.active === 'true';
        const filtered = activeOnly ? shoots.filter(s => s.active) : shoots;
        return sendJSON(res, 200, filtered);
    }

    // Save/create or update shoot
    if (pathname === '/api/shoots' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const shootData = JSON.parse(body);
                const shoots = readShoots();

                if (shootData.id) {
                    const idx = shoots.findIndex(s => s.id === shootData.id);
                    if (idx !== -1) {
                        shoots[idx] = { ...shoots[idx], ...shootData, updatedAt: new Date().toISOString() };
                    } else {
                        shoots.push(shootData);
                    }
                } else {
                    shootData.id = 'shoot-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
                    shootData.createdAt = new Date().toISOString();
                    shoots.push(shootData);
                }

                writeShoots(shoots);
                return sendJSON(res, 200, shootData);
            } catch (e) {
                return sendJSON(res, 400, { error: 'Invalid JSON payload' });
            }
        });
        return;
    }

    // Delete shoot
    if (pathname.startsWith('/api/shoots/') && req.method === 'DELETE') {
        const id = pathname.replace('/api/shoots/', '');
        let shoots = readShoots();
        shoots = shoots.filter(s => s.id !== id);
        writeShoots(shoots);
        return sendJSON(res, 200, { success: true, id });
    }

    // ==================== STATIC FILE SERVING ====================

    // Default to index.html
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    const filePath = path.join(ROOT_DIR, pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        return res.end('Access denied');
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Support video byte-range streaming for seamless video seeking
        const range = req.headers.range;
        if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mov')) {
            const total = stats.size;
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
            const chunksize = (end - start) + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${total}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });

            const stream = fs.createReadStream(filePath, { start, end });
            stream.pipe(res);
            return;
        }

        // Standard response
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stats.size,
            'Accept-Ranges': 'bytes',
            'Access-Control-Allow-Origin': '*'
        });

        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  Prasanna Devi Portfolio & Shoot Server running!`);
    console.log(`  Local URL:  http://localhost:${PORT}`);
    console.log(`  Admin URL:  http://localhost:${PORT}/admin.html`);
    console.log(`======================================================\n`);
});
