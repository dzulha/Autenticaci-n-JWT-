import { useState } from 'react';
import './TrafficLight.css';

export default function TrafficLight() {
  const [color, setColor] = useState("red");
  const [colors, setColors] = useState(["red", "yellow", "green"]);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="traffic-container">
        {colors.map((c) => (
          <div
            key={c}
            className={`light ${color === c ? 'active' : ''}`}
            style={{ backgroundColor: c, "--color": c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>

      <button onClick={() => {
        const idx = colors.indexOf(color);
        setColor(colors[(idx + 1) % colors.length]);
      }}>
        Cambiar color
      </button>

      <button onClick={() => {
        if (!colors.includes("purple")) {
          setColors([...colors, "purple"]);
        }
      }}>
        Agregar púrpura
      </button>
    </div>
  );
}
