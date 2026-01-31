import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cities from './components/Cities'
import WeatherDetails from './components/WeatherDetails'
import Settings from './components/Settings'

function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/weather-details/:cityName?" element={<WeatherDetails />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </main>
      </div>
    </>
  )
}

export default App
