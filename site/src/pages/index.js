import React, { useCallback, useEffect, useRef, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { motion, useAnimation } from "framer-motion"
import Seo from "../components/Seo"
import "normalize.css"

const IMAGE_SIZE = 320

const PageStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #0a0a0a;
  }
`

const Page = styled.div`
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  cursor: pointer;
`

const FloatingLali = ({ id, x, onDone }) => {
  const controls = useAnimation()

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      await controls.start({
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      })

      if (cancelled) return

      await controls.start({
        y: "-100%",
        transition: { duration: 1, ease: "easeIn" },
      })

      if (!cancelled) onDone(id)
    }

    controls.set({ y: "-100%" })
    run()

    return () => {
      cancelled = true
    }
  }, [controls, id, onDone])

  return (
    <motion.img
      src="/lali.png"
      alt=""
      draggable={false}
      animate={controls}
      initial={{ y: "-100%" }}
      style={{
        position: "fixed",
        width: IMAGE_SIZE,
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

  const handleClick = useCallback((event) => {
    nextId.current += 1
    setLalis((current) => [
      ...current,
      { id: nextId.current, x: event.clientX },
    ])
  }, [])

  const removeLali = useCallback((id) => {
    setLalis((current) => current.filter((lali) => lali.id !== id))
  }, [])

  return (
    <>
      <PageStyles />
      <Seo title="Lali" />
      <Page onClick={handleClick} role="presentation">
        {lalis.map(({ id, x }) => (
          <FloatingLali key={id} id={id} x={x} onDone={removeLali} />
        ))}
      </Page>
    </>
  )
}

export default Index
