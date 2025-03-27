import { Link } from 'wouter';

interface WorkCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
}

const WorkCard = ({ title, description, image, link = "#" }: WorkCardProps) => {
  return (
    <div className="bg-[#F5F0E3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.02]">
      <div className="relative h-56 w-full overflow-hidden">
        <div 
          className="w-full h-full transition-transform duration-500 hover:scale-110" 
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          role="img"
          aria-label={title}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30"></div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-3 flex items-center">
          {title === "Food & Medical Aid" && <i className='bx bxs-bowl-rice mr-2 text-orange-500'></i>}
          {title === "Water & Refreshments" && <i className='bx bxs-drink mr-2 text-orange-500'></i>}
          {title === "Ancient Stupa Restoration" && <i className='bx bxs-temple mr-2 text-orange-500'></i>}
          {title === "Regular Tripitaka Chanting" && <i className='bx bxs-book-heart mr-2 text-orange-500'></i>}
          {title === "Sacred Tree & Site Beautification" && <i className='bx bxs-tree mr-2 text-orange-500'></i>}
          {title === "Pilgrim & Monastic Welfare" && <i className='bx bxs-hand-heart mr-2 text-orange-500'></i>}
          {title === "Meditation App" && <i className='bx bxs-mobile mr-2 text-orange-500'></i>}
          {title}
        </h3>
        <p className="mb-4 text-gray-700">{description}</p>
        <div className="mt-2">
          <Link href={link}>
            <span className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 cursor-pointer">
              Learn more <i className='bx bx-right-arrow-alt ml-1'></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
