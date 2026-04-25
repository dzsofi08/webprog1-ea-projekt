import { useState } from 'react';

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch (error) {
        setInput("Hiba");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div style={{ width: '220px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h2>Számológép</h2>
      <div style={{
        height: '40px', backgroundColor: '#eee', marginBottom: '10px',
        textAlign: 'right', padding: '5px', fontSize: '20px', borderRadius: '3px'
      }}>
        {input || "0"}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
          >{btn}</button>
        ))}
      </div>
    </div>
  );
}