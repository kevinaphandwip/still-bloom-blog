import { getPostBySlug } from '@/lib/getPosts';
import { getRecentPosts } from '@/lib/getPosts';


import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import FooterSection from '@/components/FooterSection';
import GallerySection from '@/components/GallerySection';
import Head from 'next/head';

export async function getServerSideProps({ params }) {
  const post = await getPostBySlug(params.slug);
  const recentPosts = await getRecentPosts(5);

  return {
    props: {
      post,
      recentPosts,
    },
  };
}

export default function BlogDetail({ post , recentPosts}) {
  if (!post) return <p className="text-center py-10">Loading...</p>;

  const category = post.categories?.nodes?.[0]?.name || 'Uncategorized';
  const imageSrc = post.featuredImage?.node?.sourceUrl || '/placeholder.jpg';

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
      </Head>
      <Navbar />

      <main className="flex flex-col lg:flex-row max-w-6xl mx-auto px-6 py-6 gap-12">
        <article className="lg:flex-[4] space-y-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-semibold text-gray-900 leading-snug">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 italic mt-2">
              author: Kevin Naphan Dwiputra — {category}
            </p>
          </div>

          <div className="relative w-full max-w-6xl aspect-[3/1] mx-auto mt-8 rounded-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </div>

          <div
            className="prose prose-lg max-w-none text-justify text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex gap-4 pt-8 border-t mt-12">
  <Image
    src={post.author?.node?.avatar?.url || "/assets/avatar.png"}
    alt={post.author?.node?.name || "Author Avatar"}
    width={75}
    height={75}
    className="rounded-full object-cover"
  />
  <div>
    <p className="font-semibold text-gray-800">
      {post.author?.node?.name || "Unknown Author"}
    </p>
    <p className="text-sm text-gray-800">
      {post.author?.node?.description || "No bio available."}
    </p>
  </div>
</div>


        </article>

        <div className="lg:flex-[1]">
        <Sidebar posts={recentPosts} />
      </div>
      </main>

      <GallerySection />
      <FooterSection />
    </>
  );
}
