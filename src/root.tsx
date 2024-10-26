import { Route, Routes } from 'react-router-dom'
import { PianoExample } from './pages/PianoExample'
import App from 'components/App'
import PianoComponent from 'pages/freePiano/Piano'

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="piano-example" element={<PianoExample />} />
      <Route path="chords" element={<PianoComponent />} />
      {/* <Route index element={<Home />} /> */}
      {/* <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  )
}

export default MyRouter
