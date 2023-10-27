import express from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';
import fastcsv from "fast-csv";
import { Readable } from 'stream';
import { createObjectCsvWriter } from 'csv-writer';


const router = express.Router();

const dataPath = '../server/data/data.csv';

// Read data from CSV file
router.get('/data', (req, res) => {
  try {
    const results = [];
    fs.createReadStream(dataPath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      });
  } catch (error) {
    res.status(500).json({ error: 'Error reading CSV file' });
  }
});

// Create a new record in the CSV file
router.post('/data', (req, res) => {
  try {
    const newData = req.body;
    const csvData = `${newData.column1},${newData.column2},${newData.column3},${newData.column4},${newData.column5},${newData.id}\n`;
  
    fs.appendFileSync(dataPath, csvData);
    res.json({ message: 'Record added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error writing to CSV file' });
  }
});


router.patch('/data/:id', (req, res) => {
  try {
    const recordId = req.params.id;
    const updatedData = req.body;
    console.log(updatedData);
    const newData = [];
    let headerSkipped = false;

    fs.createReadStream(dataPath)
      .pipe(csvParser())
      .on('data', (data) => {
         if (data.id === recordId) {
          console.log("ede");
          // Update the record with new data
          const updatedRecord = { ...data, ...updatedData };
          newData.push(updatedRecord);
        } else {
          // Keep other records unchanged
          newData.push(data);
        }
      })
      .on('end', () => {
        // Write updated records back to the CSV file, including the header row
        const ws = fs.createWriteStream(dataPath);
        fastcsv
          .write(newData, { headers: true })
          .pipe(ws)
          .on('finish', () => {
            res.json({ message: 'Record updated successfully' });
          });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error updating record' });
  }
});

// Delete a record from the CSV file
router.delete('/data/:id', (req, res) => {
  try {
    const recordId = req.params.id;
    console.log(recordId);

    const records = [];
    const readable = Readable.from(fs.createReadStream(dataPath).pipe(csvParser()));
    readable.on('data', (data) => {
      if (data.id !== recordId) {
        records.push(data);
      }
    });

    readable.on('end', () => {
      const csvWriter = createObjectCsvWriter({
  path: dataPath,
  header: [
    { id: 'column1', title: 'column1' },
    { id: 'column2', title: 'column2' },
    { id: 'column3', title: 'column3' },
    { id: 'column4', title: 'column4' },
    { id: 'column5', title: 'column5' },
    { id: 'id', title: 'ID' }
  ],
  append: false // Overwrite the existing file
});


csvWriter.writeRecords(records)
        .then(() => {
          res.json({ message: 'Record deleted successfully' });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Error deleting record' });
        });
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: 'Error deleting record' });
  }
});

export default router;
