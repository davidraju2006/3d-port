import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, SpotLight } from "@react-three/drei";
import WalkingModel from "../components/WalkingModel";
import CanvasLoader from "../components/canvas/CanvasLoader";
import ErrorBoundary from "../components/ErrorBoundary";

export default function WalkingModelPage() {
  const [selectedAnimation, setSelectedAnimation] = useState("Walk");
  const [isOpen, setIsOpen] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const animations = ["push up", "flying", "jumping down", "combo punch", "dance", "moonwalk", "backflip", "Walk"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    // Check WebGL support on mount
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <section className="relative w-full h-screen mx-auto flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">WebGL Not Supported</h1>
          <p className="mb-4">Your browser does not support WebGL or it is disabled.</p>
          <p className="text-sm">Please enable WebGL in your browser settings or try a different browser.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen mx-auto">
      <ErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 1, 5], fov: 50 }}
          gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <WalkingModel animationName={selectedAnimation} />
            <OrbitControls />
            <Preload />
          </Suspense>
        </Canvas>
      </ErrorBoundary>

      <div className="absolute top-4 left-4 z-10">
        <div className="relative w-15">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(147, 51, 234, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              boxShadow: [
                "0px 0px 20px rgba(147, 51, 234, 0.8)",
                "0px 0px 30px rgba(147, 51, 234, 1)",
                "0px 0px 20px rgba(147, 51, 234, 0.8)"
              ]
            }}
            transition={{
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-full py-0.5 px-1 rounded text-xs text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-[length:200%_200%] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-300"
          >
            {selectedAnimation}
          </motion.button>
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute mt-2 w-full bg-black bg-opacity-80 rounded py-1 shadow-lg ring-2 ring-purple-400 ring-opacity-50"
              >
                {animations.map((option, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0px 0px 8px #9b5de5",
                      color: "#9b5de5",
                    }}
                    className="px-2 py-1 cursor-pointer transition-all duration-200 text-xs text-white"
                    onClick={() => {
                      setSelectedAnimation(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
