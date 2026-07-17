import React from "react"
import { Link } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import Seo from "../components/Seo"
import { gothicFont } from "../styles/fonts"
import "normalize.css"

const PageStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #0a0a0a;
    color: #fff;
    font-family: ${gothicFont};
  }
`

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #0a0a0a;
`

const HomeLink = styled(Link)`
  color: #fff;
`

const NotFound = () => (
  <>
    <PageStyles />
    <Seo title="Not found" />
    <Page>
      <h1>Not found</h1>
      <HomeLink to="/">Go home</HomeLink>
    </Page>
  </>
)

export default NotFound
