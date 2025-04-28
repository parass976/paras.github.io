import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Download } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = ({ isOpen, onClose }: CertificateModalProps) => {
  const certificates = [
    {
      id: 1,
      name: "OSCP - Offensive Security Certified Professional",
      date: "2024",
      description: "Advanced penetration testing certification demonstrating practical skills in identifying and exploiting vulnerabilities.",
      pdfUrl: "/certificates/oscp.pdf"
    },
    {
      id: 2,
      name: "CISSP - Certified Information Systems Security Professional",
      date: "2023",
      description: "Comprehensive certification covering critical security domains and best practices.",
      pdfUrl: "/certificates/cissp.pdf"
    },
    {
      id: 3,
      name: "CEH - Certified Ethical Hacker",
      date: "2023",
      description: "Professional certification in ethical hacking and penetration testing methodologies.",
      pdfUrl: "/certificates/ceh.pdf"
    }
  ];

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
            className="terminal-window w-full max-w-4xl p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-green-400">Security Certifications</h2>
              </div>
              <button
                onClick={onClose}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: cert.id * 0.1 }}
                  className="terminal-window p-6 border border-green-400/20"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-green-400 mb-2">{cert.name}</h3>
                      <p className="text-gray-400 mb-2">{cert.description}</p>
                      <p className="text-green-400/60 text-sm font-mono">Achieved: {cert.date}</p>
                    </div>
                    <motion.a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-400/20 rounded-md hover:bg-green-400/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-mono">View PDF</span>
                      <Download className="w-4 h-4 text-green-400" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-green-400 font-mono text-sm text-center"
            >
              [+] All certifications have been verified and are up to date
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;