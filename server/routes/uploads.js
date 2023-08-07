const fs = require('fs')
const path = require('path')


// Define a route to serve the webpage showing the list of files
exports.displayImages = async (req, res, next) => {

// app.get('/uploads', (req, res) => {
    const uploadDirectory = path.join(__dirname, 'uploads');
  
    fs.readdir(uploadDirectory, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading the "uploads" directory.');
      }
  
      const fileNames = files.filter((file) => fs.statSync(path.join(uploadDirectory, file)).isFile());
  
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Uploaded Files</title>
        </head>
        <body>
          <h1>List of Uploaded Files</h1>
          <ul>
            ${fileNames.map((fileName) => `<li>${fileName}</li>`).join('')}
          </ul>
        </body>
        </html>
      `;
  
      res.send(html);
    });
  };
  