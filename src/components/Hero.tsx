import { motion, useAnimation } from 'framer-motion';
import { Terminal, Shield, Skull, Code2, Bug, Trophy } from 'lucide-react';
import { useEffect } from 'react';

const FloatingCode = () => {
  const codeSnippets = [
    "#!/usr/bin/python",
    "nmap -sV -p- target",
    "sudo tcpdump -i eth0",
    "sqlmap --dump-all",
    "> reverse_shell.php",
    "ssh -i key.pem user@host"
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%", x: Math.random() * 100 + "%", opacity: 0 }}
          animate={{
            y: "-100%",
            opacity: [0, 1, 1, 0],
            x: `${Math.random() * 100}%`
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute text-green-400 font-mono whitespace-nowrap"
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <motion.span
      className="inline-block"
      animate={{
        textShadow: [
          "0 0 5px #00ff00",
          "2px 2px 5px #00ff00",
          "-2px -2px 5px #00ff00",
          "0 0 5px #00ff00"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {text}
    </motion.span>
  );
};

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
  }, [controls]);

  return (
    <div className="relative z-10 text-white px-4 w-full max-w-4xl">
      <FloatingCode />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="text-center"
      >
        <h1 className="text-7xl font-bold mb-4">
          <GlitchText text="p4r45" />
        </h1>
        <p className="text-2xl mb-8 font-mono">Professional Penetration Tester</p>
        
        <div className="grid grid-cols-3 gap-8 mb-12">
          {[
            { icon: Terminal, text: "Ethical Hacking", desc: "Advanced penetration testing & vulnerability assessment" },
            { icon: Shield, text: "Security Research", desc: "Zero-day vulnerability discovery & exploit development" },
            { icon: Skull, text: "CTF Player", desc: "Ranked competitor in international CTF events" },
            { icon: Code2, text: "Red Teaming", desc: "Advanced persistent threat simulation" },
            { icon: Bug, text: "Bug Bounty", desc: "Active hunter on HackerOne & Bugcrowd" },
            { icon: Trophy, text: "Achievements", desc: "Multiple CVEs & security advisories" }
          ].map(({ icon: Icon, text, desc }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-4 bg-black/30 rounded-lg backdrop-blur-sm border border-green-400/20"
            >
              <Icon className="w-12 h-12 text-green-400 mb-2" />
              <span className="font-bold mb-2">{text}</span>
              <p className="text-sm text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black/50 p-8 rounded-lg backdrop-blur-sm border border-green-400/20"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-green-400" />
            Team 9-11 | CTFtime
          </h2>
          <p className="text-gray-300 mb-4">
            Active member of Team 9-11, participating in various CTF competitions
            and security challenges worldwide. Specialized in web exploitation,
            reverse engineering, and binary exploitation.
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-green-400/20 rounded-full border border-green-400/40 hover:bg-green-400/30 transition-colors"
            >
              View CTF Write-ups
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-black/50 rounded-full border border-green-400/40 hover:bg-green-400/10 transition-colors"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}