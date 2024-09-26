import { motion } from "framer-motion";
import { Users, Calendar, Rocket, MessageSquare } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function Stats() {
  const [stats, setStats] = useState([
    { number: 0, target: 500, label: 'Aktif Üye', icon: Users },
    { number: 0, target: 50, label: 'Topluluk Etkinliği', icon: Calendar },
    { number: 0, target: 20, label: 'Tamamlanan Proje', icon: Rocket },
    { number: 0, target: 1000, label: 'Forum Tartışması', icon: MessageSquare },
  ]);

  const [hasStarted, setHasStarted] = useState(false); // Statların artışının başlaması için bir flag
  const statsRef = useRef(null); // Stats kısmına referans

  // Stat'ların artışı
  const incrementStats = (start: number, end: number, duration: number, callback: (value: number) => void) => {
    let startTime: number | null = null;

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      callback(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  };

  // Intersection Observer kullanarak stats kısmına gelince artışı başlatmak
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true); // Eğer kullanıcı stats kısmına gelirse artış başlasın
        }
      },
      { threshold: 0.5 } // Stats kısmının %50'si göründüğünde tetiklenir
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasStarted]);

  // hasStarted true olduğunda stat sayıları artmaya başlar
  useEffect(() => {
    if (hasStarted) {
      stats.forEach((stat, index) => {
        incrementStats(0, stat.target, 2000 + index * 500, (value) => {
          setStats((prevStats) => {
            const updatedStats = [...prevStats];
            updatedStats[index].number = value;
            return updatedStats;
          });
        });
      });
    }
  }, [hasStarted]);

  return (
    <section
      id="stats"
      ref={statsRef} // Section'a referans ekledik
      className="relative py-20 md:py-28 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/selcukk.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
          Topluluğumuzun Gücü
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 p-6 rounded-xl flex items-center justify-between transition-all duration-300 hover:bg-opacity-20 hover:scale-105 cursor-pointer"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-4xl font-bold block mb-2 text-white"
                >
                  {stat.number}
                </motion.span>
                <span className="text-white text-opacity-80">{stat.label}</span>
              </div>
              <stat.icon className="h-12 w-12 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
