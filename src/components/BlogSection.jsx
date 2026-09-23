import React from 'react';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: 'Tips for Safe Intercity Travel in Bangladesh',
      category: 'Travel Guide',
      date: 'Oct 15, 2023',
    },
    {
      id: 2,
      title: 'Why Garibook is the Best Car Rental App',
      category: 'Company News',
      date: 'Oct 10, 2023',
    },
    {
      id: 3,
      title: 'Top 5 Weekend Getaway Destinations from Dhaka',
      category: 'Inspiration',
      date: 'Oct 02, 2023',
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f2647]">Beyond Destinations</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Discover travel hacks, guides, and inspirations for your next intercity trip with Garibook.
            </p>
          </div>
          <a 
            href="#" 
            className="text-[#0f2647] font-semibold text-lg hover:underline inline-flex items-center whitespace-nowrap"
          >
            Show All Blogs
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded-xl overflow-hidden border bg-white hover:shadow-lg transition flex flex-col group cursor-pointer">
              <div className="h-48 bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition relative overflow-hidden">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-[#fec200]/20 text-[#0f2647] font-semibold px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <h3 className="font-medium text-gray-800 text-lg line-clamp-2 leading-snug">
                  {blog.title}
                </h3>
                <span className="text-xs text-gray-400 mt-2 block">{blog.date}</span>
                
                <div className="mt-auto pt-4 text-[#0f2647] text-sm font-semibold inline-flex items-center group-hover:text-[#fec200] transition">
                  Read More 
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
