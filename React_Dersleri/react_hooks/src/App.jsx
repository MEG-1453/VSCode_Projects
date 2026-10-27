import React, { useState, useEffect } from 'react'

function App() {

  const [firstName, setFirstname] = useState('Muhammed Emin');
  const [lastName, setLasttname] = useState("Genç");
  const originalName = "Muhammet Emin";

  const handleChange = () => {
    setFirstname("MEG")
  }

  // 1. ADIM: Sabit Veri (Mock Data)
  const teamMembers = [
    { name: "Ahmet", role: "Siber Güvenlik" },
    { name: "Zeynep", role: "Yapay Zeka" },
    { name: "Mehmet", role: "Gömülü Sistemler" }
  ];


  // ---------------------------------------------------------------
  //        YORUM SATIRINA ALINDI
  // ---------------------------------------------------------------

  // --- 3. BÖLÜM: DİNAMİK LİSTE (useState İLE) ---
  // const [tasks, setTasks] = useState([ ... ]);

  // ---------------------------------------------------------------
  //        YORUM SATIRINA ALINDI (ALT KOD BLOĞU ALTERNATİFİ)
  // ---------------------------------------------------------------

  // YENİ ÖZELLİK: Görevlere 'isCompleted' (Tamamlandı mı?) boolean değeri ekledik.
  const initialTasks = [
    { id: 1, text: "React Öğren", isCompleted: false },
    { id: 2, text: "Spring Boot Projesi", isCompleted: true } // Örnek olarak biri yapılmış olsun
  ];

  const [tasks, setTasks] = useState(initialTasks);

  // YENİ FONKSİYON 1: Görevi Silme (DELETE Logic)
  // Mantık: "ID'si benim tıkladığıma EŞİT OLMAYANLARI filtrele ve yeni liste yap."
  const deleteTask = (idToDelete) => {
    // filter: SİHA'nın hedefi vurup yok etmesi gibidir.
    const filteredTasks = tasks.filter(task => task.id !== idToDelete);
    setTasks(filteredTasks);
  }

  // YENİ FONKSİYON 2: Görevi Tamamlama/Geri Alma (UPDATE Logic)
  // Mantık: "Listeyi gez, ID'si eşleşen görevi bul, 'isCompleted' değerini tersine çevir (!)"
  const toggleTaskCompletion = (idToToggle) => {
    // map: SİHA'nın tüm araziyi tarayıp sadece hedef noktayı değiştirmesi gibidir.
    const updatedTasks = tasks.map(task => {
      if (task.id === idToToggle) {
        // Spread Operator (...) ile eski verileri koru, isCompleted'ı değiştir.
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task; // ID eşleşmezse dokunmadan geri ver
    });
    setTasks(updatedTasks);
  }

  // Listeye yeni eleman ekleyen fonksiyon (GÜNCELLENDİ)
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      text: "Yeni Görev #" + (tasks.length + 1),
      isCompleted: false // Yeni görev varsayılan olarak yapılmamıştır
    };
    setTasks([...tasks, newTask]);
  }

  // ----------------------------------------------------------------
  // --- BURASI YENİ EKLENEN useEffect ALANI ---
  // ----------------------------------------------------------------

  // 1. DURUM: Her Render Edildiğinde Çalışır
  useEffect(() => {
    console.log("🟢 1. DURUM: Render oldu.");
  });

  // 2. DURUM: Sadece İlk Renderda (Mount) Çalışır
  useEffect(() => {
    console.log("🟡 2. DURUM: Mount oldu.");
  }, []);

  // 3. DURUM: Bir İstek Olduğunda Çalışır
  useEffect(() => {
    console.log("🔵 3. DURUM: İsim değişti: " + firstName);
  }, [firstName]);

  // 4. DURUM: İki İstek Olduğunda Çalışır
  useEffect(() => {
    console.log("🟣 4. DURUM: İsim veya Görev Listesi güncellendi.");
  }, [firstName, tasks]);

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const clearTasks = () => {
    setTasks(initialTasks);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>

      {/* ÜST KISIM */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2>{firstName} {lastName}</h2>
        <hr />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '5px', padding: '5px' }}>
          <button onClick={() => setFirstname("MEG-1453")} style={btnStyle}>Change Name</button>
          <button onClick={handleChange} style={btnStyle}>Random Name</button>
          <button onClick={() => setFirstname(originalName)} style={btnStyle}>Reset Name</button>
        </div>
      </div>

      {/* ALT KISIM */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>

        {/* SOL KUTU: SABİT LİSTE */}
        <div style={boxStyle}>
          <h3 style={{ borderBottom: '2px solid gray' }}>Sabit Kadro</h3>
          {teamMembers.map((member, index) => (
            <div key={index} style={itemStyle}>
              <span style={{ fontWeight: 'bold' }}>{member.name}</span>
              <span style={{ color: 'orange', fontSize: '12px' }}>{member.role}</span>
            </div>
          ))}
        </div>

        {/* SAĞ KUTU: DİNAMİK LİSTE (GÜNCELLENDİ) */}
        <div style={{ ...boxStyle, borderColor: 'gray' }}>
          <h3 style={{ borderBottom: '2px solid cyan' }}>Görevler (State)</h3>

          <div style={{ marginBottom: '10px' }}>
            <button onClick={addTask} style={{ ...btnStyle, background: 'lightgreen', color: 'black' }}>+ Ekle</button>
            <button onClick={clearTasks} style={{ ...btnStyle, background: 'red', color: 'white', marginLeft: '5px' }}>Sıfırla</button>
          </div>

          {tasks.map((task) => (
            <div key={task.id} style={{ ...itemStyle, borderLeft: task.isCompleted ? '4px solid green' : '4px solid cyan' }}>

              {/* GÖREV METNİ (Tıklanabilir) */}
              {/* Ternary Operator (? :) ile stile karar veriyoruz: Tamamlandıysa üstünü çiz */}
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                style={{
                  cursor: 'pointer',
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  color: task.isCompleted ? 'gray' : 'white'
                }}
              >
                {task.text}
              </span>

              {/* SİLME BUTONU (X) */}
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: 'transparent',
                  border: '1px solid red',
                  color: 'red',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  width: '24px',
                  height: '24px'
                }}
              >
                X
              </button>

            </div>
          ))}

          {/* Hata düzeltildi: length 2 değil 0 olmalı */}
          {tasks.length === 0 && <p style={{ color: 'gray' }}>Hiç görev kalmadı!</p>}
        </div>

      </div>
    </div>
  )
}

const btnStyle = {
  padding: '8px 12px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  background: '#e0e0e0'
};

const boxStyle = {
  border: '2px solid gray',
  padding: '20px',
  borderRadius: '10px',
  width: '300px',
  background: '#2b2b2b',
  color: 'white'
};

const itemStyle = {
  background: '#444',
  margin: '8px 0',
  padding: '10px',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default App