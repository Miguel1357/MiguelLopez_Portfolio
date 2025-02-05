import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  fadeInThreshold?: number; // Customizable threshold for fade-in
  fadeOutThreshold?: number; // Customizable threshold for fade-out
  fadeDuration?: number; // Customizable transition speed
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  fadeInThreshold = 0.5, // Default: 50% of section is in view
  fadeOutThreshold = 0.3, // Default: Starts fading out earlier
  fadeDuration = 0.6, // Default: Smooth fade-in/out
}) => {
  const controls = useAnimation();
  const { ref, inView, entry } = useInView({
    threshold: [fadeOutThreshold, fadeInThreshold],
    triggerOnce: false, // Allows re-fading when scrolling back
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
