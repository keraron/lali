import React, { useState } from "react"
import Seo from "../components/Seo"
import Footer from "./Footer/Footer"
import CookieBanner from "./CookieBanner"
import Header from "./Header/Header"
import Burger from "./Burger/Burger"
import SideMenu from "./SideMenu/SideMenu"
import GlobalStyles from "../styles/GlobalStyles"
import Typography from "../styles/Typography"

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GlobalStyles />
      <Typography />
      <Seo />
      <div>
        <Header />
        <Burger open={open} setOpen={setOpen} />
        <SideMenu open={open} setOpen={setOpen} />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  )
}

export default Layout
