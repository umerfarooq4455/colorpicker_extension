import React, { useState, useRef } from "react";
import { ChromePicker } from "react-color";
import "./Colorpick.css";
import icon from "./images/Vector.svg";

const ColorPicker = () => {
  const [color, setColor] = useState({
    hex: "#7DDF20",
    rgb: { r: 125, g: 223, b: 32, a: 1 },
  });
  const [isCopied, setIsCopied] = useState(false);
  const [copiedPosition, setCopiedPosition] = useState({ x: 0, y: 0 });
  const colorPickerRef = useRef(null);

  // Handle picking color from EyeDropper API
  const handlePickColor = async () => {
    if ("EyeDropper" in window) {
      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open();
        setColor({ ...color, hex: result.sRGBHex });
        handleCopy();
      } catch (e) {
        console.log("Error:", e);
      }
    } else {
      alert("EyeDropper API is not supported in your browser");
    }
  };

  // Handle copying color to clipboard
  const handleCopy = (event) => {
    navigator.clipboard.writeText(color.hex);
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
    handleCopy(event);
  };

  return (
    <div ref={colorPickerRef} style={{ position: "relative" }}>
      {/* Color Picker */}
      <div className="custom-chrome-picker colordiv">
        <ChromePicker color={color.hex} onChange={handleColorChange} />
      </div>

      {/* EyeDropper button */}
      <div>
        <button
          style={{ background: color.hex }}
          className="buttondic"
          onClick={handlePickColor}
        >
          <img className="imageicon" src={icon} alt="Pick color icon" />
          <span className="textp">Pick color</span>
        </button>
      </div>

      {/* Display HEX and RGB values with boxes */}
      <div
        className="color-info-container"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
        {/* Display HEX color with background */}
        <div style={{ flex: 1, textAlign: "start" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <strong>HEX</strong>
          </label>
          <div
            className="hex-color-box"
            style={{
              padding: "10px",
              border: `3px solid #EEEEEE`,
              color: "#000",
              borderRadius: "5px",
            }}
          >
            {color.hex}
          </div>
        </div>

        {/* Display RGB color with background */}
        <div style={{ flex: -1, textAlign: "start" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <strong>RGB</strong>
          </label>
          <div
            className="rgb-color-box"
            style={{
              padding: "10px",
              border: `3px solid #EEEEEE`,
              color: "#000",
              borderRadius: "5px",
            }}
          >
            ({color.rgb.r}, {color.rgb.g}, {color.rgb.b}, {color.rgb.a})
          </div>
        </div>
      </div>

      {/* Copied to clipboard notification */}
      {isCopied && (
        <div
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
    </div>
  );
};

export default ColorPicker;
