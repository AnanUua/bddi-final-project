import { PerspectiveCamera } from "@react-three/drei"
import { RegionEntranceOneScene } from "./RegionEntranceOneScene"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HotGround } from "../../effects/HotGround"
import { changeNoLerp } from "../../../../store/reducers/userReducer"
import { AdinkraOne } from "../../objects/interactive/AdinkraOne/AdinkraOne"
import { CameraLerp } from "../../../../helpers/animations/cameraLerp"

export const RegionEntranceOne = () => {
  const dispatch = useDispatch()
  const switchLerp = (value) => dispatch(changeNoLerp(value))
  const noLerp = useSelector((state) => state.user.noLerp)
  const changeNoLerpFocus = (value) => dispatch(changeNoLerpFocus(value))
  const noLerpFocus = useSelector((state) => state.user.noLerpFocus)

  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = CameraLerp(
      ref.current.rotation.y,
      !noLerp ? state.mouse.x : noLerpFocus.x,
      Math.PI / 3
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
      <AdinkraOne switchLerp={switchLerp} />
      <ambientLight intensity={1} />
      <RegionEntranceOneScene />
    </>
  )
}
