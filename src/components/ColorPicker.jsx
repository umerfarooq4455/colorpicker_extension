import React, { useState, useRef } from "react";
import { ChromePicker, HuePicker } from "react-color";
import "./Colorpick.css";
import icon from "./images/Vector.svg";
import logo from "../components/images/logo.png";
import { LuCopy } from "react-icons/lu";

const ColorPicker = () => {
  const [color, setColor] = useState({
    hex: "#5D89DB",
    rgb: { r: 93, g: 137, b: 219, a: 1 },
  });
  const [recentColors, setRecentColors] = useState([]); // Store recent colors
  const [isCopied, setIsCopied] = useState(false);
  const [copiedPosition, setCopiedPosition] = useState({ x: 0, y: 0 });
  const [isHexHovered, setIsHexHovered] = useState(false);
  const [isRgbHovered, setIsRgbHovered] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);
  const colorPickerRef = useRef(null);

  // Handle picking color from EyeDropper API
  const handlePickColor = async () => {
    if ("EyeDropper" in window) {
      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open();
        setColor({ ...color, hex: result.sRGBHex });
        addRecentColor(result.sRGBHex);
        handleCopy();
      } catch (e) {
        console.log("Error:", e);
      }
    } else {
      alert("EyeDropper API is not supported in your browser");
    }
  };

  const addRecentColor = (newColor) => {
    setRecentColors((prevColors) => {
      const updatedColors = [newColor, ...prevColors]; // Add new color at the beginning
      if (updatedColors.length > 8) {
        updatedColors.pop(); // Remove the oldest color if more than 7
      }
      return updatedColors;
    });
  };
  // Handle copying color to clipboard (Hex or RGB)
  const handleCopy = (event, textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    if (event) {
      setCopiedPosition({ x: event.pageX, y: event.pageY });
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  // Handle color change from ChromePicker
  const handleColorChange = (color, event) => {
    setColor({
      hex: color.hex,
      rgb: color.rgb,
    });
    addRecentColor(color.hex);
    handleCopy(event, color.hex);
  };

  const handleHueChange = (hueColor) => {
    setColor((prevColor) => ({
      ...prevColor,
      hsl: { ...prevColor.hsl, h: hueColor.h },
      hex: hueColor.hex,
    }));
  };

  return (
    <div ref={colorPickerRef} style={{ position: "relative" }}>
      <div className="header1">
        <div className="part1head">
          <img src={logo} width={25} height={25} alt="" />
          <span className="hetext1">Color Picker Free</span>
        </div>
        <div>
          <a
            href="https://chromewebstore.google.com/detail/color-picker-free/ngaofepgagboooalodkijncfcodbpmpi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#0091ff",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "13px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0057a6")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0091ff")}
          >
            Rate Us
          </a>
        </div>
      </div>
      <div className="line"></div>

      <div className="he2">
        <span>Selected Color</span>
      </div>

      {/* Color Picker */}
      <div
        className="custom-chrome-picker colordiv"
        style={{ marginTop: "14px" }}
      >
        <ChromePicker color={color.hex} onChange={handleColorChange} />
      </div>
      {/* Hue Slider */}
      <div
        className="custom-chrome-picker colordiv"
        style={{ marginTop: "14px" }}
      >
        <HuePicker color={color.hsl} onChange={handleHueChange} />
      </div>
      {/* EyeDropper button */}
      <div style={{ marginTop: "14px" }}>
        <button
          style={{ background: color.hex }}
          className="buttondic "
          onClick={handlePickColor}
        >
          <img
            className="imageicon"
            src={icon}
            style={{ marginRight: "14px" }}
            alt="Pick color icon"
          />
          <span className="textp">Pick color</span>
        </button>
      </div>

      {/* Display HEX and RGB values with boxes */}
      <div
        className="color-info-container"
        style={{
          display: "flex",
          gap: "9px",
          marginTop: "20px",
          justifyContent: "space-between",
        }}
      >
        {/* Display HEX color with background */}
        <div style={{ flex: 1, textAlign: "start" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <strong className="hetexta">HEX </strong>
          </label>
          <div
            className="hex-color-box"
            style={{
              padding: "10px 7px 10px 7px",
              border: `3px solid #EEEEEE`,
              color: "#000",
              borderRadius: "5px",
              position: "relative",
              cursor: "pointer",
            }}
            // Hide on hover leave
            // Copy HEX value
          >
            <span
              style={{
                opacity: "70%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              {color.hex}{" "}
              <LuCopy
                onMouseEnter={() => !isCopied && setIsHexHovered(true)} // Show on hover only if not copied
                onMouseLeave={() => setIsHexHovered(false)}
                onClick={(e) => handleCopy(e, color.hex)}
              />
            </span>

            {/* Show 'Copy to clipboard' on hover only if not copied */}
            {isHexHovered && !isCopied && (
              <div
                className="copied"
                style={{
                  position: "absolute",
                  bottom: "120%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                Copy to clipboard
              </div>
            )}
          </div>
        </div>

        {/* Display RGB color with background */}
        <div style={{ flex: -1, textAlign: "start" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <strong className="hetexta">RGB</strong>
          </label>
          <div
            className="rgb-color-box"
            style={{
              padding: "10px 7px 10px 7px",
              border: `3px solid #EEEEEE`,
              color: "#000",
              borderRadius: "5px",
              position: "relative",
              cursor: "pointer",
            }}
            // Copy RGB value
          >
            <span
              style={{
                opacity: "70%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              rgba({color.rgb.r}, {color.rgb.g}, {color.rgb.b}, {color.rgb.a}){" "}
              <LuCopy
                onMouseEnter={() => !isCopied && setIsRgbHovered(true)} // Show on hover only if not copied
                onMouseLeave={() => setIsRgbHovered(false)} // Hide on hover leave
                onClick={(e) =>
                  handleCopy(
                    e,
                    `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                  )
                }
              />
            </span>
            {/* Show 'Copy to clipboard' on hover only if not copied */}
            {isRgbHovered && !isCopied && (
              <div
                className="copied"
                style={{
                  position: "absolute",
                  bottom: "120%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                Copy to clipboard
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copied to clipboard notification */}
      {isCopied && (
        <div
          className="copied"
          style={{
            position: "absolute",
            top: `${copiedPosition.y - colorPickerRef.current?.offsetTop}px`,
            left: `${copiedPosition.x - colorPickerRef.current?.offsetLeft}px`,
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            borderRadius: "5px",
            pointerEvents: "none",
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          Copied
        </div>
      )}

      <div className="he2" style={{ marginTop: "10px" }}>
        <span>Recent Colors</span>
      </div>

      {/* first recent color map and show into the colorbox backgourn color  */}
      <div
        className="he2 recentecolors"
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px",
          marginBottom: "5px",
        }}
      >
        {recentColors.map((recentColor, index) => (
          <div
            key={index}
            className="colorbox"
            style={{
              backgroundColor: recentColor,
              width: "29px",
              height: "29px",
              border: "1px solid #ccc",
              cursor: "pointer",
              position: "relative", // For the popup
            }}
            onClick={() => setColor({ ...color, hex: recentColor })} // Apply recent color to ChromePicker
            onMouseEnter={() => setHoveredColor(recentColor)} // Show popup with hovered color
            onMouseLeave={() => setHoveredColor(null)} // Hide popup on mouse leave
          >
            {/* Show a popup with color on hover */}
            {hoveredColor === recentColor && (
              <div
                style={{
                  position: "absolute",
                  top: "-35px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "5px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {recentColor}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
