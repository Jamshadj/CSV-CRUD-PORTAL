import express from 'express';
import dataController from '../controllers/dataControllers.js'

const router = express.Router();

router.get('/data',dataController.getAllData);
router.post('/data',dataController.addData);
router.patch('/data/:id',dataController.updateData);
router.delete('/data/:id',dataController.deleteData);

export default router;
