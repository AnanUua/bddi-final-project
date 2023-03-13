import { useDispatch } from 'react-redux'
import { startExperience } from '../../store/reducers/introductionReducer'
import styles from "./StartButton.module.scss"

export const StartButton = ({text}) => {
  const dispatch = useDispatch()

  const endIntroduction = () => {
    dispatch(startExperience())
  }

  // Template
  return (
    <button className={styles.container} onClick={() => endIntroduction()}>
      {text}
    </button>
  )
}
