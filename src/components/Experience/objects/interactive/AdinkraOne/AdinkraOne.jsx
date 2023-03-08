import { Html, Plane } from "@react-three/drei"
import classes from "./AdinkraOne.module.scss"
import { useRef, useState } from "react"

const initialData = {
  prevX: 0,
  currX: 0,
  prevY: 0,
  currY: 0,
  dot_flag: false,
  flag: false,
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
}

const draw = (ctx, data) => {
  let prevX = data.prevX
  let currX = data.currX
  let prevY = data.prevY
  let currY = data.currY
  ctx.beginPath()
  ctx.moveTo(prevX, prevY)
  ctx.lineTo(currX, currY)
  ctx.strokeStyle = "black"
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.closePath()
}

export const AdinkraOne = ({ switchLerp }) => {
  const canvasRef = useRef(null)
  const [data, setData] = useState(initialData)

  const handleMDown = (e) => {
    let mouse = getMousePos(canvasRef.current, e)
    let prevX = data.currX !== 0 ? data.currX : mouse.x
    let prevY = data.currY !== 0 ? data.currY : mouse.y
    let currX = mouse.x - canvasRef.current.offsetLeft
    let currY = mouse.y - canvasRef.current.offsetTop
    let ctx = canvasRef.current.getContext("2d")

    let flag = true
    let dot_flag = true
    if (dot_flag) {
      ctx.beginPath()
      ctx.fillStyle = "black"
      ctx.fillRect(currX, currY, 2, 2)
      ctx.closePath()
      dot_flag = false
    }
    setData({
      prevX: prevX,
      prevY: prevY,
      currX: currX,
      currY: currY,
      flag: flag,
      dot_flag: dot_flag,
    })
  }

  const handleMMove = (e) => {
    let flag = data.flag
    let mouse = getMousePos(canvasRef.current, e)
    if (flag) {
      let prevX = data.currX
      let prevY = data.currY
      let currX = mouse.x - canvasRef.current.offsetLeft
      let currY = mouse.y - canvasRef.current.offsetTop

      setData({
        ...data,
        prevX: prevX,
        prevY: prevY,
        currX: currX,
        currY: currY,
      })

      draw(canvasRef.current.getContext("2d"), data)
    }
  }

  const handleMUp = () => {
    setData({
      ...data,
      flag: false,
    })
  }

  const clearCanvas = () => {
    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setData({ ...initialData })
  }

  return (
    <>
      <Plane args={[10, 6, 10, 6]} rotation={[0, Math.PI / 3, 0]} position={[10, 5, -10]}>
        <Html scale={1.2} position={[0, 0, 0.1]} transform>
          <canvas
            onPointerEnter={() => switchLerp(true)}
            onPointerLeave={() => {
              clearCanvas()
              switchLerp(false)
            }}
            onMouseDown={(e) => handleMDown(e)}
            onMouseMove={(e) => handleMMove(e)}
            onMouseUp={() => handleMUp()}
            className={classes.canvas}
            ref={canvasRef}
          ></canvas>
        </Html>
      </Plane>
    </>
  )
}
