import { updateProposal } from '../../lib/store';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { proposalId, content } = req.body;
  
  if (!proposalId || content === undefined) {
    return res.status(400).json({ error: 'proposalId and content are required' });
  }

  try {
    const updatedProposal = updateProposal(proposalId, { 
      content,
      updatedAt: new Date().toISOString()
    });
    
    if (!updatedProposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ error: 'Failed to save draft' });
  }
}