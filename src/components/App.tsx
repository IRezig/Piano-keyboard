import { PianoExample } from 'pages/PianoExample'
import PianoComponent from './Piano'

const App = () => {
  return (
    <div className="grid content-center gap-4 bg-pink-200 p-4">
      <main className={'mx-auto my-20 max-w-4xl p-4'}>
        <div className="mb-16 flex items-end">
          <h1 className="text-6xl font-bold">Piano</h1>
        </div>
        <div className="flex flex-col gap-8">
          <PianoComponent />
          <PianoExample />
        </div>
      </main>
    </div>
  )
}

export default App
