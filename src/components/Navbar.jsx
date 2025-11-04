import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion.js";
import styles from "./style.js";
import logo from "/src/assets/logo.svg";
import menu from "/src/assets/menu.svg";
import close from "/src/assets/close.svg";
import myVoice from "../Audio/my voice.mp4";

const navlinks = [
  { id: "about", title: "About", path: "/about" },
  { id: "experience", title: "Experience", path: "/experience" },
  { id: "tech", path: "/tech" },
  { id: "projects", title: "Projects", path: "/projects" },
  { id: "contact", title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = navlinks.find(
      (link) => link.path === currentPath
    );
    if (activeLink && activeLink.title) {
      setActive(activeLink.title);
    } else {
      setActive("");
    }
  }, [location]);

  const playAudio = (e) => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <motion.nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-[110] bg-white shadow-md`}
      role="navigation"
      aria-label="Main Navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: [
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          "0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)",
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        ]
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        boxShadow: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={(e) => {
            playAudio(e);
            setActive("");
            window.scrollTo(0, 0);
          }}
          aria-label="Homepage"
        >
          <img src={logo} alt="logo" className="w-6 h-6 object-contain mt-5" />
          <motion.p
            className="text-[18px] font-bold cursor-pointer whitespace-nowrap text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            David Raju K S&nbsp;
            <span className="sm:block hidden">| COO GOLDENZ VISION&nbsp;</span>
          </motion.p>
        </Link>

        <audio
          ref={audioRef}
          src={myVoice}
          style={{ display: "none" }}
          muted={false}
          preload="auto"
        />

        <ul className="list-none hidden sm:flex flex-row gap-10 ml-auto justify-end" role="menubar">
          {navlinks.map((link) => (
            <motion.li
              key={link.id}
              className={`${
                active === link.title ? "text-blue-600" : "text-secondary"
              } hover:text-blue-500 text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActive(link.title);
                }
              }}
              animate={active === link.title ? { boxShadow: "0 0 10px rgb(59 130 246)" } : {}}
              whileHover={{ scale: 1.1, color: "#3b82f6", boxShadow: "0 0 10px rgb(59 130 246)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={link.path}>{link.title}</Link>
            </motion.li>
          ))}
        </ul>

        <div className="sm:hidden flex justify-end items-center">
          <motion.button
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle Menu"
            aria-expanded={toggle}
            className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            whileHover={{ scale: 1.2, boxShadow: "0 0 8px rgb(59 130 246)" }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={toggle ? close : menu}
              alt="menu icon"
              className="w-3 h-3"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {toggle && (
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={fadeIn("down", "spring", 0, 0.5)}
              className="p-2 bg-black bg-opacity-90 absolute top-16 right-4 mx-4 my-2 min-w-[100px] z-[120] rounded flex-col flex"
              role="menu"
            >
              <motion.ul
                className="flex flex-col gap-4"
                variants={staggerContainer(0.1, 0)}
                initial="hidden"
                animate="show"
              >
                {navlinks.map((link) => (
                  <motion.li
                    key={link.id}
                    className="hover:text-gray-400 text-white cursor-pointer"
                    onClick={() => {
                      setToggle(false);
                      setActive(link.title);
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setToggle(false);
                        setActive(link.title);
                      }
                    }}
                    variants={fadeIn("right", "spring", 0.1, 0.3)}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                  >
                    <Link to={link.path}>{link.title}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
