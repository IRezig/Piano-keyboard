import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import PianoExample from 'pages/PianoExample'
import PianoComponent from 'pages/Piano/Piano'
import Home from 'pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="piano-example" element={<PianoComponent />} />
        <Route path="chords" element={<PianoExample />} />
      </Route>
    </Routes>
  )
}

export default App
