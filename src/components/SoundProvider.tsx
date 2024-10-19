import Soundfont, { InstrumentName, Player } from 'soundfont-player'
import { useState, useEffect } from 'react'

interface SoundfontProviderTypes {
  instrumentName: InstrumentName
  hostname: string
  format?: string
  soundfont?: string
  audioContext: AudioContext
  render: (props) => JSX.Element
}
const SoundfontProvider = (props: SoundfontProviderTypes) => {
  const {
    instrumentName = 'acoustic_grand_piano',
    hostname,
    format = 'mp3',
    soundfont = 'MusyngKite',
    audioContext,
    render
  } = props

  const [instrument, setInstrument] = useState<Player | null>(null)
  const [activeAudioNodes, setActiveAudioNodes] = useState<{
    [key: number]: Player | null
  }>({})

  const loadInstrument = (instrumentName: InstrumentName) => {
    // Re-trigger loading state
    setInstrument(null)
    Soundfont.instrument(audioContext, instrumentName, {
      format: format,
      soundfont: soundfont,
      nameToUrl: (name: string, soundfont: string, format: string) => {
        return `${hostname}/${soundfont}/${name}-${format}.js`
      }
    }).then((instrument) => {
      setInstrument(instrument)
    })
  }

  useEffect(() => {
    loadInstrument(instrumentName)
  }, [])

  useEffect(() => {
    if (props.instrumentName !== instrumentName) {
      loadInstrument(instrumentName)
    }
  }, [props.instrumentName])

  const playNote = (midiNumber: number) => {
    audioContext.resume().then(() => {
      const audioNode = instrument && instrument.play(midiNumber)
      setActiveAudioNodes({
        ...activeAudioNodes,
        [midiNumber]: audioNode
      })
    })
  }

  const stopNote = (midiNumber: number) => {
    audioContext.resume().then(() => {
      if (!activeAudioNodes[midiNumber]) {
        return
      }
      const audioNode = activeAudioNodes[midiNumber]
      audioNode.stop()
      setActiveAudioNodes({
        ...activeAudioNodes,
        [midiNumber]: null
      })
    })
  }

  // Clear any residual notes that don't get called with stopNote
  const stopAllNotes = () => {
    audioContext.resume().then(() => {
      const activeAudioNodes = Object.values(activeAudioNodes)
      activeAudioNodes.forEach((node: Player | null) => {
        if (node) {
          node.stop()
        }
      })
      setActiveAudioNodes({})
    })
  }

  return render({
    isLoading: !instrument,
    playNote: playNote,
    stopNote: stopNote,
    stopAllNotes: stopAllNotes
  })
}

export default SoundfontProvider
