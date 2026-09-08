import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-50">
      <div className="flex flex-col items-center">
        {/* Animated Circle */}

        <motion.div
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear "}}
        />

        {/* Loading Text */}
        <motion.h2
          className="mt-6 text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
        Loading TechNova... 
        </motion.h2>
      </div>
    </div>
  );
};
