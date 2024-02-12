"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");

  const hoverStyle = {
    maxWidth: '150px',
    marginBottom: '20px',
  };
  const mobileHoverStyle = {
    maxWidth: '80px',
    marginBottom: '10px',
  };

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod|macintosh/.test(userAgent);

    if (isAppleDevice) {
      setStoreUrl("https://apps.apple.com/us/app/edith-space-assistant/id6450296741");
    } else {
      setStoreUrl("https://play.google.com/store/apps/details?id=com.openai.chatgpt&hl=en_US");
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Consider below 768px as mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageStyle = isMobile ? mobileHoverStyle : hoverStyle;

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '20px', paddingBottom: '100px', height: 'calc(100vh - 20px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <main className="p-4" style={{ height: '100vh' }}>
          <div style={{ position: 'relative', zIndex: 1, paddingBottom: '40px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-50px' }}>
            <a href={storeUrl}>
              <img src="/book.png" alt="Book" style={imageStyle} />
            </a>
            <h1 style={{ fontSize: isMobile ? '16px' : '48px', fontWeight: 'bold', color: 'white' }}>
            Stark Industries
            </h1>
            <h1 style={{ fontSize: isMobile ? '16px' : '48px', fontWeight: 'bold', color: 'white' }}>
            Changing the world for a better future.
            </h1>
              <footer style={{ textAlign: 'center', marginTop: '0px', padding: '10px', fontSize: '14px', color: 'white' }}>
<p>Copyright ⓒ Stark Industries. All Rights Reserved</p>
<p>Eunseo Seol | 39–26, Pungyeong-ro 170beon-gil, Gwangsan-gu, Gwangju, Republic of Korea | 248–27–01947 </p>
</footer>
          </div>


              
        </main>
      </div>


              
    </div>
  );
}
