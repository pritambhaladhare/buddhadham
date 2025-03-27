import { Link } from 'wouter';

interface WorkCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
}

const WorkCard = ({ title, description, image, link = "#" }: WorkCardProps) => {
  return (
    <div className="bg-[#F5F0E3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
      <div className="relative h-56 w-full">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          role="img"
          aria-label={title}
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-3">{title}</h3>
        <p className="mb-4">{description}</p>
        <Link href={link}>
          <a className="text-[#E67E22] font-medium hover:text-[#C26B1D] flex items-center">
            Learn more <i className='bx bx-right-arrow-alt ml-1'></i>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default WorkCard;
