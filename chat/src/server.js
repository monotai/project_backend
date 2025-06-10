import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';
// upload
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
import mime from 'mime';

const app = express();
const port =4576;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chat',
    password: 'adMOk34&poK23',
    port: 5432,
});

app.get('/users', async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post ('/users', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const result = await pool.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    console.log("Fetching user with ID:", userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const result = await pool.query('UPDATE users SET name = $1, password = $2 WHERE user_id = $3 RETURNING *', [username, password, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10); // Extract and parse user ID from params
        const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' }); // Handle user not found
        }

        res.json({ message: 'User deleted successfully', user: result.rows[0] }); // Success response
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle server errors
    }
});

app.get('/data', async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM storage_data');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/users/:id/data', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { type, data } = req.body;

    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }

    try {
        const result = await pool.query('INSERT INTO storage_data (user_id, type, data) VALUES ($1, $2, $3) RETURNING *', [userId, type, data]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users/:id/data', async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const result = await pool.query('SELECT * FROM storage_data WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users/:id/data/:dataId', async (req, res) => {
    const userId = parseInt(req.params.id);
    const dataId = parseInt(req.params.dataId);

    if (isNaN(userId) || isNaN(dataId)) {
        return res.status(400).json({ error: 'Invalid user ID or data ID' });
    }

    try {
        const result = await pool.query('SELECT * FROM storage_data WHERE id = $1 AND user_id = $2', [dataId, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/users/:id/data/:dataId', async (req, res) => {
    const userId = parseInt(req.params.id);
    const dataId = parseInt(req.params.dataId);
    const { type, data } = req.body;

    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }

    try {
        const result = await pool.query('UPDATE storage_data SET type = $1, data = $2 WHERE id = $3 AND user_id = $4 RETURNING *', [type, data, dataId, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/users/:id/data/:dataId', async (req, res) => {
    const userId = parseInt(req.params.id);
    const dataId = parseInt(req.params.dataId);

    try {
        const result = await pool.query('DELETE FROM storage_data WHERE id = $1 AND user_id = $2 RETURNING *', [dataId, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json({ message: 'Data deleted successfully', data: result.rows[0] });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const UPLOAD_FOLDER = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(201).json({ message: `File ${req.file.filename} uploaded successfully` });
});

// GET /upload/:filename
app.get('/upload/:filename', (req, res) => {
  const filePath = path.join(UPLOAD_FOLDER, req.params.filename);

  if (fs.existsSync(filePath)) {
    // Detect mime type based on file extension
    const mimeType = mime.getType(filePath) || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// DELETE /upload/:filename
app.delete('/upload/:filename', (req, res) => {
    const filePath = path.join(UPLOAD_FOLDER, req.params.filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.status(200).json({ message: `File ${req.params.filename} deleted successfully` });
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// school : 172.23.2.107
//205: 172.23.2.136
// home : 192.168.14.210
//192.168.158.210
// 204 : 172.23.3.7

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});