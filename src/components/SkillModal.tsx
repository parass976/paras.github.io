import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  details: string[];
}

const SkillModal = ({ isOpen, onClose, title, description, details }: SkillModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="terminal-window w-full max-w-2xl p-6 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <button
                onClick={onClose}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <motion.h3
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-2xl font-bold mb-4 text-green-400"
            >
              {title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 mb-6"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-green-400"
                >
                  <span className="font-mono">[+]</span>
                  <span>{detail}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-4 border-t border-green-400/20"
            >
              <p className="text-red-400 font-mono text-sm">
                * This information is classified. Handle with caution.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkillModal;