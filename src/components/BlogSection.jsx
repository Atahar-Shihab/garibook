import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogsData } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * BlogSection Component
 * 
 * Displays the latest 3 travel blogs & guides from Garibook.
 * Uses GSAP ScrollTrigger to smoothly stagger cards upward when scrolling down.
 */
const BlogSection = () => {
  const sectionRef = useRef(null);

  // Stagger animation: each card glides up one after another as user scrolls
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.blog-card', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212]">
              Beyond Destinations
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              Discover travel hacks, guides, and inspirations for your next intercity trip with Garibook.
            </p>
          </div>
          
          <a
            href="/blogs"
            className="text-[#0e52ff] hover:text-[#0038c4] font-bold text-base sm:text-lg inline-flex items-center gap-2 transition shrink-0"
          >
            <span>Show All Blogs</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <div
              key={blog.id}
              className="blog-card group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Blog Featured Thumbnail Image */}
              <div className="h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Blog Text Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Publication Date */}
                <span className="text-xs text-gray-400 font-medium">
                  {blog.date}
                </span>

                {/* Article Title */}
                <h3 className="text-lg font-bold text-gray-900 mt-2.5 line-clamp-2 leading-snug group-hover:text-[#0e52ff] transition">
                  {blog.title}
                </h3>

                {/* Category Tag */}
                <p className="text-xs text-gray-500 font-medium mt-3">
                  {blog.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
