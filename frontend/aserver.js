const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 4000;

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Specify the upload folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename the file
    },
});

const upload = multer({ storage });

// Handle file upload route
app.post("/upload", upload.single('photo'), (req, res) => {
    // Access the uploaded file using req.file
    if (req.file) {
        console.log('File uploaded successfully:', req.file);
        res.json({ message: 'File uploaded successfully', file: req.file });
    } else {
        res.status(400).json({ message: 'No file uploaded' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on <http://localhost>:${port}`);
});
