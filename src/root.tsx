import { Route, Routes } from 'react-router-dom'
import { PianoExample } from './pages/PianoExample'
import Layout from 'components/Layout'
import PianoComponent from 'pages/Piano/Piano'
import Home from 'pages/Home'

const MyRouter = () => {
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

export default MyRouter
