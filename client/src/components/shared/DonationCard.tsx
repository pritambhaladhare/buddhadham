import { Button } from '@/components/ui/button';

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
  const colorClasses = {
    saffron: {
      border: 'border-[#E67E22]',
      text: 'text-[#E67E22]',
      hover: 'hover:bg-[#E67E22]',
      bg: 'bg-[#E67E22]',
      hoverBg: 'hover:bg-[#C26B1D]'
    },
    deepRed: {
      border: 'border-[#9D2933]',
      text: 'text-[#9D2933]',
      hover: 'hover:bg-[#9D2933]',
      bg: 'bg-[#9D2933]',
      hoverBg: 'hover:bg-[#7D1F29]'
    },
    gold: {
      border: 'border-[#D4AF37]',
      text: 'text-[#D4AF37]',
      hover: 'hover:bg-[#D4AF37]',
      bg: 'bg-[#D4AF37]',
      hoverBg: 'hover:bg-[#B29025]'
    }
  };

  const colorClass = colorClasses[option.color];

  return (
    <div className="donation-card bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-3 ${colorClass.bg}`}></div>
      <div className="p-8 text-center">
        <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4">{option.title}</h3>
        <p className="mb-6">{option.description}</p>
        
        {option.options && (
          <div className="flex justify-center space-x-3 mb-6">
            {option.options.map((amount, index) => (
              <button 
                key={index}
                className={`px-4 py-2 border ${colorClass.border} ${colorClass.text} font-medium rounded-md ${colorClass.hover} hover:text-white transition`}
              >
                {amount}
              </button>
            ))}
          </div>
        )}
        
        {option.checklistItems && (
          <ul className="text-left mb-6 space-y-2">
            {option.checklistItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <i className={`bx bxs-check-circle ${colorClass.text} mr-2`}></i>
                {item}
              </li>
            ))}
          </ul>
        )}
        
        <Button 
          className={`w-full py-3 ${colorClass.bg} text-white font-bold rounded-md ${colorClass.hoverBg} transition`}
        >
          {option.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default DonationCard;
