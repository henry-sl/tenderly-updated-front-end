import { CheckCircleIcon, XCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function EligibilityBox({ eligibility, loading }) {
  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center mb-3">
          <ShieldCheckIcon className="h-5 w-5 text-secondary mr-2" />
          <h3 className="text-lg font-semibold">Eligibility Check</h3>
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
        <ShieldCheckIcon className="h-5 w-5 text-secondary mr-2" />
        <h3 className="text-lg font-semibold">Eligibility Check</h3>
      </div>
      <div className="space-y-2">
        {eligibility.map((item, index) => (
          <div key={index} className="flex items-start">
            {item.eligible ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            )}
            <span className={`text-sm ${item.eligible ? 'text-green-700' : 'text-red-700'}`}>
              {item.requirement}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}