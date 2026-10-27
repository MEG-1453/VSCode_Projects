import React from 'react'
import '../css/Header.css' 

function Header({setSearch}) {
    return (
        <div>
            <div className='header'>
                <div style={{ fontWeight: 'bold' }}>Travel Guide
                    <span>
                        &nbsp;&nbsp;(MEG)
                    </span>
                </div>
                <div className="header-right">
                    <input
                        type="text"
                        placeholder="Bir yer ara..."
                        className="search-input"
                        onChange={(e) => setSearch(e.target.value)} // Her harf girildiğinde çalışır
                    />
                    <button className="btn-profile">Profil</button>
                </div>
            </div>
        </div>
    )
}

export default Header