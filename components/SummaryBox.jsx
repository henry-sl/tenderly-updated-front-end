import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function SummaryBox({ summary, loading }) {
  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center mb-3">
          <DocumentTextIcon className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-semibold">AI Summary</h3>
        </div>
        <div className="space-y-2">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-4 w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center mb-3">
        <DocumentTextIcon className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold">AI Summary</h3>
      </div>
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}