import { Piano, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css'
import SoundfontProvider from './SoundProvider'

const PianoComponent = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net'

  const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f4')
  }

  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <Piano
          noteRange={noteRange}
          width={1000}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading}
        />
      )}
    />
  )
}

export default PianoComponent