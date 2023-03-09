import scriptData from "../../assets/chapterTwo.json"
import { useEffect, useRef, useState } from "react"
import styles from "./Interface.module.scss"

export const Interface = () => {
  // Local state
  const [displayUi, setDisplayUi] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)

  const buttons = useRef([])

  // Add this function to handle button clicks
  const handleButtonClick = (index) => {
    buttons.current.forEach((button, i) => {
      if (i === index) {
        button.classList.toggle(styles.active)
      } else {
        button.classList.remove(styles.active)
      }
    })
  }

  useEffect(() => {
    if (scriptData[sceneIndex].voiceover.length > 0) {
      setIsVoiceOver(true)
      setDisplayUi(true)
    }
  }, [sceneIndex])

  useEffect(() => {
    buttons.current[0].classList.add(styles.active)
  }, [])

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
      <div className={styles.meta}>
        <div className={styles.buttons}>
          {scriptData.map((scene, index) => (
            <button
              key={index}
              onClick={() => {
                handleButtonClick(index)
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
            <button key={index} className="spot" onClick={() => goToSpot(spot.index)}>
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
              <h2 className="narrator narrator--innerVoice">Une voix</h2>
            )}
            {getTextEmitter() === "npc" && (
              <h2 className="narrator narrator--npc">{getTextLabel()}</h2>
            )}
          </div>

          <div className={styles.content}>
            {isVoiceOver && <p>{getIntroText()}</p>}
            {!isVoiceOver && displayOptions && <p>{getSpotText()}</p>}
            {hasOptions() && !isVoiceOver && !displayOptions && <p>{getOptionResponse()}</p>}

            {hasOptions() && hasMore() && !displayOptions && (
              <button className="more" onClick={showMoreNPC}>
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
