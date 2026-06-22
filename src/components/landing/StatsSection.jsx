import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Завершённых проектов" },
  { value: 8, suffix: "+", label: "Лет в профессии" },
  { value: 99.8, suffix: "%", label: "Клиентов рекомендуют" },
  { value: 2.5, suffix: "млн+", label: "Кв.м отремонтировано" },
];

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = target % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
  return <span>{display}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-[#1A1F2E]/50 border-y border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                <AnimatedCounter target={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <p className="text-sm sm:text-base text-[#A0A0A0]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}