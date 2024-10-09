// import React, { useEffect } from "react";

// const GoogleAd = () => {
//   useEffect(() => {
//     // Create the script element to load the AdSense script
//     const script = document.createElement("script");
//     script.src =
//       "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2139098230646399";
//     script.async = true;
//     script.crossOrigin = "anonymous";
//     document.body.appendChild(script);

//     // Initialize ads after the script is loaded
//     script.onload = () => {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     };

//     // Clean up the script when the component unmounts
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div>
//       <ins
//         class="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client="ca-pub-2139098230646399"
//         data-ad-slot="7136464070"
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       ></ins>
//     </div>
//   );
// };

// export default GoogleAd;



