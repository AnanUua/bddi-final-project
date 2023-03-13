import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleBlackBars } from "../../store/reducers/uiReducer"
import scriptData from "../../assets/chapterTwo.json"
import styles from "./Interface.module.scss"
import { BlackBars } from "../BlackBars/BlackBars"

export const Interface = () => {
  const dispatch = useDispatch()

  // Redux selectors
  const { showBlackBars } = useSelector((state) => state.ui)

  // Local state
  const [displayUi, setDisplayUi] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)

  const buttons = useRef([])
  const spotButtons = useRef([])

  // Handle click on buttons
  const handleSceneSelect = (index) => {
    buttons.current.forEach((button, i) => {
      if (i === index) {
        button.classList.toggle(styles.active)
      } else {
        button.classList.remove(styles.active)
      }
    })

    spotButtons.current.forEach((button, i) => {
      if (button) {
        if (button.classList.contains(styles.active)) {
          button.classList.remove(styles.active)
        }
      }
    })
  }

  useEffect(() => {
    buttons.current[0].classList.add(styles.active)
  }, [])

  // Hide debug UI and text interface when black bars are active
  useEffect(() => {
    if (showBlackBars === true) {
      setDisplayUi(false)
      setDisplayOptions(false)

      spotButtons.current.forEach((button) => {
        if (button) {
          button.style.display = "none"
        }
      })
      buttons.current.forEach((button) => {
        if (button) {
          button.style.display = "none"
        }
      })
    } else {
      setDisplayUi(true)
      setDisplayOptions(true)

      spotButtons.current.forEach((button) => {
        if (button) {
          button.style.display = "inline"
        }
      })
      buttons.current.forEach((button) => {
        if (button) {
          button.style.display = "inline"
        }
      })
    }
  }, [showBlackBars])

  const handleSpotSelect = (index) => {
    spotButtons.current.forEach((button, i) => {
      if (button) {
        if (i === index) {
          button.classList.toggle(styles.active)
        } else {
          if (button.classList.contains(styles.active)) {
            button.classList.remove(styles.active)
          }
        }
      }
    })
  }

  // Change the current scene and reset UI state
  const changeScene = (data) => {
    setSceneIndex(data)
    setSpotIndex(0)
    setTextIndex(0)
    setDisplayUi(false)
    setDisplayOptions(false)
  }

  // Change the current spot and reset UI state
  const goToSpot = (data) => {
    setSpotIndex(data)
    setTextIndex(0)
    setIsVoiceOver(false)
    setDisplayUi(true)
    setDisplayOptions(true)
  }

  useEffect(() => {
    if (scriptData[sceneIndex].voiceover.length > 0) {
      setIsVoiceOver(true)
      setDisplayUi(true)
    }
  }, [sceneIndex])

  // Show the next text in the voiceover array
  const showMore = () => {
    setTextIndex(textIndex + 1)
  }

  const showMoreNPC = () => {
    setTextIndex(textIndex + 1)
    setDisplayOptions(true)
  }

  const getTextEmitter = () =>
    !isVoiceOver
      ? scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].emitter
      : scriptData[sceneIndex].voiceover[textIndex].emitter

  const getTextLabel = () => (!isVoiceOver ? scriptData[sceneIndex].spots[spotIndex].label : null)

  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const getIntroText = () =>
    scriptData[sceneIndex].voiceover && scriptData[sceneIndex].voiceover[textIndex].text

  const hasMoreIntroText = () => scriptData[sceneIndex].voiceover.length > textIndex + 1

  const getSpotText = () => scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].text

  const getOptionResponse = () => {
    const option =
      scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].options[optionIndex]
    return option.response
  }

  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex].spotVoiceover.length > textIndex + 1

  const hasOptions = () =>
    scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options?.length > 0

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setDisplayOptions(false)
  }

  return (
    <section className={styles.container}>
      {showBlackBars && <BlackBars />}
      <button
        className={styles.test}
        onClick={() => {
          dispatch(toggleBlackBars())
        }}
      >
        Toggle black bars ({showBlackBars.toString()})
      </button>
      <div className={styles.meta}>
        <div className={styles.buttons}>
          {scriptData.map((scene, index) => (
            <button
              key={index}
              onClick={() => {
                handleSceneSelect(index)
                changeScene(index)
              }}
              ref={(el) => (buttons.current[index] = el)}
            >
              {scene.name}
            </button>
          ))}
        </div>
        <hr />
        <div className={styles.spots}>
          {scriptData[sceneIndex].spots.map((spot, index) => (
            <button
              key={index}
              ref={(el) => (spotButtons.current[index] = el)}
              onClick={() => {
                handleSpotSelect(index)
                goToSpot(index)
              }}
            >
              {spot.label}
            </button>
          ))}
        </div>
      </div>
      {displayUi && (
        <div className={styles.dialogue}>
          <div className={styles.emitter}>
            {getTextEmitter() === "narrator" && <h2 className={styles.narrator}>Le narrateur</h2>}
            {getTextEmitter() === "innerVoice" && (
              <h2 className={[`${styles.narrator} ${styles["narrator--innerVoice"]}`]}>Une voix</h2>
            )}
            {getTextEmitter() === "npc" && (
              <h2 className={[`${styles.narrator} ${styles["narrator--npc"]}`]}>
                {getTextLabel()}
              </h2>
            )}
          </div>
          <div className={styles.content}>
            {isVoiceOver && <p>{getIntroText()}</p>}
            {!isVoiceOver && displayOptions && <p>{getSpotText()}</p>}
            {hasOptions() && !isVoiceOver && !displayOptions && <p>{getOptionResponse()}</p>}
            {hasOptions() && hasMore() && !displayOptions && (
              <button className={styles.more} onClick={showMoreNPC}>
                Suite...
              </button>
            )}
            {!hasOptions() && hasMore() && (
              <button className={styles.more} onClick={showMore}>
                Suite...
              </button>
            )}
            {!hasMore() && (
              <button className={styles.more} onClick={() => setDisplayUi(false)}>
                Fermer.
              </button>
            )}
            {hasOptions() && displayOptions && (
              <div className={styles.options}>
                {scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].options.map(
                  (option, index) => (
                    <button key={index} onClick={() => chooseResponse(index)}>
                      {option.text}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
