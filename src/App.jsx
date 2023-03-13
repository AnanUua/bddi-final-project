import { useSelector } from "react-redux"
import { Experience } from "./components/Experience/Experience"
import { Introduction } from "./components/Introduction/Introduction"
import { Interface } from "./components/Interface/Interface"
import { StartButton } from "./components/StartButton/StartButton"
import styles from "./App.module.scss"

const App = () => {
  const hasExperienceStarted = useSelector((state) => state.introduction.hasExperienceStarted)

  return (
    <main className={styles.container}>
      {!hasExperienceStarted ? (
        <Introduction />
      ) : (
        <Experience />
      )}
      {hasExperienceStarted && <Interface />}
      {!hasExperienceStarted && (
        <StartButton text={"Passer l'intro (debug)"} />
      )}
    </main>
  )
}

export default App
