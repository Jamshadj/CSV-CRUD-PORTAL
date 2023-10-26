import express from 'express';
import apiRoutes from './routes/api.js';
import cors from 'cors'; // Import the cors package

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
