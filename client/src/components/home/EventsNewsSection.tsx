import { Link } from 'wouter';
import SectionTitle from '@/components/shared/SectionTitle';
import { UPCOMING_EVENTS, LATEST_NEWS } from '@/lib/constants';

const EventsNewsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Events & News" 
          subtitle="Stay connected with our latest initiatives and upcoming spiritual gatherings"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-6 flex items-center">
              <i className='bx bxs-calendar text-[#D4AF37] mr-2'></i> Upcoming Events
            </h3>
            
            {UPCOMING_EVENTS.map((event, index) => (
              <div key={index} className="bg-[#F5F0E3] rounded-lg p-6 mb-4 flex">
                <div className="mr-6 text-center">
                  <div className="bg-[#9D2933] text-white rounded-t-md p-1 w-16">
                    <span className="text-sm font-bold">{event.date.month}</span>
                  </div>
                  <div className="bg-white rounded-b-md py-2 w-16 border-x border-b border-[#9D2933]">
                    <span className="text-2xl font-heading font-bold text-[#9D2933]">{event.date.day}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg">{event.title}</h4>
                  <p className="text-sm text-[#5D4230] mb-2">{event.location} • {event.time}</p>
                  <p className="mb-3">{event.description}</p>
                  <Link href="/events" className="text-[#E67E22] font-medium hover:text-[#C26B1D] flex items-center text-sm">
                    Learn more <i className='bx bx-right-arrow-alt ml-1'></i>
                  </Link>
                </div>
              </div>
            ))}
            
            <div className="mt-6 text-center">
              <Link href="/events">
                <span className="inline-block px-6 py-3 border-2 border-[#9D2933] text-[#9D2933] rounded-md font-bold hover:bg-[#9D2933] hover:text-white transition">
                  View All Events
                </span>
              </Link>
            </div>
          </div>
          
          {/* Latest News */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-6 flex items-center">
              <i className='bx bxs-news text-[#D4AF37] mr-2'></i> Latest News
            </h3>
            
            {LATEST_NEWS.map((item, index) => (
              <div key={index} className="bg-[#F5F0E3] rounded-lg overflow-hidden mb-4 flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <div 
                    className="w-full h-full" 
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    role="img"
                    aria-label={item.title}
                  />
                </div>
                <div className="p-4 md:w-2/3">
                  <span className="text-xs text-[#9D2933] font-bold">{item.date}</span>
                  <h4 className="font-heading font-bold text-lg mb-2">{item.title}</h4>
                  <p className="mb-3 text-sm">{item.description}</p>
                  <Link href="/news" className="text-[#E67E22] font-medium hover:text-[#C26B1D] flex items-center text-sm">
                    Read more <i className='bx bx-right-arrow-alt ml-1'></i>
                  </Link>
                </div>
              </div>
            ))}
            
            <div className="mt-6 text-center">
              <Link href="/news">
                <span className="inline-block px-6 py-3 border-2 border-[#9D2933] text-[#9D2933] rounded-md font-bold hover:bg-[#9D2933] hover:text-white transition">
                  View All News
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsNewsSection;
