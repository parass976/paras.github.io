import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Globe, Github, Twitter } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
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
            className="terminal-window w-full max-w-lg p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-400">Initiate Contact</h2>
              <button
                onClick={onClose}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <motion.a
                href="mailto:contact@p4r45.com"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-4 terminal-window border border-green-400/20 hover:border-green-400/40 transition-colors"
              >
                <Mail className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-mono">contact@p4r45.com</span>
              </motion.a>

              <motion.a
                href="https://p4r45.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 terminal-window border border-green-400/20 hover:border-green-400/40 transition-colors"
              >
                <Globe className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-mono">p4r45.com</span>
              </motion.a>

              <motion.a
                href="https://github.com/p4r45"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 terminal-window border border-green-400/20 hover:border-green-400/40 transition-colors"
              >
                <Github className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-mono">github.com/p4r45</span>
              </motion.a>

              <motion.a
                href="https://twitter.com/p4r45_"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 p-4 terminal-window border border-green-400/20 hover:border-green-400/40 transition-colors"
              >
                <Twitter className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-mono">@p4r45_</span>
              </motion.a>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-red-400 font-mono text-sm text-center"
            >
              [!] Communications are end-to-end encrypted
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;