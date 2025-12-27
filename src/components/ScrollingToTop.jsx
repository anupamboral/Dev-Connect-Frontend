import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollingToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Use 'instant' for no animation, and fro animation we can use "smooth"
    });
  }, [pathname]); // Re-run the effect when the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollingToTop;
