import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ThemeProvider, useTheme } from './theme/ThemeProvider'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Why from './sections/Why'
import Process from './sections/Process'
import Playground from './sections/Playground'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import ControlPanel from './components/ControlPanel'
import Cursor from './components/Cursor'
import { EASE } from './motion/variants'

/** Opening curtain — the "page transition" on first paint. */
function Curtain() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1150)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center"
          style={{ background: 'var(--c-bg)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: EASE.inOut }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: EASE.out }}
            className="flex items-baseline gap-0.5"
          >
            <span className="nu-display" style={{ fontSize: 'clamp(2rem,6vw,3.6rem)', fontWeight: 800, letterSpacing: '-0.04em' }}>Nu</span>
            <motion.span
              animate={{ scale: [0, 1.6, 1] }}
              transition={{ duration: 0.9, ease: EASE.back }}
              style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--c-accent)', marginInline: 3, display: 'inline-block' }}
            />
            <span className="nu-display" style={{ fontSize: 'clamp(2rem,6vw,3.6rem)', fontWeight: 800, letterSpacing: '-0.04em' }}>ance</span>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.05, ease: EASE.out }}
            style={{ height: 2, background: 'var(--c-accent)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Style-change flash: a quick wipe whenever the design language changes. */
function StyleWipe() {
  const { styleId } = useTheme()
  const [key, setKey] = useState(styleId)
  const [first, setFirst] = useState(true)

  useEffect(() => {
    if (first) { setFirst(false); return }
    setKey(styleId)
  }, [styleId]) // eslint-disable-line

  return (
    <AnimatePresence>
      <motion.div
        key={key}
        className="fixed inset-0 z-[150] pointer-events-none"
        initial={{ clipPath: 'inset(0 0 0 0)', opacity: 0.9 }}
        animate={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        transition={{ duration: 0.65, ease: EASE.inOut }}
        style={{ background: 'var(--c-accent)' }}
      />
    </AnimatePresence>
  )
}

function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const sx = useSpring(scrollYProgress, { stiffness: 220, damping: 34, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[65] origin-left"
      style={{ scaleX: sx, height: 2, background: 'var(--c-accent)' }}
    />
  )
}

function Site() {
  return (
    <>
      <div className="nu-texture" aria-hidden />
      <Curtain />
      <StyleWipe />
      <Cursor />
      <ScrollBar />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Why />
        <Process />
        <Playground />
        <Contact />
      </main>
      <Footer />
      <ControlPanel />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  )
}
