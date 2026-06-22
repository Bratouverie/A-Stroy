import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { articleSchema } from "@/lib/schema";

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPost(); }, [id]);

  const loadPost = async () => {
    try {
      const data = await base44.entities.BlogPost.get(id);
      setPost(data);
      if (data?.category) {
        const all = await base44.entities.BlogPost.list("-created_date", 20);
        setRelated((all || []).filter(p => p.id !== id && p.category === data.category).slice(0, 3));
      }
    } catch (e) {
      console.error("Load blog post error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex items-center justify-center h-96">
          <div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div>
        </div>
      </PublicLayout>
    );
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-[#A0A0A0]">Статья не найдена</p>
          <Link to="/blog" className="text-[#D4AF37] hover:underline flex items-center gap-1">
            <ArrowLeft size={16} /> Вернуться в блог
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <MetaHead
        title={post.title}
        description={post.excerpt || post.title}
        ogImage={post.coverImage}
        canonical={`/blog/${post.id}`}
        schema={articleSchema(post)}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors mb-6">
          <ArrowLeft size={16} /> Все статьи
        </Link>

        {/* Header */}
        {post.category && (
          <span className="inline-block px-3 py-1 text-xs bg-[#D4AF37]/10 text-[#D4AF37] rounded border border-[#D4AF37]/20 mb-4">
            {post.category}
          </span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-heading font-bold text-[#F5F5F5] mb-4"
        >
          {post.title}
        </motion.h1>

        <div className="flex items-center gap-4 text-sm text-[#A0A0A0] mb-8 pb-6 border-b border-[#D4AF37]/10">
          <span>{post.author || "А СТРОЙ"}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime || 5} мин чтения</span>
          {post.publishedDate && <span>{new Date(post.publishedDate).toLocaleDateString("ru-RU")}</span>}
          <button className="ml-auto flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
            <Share2 size={14} /> Поделиться
          </button>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden mb-8"
          >
            <img src={post.coverImage} alt={post.title} className="w-full h-[300px] lg:h-[450px] object-cover" />
          </motion.div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-[#A0A0A0] italic mb-8 leading-relaxed">{post.excerpt}</p>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown className="text-[#A0A0A0] leading-relaxed space-y-4 [&>h2]:text-2xl [&>h2]:font-heading [&>h2]:font-semibold [&>h2]:text-[#F5F5F5] [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-heading [&>h3]:font-semibold [&>h3]:text-[#F5F5F5] [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>p]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#D4AF37]/40 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#A0A0A0]">
            {post.content}
          </ReactMarkdown>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] border border-[#D4AF37]/20 rounded-2xl text-center">
          <h3 className="text-xl font-heading font-semibold text-[#F5F5F5] mb-3">Хотите воплотить эти идеи?</h3>
          <p className="text-sm text-[#A0A0A0] mb-5">Получите бесплатную консультацию от нашего дизайнера</p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all text-sm"
          >
            Получить консультацию <ArrowRight size={16} />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-heading font-bold text-[#F5F5F5] mb-6">Похожие статьи</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(r => (
                <Link
                  key={r.id}
                  to={`/blog/${r.id}`}
                  className="bg-[#1A1F2E] rounded-xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors group"
                >
                  {r.coverImage && <img src={r.coverImage} alt={r.title} className="w-full h-32 object-cover" />}
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors line-clamp-2">{r.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PublicLayout>
  );
}