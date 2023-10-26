import express from 'express';
import apiRoutes from './routes/api.js';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 15;
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
