import { useLayoutEffect } from "react"
import styles from "./BlackBars.module.scss"
import gsap from "gsap"

export const BlackBars = () => {
  useLayoutEffect(() => {
    // create a gsap timeline where each bar translates
    // from the top and bottom of the screen
    const tl = gsap.timeline()
    tl.to(`.${styles.topBar}`, {
      duration: 2,
      y: "0",
      ease: "power4.out",
    })
    tl.to(`.${styles.bottomBar}`, {
      duration: 2,
      delay: -2,
      y: "0",
      ease: "power4.out",
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.topBar} />
      <div className={styles.bottomBar} />
    </div>
  )
}
