import React from 'react';
import { FaClock } from 'react-icons/fa';

function SecondsCounter({ seconds }) {
  // Convierte los segundos a dígitos individuales
  const digits = String(seconds).padStart(6, '0').split('');

  return (
    <div className="counter-container">
      <div className="digit"><FaClock /></div>
      {digits.map((digit, index) => (
        <div key={index} className="digit">{digit}</div>
      ))}
    </div>
  );
}

export default SecondsCounter;
