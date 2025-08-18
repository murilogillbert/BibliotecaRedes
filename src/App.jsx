import { Routes, Route } from 'react-router-dom'
import Navegacao from './components/Navegacao'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import Curator from './pages/Curator'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navegacao />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginregister" element={<LoginRegister />} />
          <Route path="/curator" element={<Curator />} />
        </Routes>
      </main>
    </div>
  )
}

export default App