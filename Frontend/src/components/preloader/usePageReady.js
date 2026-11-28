import { useEffect, useState } from 'react'

/**
 * true hota hai jab: minimum animation time + window load + fonts ready
 * teeno complete ho jayen (ya maxWait guzar jaye).
 */
export default function usePageReady(minDuration = 3200, maxWait = 9000) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    const minTimer = new Promise((r) => setTimeout(r, minDuration))
    const loaded = new Promise((r) => {
      if (document.readyState === 'complete') r()
      else window.addEventListener('load', r, { once: true })
    })
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const safety = setTimeout(() => alive && setReady(true), maxWait)

    Promise.all([minTimer, loaded, fonts]).then(() => alive && setReady(true))
    return () => {
      alive = false
      clearTimeout(safety)
    }
  }, [minDuration, maxWait])

  return ready
}
