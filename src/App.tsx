import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Terminal, Shield, Skull, Code2, Bug, Trophy, Cpu, Network, Lock, GitBranch, Webhook, Fingerprint, AlertTriangle, Bomb } from 'lucide-react';
import * as random from 'maath/random/dist/maath-random.esm';
import Typed from 'typed.js';

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

// Particle Field with more aggressive movement
const ParticleField = () => {
  const ref = useRef<any>();
  const sphereData = new Float32Array(20000 * 3);
  random.inSphere(sphereData, { radius: 3 });
  
  for (let i = 0; i < sphereData.length; i++) {
    if (!Number.isFinite(sphereData[i])) {
      sphereData[i] = 0;
    }
  }

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    const positions = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(state.clock.elapsedTime + positions[i] / 2) * 0.002;
      positions[i + 1] += Math.cos(state.clock.elapsedTime + positions[i + 1] / 2) * 0.002;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={sphereData} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff00"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
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
          className="absolute text-green-500/20 font-mono"
        >
          {hex}
        </motion.div>
      ))}
    </div>
  );
};

// Main App Component
function App() {
  const controls = useAnimation();
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });

    setTimeout(() => setShowWarning(false), 5000);
  }, [controls]);

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
      <div className="scanline"></div>
      <div className="crt-effect"></div>
      <div className="noise"></div>
      
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
      
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>
      
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
                  className="terminal-window p-6 hover:border-red-500 transition-all duration-300"
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
                  className="px-8 py-3 bg-red-500/20 rounded-none border-2 border-red-500 hover:bg-red-500/30 transition-colors text-lg font-mono text-red-500"
                >
                  View Exploits
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-green-500/20 rounded-none border-2 border-green-500 hover:bg-green-500/30 transition-colors text-lg font-mono text-green-500"
                >
                  Initiate Contact
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;