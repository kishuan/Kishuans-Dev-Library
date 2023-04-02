import { useState, useEffect } from "react"

function useDayNightMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof localStorage !== "undefined" && localStorage.getItem("isDarkMode") === "true"
  )

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("isDarkMode", isDarkMode)
    }
    const body = document.querySelector("body")
    body.style.backgroundColor = isDarkMode ? "#474E68" : "#ECF2FF"
    body.style.color = isDarkMode ? "#ECF2FF" : "#474E68"

    const links = document.querySelectorAll("a")
    links.forEach(link => {
      link.style.color = isDarkMode ? "#ECF2FF" : "#474E68"
    })

    const root = document.querySelector(":root")
    root.style.backgroundColor = isDarkMode ? "#474E68" : "#ECF2FF"

  }, [isDarkMode])

  return [isDarkMode, setIsDarkMode]
}

export default useDayNightMode
