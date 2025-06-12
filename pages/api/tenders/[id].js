import { getTenderById } from '../../../lib/store';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const tender = getTenderById(id);
    
    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    res.status(200).json(tender);
  } catch (error) {
    console.error('Error fetching tender:', error);
    res.status(500).json({ error: 'Failed to fetch tender' });
  }
}