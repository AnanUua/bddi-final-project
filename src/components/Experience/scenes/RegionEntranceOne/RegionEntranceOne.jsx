import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { RegionEntranceOneScene } from "./RegionEntranceOneScene"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { HotGround } from "../../effects/HotGround"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"
import { MathUtils } from "three"

export const RegionEntranceOne = () => {
  //<fog attach={"fog"} args={["orange",30,60]} />
  /*
  <ScreenQuad scale={200} rotation={[0,Math.PI/2,0]} position={[-200, 0, -10]}>
        <meshBasicMaterial />
  </ScreenQuad>
  */

  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      -(state.mouse.x * Math.PI) / 20 + Math.PI / 3,
      0.05
    )
    ref.current.rotation.x = MathUtils.lerp(
      ref.current.rotation.x,
      ((state.mouse.y * Math.PI) / 20),
      0.05
    )
  })

  return (
    <>
      <PerspectiveCamera
        ref={ref}
        makeDefault
        position={[30, 3, 5]}
        rotation={[0, Math.PI / 3, 0]}
      />
      <color attach={"background"} args={["#D0FEEF"]} />
      <HotGround
        scale={2}
        args={[30, 0.3, 500, 50]}
        position={[-30, 1, 0]}
        rotation={[-Math.PI / 2, Math.PI / 6, Math.PI / 2]}
      />
      <AdinkraOne />
      <ambientLight intensity={1} />
      <RegionEntranceOneScene />
    </>
  )
}
