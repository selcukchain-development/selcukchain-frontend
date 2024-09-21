"use client"
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <motion.div
        className="text-blue-400 text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Yükleniyor
      </motion.div>
      <motion.div className="absolute bottom-1/4 flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-blue-400 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}