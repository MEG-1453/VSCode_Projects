import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './App.css'; // Aşağıdaki CSS'i buna yapıştıracaksın

const App = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const hookRef = useRef();
  const ropeRef = useRef();
  const charRef = useRef(); // Karakter (Çocuk)
  const descContainerRef = useRef();
  
  // Animasyon Senaryosu
  const tl = useRef();

  useLayoutEffect(() => {
    // GSAP Context: React ile çakışmayı önler
    let ctx = gsap.context(() => {
      
      tl.current = gsap.timeline({ delay: 0.5 });

      // 1. SAHNE: Karakter ve Kanca Gelir
      tl.current
        .from(charRef.current, { x: -200, duration: 1, ease: "back.out(1.7)" })
        .to(hookRef.current, { 
          x: 600, // Kancayı başlığa fırlat
          y: -50,
          rotation: 180,
          duration: 0.8, 
          ease: "power4.out" 
        }, "-=0.5")
        // İpin kancayı takip etmesi (Basit scale hilesi)
        .fromTo(ropeRef.current, 
          { width: 0 }, 
          { width: 620, duration: 0.8, ease: "power4.out" }, "<"
        );

      // 2. SAHNE: Başlığı Çekme ve Sarsılma
      tl.current
        .to(titleRef.current, { 
          x: -50, // Başlık sola çekilir
          rotation: -5,
          duration: 0.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 3 // 3 kere titret
        })
        .to(titleRef.current, { x: 0, rotation: 0, duration: 0.5 }); // Yerine otursun

      // 3. SAHNE: Harflerin "Kaçışı"
      // Açıklama harflerini seç
      const letters = gsap.utils.toArray(".desc-char");
      
      tl.current.fromTo(letters, 
        { 
          y: -150, // Başlığın arkasında yukarıda başlarlar
          x: 0,
          opacity: 0,
          scale: 0.5,
        },
        {
          y: 0, // Aşağıya düşerler
          x: (i) => (i % 2 === 0 ? 10 : -10), // Hafif sağa sola dağılarak
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: {
            amount: 1, // Hepsi 1 saniye içinde dökülsün
            from: "random" // Rastgele sırayla düşsünler (kaotik etki)
          },
          ease: "bounce.out" // Top gibi zıplayarak düşsünler
        }, "-=1" // Başlık titrerken başlasın
      );

      // Harfleri hizaya sok (Dağınıklığı topla)
      tl.current.to(letters, {
        x: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Kancayı geri çek
      tl.current.to([hookRef.current, ropeRef.current], {
        x: -50, // Geri git
        width: 0,
        opacity: 0,
        duration: 0.5,
        delay: 1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Metni harflere bölen yardımcı fonksiyon
  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="desc-char" style={{ display: 'inline-block', minWidth: char === " " ? "10px" : "auto" }}>
        {char}
      </span>
    ));
  };

  return (
    <div className="main-container" ref={containerRef}>
      
      {/* 1. Kanca Atan Çocuk (Temsili) */}
      <div ref={charRef} className="character">
        🧒
      </div>

      {/* 2. İp ve Kanca */}
      <div ref={ropeRef} className="rope"></div>
      <div ref={hookRef} className="hook">🪝</div>

      {/* 3. Ana Başlık (Z-Index ile harflerin önünde durmalı) */}
      <h1 ref={titleRef} className="main-title">
        PORTFOLIO
      </h1>

      {/* 4. Dökülen Harfler (Açıklama) */}
      <div ref={descContainerRef} className="description-area">
        {splitText("Merhaba, ben modern web siteleri tasarlayan bir geliştiriciyim.")}
      </div>

    </div>
  );
};

export default App;