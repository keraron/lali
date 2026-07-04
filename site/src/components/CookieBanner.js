import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

const CookieBanner = () => {
  const [Consent, setConsent] = useState(null)

  useEffect(() => {
    import("react-cookie-consent").then((module) => {
      setConsent(() => module.default)
    })
  }, [])

  if (!Consent) {
    return null
  }

  return (
    <Consent
      location="bottom"
      buttonText="OK"
      cookieName="koopBlogCookie"
      expires={150}
      style={{
        background: "#222222",
        padding: "15px 25px",
        fontSize: "16px",
      }}
      buttonStyle={{
        backgroundColor: "#fff",
        color: "#222222",
        fontSize: "16px",
        fontWeight: 700,
        padding: "8px 18px",
      }}
    >
      This website uses cookies to help improve your experience. By using this
      site you agree to the website{" "}
      <Link to="/privacy" style={{ color: "#fff" }}>
        privacy statement
      </Link>
      .
    </Consent>
  )
}

export default CookieBanner
