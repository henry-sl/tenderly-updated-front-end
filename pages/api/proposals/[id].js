import { getProposalById } from '../../../lib/store';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const proposal = getProposalById(id);
    
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    res.status(200).json(proposal);
  } catch (error) {
    console.error('Error fetching proposal:', error);
    res.status(500).json({ error: 'Failed to fetch proposal' });
  }
}