import { Link } from 'wouter';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="mb-4 text-orange-500 text-3xl">
              <i className='bx bxs-dharma-wheel'></i>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-orange-900 mb-6">About Buddha Dhaam</h2>
            <p className="text-lg mb-6 leading-relaxed text-gray-700">
              Buddha Dhaam is devoted to preserving the sacred teachings of lord buddha by serving monks and safeguarding Dhamma. Across the holy sites of Bodhgaya, Varanasi, Lumbini, and Kushinagar, we provide <span className="text-orange-700 font-semibold">food, shelter, medical aid, and essential resources</span> to monks and monasteries.
            </p>
            <p className="text-lg mb-6 leading-relaxed text-gray-700">
              Our work includes <span className="text-orange-700 font-semibold">restoring ancient temples, planting sacred Bodhi trees, and organizing traditional chanting ceremonies</span> that maintain the spiritual legacy of lord buddha's teachings.
            </p>
            <p className="text-lg mb-8 leading-relaxed text-gray-700">
              We are committed to <span className="text-orange-700 font-semibold">supporting both resident and traveling monks</span> through mindful initiatives that honor the timeless wisdom of lord buddha's teachings.
            </p>
            <Link href="/about">
              <div className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 cursor-pointer">
                Learn more about our spiritual journey
                <i className='bx bx-right-arrow-alt ml-2'></i>
              </div>
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1602939110364-e14a645fecf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Monks in meditation" 
              className="rounded-lg shadow-xl" 
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-lg shadow-lg hidden md:block">
              <p className="font-accent text-lg italic text-orange-600">
                "In serving the sangha, we illuminate the noble path for all beings."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
