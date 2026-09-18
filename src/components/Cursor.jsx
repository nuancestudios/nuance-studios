import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'

/** Custom cursor: a soft ring that snaps and grows over interactive elements. */
export default function Cursor() {
  const { reduced } = useTheme()
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 480, damping: 34, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 480, damping: 34, mass: 0.35 })

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target
      setActive(!!(t.closest && t.closest('a, button, input, select, textarea, [role="button"]')))
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[200] hidden md:block"
        style={{ x: sx, y: sy, left: -4, top: -4 }}
      >
        <motion.span
          animate={{ scale: active ? 0.4 : 1, opacity: visible ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="block"
          style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--c-accent)' }}
        />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-[199] hidden md:block"
        style={{ x, y, left: -18, top: -18 }}
        transition={{ type: 'tween', duration: 0 }}
      >
        <motion.span
          animate={{ scale: active ? 1.7 : 1, opacity: visible ? (active ? 0.9 : 0.4) : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="block"
          style={{ width: 36, height: 36, borderRadius: 999, border: '1.5px solid var(--c-accent)' }}
        />
      </motion.div>
    </>
  )
}
