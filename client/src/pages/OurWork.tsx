import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import SectionTitle from '@/components/shared/SectionTitle';
import { WORK_CATEGORIES } from '@/lib/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OurWork = () => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    // Check if there's a hash in the URL and set the active tab accordingly
    const hash = location.split('#')[1];
    if (hash) {
      const matchingCategory = WORK_CATEGORIES.find(
        category => category.title.toLowerCase().replace(/\s+/g, '-') === hash
      );
      if (matchingCategory) {
        setActiveTab(matchingCategory.title.toLowerCase().replace(/\s+/g, '-'));
      }
    }
  }, [location]);

  return (
    <div className="bg-[#F5F0E3]">
      <div className="pt-32 pb-16 bg-[#3A2718]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Our Sacred Work</h1>
            <p className="font-accent text-xl text-[#D4AF37] max-w-3xl mx-auto">
              Preserving traditions, serving monastic communities, and protecting Buddhist heritage
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white p-1 rounded-lg shadow">
                <TabsTrigger value="all" className="px-4 py-2">All Work</TabsTrigger>
                {WORK_CATEGORIES.map((category, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={category.title.toLowerCase().replace(/\s+/g, '-')}
                    className="px-4 py-2"
                  >
                    {category.title.split(' & ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {WORK_CATEGORIES.map((category, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
                    <div className="md:w-2/5">
                      <div 
                        className="h-64 md:h-full w-full" 
                        style={{
                          backgroundImage: `url(${category.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        role="img"
                        aria-label={category.title}
                      />
                    </div>
                    <div className="p-6 md:w-3/5">
                      <h2 className="font-heading text-2xl font-bold text-[#3A2718] mb-4">{category.title}</h2>
                      <p className="mb-6">{category.description}</p>
                      <TabsTrigger 
                        value={category.title.toLowerCase().replace(/\s+/g, '-')}
                        className="px-4 py-2 bg-[#E67E22] text-white rounded-md hover:bg-[#C26B1D] transition inline-block"
                        onClick={() => setActiveTab(category.title.toLowerCase().replace(/\s+/g, '-'))}
                      >
                        Learn More
                      </TabsTrigger>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {WORK_CATEGORIES.map((category, index) => (
              <TabsContent key={index} value={category.title.toLowerCase().replace(/\s+/g, '-')}>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="md:w-1/2">
                      <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-6">{category.title}</h2>
                      <p className="text-lg mb-6">{category.description}</p>
                      <p className="text-lg mb-6">
                        At Buddha Dhaam, we believe that {category.title.toLowerCase()} is essential to preserving the rich heritage of Buddhism. Our dedicated team works tirelessly to ensure that these sacred traditions continue for future generations.
                      </p>
                    </div>
                    <div className="md:w-1/2">
                      <img 
                        src={category.image} 
                        alt={category.title} 
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4">Our Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#F5F0E3] p-6 rounded-lg text-center">
                      <div className="text-[#D4AF37] text-3xl font-bold mb-2">
                        {category.title.includes("Food") ? "1000+" : 
                         category.title.includes("Monastery") ? "12" : 
                         category.title.includes("Tripitaka") ? "24" : 
                         category.title.includes("Environmental") ? "500+" : 
                         category.title.includes("Pilgrim") ? "5000+" : "1000+"}
                      </div>
                      <p>
                        {category.title.includes("Food") ? "Monks supported monthly" : 
                         category.title.includes("Monastery") ? "Monasteries restored" : 
                         category.title.includes("Tripitaka") ? "Ceremonies organized annually" : 
                         category.title.includes("Environmental") ? "Sacred trees planted" : 
                         category.title.includes("Pilgrim") ? "Pilgrims assisted yearly" : 
                         category.title.includes("Scripture") ? "Texts preserved" : "Lives touched"}
                      </p>
                    </div>
                    <div className="bg-[#F5F0E3] p-6 rounded-lg text-center">
                      <div className="text-[#D4AF37] text-3xl font-bold mb-2">
                        {category.title.includes("Food") ? "4" : 
                         category.title.includes("Monastery") ? "6" : 
                         category.title.includes("Tripitaka") ? "8" : 
                         category.title.includes("Environmental") ? "12" : 
                         category.title.includes("Pilgrim") ? "4" : "7"}
                      </div>
                      <p>
                        {category.title.includes("Food") ? "Sacred sites served" : 
                         category.title.includes("Monastery") ? "Sacred sites" : 
                         category.title.includes("Tripitaka") ? "Countries represented" : 
                         category.title.includes("Environmental") ? "Environmental initiatives" : 
                         category.title.includes("Pilgrim") ? "Accommodation centers" : 
                         category.title.includes("Scripture") ? "Languages preserved" : "Projects active"}
                      </p>
                    </div>
                    <div className="bg-[#F5F0E3] p-6 rounded-lg text-center">
                      <div className="text-[#D4AF37] text-3xl font-bold mb-2">
                        {category.title.includes("Food") ? "36,500" : 
                         category.title.includes("Monastery") ? "850" : 
                         category.title.includes("Tripitaka") ? "5,000" : 
                         category.title.includes("Environmental") ? "50" : 
                         category.title.includes("Pilgrim") ? "15,000" : "250"}
                      </div>
                      <p>
                        {category.title.includes("Food") ? "Meals served annually" : 
                         category.title.includes("Monastery") ? "Years of history preserved" : 
                         category.title.includes("Tripitaka") ? "Participants annually" : 
                         category.title.includes("Environmental") ? "Acres protected" : 
                         category.title.includes("Pilgrim") ? "Water bottles distributed" : 
                         category.title.includes("Scripture") ? "Texts digitized" : "Volunteers involved"}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4">Current Projects</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-8">
                    <li>
                      {category.title.includes("Food") ? "Daily meal service at Bodhgaya monastery" : 
                       category.title.includes("Monastery") ? "Restoration of 9th century Dharmachakra stupa" : 
                       category.title.includes("Tripitaka") ? "Annual Tripitaka chanting ceremony in Bodhgaya" : 
                       category.title.includes("Environmental") ? "Peepal tree planting initiative in Lumbini" : 
                       category.title.includes("Pilgrim") ? "Free accommodation for traveling monks in Kushinagar" : 
                       category.title.includes("Scripture") ? "Digitization of rare palm leaf manuscripts" : "Community outreach program"}
                    </li>
                    <li>
                      {category.title.includes("Food") ? "Monthly medical camps for elderly monks" : 
                       category.title.includes("Monastery") ? "Preservation of ancient wall paintings in Ajanta" : 
                       category.title.includes("Tripitaka") ? "Training program for traditional chanting techniques" : 
                       category.title.includes("Environmental") ? "Water conservation project at sacred sites" : 
                       category.title.includes("Pilgrim") ? "Clean drinking water initiative for pilgrims" : 
                       category.title.includes("Scripture") ? "Translation of rare Buddhist texts" : "Educational workshops"}
                    </li>
                    <li>
                      {category.title.includes("Food") ? "Emergency supplies for remote monasteries" : 
                       category.title.includes("Monastery") ? "Structural reinforcement of Kushinagar temples" : 
                       category.title.includes("Tripitaka") ? "Documentation of regional variations in Buddhist ceremonies" : 
                       category.title.includes("Environmental") ? "Sustainable gardening at monastic communities" : 
                       category.title.includes("Pilgrim") ? "Pilgrim guide training program" : 
                       category.title.includes("Scripture") ? "Heritage protection workshops" : "Community service initiative"}
                    </li>
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default OurWork;
