import { useState } from 'react'
import TicTacToe from './TicTacToe'
import Calculator from './Calculator'

function App() {
  const [activeApp, setActiveApp] = useState(null)

  return (
    <div>
      <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #ccc' }}>
        <h1>SPA Menü</h1>
        <nav>
          <button onClick={() => setActiveApp(null)} style={{ marginRight: '10px' }}>
            Főoldal
          </button>
          <button onClick={() => setActiveApp('tictactoe')} style={{ marginRight: '10px' }}>
            Amőba (Tic-Tac-Toe)
          </button>
          <button onClick={() => setActiveApp('calculator')}>
            Számológép
          </button>
        </nav>
      </header>

      <main>
        
        {activeApp === null && <h2>Üdvözöllek! Válassz egy játékot a fenti menüből.</h2>}
        
        {activeApp === 'tictactoe' && <TicTacToe />}
        
        {activeApp === 'calculator' && <Calculator />}
      </main>
    </div>
  )
}

export default App
