import React, { useCallback, useEffect, useRef, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { motion, useAnimation } from "framer-motion"
import Seo from "../components/Seo"
import { gothicFont } from "../styles/fonts"
import "normalize.css"

const IMAGE_SIZE = 320

const PageStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #0a0a0a;
    font-family: ${gothicFont};
  }
`

const Page = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  cursor: pointer;
  touch-action: manipulation;
`

const Hint = styled.p`
  margin: 0;
  color: #666;
  font-size: 1.25rem;
  pointer-events: none;
  user-select: none;
`

const FloatingLali = ({ id, x, onDone }) => {
  const controls = useAnimation()
  const imgRef = useRef(null)
  const [ready, setReady] = useState(false)

  const markReady = useCallback(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (imgRef.current?.complete) {
      markReady()
    }
  }, [markReady])

  useEffect(() => {
    if (!ready) return

    let cancelled = false

    const run = async () => {
      await controls.start({
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      })

      if (cancelled) return

      await controls.start({
        y: -IMAGE_SIZE,
        transition: { duration: 1, ease: "easeIn" },
      })

      if (!cancelled) onDone(id)
    }

    controls.set({ y: -IMAGE_SIZE })
    run()

    return () => {
      cancelled = true
    }
  }, [controls, id, onDone, ready])

  return (
    <motion.img
      ref={imgRef}
      src="/lali.png"
      alt=""
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      draggable={false}
      animate={controls}
      initial={{ y: -IMAGE_SIZE }}
      onLoad={markReady}
      style={{
        position: "fixed",
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        left: x - IMAGE_SIZE / 2,
        top: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  )
}

const Index = () => {
  const [lalis, setLalis] = useState([])
  const nextId = useRef(0)

  const summonLali = useCallback((clientX) => {
    nextId.current += 1
    setLalis((current) => [
      ...current,
      { id: nextId.current, x: clientX },
    ])
  }, [])

  const handlePointerDown = useCallback(
    (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return
      summonLali(event.clientX)
    },
    [summonLali]
  )

  const removeLali = useCallback((id) => {
    setLalis((current) => current.filter((lali) => lali.id !== id))
  }, [])

  return (
    <>
      <PageStyles />
      <Seo title="Lali" />
      <Page onPointerDown={handlePointerDown} role="presentation">
        <Hint>Tap or click anywhere to summon Lali.</Hint>
        {lalis.map(({ id, x }) => (
          <FloatingLali key={id} id={id} x={x} onDone={removeLali} />
        ))}
      </Page>
    </>
  )
}

export default Index
