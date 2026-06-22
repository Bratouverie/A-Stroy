import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, Mail } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { base44 } from "@/api/base44Client";
import { BLOG } from "@/lib/images";

const CATEGORIES = ["Все", "Дизайн", "Материалы", "Тренды", "Советы"];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try {
      const data = await base44.entities.BlogPost.list("-created_date", 50);
      setPosts(data || []);
    } catch (e) {
      console.error("Load blog posts error:", e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = posts.filter(p => {
    const matchSearch = !search || (p.title?.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "Все" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <PublicLayout>
      {/* Banner */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center">
        <img src={BLOG[0]} alt="Блог" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/80 to-[#0F1419]" />
        <div className="relative text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-3">
            Блог
          </motion.h1>
          <p className="text-base text-[#A0A0A0]">Тренды дизайна и ремонта 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Posts */}
          <div>
            {/* Search + Categories */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск по статьям..."
                  className="w-full pl-9 pr-4 py-2.5 bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/30"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                    category === c
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold"
                      : "bg-[#1A1F2E] text-[#A0A0A0] hover:text-[#D4AF37] border border-[#D4AF37]/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-[#1A1F2E] rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-[#0F1419]"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-[#0F1419] rounded w-1/3"></div>
                      <div className="h-5 bg-[#0F1419] rounded w-3/4"></div>
                      <div className="h-3 bg-[#0F1419] rounded"></div>
                      <div className="h-3 bg-[#0F1419] rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {filtered.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#1A1F2E] rounded-2xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors group cursor-pointer"
                    onClick={() => window.location.href = `/blog/${post.id}`}
                  >
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    )}
                    <div className="p-5">
                      {post.category && (
                        <span className="inline-block px-2 py-0.5 text-xs bg-[#D4AF37]/10 text-[#D4AF37] rounded border border-[#D4AF37]/20 mb-3">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-lg font-heading font-semibold text-[#F5F5F5] mb-2 group-hover:text-[#D4AF37] transition-colors">{post.title}</h3>
                      <p className="text-sm text-[#A0A0A0] line-clamp-2 mb-3">{post.excerpt || ""}</p>
                      <div className="flex items-center gap-3 text-xs text-[#A0A0A0]">
                        <span>{post.author || "А СТРОЙ"}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime || 5} мин</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-[#A0A0A0]">
                <p>Статьи скоро появятся</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] border border-[#D4AF37]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={18} className="text-[#D4AF37]" />
                <h3 className="text-sm font-semibold text-[#F5F5F5]">Подписка</h3>
              </div>
              <p className="text-xs text-[#A0A0A0] mb-3">Получайте новые статьи и тренды дизайна первыми</p>
              <input
                placeholder="Ваш email"
                className="w-full px-3 py-2 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/30 mb-2"
              />
              <button className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] text-sm font-semibold rounded-lg">
                Подписаться
              </button>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}