import express from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';

const router = express.Router();

const dataPath = './backend/data/data.csv';

// Read data from CSV file
router.get('/data', (req, res) => {
  const results = [];
  fs.createReadStream(dataPath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

// Create a new record in the CSV file
router.post('/data', (req, res) => {
  const newData = req.body;
  const csvData = `${newData.column1},${newData.column2},${newData.column3},${newData.column4},${newData.column5}\n`;

  fs.appendFile(dataPath, csvData, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error writing to CSV file' });
    } else {
      res.json({ message: 'Record added successfully' });
    }
  });
});

// Update an existing record in the CSV file
router.put('/data/:id', (req, res) => {
    const recordId = req.params.id;
    const updatedData = req.body;
    
    const newData = [];
    fs.createReadStream(dataPath)
      .pipe(csvParser())
      .on('data', (data) => {
        if (data.id === recordId) {
          newData.push(updatedData);
        } else {
          newData.push(data);
        }
      })
      .on('end', () => {
        fs.writeFileSync(dataPath, ''); // Clear the existing file
        newData.forEach((data) => {
          const csvData = `${data.column1},${data.column2},${data.column3},${data.column4},${data.column5}\n`;
          fs.appendFileSync(dataPath, csvData);
        });
        res.json({ message: 'Record updated successfully' });
      });
  });
 
  // Delete a record from the CSV file
  router.delete('/data/:id', (req, res) => {
    const recordId = req.params.id;
  
    const newData = [];
    fs.createReadStream(dataPath)
      .pipe(csvParser())
      .on('data', (data) => {
        if (data.id !== recordId) {
          newData.push(data);
        }
      })
      .on('end', () => {
        fs.writeFileSync(dataPath, ''); // Clear the existing file
        newData.forEach((data) => {
          const csvData = `${data.column1},${data.column2},${data.column3},${data.column4},${data.column5}\n`;
          fs.appendFileSync(dataPath, csvData);
        });
        res.json({ message: 'Record deleted successfully' });
      });
  });

export default router;
