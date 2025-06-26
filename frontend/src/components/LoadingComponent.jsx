import React from "react";
import sigortamLogo from "@images/sigortamLogo.svg";

// Background Overlay (Sabitle)
const LoadingOverlay = ({ backgroundColor, children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor || "rgba(0, 0, 0, 0.4)", // Lighter background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)", // Safari desteği
      }}
    >
      {children}
    </div>
  );
};

// Spinner Container (Büyütülmüş)
const SpinnerContainer = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "600px",
        height: "600px",
      }}
    >
      <OuterRing />
      <MiddleRing />
      <InnerRing />
      <LogoWrapper />
    </div>
  );
};

// Spinner Ring Base
const SpinnerRing = ({
  width,
  height,
  borderTopColor,
  borderBottomColor,
  animationDuration,
  animationDirection,
}) => {
  const ringStyle = {
    position: "absolute",
    borderRadius: "50%",
    border: "8px solid transparent",
    width,
    height,
    borderTopColor,
    borderBottomColor,
    animation: `spin ${animationDuration} linear infinite ${animationDirection}`,
    willChange: "transform",
  };

  return <div style={ringStyle}></div>;
};

// Outer Ring with Color and Faster Animation
const OuterRing = () => {
  return (
    <SpinnerRing
      width="380px"
      height="380px"
      borderTopColor="#009fe3"
      borderBottomColor="#009fe3"
      animationDuration="1.2s"
      animationDirection="normal"
    />
  );
};

// Middle Ring with Reverse Spin and New Color
const MiddleRing = () => {
  return (
    <SpinnerRing
      width="340px"
      height="340px"
      borderTopColor="#8ec89a"
      borderBottomColor="#8ec89a"
      animationDuration="1.8s"
      animationDirection="reverse"
    />
  );
};

// Inner Ring with Reverse Spin and New Color
const InnerRing = () => {
  return (
    <SpinnerRing
      width="300px"
      height="300px"
      borderTopColor="#ffed00"
      borderBottomColor="#ffed00"
      animationDuration="2.4s"
      animationDirection="reverse"
    />
  );
};

// Logo Wrapper (Logo İçin Alanı Büyütüyoruz)
const LogoWrapper = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "270px",
        height: "270px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        backgroundColor: "rgba(192, 192, 192, 0.8)", // Light grey/silver background
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <Logo />
    </div>
  );
};

// Logo Image (Büyük ve Belirgin)
const Logo = () => {
  return (
    <img
      src={sigortamLogo}
      alt="Loading Logo"
      style={{
        width: "230px",
        height: "230px",
        objectFit: "contain",
        zIndex: 30, // Keep the logo on top of other elements
      }}
      onError={(e) => {
        e.target.src = ""; // Placeholder image if logo fails to load
      }}
    />
  );
};

// Loading Text
const LoadingText = ({ textColor, text }) => {
  return (
    <p
      style={{
        color: textColor || "white",
        fontSize: "18px",
        marginTop: "30px", // More space between spinner and text
        textAlign: "center",
      }}
    >
      {text}
    </p>
  );
};

// Main Loading Component
const MainLoadingComponent = ({
  logo = sigortamLogo,
  text = "Loading...",
  backgroundColor = "rgba(0, 0, 0, 0.4)", // Lighter background color
  textColor = "white",
}) => {
  return (
    <LoadingOverlay backgroundColor={backgroundColor}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SpinnerContainer />
      </div>
    </LoadingOverlay>
  );
};

export default MainLoadingComponent;
