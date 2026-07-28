import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Wrapper from './Wrapper.jsx';
import Todo from './6.2/Real-Todo.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Todo />
  </>
)
