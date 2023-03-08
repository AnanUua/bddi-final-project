import { Html, Plane } from "@react-three/drei"
import classes from "./AdinkraOne.module.scss"
import { useEffect, useRef } from "react"

const draw = (ctx) => {
  ctx.fillStyle = "#FF0000"
  ctx.fillRect(0, 0, 75, 75)
  ctx.fillRect(100, 100, 75, 75)
}

export const AdinkraOne = (props) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const context = canvasRef.current ? canvasRef.current.getContext("2d") : "no"
    console.log(context)
    if (canvasRef.current) {
      draw(canvasRef.current.getContext("2d"))
    }
  }, [canvasRef])

  return (
    <>
      <Plane
        args={[10, 6, 10, 6]}
        rotation={[0, Math.PI / 3, 0]}
        position={[10, 5, -10]}
        {...props}
      >
        <Html fullscreen position={[0, 0, 0.1]} transform occlude>
          <canvas className={classes.canvas} ref={canvasRef}></canvas>
        </Html>
      </Plane>
    </>
  )
}
