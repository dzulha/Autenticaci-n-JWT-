import React, { useState, useEffect, useRef } from 'react';
import SecondsCounter from './components/SecondsCounter';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [initialValue, setInitialValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [isCounting, setIsCounting] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);

  const intervalRef = useRef(null);



{/*=========================COUNT================================*/}
  useEffect(() => {
    if (isCounting) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (isCountdown) {
            if (prev <= 0) {
              clearInterval(intervalRef.current);
              setIsCounting(false);
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isCounting, isCountdown]);


{/*=========================ALERT================================*/}

  useEffect(() => {
    if (targetValue && parseInt(seconds) === parseInt(targetValue)) {
      alert(`¡Has alcanzado el tiempo objetivo de ${targetValue} segundos!`);
    }
  }, [seconds, targetValue]);

{/*=========================CUANTA REGRESIVE================================*/}


  const startCounter = () => {
    const value = parseInt(initialValue);
    if (isNaN(value) || value < 0) return;

    setSeconds(value);
    setIsCountdown(true);
    setIsCounting(true);
  };

{/*=========================TIME================================*/}


  const startTimer = () => {
    setIsCountdown(false);
    setSeconds(0);
    setIsCounting(true);
  };

 {/*=========================PAUSE================================*/}
 
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsCounting(false);
  };

  {/*=========================RESTART================================*/}

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setInitialValue('');
    setTargetValue('');
    setIsCounting(false);
    setIsCountdown(false);
  };

  return (
    <div className="App">
      <h1>Contador de Segundos</h1>

      <div className="inputs">
        <input
          type="number"
          placeholder="Cuenta regresiva desde..."
          value={initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Alerta al llegar a..."
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button onClick={startTimer}>Iniciar normal</button>
        <button onClick={startCounter}>Iniciar regresiva</button>
        <button onClick={pauseTimer}>Pausar</button>
        <button onClick={resetTimer}>Reiniciar</button>
      </div>

      <SecondsCounter seconds={seconds} />
    </div>
  );
}

export default App;
