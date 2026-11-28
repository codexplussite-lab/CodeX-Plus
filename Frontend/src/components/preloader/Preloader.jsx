import { useEffect, useState } from 'react'
import CodexLogo from './CodexLogo.jsx'
import usePageReady from './usePageReady.js'
import './preloader.css'

const EXIT_MS = 1100

/**
 * <Preloader onDone={() => ...} />
 * Website khulne se pehle chalta hai, phir apne aap hat jata hai.
 */
export default function Preloader({ minDuration = 3400, onDone }) {
  const [phase, setPhase] = useState('draw') // draw -> exit -> done
  const [pct, setPct] = useState(0)
  const ready = usePageReady(minDuration)

  // scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // smooth eased progress counter
  useEffect(() => {
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / minDuration)
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [minDuration])

  useEffect(() => {
    if (!ready) return
    setPhase('exit')
    const t = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
      onDone?.()
    }, EXIT_MS)
    return () => clearTimeout(t)
  }, [ready, onDone])

  if (phase === 'done') return null

  return (
    <div className={`cx-pre ${phase === 'exit' ? 'is-exit' : ''}`} aria-hidden="true">
      <div className="cx-glow" />
      <div className="cx-grain" />

      <div className="cx-frame">
        <span className="cx-corner cx-corner--tl" />
        <span className="cx-corner cx-corner--tr" />
        <span className="cx-corner cx-corner--bl" />
        <span className="cx-corner cx-corner--br" />
      </div>

      <div className="cx-stage">
        <CodexLogo />

        <div className="cx-meta">
          <span className="cx-label">{pct < 100 ? 'Loading' : 'Ready'}</span>
          <div className="cx-bar">
            <i style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <span className="cx-pct">{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
