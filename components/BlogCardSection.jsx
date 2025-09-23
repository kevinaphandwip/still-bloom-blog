'use client';

import { useState } from 'react';
import BlogCard from './BlogCard';
import Pagination from './Pagination';
import Sidebar from './Sidebar';


export default function BlogCardSection({posts}) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Data dummy langsung di sini
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="max-w-6xl bg-white mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Kiri: Blog List */}
      <div className="flex-[4] space-y-8 ">
        {currentPosts.map((post) => (
  <BlogCard
    key={post.id}
    id={post.slug}
    title={post.title}
    excerpt={post.excerpt.replace(/<[^>]+>/g, '')} 
    category={post.categories?.nodes?.[0]?.name || 'Uncategorized'}
    imageSrc={post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
  />
))}


        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Kanan: Sidebar */}
      <Sidebar posts={posts} className='lg:flex-[1]'/>
    </div>
  );
}
