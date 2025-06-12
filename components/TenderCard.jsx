import Link from 'next/link';
import { CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function TenderCard({ tender }) {
  const { id, title, agency, closingDate, category, isNew } = tender;
  
  const daysUntilClosing = Math.ceil(
    (new Date(closingDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  
  const isClosingSoon = daysUntilClosing <= 7 && daysUntilClosing > 0;

  return (
    <Link href={`/tenders/${id}`}>
      <div className="card cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {title}
            </h3>
          </div>
          <div className="flex space-x-2 ml-4">
            {isNew && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                New
              </span>
            )}
            {isClosingSoon && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-yellow-800">
                Closing Soon
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-4 w-4 mr-2" />
            <span>{agency}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>Closes: {new Date(closingDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
}