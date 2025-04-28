import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix characters (including hacker-style symbols)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴ@#$%&*;:=<>[]{}|/\\';
    const fontSize = 14;
    let columns: number[] = [];
    let drops: number[] = [];

    const initializeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Array.from({ length: Math.ceil(canvas.width / fontSize) }, (_, i) => i * fontSize);
      drops = Array(columns.length).fill(1);
    };

    initializeCanvas();

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text with glow effect
      ctx.shadowColor = '#0F0';
      ctx.shadowBlur = 5;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Gradient effect for characters
        const gradient = ctx.createLinearGradient(0, drops[i] * fontSize - fontSize, 0, drops[i] * fontSize);
        gradient.addColorStop(0, '#0F0');
        gradient.addColorStop(1, '#0A0');
        ctx.fillStyle = gradient;

        // Draw the character
        ctx.fillText(char, columns[i], drops[i] * fontSize);

        // Reset drop when it reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      draw();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      initializeCanvas();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-30 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MatrixRain;