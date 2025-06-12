import { getCompanyProfile, updateCompanyProfile } from '../../lib/store';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const profile = getCompanyProfile();
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching company profile:', error);
      res.status(500).json({ error: 'Failed to fetch company profile' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updates = req.body;
      const updatedProfile = updateCompanyProfile(updates);
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating company profile:', error);
      res.status(500).json({ error: 'Failed to update company profile' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}