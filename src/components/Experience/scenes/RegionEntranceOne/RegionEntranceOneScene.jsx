import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei"
import { Model } from "./Scene_1"

export const RegionEntranceOneScene = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Model position={[12, -15, 0]} />
    </>
  )
}
