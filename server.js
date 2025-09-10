const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve images with proper MIME types
app.use('/pic1.jpg', express.static(path.join(__dirname, 'pic1.jpg')));
app.use('/pic2.jpg', express.static(path.join(__dirname, 'pic2.jpg')));
app.use('/pic3.jpg', express.static(path.join(__dirname, 'pic3.jpg')));
app.use('/pic4.jpg', express.static(path.join(__dirname, 'pic4.jpg')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all for images
app.get('/pic*.jpg', (req, res) => {
  const fileName = req.params[0] ? `pic${req.params[0]}.jpg` : req.path.substring(1);
  const filePath = path.join(__dirname, fileName);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log('File not found:', fileName);
      res.status(404).send('Image not found');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
