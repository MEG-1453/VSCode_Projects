import React from 'react'

function MyContainer({children}) {
  return (
    <div style={{  
        margin: '20px', 
        padding: '10px',
        textAlign: 'center' // 1. Başlığı ve çizgiyi metin olarak ortalar
    }}>
      <div>
        <h3>Container Başlığı (Component Çalışıyor)</h3>
        {/* 2. Çizgiyi de yatayda ortalamak için margin: auto kullanılır */}
        <hr style={{ width: '300px', margin: '10px auto' }} /> 
      </div>
      
      {/* 3. ASIL DÜZELTME: Ürünleri (children) kapsayan div'e flex özellikleri veriyoruz */}
      <div style={{ 
        /*
          display: 'flex', 
          flexDirection: 'column', // Alt alta dizilmeleri için
          alignItems: 'center',    // Yatayda ortalamak için
          gap: '15px',             // Kartların arasına boşluk koymak için
          marginTop: '20px'        // Başlık ile ürünler arasına boşluk
        */
        display: 'flex', 
        flexDirection: 'row',      // 1. DEĞİŞİKLİK: 'column' yerine 'row' yapıyoruz
        justifyContent: 'center',  // 2. EKLEME: Yan yana dizilenleri yatayda ortalar
        flexWrap: 'wrap',          // 3. EKLEME: Sığmazlarsa alt satıra geçsin (Önemli!)
        gap: '15px',
        marginTop: '20px'

      }}>
        {children}
      </div>
    </div>
  )
}

export default MyContainer