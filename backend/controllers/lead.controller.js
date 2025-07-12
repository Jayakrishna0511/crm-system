import { Lead } from '../models/lead.model.js';

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads' });
  }
};

// Add new lead
export const addLead = async (req, res) => {
  const newLead = new Lead(req.body);
  try {
    const saved = await newLead.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Invalid lead data', error: err.message });
  }
};

// Update lead
export const updateLead = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Lead not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update lead', error: err.message });
  }
};

// Delete lead
export const deleteLead = async (req, res) => {
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete lead', error: err.message });
  }
};
