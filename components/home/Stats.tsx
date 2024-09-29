import { motion } from "framer-motion";
import { Users, Calendar, Rocket, MessageSquare } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

export function Stats() {
  const [stats, setStats] = useState([
    { number: 0, target: 500, label: 'Aktif Üye', icon: Users },
    { number: 0, target: 50, label: 'Topluluk Etkinliği', icon: Calendar },
    { number: 0, target: 20, label: 'Tamamlanan Proje', icon: Rocket },
    { number: 0, target: 1000, label: 'Forum Tartışması', icon: MessageSquare },
  ]);

  const [hasStarted, setHasStarted] = useState(false);
  const statsRef = useRef(null);

  const incrementStats = useCallback((start: number, end: number, duration: number, callback: (value: number) => void) => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      callback(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentStatsRef = statsRef.current;

    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      stats.forEach((stat, index) => {
        incrementStats(0, stat.target, 2000 + index * 500, (value) => {
          setStats((prevStats) => prevStats.map((s, i) => 
            i === index ? { ...s, number: value } : s
          ));
        });
      });
    }
  }, [hasStarted, incrementStats, stats]);

  return (
    <section
      id="stats"
      ref={statsRef}
      className="relative py-20 md:py-28 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/selcukk.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
          Topluluğumuzun Gücü
        </h2>
        <div className="grid  gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-80 p-6 rounded-xl flex items-center justify-between transition-all duration-300 hover:bg-opacity-20 hover:scale-105 cursor-pointer"
            >
              <div>
                <motion.span
                  key={stat.number}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold block mb-2 text-gray-800"
                >
                  {stat.number}
                </motion.span>
                <span className="text-gray-600">{stat.label}</span>
              </div>
              <stat.icon className="h-12 w-12 text-blue-500 transition-colors duration-300 group-hover:text-blue-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
