import { PianoExample } from 'pages/PianoExample'
import PianoComponent from './Piano'

const App = () => {
  return (
    <div className="grid content-center gap-4">
      <PianoComponent />
      <div className="flex flex-col gap-8">
        <PianoExample />
      </div>
    </div>
  )
}

export default App
