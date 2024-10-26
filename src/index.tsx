import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MyRouter from 'root'

import 'tailwindcss/tailwind.css'
import '../gloabals.css'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MyRouter />
    </BrowserRouter>
  </StrictMode>
)
