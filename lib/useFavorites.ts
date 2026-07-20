'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'jdmarket_favs_v1'
const EVENT = 'jdmarket:favs-changed'

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.filter((t) => typeof t === 'string') : []
  } catch {
    return []
  }
}

function write(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
    window.dispatchEvent(new Event(EVENT))
  } catch {}
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setFavs(read())
    setReady(true)
    const onChange = () => setFavs(read())
    window.addEventListener(EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const toggle = useCallback((ticker: string) => {
    const t = ticker.toUpperCase()
    const current = read()
    const next = current.includes(t) ? current.filter((x) => x !== t) : [...current, t]
    write(next)
    setFavs(next)
  }, [])

  const isFav = useCallback((ticker: string) => favs.includes(ticker.toUpperCase()), [favs])

  return { favs, toggle, isFav, ready }
}
