import { getAttestations } from '../../lib/store';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const attestations = getAttestations();
    res.status(200).json(attestations);
  } catch (error) {
    console.error('Error fetching attestations:', error);
    res.status(500).json({ error: 'Failed to fetch attestations' });
  }
}