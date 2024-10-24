'use client'

import { useState } from 'react'
import { Note, Range, Scale } from 'tonal'
const buildOct = (base: number) =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => n + base)

const isBlack = (midi: number) => [1, 3, 6, 8, 10].includes(midi % 12)

type PianoKeyboardNote = {
  note: number
  velocity: number
  detune: number
  time?: number
  duration?: number
}

export function PianoKeyboard({
  className,
  borderColor = 'border-blue-700',
  onPress,
  onRelease
}: {
  className?: string
  borderColor?: string
  onPress: (note: PianoKeyboardNote) => void
  onRelease?: (midi: number) => void
}) {
  const [velocity, setVelocity] = useState(100)
  const [detune, setDetune] = useState(0)
  const [oct, setOct] = useState(60)
  const [sustain, setSustain] = useState(false)
  const isPlaying = (midi: number) => false

  function release(midi: number) {
    if (!sustain && onRelease) onRelease(midi)
  }

  return (
    <div className={className}>
      <div className={`piano-container border-t-8 ${borderColor}`}>
        {[...buildOct(oct), ...buildOct(oct + 12)].map((midi) =>
          isBlack(midi) ? (
            <div key={midi} className={'accidental-key__wrapper'}>
              <button
                className={`accidental-key ${
                  isPlaying(midi) ? 'accidental-key--playing' : ''
                }`}
                onMouseDown={() => onPress({ note: midi, velocity, detune })}
                onMouseUp={() => release(midi)}
              >
                <div className={'text'}></div>
              </button>
            </div>
          ) : (
            <button
              key={midi}
              className={`natural-key ${
                isPlaying(midi) ? 'natural-key--playing' : ''
              }`}
              onMouseDown={() => onPress({ note: midi, velocity, detune })}
              onMouseUp={() => release(midi)}
            >
              <div className={'text'}></div>
            </button>
          )
        )}
      </div>
      <div className="mt-1 flex items-center gap-1">
        <div>
          Octave: {oct}-{oct + 12 + 11}
        </div>
        <button
          className="rounded bg-zinc-900 px-1"
          onClick={() => {
            setOct(oct - 12)
          }}
        >
          -
        </button>
        <button
          className="rounded bg-zinc-900 px-1"
          onClick={() => {
            setOct(oct + 12)
          }}
        >
          +
        </button>

        <div className="ml-3">Velocity: {velocity}</div>
        <input
          type="range"
          min={0}
          max={127}
          value={velocity}
          onChange={(e) => setVelocity(e.target.valueAsNumber)}
        />
        <div className="ml-3">Detune: {detune}</div>
        <input
          type="range"
          min={-100}
          max={100}
          value={detune}
          onChange={(e) => setDetune(e.target.valueAsNumber)}
        />

        <input
          className="ml-3"
          type="checkbox"
          checked={sustain}
          onChange={(e) => setSustain(e.target.checked)}
        />
        <div className="">Sustain</div>
        <button
          className="rounded bg-zinc-900 px-1"
          onClick={() => {
            const degrees = Scale.degrees('C4 major')

            const midi = Range.numeric([1, 8, 1]).map(degrees).map(Note.midi)

            midi.map((midi, time) =>
              onPress({
                note: midi ?? 0,
                velocity: Math.floor(60 + 40 * Math.random()),
                detune: 0,
                time: time * 0.25,
                duration: 0.05
              })
            )
          }}
        >
          Test
        </button>
      </div>
    </div>
  )
}
