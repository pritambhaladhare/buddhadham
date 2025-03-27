import { Link } from 'wouter';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-[#F5F0E3]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#3A2718] mb-6">About Buddha Dhaam</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Buddha Dhaam is a dedicated force in preserving the sacred legacy of Buddhism by serving monks and safeguarding Dharma. Operating across revered Buddhist sites such as Bodhgaya, Varanasi, Lumbini, and Kushinagar, we provide <strong>food, shelter, medical aid, and essential resources</strong> to monastic communities.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our mission extends beyond direct support—we actively <strong>restore ancient monasteries and stupas, plant sacred trees like the Peepal tree of Lord Buddha, and organize large-scale Tripitaka chanting ceremonies</strong> to uphold Buddhist traditions.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Recognizing the evolving needs of monks and pilgrims, Buddha Dhaam is also committed to <strong>environmental and welfare initiatives</strong>, such as distributing water bottles with sponsorship branding opportunities and developing free accommodations for traveling monks.
            </p>
            <Link href="/about">
              <a className="inline-flex items-center text-[#9D2933] font-bold hover:text-[#7D1F29]">
                Learn more about our vision
                <i className='bx bx-right-arrow-alt ml-2'></i>
              </a>
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1532443603613-61149c0bb01a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Buddhist monks in prayer" 
              className="rounded-lg shadow-xl" 
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-accent text-lg italic text-[#9D2933]">
                "Every act of service to the sangha helps illuminate the path for future generations."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
