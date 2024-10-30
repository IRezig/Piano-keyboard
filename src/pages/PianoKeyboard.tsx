'use client'
import { Select } from 'antd'

import { useEffect, useState } from 'react'
import { Note, Range, Scale } from 'tonal'
const buildOct = (base: number) =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => n + base)

const isBlack = (midi: number) => [1, 3, 6, 8, 10].includes(midi % 12)
const chords = {
  Do: [60, 64, 67],
  Ré: [62, 65, 69],
  Mi: [64, 67, 71],
  Fa: [65, 69, 72],
  Sol: [67, 71, 74],
  La: [69, 72, 76],
  Si: [71, 74, 77]
}
const ChordsOptions = [
  { value: '[60, 64, 67]', label: 'Do' },
  { value: '[62, 65, 69]', label: 'Ré' },
  { value: '[64, 67, 71]', label: 'Mi' },
  { value: '[65, 69, 72]', label: 'Fa' },
  { value: '[67, 71, 74]', label: 'Sol' },
  { value: '[69, 72, 76]', label: 'La' },
  { value: '[71, 74, 77]', label: 'Si' }
]

type PianoKeyboardNote = {
  note: number
  velocity: number
  detune: number
  time?: number
  duration?: number
}

interface PianoKeyboardProps {
  className?: string
  borderColor?: string
  onPress: (note: PianoKeyboardNote) => void
  onRelease?: (midi: number) => void
}

export function PianoKeyboard(props: PianoKeyboardProps) {
  const { className, borderColor, onPress, onRelease } = props
  const oct = 60
  const velocity = 100
  const detune = 0
  const [playing, setPlaying] = useState<number[]>([])
  const isPlaying = (midi: number) => playing.includes(midi)

  const handleChange = (value: string) => {
    const chordNotes = JSON.parse(value)
    setPlaying([...playing, ...chordNotes])
    chordNotes.forEach((midi: number) => {
      onPress({
        note: midi,
        velocity: 80,
        detune: 0,
        time: 0,
        duration: 2.0
      })
    })
  }

  function release(midi: number) {
    if (onRelease) onRelease(midi)
  }
  const onPressNote = (note: PianoKeyboardNote) => {
    setPlaying([...playing, note.note])
    onPress(note)
  }
  useEffect(() => {
    const timeout = setTimeout(() => setPlaying([]), 4000)
    return () => clearTimeout(timeout)
  }, [playing])

  const playAllChords = () => {
    const chordsNotes = Object.values(chords)
    chordsNotes.forEach((chordNote, time) => {
      setTimeout(() => {
        setPlaying([])
        setPlaying((prevPlaying) => [...prevPlaying, ...chordNote])
        chordNote.forEach((midi) => {
          console.log('midi', time, midi)
          onPress({
            note: midi,
            velocity: 80,
            detune: 0,
            time: 2,
            duration: 2.0
          })
        })
      }, time * 2000)
    })
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
                onMouseDown={() =>
                  onPressNote({ note: midi, velocity, detune })
                }
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
              onMouseDown={() => onPressNote({ note: midi, velocity, detune })}
              onMouseUp={() => release(midi)}
            >
              <div className={'text'}></div>
            </button>
          )
        )}
      </div>
      <div className="mt-1 flex items-center gap-1">
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
        <Select
          placeholder="Select a chord"
          style={{ width: 120 }}
          onChange={handleChange}
          options={ChordsOptions}
        />

        <button
          className="rounded bg-green-900 px-1"
          onClick={() => {
            const doMajeurChord = [60, 64, 67]
            setPlaying([...playing, ...doMajeurChord])
            doMajeurChord.forEach((midi) => {
              onPress({
                note: midi,
                velocity: 80,
                detune: 0,
                time: 0,
                duration: 2.0
              })
            })
          }}
        >
          Do Majeur Chord
        </button>
        <button
          className="rounded bg-green-900 px-1"
          onClick={() => playAllChords()}
        >
          All chords
        </button>
      </div>
    </div>
  )
}
