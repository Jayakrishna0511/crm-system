import express from 'express';
import {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
} from '../controllers/lead.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply JWT auth middleware to all lead routes
router.use(authenticateToken);

// Define CRUD routes for leads
router.get('/', getLeads);             // GET all leads
router.post('/', addLead);             // POST a new lead
router.put('/:id', updateLead);        // PUT (update) a lead
router.delete('/:id', deleteLead);     // DELETE a lead

export default router;
