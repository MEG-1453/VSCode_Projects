import React from 'react'
import '../css/PlacesCards.css'

function Place({ place }) {
    const { id, title, description, link, image } = place;
    return (
        <div className='place-card'>
            <div>
                <img src={image} width={275} height={200} />
                <h4>{title}</h4>
                <h5>{description}</h5>
                <a href={link} target='_blank' rel="noopener noreferrer">Yol Haritası İçin Lütfen Tıklayın.</a>
            </div>
        </div>
    )
}

export default Place