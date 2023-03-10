import { useGLTF, PerspectiveCamera, Environment, OrbitControls, Gltf } from "@react-three/drei"
import { Model } from "./Scene_1"

export const RegionEntranceOneScene = () => {
  //<Gltf src="/assets/scenes/scene_1.glb" />

  return (
    <>
      <PerspectiveCamera makeDefault />
      <ambientLight color={"orange"} />
      <OrbitControls />
      <Model position={[8, -15, -12]} rotation={[0, 0, 0]} />
    </>
  )
}
