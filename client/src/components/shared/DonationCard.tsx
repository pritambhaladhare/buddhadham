import { Button } from '@/components/ui/button';
import PeepalLeaf from '@/assets/icons/PeepalLeaf';

interface DonationOption {
  title: string;
  description: string;
  color: 'saffron' | 'deepRed' | 'gold';
  options?: string[];
  checklistItems?: string[];
  buttonText: string;
}

interface DonationCardProps {
  option: DonationOption;
}

const DonationCard = ({ option }: DonationCardProps) => {
  // Simplifying to just use orange colors for all cards
  const colorClasses = {
    saffron: {
      border: 'border-orange-500',
      text: 'text-orange-500',
      hover: 'hover:bg-orange-500',
      bg: 'bg-orange-500',
      hoverBg: 'hover:bg-orange-600'
    },
    deepRed: {
      border: 'border-orange-500',
      text: 'text-orange-500',
      hover: 'hover:bg-orange-500',
      bg: 'bg-orange-500',
      hoverBg: 'hover:bg-orange-600'
    },
    gold: {
      border: 'border-orange-500',
      text: 'text-orange-500',
      hover: 'hover:bg-orange-500',
      bg: 'bg-orange-500',
      hoverBg: 'hover:bg-orange-600'
    }
  };

  const colorClass = colorClasses[option.color];

  return (
    <div className="donation-card bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-3 ${colorClass.bg}`}></div>
      <div className="p-8 text-center">
        <div className="mb-4 flex justify-center">
          <PeepalLeaf color="#f97316" size={28} />
        </div>
        <h3 className="font-heading text-2xl font-bold text-orange-900 mb-4">{option.title}</h3>
        <p className="mb-6 text-gray-700">{option.description}</p>
        
        {option.options && (
          <div className="flex justify-center space-x-3 mb-6">
            {option.options.map((amount, index) => (
              <button 
                key={index}
                className={`px-4 py-2 border ${colorClass.border} ${colorClass.text} font-medium rounded-lg ${colorClass.hover} hover:text-white transition`}
              >
                {amount}
              </button>
            ))}
          </div>
        )}
        
        {option.checklistItems && (
          <ul className="text-left mb-6 space-y-2">
            {option.checklistItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <i className={`bx bxs-check-circle ${colorClass.text} mr-2 mt-1`}></i>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        )}
        
        <Button 
          className={`w-full py-3 ${colorClass.bg} text-white font-bold rounded-lg ${colorClass.hoverBg} transition`}
        >
          {option.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default DonationCard;
