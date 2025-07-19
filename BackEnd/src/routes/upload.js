import fs from 'fs';
import path from 'path';
import multer from 'multer';
import mime from 'mime';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure absolute path to uploads folder
const UPLOAD_FOLDER = path.resolve(__dirname, '../uploads');

// Create uploads folder if it doesn't exist
if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// POST /upload - handle file upload
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(201).json({ message: `File "${req.file.filename}" uploaded successfully` });
});

// GET /upload/:filename - serve uploaded file
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(UPLOAD_FOLDER, filename);

    if (fs.existsSync(filePath)) {
        const mimeType = mime.getType(filePath) || 'application/octet-stream';
        res.setHeader('Content-Type', mimeType);
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: `File "${filename}" not found` });
    }
});

// DELETE /upload/:filename - delete uploaded file
router.delete('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(UPLOAD_FOLDER, filename);

    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: `File "${filename}" deleted successfully` });
        } catch (err) {
            res.status(500).json({ error: `Failed to delete file "${filename}"`, details: err.message });
        }
    } else {
        res.status(404).json({ error: `File "${filename}" not found` });
    }
});

export default router;
