import { useState } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock blog posts - in a real implementation, these would come from an API
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ancient Art of Stupa Restoration",
    excerpt: "Exploring the traditional techniques used in preserving these sacred Buddhist structures, and how Buddha Dhaam is working to maintain these practices.",
    image: "https://images.unsplash.com/photo-1566552881560-02559a8a13c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "August 15, 2023",
    category: "Preservation",
    author: "Dr. Amita Sharma"
  },
  {
    id: 2,
    title: "Supporting Monastic Communities in Modern Times",
    excerpt: "How the needs of Buddhist monks have evolved in the 21st century, and the ways Buddha Dhaam is adapting its support programs to meet these changing requirements.",
    image: "https://images.unsplash.com/photo-1545062080-a71640ea75df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "July 28, 2023",
    category: "Monastic Support",
    author: "Venerable Dhammajoti"
  },
  {
    id: 3,
    title: "Sacred Trees: The Living Legacy of Teaching of Lord Buddha",
    excerpt: "The significance of the Peepal tree in the tradition of lord buddha and why planting these sacred trees is a vital part of preserving the heritage of teaching of lord buddha for future generations.",
    image: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "July 10, 2023",
    category: "Environmental",
    author: "Rajesh Patel"
  },
  {
    id: 4,
    title: "The Revival of Tripitaka Chanting Traditions",
    excerpt: "An in-depth look at how Buddha Dhaam is working to preserve the ancient practice of Tripitaka chanting through large-scale ceremonies and educational initiatives.",
    image: "https://images.unsplash.com/photo-1584283367830-9e92d08a3488?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "June 22, 2023",
    category: "Spiritual Practices",
    author: "Maya Devi"
  },
  {
    id: 5,
    title: "Water for Pilgrims: A Basic Need with Sacred Significance",
    excerpt: "How providing clean drinking water to pilgrims and monks has become a cornerstone of Buddha Dhaam's welfare initiatives at sacred sites of lord buddha.",
    image: "https://images.unsplash.com/photo-1564529895062-72ee0563d880?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "June 5, 2023",
    category: "Pilgrim Welfare",
    author: "Sandeep Kumar"
  },
  {
    id: 6,
    title: "Digital Preservation of Sacred Texts",
    excerpt: "The challenges and triumphs of digitizing ancient manuscripts of lord buddha's teachings to ensure their wisdom remains accessible for future generations.",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "May 18, 2023",
    category: "Preservation",
    author: "Dr. Lekha Singh"
  }
];

// Categories for filtering
const CATEGORIES = [
  "All",
  "Preservation",
  "Monastic Support",
  "Environmental",
  "Spiritual Practices",
  "Pilgrim Welfare"
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter blog posts based on search term and category
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F5F0E3]">
      <div className="pt-32 pb-16 bg-[#3A2718]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Blog & Resources</h1>
            <p className="font-accent text-xl text-[#D4AF37] max-w-3xl mx-auto">
              In-depth articles, teachings, and educational content to spread wisdom of lord buddha
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className='bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A2718]/50'></i>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {CATEGORIES.map((category, index) => (
                  <Button 
                    key={index}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={selectedCategory === category ? 
                              "bg-[#9D2933] hover:bg-[#7D1F29] text-white" : 
                              "border-[#3A2718] text-[#3A2718] hover:bg-[#3A2718]/10"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <div className="h-48 w-full relative">
                      <div 
                        className="w-full h-full" 
                        style={{
                          backgroundImage: `url(${post.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        role="img"
                        aria-label={post.title}
                      />
                      <div className="absolute top-4 right-4 bg-[#9D2933] text-white text-xs font-bold px-2 py-1 rounded">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-xs text-[#3A2718]/60 mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>By {post.author}</span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">{post.title}</h3>
                      <p className="text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <a href={`/blog/${post.id}`} className="text-[#E67E22] font-medium hover:text-[#C26B1D] flex items-center">
                        Read more <i className='bx bx-right-arrow-alt ml-1'></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-[#3A2718]/70">No articles found matching your criteria.</p>
                <Button 
                  className="mt-4 bg-[#9D2933] hover:bg-[#7D1F29]"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Button className="px-6 py-3 bg-[#D4AF37] text-[#271A10] font-bold rounded-md hover:bg-[#B29025] transition">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Educational Resources" 
            subtitle="Access free materials to deepen your understanding of lord buddha's teachings"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F0E3] rounded-lg p-6 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#E67E22]/10 flex items-center justify-center">
                <i className='bx bxs-book-open text-3xl text-[#E67E22]'></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-3">E-Books & Guides</h3>
              <p className="mb-4">Free downloadable resources about sacred sites, traditions, and preservation efforts of lord buddha's heritage.</p>
              <Button className="bg-[#E67E22] hover:bg-[#C26B1D] text-white">
                Browse Library
              </Button>
            </div>
            
            <div className="bg-[#F5F0E3] rounded-lg p-6 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#9D2933]/10 flex items-center justify-center">
                <i className='bx bxs-video text-3xl text-[#9D2933]'></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-3">Video Resources</h3>
              <p className="mb-4">Educational videos showcasing our work, sacred ceremonies, and heritage sites of lord buddha.</p>
              <Button className="bg-[#9D2933] hover:bg-[#7D1F29] text-white">
                Watch Videos
              </Button>
            </div>
            
            <div className="bg-[#F5F0E3] rounded-lg p-6 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <i className='bx bxs-download text-3xl text-[#D4AF37]'></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-3">Presentations & Materials</h3>
              <p className="mb-4">Ready-to-use presentations and educational materials for schools and community groups.</p>
              <Button className="bg-[#D4AF37] hover:bg-[#B29025] text-[#271A10]">
                Download Materials
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-[#3A2718] p-6 text-white flex flex-col justify-center">
                <h3 className="font-heading text-2xl font-bold mb-3">Subscribe to Our Blog</h3>
                <p className="mb-4">Receive the latest articles, resources, and updates directly in your inbox.</p>
                <div className="hidden md:block">
                  <i className='bx bx-news text-6xl opacity-20'></i>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="subscribe-email" className="block text-sm font-medium text-[#3A2718] mb-1">Email Address*</label>
                    <Input 
                      type="email" 
                      id="subscribe-email" 
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="rounded border-[#3A2718]/20" />
                    <label htmlFor="terms" className="text-sm">I agree to receive emails from Buddha Dhaam. You can unsubscribe at any time.</label>
                  </div>
                  <Button type="submit" className="w-full py-3 bg-[#3A2718] text-white font-bold rounded-md hover:bg-[#271A10] transition">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
