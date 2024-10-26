'use client'

import { useState } from 'react'
import { CacheStorage, Reverb, SplendidGrandPiano } from 'smplr'
import { PianoKeyboard } from './PianoKeyboard'
import { getAudioContext } from './audio-context'
import { LoadWithStatus, useStatus } from './useStatus'

let reverb: Reverb | undefined
let storage: CacheStorage | undefined

export function PianoExample({ className }: { className?: string }) {
  const [piano, setPiano] = useState<SplendidGrandPiano | undefined>(undefined)
  const [status, setStatus] = useStatus()
  const [reverbMix, setReverbMix] = useState(0.0)
  const [volume, setVolume] = useState(100)

  function loadPiano() {
    if (piano) return
    setStatus('loading')
    const context = getAudioContext()
    reverb ??= new Reverb(context)
    storage ??= new CacheStorage()
    const newPiano = new SplendidGrandPiano(context, { volume, storage })
    newPiano.output.addEffect('reverb', reverb, reverbMix)
    setPiano(newPiano)
    newPiano.load.then(() => {
      setStatus('ready')
    })
  }

  return (
    <div className={className}>
      <div className="mb-2 flex items-end gap-2">
        <h1 className="text-3xl">Piano</h1>
        <LoadWithStatus status={status} onClick={loadPiano} />
      </div>
      <div></div>
      <div className={status !== 'ready' ? 'opacity-30' : ''}>
        <div className="no-select mb-2 flex gap-4">
          <div>Volume:</div>
          <input
            type="range"
            min={0}
            max={128}
            step={1}
            value={volume}
            onChange={(e) => {
              const volume = e.target.valueAsNumber
              piano?.output.setVolume(volume)
              setVolume(volume)
            }}
          />
          <div>Reverb:</div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={reverbMix}
            onChange={(e) => {
              const mix = e.target.valueAsNumber
              piano?.output.sendEffect('reverb', mix)
              setReverbMix(mix)
            }}
          />
        </div>
        <PianoKeyboard
          borderColor="border-rose-400"
          onPress={(note) => {
            if (!piano) return
            note.time = (note.time ?? 0) + piano.context.currentTime
            piano.start(note)
          }}
          onRelease={(midi) => {
            piano?.stop({ stopId: midi })
          }}
        />
      </div>
    </div>
  )
}
