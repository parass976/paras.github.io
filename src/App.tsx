import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Terminal, Shield, Skull, Code2, Bug, Trophy, Cpu, Network, Lock, GitBranch, Webhook, Fingerprint, AlertTriangle, Bomb } from 'lucide-react';
import Typed from 'typed.js';
import MatrixRain from './components/MatrixRain';
import SkillModal from './components/SkillModal';
import GalaxyBackground from './components/GalaxyBackground';
import CertificateModal from './components/CertificateModal';
import ExploitsModal from './components/ExploitsModal';
import ContactModal from './components/ContactModal';

// Terminal Effect Component
const TerminalEffect = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'root@p4r45:~# whoami',
        'Professional Penetration Tester',
        'root@p4r45:~# ./exploit.py',
        'Exploiting target system...',
        '[+] Vulnerability found',
        '[+] Payload injected',
        '[+] Shell acquired',
        'root@target:~# id',
        'uid=0(root) gid=0(root) groups=0(root)',
      ],
      typeSpeed: 40,
      backSpeed: 20,
      loop: true,
      backDelay: 1000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="terminal-window p-4 rounded-lg mb-8">
      <div className="flex items-center mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span ref={el} className="text-green-400"></span>
    </div>
  );
};

// Floating Hexadecimal Effect
const HexEffect = () => {
  const hexChars = "0123456789ABCDEF";
  const [hexCodes, setHexCodes] = useState<string[]>([]);

  useEffect(() => {
    const generateHex = () => {
      const newHexCodes = [];
      for (let i = 0; i < 20; i++) {
        let hex = "";
        for (let j = 0; j < 8; j++) {
          hex += hexChars[Math.floor(Math.random() * 16)];
        }
        newHexCodes.push(hex);
      }
      setHexCodes(newHexCodes);
    };

    const interval = setInterval(generateHex, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hexCodes.map((hex, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%", x: `${i * 5}%`, opacity: 0 }}
          animate={{
            y: "-100%",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="absolute text-green-500/20 font-mono whitespace-nowrap"
        >
          {hex}
        </motion.div>
      ))}
    </div>
  );
};

function App() {
  const controls = useAnimation();
  const [showWarning, setShowWarning] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<{
    title: string;
    description: string;
    details: string[];
  } | null>(null);
  const [showCertificates, setShowCertificates] = useState(false);
  const [showExploits, setShowExploits] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });

    setTimeout(() => setShowWarning(false), 5000);
  }, [controls]);

  const skillDetails = {
    "Zero-Day Hunter": {
      description: "Specialized in discovering and exploiting previously unknown vulnerabilities in systems and applications.",
      details: [
        "Advanced vulnerability research methodologies",
        "Custom fuzzing framework development",
        "Zero-day exploit development pipeline",
        "Responsible disclosure procedures",
        "Multiple CVE publications",
        "Binary analysis and reverse engineering",
        "Custom exploit development frameworks",
        "Advanced debugging techniques",
        "Memory corruption exploitation",
        "Hardware vulnerability research"
      ]
    },
    "Red Team Lead": {
      description: "Leading advanced adversary simulation operations and infrastructure penetration assessments.",
      details: [
        "Advanced persistent threat simulation",
        "Custom C2 infrastructure development",
        "Social engineering campaign design",
        "Physical security assessment",
        "Red team operation planning and execution",
        "Stealth operation techniques",
        "Custom malware development",
        "Infrastructure evasion methods",
        "Advanced lateral movement",
        "Post-exploitation frameworks"
      ]
    },
    "Elite CTF Player": {
      description: "Top-ranked competitor in international Capture The Flag competitions.",
      details: [
        "Multiple international CTF wins",
        "Custom exploit automation tools",
        "Advanced binary exploitation",
        "Web application security expertise",
        "Cryptographic challenge solutions",
        "Reverse engineering mastery",
        "Forensics investigation techniques",
        "OSINT methodology",
        "Custom CTF infrastructure",
        "Challenge development experience"
      ]
    },
    "Exploit Developer": {
      description: "Creating sophisticated exploit chains and custom exploitation frameworks.",
      details: [
        "ROP chain development",
        "Kernel exploitation",
        "Browser exploit development",
        "IoT device exploitation",
        "Custom shellcode development",
        "Exploit chain automation",
        "Zero-day weaponization",
        "Vulnerability research",
        "Advanced debugging techniques",
        "Exploit reliability engineering"
      ]
    },
    "Bug Bounty Elite": {
      description: "Hall of Fame researcher on major bug bounty platforms with critical findings.",
      details: [
        "Multiple critical vulnerability discoveries",
        "Custom reconnaissance frameworks",
        "Automated vulnerability scanning",
        "Advanced web application testing",
        "Mobile application security research",
        "API security testing",
        "Cloud infrastructure assessment",
        "Source code review expertise",
        "Custom exploitation tools",
        "Responsible disclosure coordination"
      ]
    },
    "CVE Publisher": {
      description: "Responsible for discovering and publishing multiple critical security vulnerabilities.",
      details: [
        "Vulnerability documentation",
        "Proof of concept development",
        "Vendor coordination",
        "Security advisory publication",
        "Patch verification",
        "Impact assessment",
        "Exploit development",
        "Mitigation strategies",
        "Technical writing",
        "Security research publication"
      ]
    },
    "Binary Ninja": {
      description: "Expert in reverse engineering and malware analysis.",
      details: [
        "Advanced static analysis",
        "Dynamic malware analysis",
        "Custom deobfuscation tools",
        "Firmware reverse engineering",
        "Anti-debugging bypass techniques",
        "Custom IDA Pro plugins",
        "Assembly level analysis",
        "Malware family classification",
        "Threat intelligence",
        "Zero-day hunting"
      ]
    },
    "Network Breacher": {
      description: "Specialized in complex network infrastructure penetration.",
      details: [
        "Advanced network pivoting",
        "Custom protocol analysis",
        "Wireless network exploitation",
        "Infrastructure mapping",
        "Stealth operation techniques",
        "Traffic manipulation",
        "Custom network tools",
        "IDS/IPS evasion",
        "Lateral movement",
        "Infrastructure assessment"
      ]
    },
    "Crypto Specialist": {
      description: "Expert in cryptographic system analysis and exploitation.",
      details: [
        "Cryptographic implementation review",
        "Custom crypto attack tools",
        "Protocol analysis",
        "Side-channel attack research",
        "Blockchain security analysis",
        "Custom cryptographic tools",
        "Algorithm analysis",
        "Key extraction techniques",
        "Hardware security modules",
        "Quantum cryptography research"
      ]
    },
    "Source Hunter": {
      description: "Finding critical vulnerabilities through source code analysis.",
      details: [
        "Static code analysis",
        "Custom vulnerability scanners",
        "Supply chain security",
        "Code review automation",
        "Secure coding practices",
        "SAST tool development",
        "Code pattern recognition",
        "Vulnerability classification",
        "Security best practices",
        "Developer training"
      ]
    },
    "API Destroyer": {
      description: "Breaking application security boundaries through API exploitation.",
      details: [
        "API security testing",
        "Custom fuzzing tools",
        "Authentication bypass techniques",
        "Rate limiting evasion",
        "GraphQL security testing",
        "Custom API tools",
        "Protocol manipulation",
        "Business logic flaws",
        "API documentation analysis",
        "Security architecture review"
      ]
    },
    "DFIR Expert": {
      description: "Advanced digital forensics and incident response specialist.",
      details: [
        "Memory forensics",
        "Network traffic analysis",
        "Malware behavior analysis",
        "Incident timeline reconstruction",
        "Evidence preservation techniques",
        "Custom forensic tools",
        "Chain of custody",
        "Live system analysis",
        "Threat hunting",
        "Incident documentation"
      ]
    }
  };

  const skills = [
    { icon: AlertTriangle, text: "Zero-Day Hunter", desc: "Discovery and exploitation of unknown vulnerabilities" },
    { icon: Shield, text: "Red Team Lead", desc: "Advanced adversary simulation & infrastructure penetration" },
    { icon: Skull, text: "Elite CTF Player", desc: "Top 50 globally ranked CTF competitor" },
    { icon: Bomb, text: "Exploit Developer", desc: "Custom exploit development & weaponization" },
    { icon: Bug, text: "Bug Bounty Elite", desc: "Hall of Fame on major platforms" },
    { icon: Trophy, text: "CVE Publisher", desc: "Multiple critical CVEs discovered & published" },
    { icon: Cpu, text: "Binary Ninja", desc: "Advanced reverse engineering & malware analysis" },
    { icon: Network, text: "Network Breacher", desc: "Complex network infrastructure penetration" },
    { icon: Lock, text: "Crypto Specialist", desc: "Cryptographic system analysis & exploitation" },
    { icon: GitBranch, text: "Source Hunter", desc: "Critical vulnerability discovery in source code" },
    { icon: Webhook, text: "API Destroyer", desc: "Breaking application security boundaries" },
    { icon: Fingerprint, text: "DFIR Expert", desc: "Advanced forensics & incident response" }
  ];

  return (
    <div className="main-content">
      <MatrixRain />
      <div className="scanline"></div>
      <div className="crt-effect"></div>
      <div className="noise"></div>
      
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          style={{ background: 'black' }}
        >
          <Suspense fallback={null}>
            <GalaxyBackground />
          </Suspense>
        </Canvas>
      </div>

      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/90 z-50"
        >
          <div className="text-red-500 text-center p-8 border-2 border-red-500 rounded-lg">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 glitch-text">WARNING: RESTRICTED ACCESS</h2>
            <p className="text-lg">Unauthorized access will be traced and prosecuted</p>
          </div>
        </motion.div>
      )}
      
      <HexEffect />
      
      <div className="content-wrapper w-full min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center"
          >
            <h1 className="text-8xl font-bold mb-4 glitch-text">p4r45</h1>
            <TerminalEffect />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {skills.map(({ icon: Icon, text, desc }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="terminal-window p-6 hover:border-red-500 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedSkill({
                    title: text,
                    description: desc,
                    details: skillDetails[text as keyof typeof skillDetails].details
                  })}
                >
                  <Icon className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-green-400">{text}</h3>
                  <p className="text-sm text-gray-400">{desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="terminal-window p-8 mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3 text-red-500">
                <Skull className="w-8 h-8" />
                TEAM 9-11 | GLOBAL THREAT ACTOR
              </h2>
              <p className="text-green-400 mb-6 text-lg leading-relaxed max-w-4xl mx-auto font-mono">
                [+] Specialized in high-impact penetration testing and zero-day research<br />
                [+] Multiple critical infrastructure compromises<br />
                [+] Advanced persistent threat simulation<br />
                [+] Custom exploit development and weaponization<br />
                [+] Stealth operation and anti-forensics expertise
              </p>
              <div className="flex justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowExploits(true)}
                  className="px-8 py-3 bg-red-500/20 rounded-none border-2 border-red-500 hover:bg-red-500/30 transition-colors text-lg font-mono text-red-500"
                >
                  View Exploits
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowContact(true)}
                  className="px-8 py-3 bg-green-500/20 rounded-none border-2 border-green-500 hover:bg-green-500/30 transition-colors text-lg font-mono text-green-500"
                >
                  Initiate Contact
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="terminal-window p-8 mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3 text-green-500">
                <Shield className="w-8 h-8" />
                CERTIFICATIONS & ACHIEVEMENTS
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCertificates(true)}
                className="px-8 py-3 bg-green-500/20 rounded-none border-2 border-green-500 hover:bg-green-500/30 transition-colors text-lg font-mono text-green-500"
              >
                View Certifications
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {selectedSkill && (
        <SkillModal
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={selectedSkill.title}
          description={selectedSkill.description}
          details={selectedSkill.details}
        />
      )}

      <CertificateModal
        isOpen={showCertificates}
        onClose={() => setShowCertificates(false)}
      />

      <ExploitsModal
        isOpen={showExploits}
        onClose={() => setShowExploits(false)}
      />

      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />
    </div>
  );
}

export default App;