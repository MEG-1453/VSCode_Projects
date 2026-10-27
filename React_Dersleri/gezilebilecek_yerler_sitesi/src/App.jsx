import React, { useState } from 'react'
import Header from './components/Header'
import { places } from './Data'
import Place from './components/Place'
import './App.css' // CSS dosyanı import etmeyi unutma

function App() {
  // Arama kelimesini tutacak state (değişken)
  const [query, setQuery] = useState("");

  // FİLTRELEME MANTIĞI:
  // Eğer query boşsa hepsini göster, değilse başlığa göre filtrele
  const filteredPlaces = places.filter((place) =>
    place.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Header'a setQuery fonksiyonunu yolluyoruz ki oradan bu state'i güncelleyebilelim */}
      <Header setSearch={setQuery} />

      {/* Container ile sarmaladık */}
      <div className="main-container">
        {
          filteredPlaces.map((place) => (
            <Place key={place.id} place={place} />
          ))
        }
      </div>
    </div>
  )
}

export default App