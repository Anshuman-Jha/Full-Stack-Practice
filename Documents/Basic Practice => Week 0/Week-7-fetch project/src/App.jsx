import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { lazy } from 'react';
const Landing = lazy(() => import('./Pages/Landing'))
const Dashboard = lazy(() => import('./Pages/Dashboard'))

// Making Lazy Loading and storing in Dashborad/Lnding component so that
// when I render <Dashboard /> Component then only it's Code is Given
// Basically When Use Visits Landing/Dashboard Page then Particlarly  only it's Code loads
function App() {
  const [count, setCount] = useState(0);

  //SUSPENSE API=>Asynchronous Component Fetching,Async Data Fetching
  return (
    <BrowserRouter>
      {/* useNavigate() Always Should be Declared Inside BrowserRouter Component 
  // Make sure don't do hard reload from BackEnd
  // Changing The Route & Keeping The Same Client Bundle => Switch From One page to another
  */}

      <AppBar />

      <Routes> {/* Suspense API Wraps <landing/> <Dashboard /> inside <Suspense /> */}
        <Route path="/dashboard" element={<Suspense fallback={"...loading"}> <Dashboard /> </Suspense>} />
        <Route path="/" element={<Susepnse fallback={"...loading"}> <Landing /> </Susepnse>} />
      </Routes>

    </BrowserRouter>
  )

}
// Code Which Have Written Complete Bundle Comes Back => index.js ...
//If User only Visit Landing Page But it Gets Complete code/Dashoard as well
function AppBar() {
  // AppBar is Inside <BrowserRouter /> => navigate Hooks is Alo Inisde it 
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => {
        navigate("/")
      }} > Home </button>
      <button onClick={() => {
        navigate("/dashboard")
      }} > Dashboard </button>
    </div>
  )

}


export default App
