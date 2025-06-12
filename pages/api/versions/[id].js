// Mock version history for proposals
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  // Mock version data - in a real app this would come from database
  const mockVersions = [
    {
      id: 1,
      version: 1,
      content: "Initial proposal draft...",
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: 2,
      version: 2,
      content: "Updated proposal with revised timeline...",
      createdAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
    }
  ];

  res.status(200).json(mockVersions);
}