import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "../styles";
import { staggerContainer, fadeIn, textVariant } from "../utils/motion";

const SectionWrapper = (Component, idName, options = {}) => {
  const {
    showTitle = true,
    title = "",
    subtitle = "",
    customStyles = {},
    animationType = "default",
    background = "transparent",
    padding = "py-16",
    containerClass = "",
    ...rest
  } = options;

  return function HOC(props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const getAnimationVariants = () => {
      switch (animationType) {
        case "fade":
          return fadeIn("up", "tween", 0.2, 0.6);
        case "text":
          return textVariant(0.5);
        default:
          return staggerContainer();
      }
    };

    const backgroundStyles = {
      transparent: "",
      gradient: "bg-gradient-to-br from-slate-900/50 to-slate-800/50",
      dark: "bg-slate-900",
      light: "bg-slate-50",
      primary: "bg-gradient-to-r from-blue-600/10 to-purple-600/10",
      secondary: "bg-gradient-to-r from-purple-600/10 to-pink-600/10"
    };

    return (
      <motion.section
        ref={ref}
        variants={getAnimationVariants()}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        viewport={{ once: true, amount: 0.25 }}
        className={`
          ${styles.paddingX} 
          ${padding}
          max-w-7xl 
          mx-auto 
          relative 
          z-10
          ${backgroundStyles[background] || backgroundStyles.transparent}
          ${containerClass}
        `}
        style={customStyles}
        aria-labelledby={`${idName}-heading`}
        {...rest}
      >
        {/* Accessibility anchor */}
        <span 
          className="hash-span absolute top-[-100px] invisible" 
          id={idName}
          aria-hidden="true"
        >
          &nbsp;
        </span>

        {/* Section Header */}
        {showTitle && (title || subtitle) && (
          <motion.div
            variants={textVariant(0.5)}
            className="text-center mb-12"
          >
            {title && (
              <h2 
                id={`${idName}-heading`}
                className={`${styles.sectionHeadText} text-white mb-4`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`${styles.sectionSubText} text-secondary mt-2`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 0.6)}
          className="w-full"
        >
          <Component {...props} />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </motion.section>
    );
  };
};

export default SectionWrapper;
