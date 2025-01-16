import React, { useEffect, useState, useRef } from "react";
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";

// Path to your images folder
const imagesPath = "/animations/";

const Header = ({ products }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Start at 1
  const totalImages = 139; // Total number of images (1.webp to 833.webp)
  const imageRef = useRef(null); // Reference to the image element
  const headerContentRef = useRef(null); // Reference to the header content (text)
  const newDivRef = useRef(null);

  const [lastScrollY, setLastScrollY] = useState(0); // To keep track of the last scroll position
  const [drawersVisible, setDrawersVisible] = useState(false); // Drawer visibility state
  const [newDivRefOn, newDivRefOnChange] = useState(false); // Drawer visibility state
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 600px)").matches);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const preloadImage = (index) => {
      if (index >= 1 && index <= totalImages) {
        const img = new Image();
        img.src = `${imagesPath}${index}.webp`;
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;

        setLastScrollY(scrollPosition);

        if (scrollPosition > 400 && scrollPosition < 750) {
          setDrawersVisible(true);
        } else if (scrollPosition > 750 || scrollPosition < 400) {
          setDrawersVisible(false);
        }

        const scrollRatio = Math.min(
          Math.max(
            scrollPosition / (document.body.scrollHeight - window.innerHeight),
            0
          ),
          1
        );

        const imageIndex = Math.floor(scrollRatio * (totalImages - 1)) + 1;
        setCurrentImageIndex(imageIndex);
        if (imageRef.current)
          imageRef.current.src = `${imagesPath}${imageIndex}.webp`;

        preloadImage(imageIndex + 1);
        preloadImage(imageIndex - 1);

        if (headerContentRef.current) {
          const translateY = Math.min(scrollPosition / 6, 300); // Move downward with scroll
          const scale = Math.max(1 - scrollPosition / 800, 0.7); // Scale down
          const opacity = Math.max(1 - scrollPosition / 300, 0); // Fade out

          headerContentRef.current.style.transform = `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`;
          headerContentRef.current.style.opacity = opacity;

          headerContentRef.current.style.transition =
            scrollPosition > 200
              ? "transform 0.3s ease-out, opacity 0.3s ease-out"
              : "transform 0.1s ease-out, opacity 0.1s ease-out";
        }
        if (newDivRef.current) {
          if (scrollPosition > 850) {
            newDivRefOnChange(true);
            const translateY = Math.min((scrollPosition - 900) / 9, 300);
            const scale = Math.max(1 - (scrollPosition - 900) / 900, 0.7);
            const opacity = Math.max(1 - (scrollPosition - 900) / 300, 0);

            newDivRef.current.style.transform = `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`;
            newDivRef.current.style.opacity = opacity;
          } else {
            newDivRef.current.style.opacity = 0;
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div style={{ height: "350vh" }}>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50px",
          zIndex: "100",
        }}
      >
        <p
          onClick={() => (window.location.href = "/privacy-policy")}
          style={{ fontSize: "14px", marginRight: "10px", cursor: "pointer" }}
        >
          Privacy Policy
        </p>
        <p
          onClick={() => (window.location.href = "/terms-conditions")}
          style={{ marginLeft: "10px", fontSize: "14px", cursor: "pointer" }}
        >
          Terms & Conditions
        </p>
      </div>
      <header
        className="header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <img
          ref={imageRef}
          src={`${imagesPath}${currentImageIndex}.webp`}
          alt={`Frame ${currentImageIndex}`}
          style={{
            width: "100%",
            height: !isSmallScreen ? "100%" : "70%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          ref={headerContentRef}
          className="header-content"
          style={{
            marginTop: isSmallScreen ? "-50px" : "0px",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            color: "#fff",
            textAlign: "center",
            width: "100%",
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
        >
          <h1 style={{ fontSize: isSmallScreen ? "16vw" : "7vw" }}>PREMVIA</h1>
          <p
            style={{
              fontSize: isSmallScreen ? "3vw" : "1.2vw",
              marginTop: isSmallScreen ? "-15px" : "-30px",
              width: "100%",
            }}
          >
            Enhance your journey with premium decorations.
          </p>
        </div>
        <div
          ref={newDivRef}
          className="header-content"
          style={{
            display: newDivRefOn ? "block" : "none",
            marginTop: isSmallScreen ? "-50px" : "0px",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            width: isSmallScreen ? "100%" : "70%",
            color: "#fff",
            textAlign: "center",
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
        >
          <h1 style={{ fontSize: isSmallScreen ? "16vw" : "7vw" }}>DISCOVER</h1>
          <p
            style={{
              fontSize: isSmallScreen ? "3vw" : "1.2vw",
              marginTop: isSmallScreen ? "-15px" : "-30px",
              width: "100%",
            }}
          >
            Discover premium decorations that bring luxury to your car and home.
            Elevate every journey and space with our exclusive, elegant designs.
          </p>
        </div>
      </header>

      <LeftDrawer sampleProducts={products} isVisible={drawersVisible} />
      <RightDrawer sampleProducts={products} isVisible={drawersVisible} />
    </div>
  );
};

export default Header;
