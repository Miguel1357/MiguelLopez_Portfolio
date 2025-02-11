import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  fadeInThreshold?: number;
  fadeOutThreshold?: number;
  fadeDuration?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  fadeInThreshold = 0.5,
  fadeOutThreshold = 0.3,
  fadeDuration = 0.6,
}) => {
  const controls = useAnimation();
  const [threshold, setThreshold] = useState([
    fadeOutThreshold,
    fadeInThreshold,
  ]);

  // Adjust the threshold based on screen size
  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      setThreshold(
        height < 800 ? [0.2, 0.4] : [fadeOutThreshold, fadeInThreshold]
      );
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [fadeInThreshold, fadeOutThreshold]);

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40, transition: { duration: fadeDuration } },
        visible: { opacity: 1, y: 0, transition: { duration: fadeDuration } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default FadeIn;
