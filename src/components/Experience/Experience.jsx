import { Canvas } from "@react-three/fiber"
import styles from "./Experience.module.scss"
import { RegionEntranceOne } from "./scenes/RegionEntranceOne/RegionEntranceOne"

export const Experience = () => {
  return (
    <div className={styles.container}>
      <Canvas>
        <RegionEntranceOne />
      </Canvas>
    </div>
  )
}
