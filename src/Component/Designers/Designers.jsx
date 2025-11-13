import React from 'react'
import './Designers.css'

const Designers = () => {
  const designers = [
    'VERSACE',
    'GUCCI',
    'ZARA',
    'PRADA',
    'Calvin Klein',
    'Louis Vuitton'
  ];

  return (
    <div className='designers-container'>
      <div className='designers-track'>
        <div className='designers'>
          {designers.map((designer, index) => (
            <p key={index}>{designer}</p>
          ))}
          {/* Duplicate the designers for seamless looping */}
          {designers.map((designer, index) => (
            <p key={`duplicate-${index}`}>{designer}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Designers