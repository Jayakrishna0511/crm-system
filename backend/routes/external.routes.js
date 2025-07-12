import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/external-data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch external data' });
  }
});

export default router; // ✅ This makes the import work
