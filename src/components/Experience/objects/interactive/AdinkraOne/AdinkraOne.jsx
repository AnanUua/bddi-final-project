import { Html, Plane, Box } from "@react-three/drei"
import sankofaImage from "../../../../../assets/ChapterOne/sankofa.png"
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
  ctx.strokeStyle = "purple"
  ctx.lineWidth = 3
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
      ctx.fillStyle = "purple"
      ctx.fillRect(currX, currY, 3, 3)
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
    if (flag === true && e.buttons === 1) {
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

  const clearCanvas = () => {
    setData({
      ...initialData,
    })
    let imgData = canvasRef.current
      .getContext("2d")
      .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height, { colorSpace: "srgb" })
    console.log(imgData)
    let red = []
    let green = []
    let blue = []
    let type = 0
    imgData.data.map((color) => {
      if (type === 0) {
        red.push(color)
      } else if (type === 1) {
        green.push(color)
      } else {
        blue.push(color)
      }
      type++
      if (type > 2) {
        type = 0
      }
    })
    console.log(red)
    console.log(green)
    console.log(blue)
    let blackpixels = 0
    red.map((color, index) => {
      if (color === 255) {
        if (green[index] === 255) {
          if (blue[index] === 255) {
            blackpixels++
          }
        }
      }
    })
    console.log(blackpixels)

    if (blackpixels > 2) {
      console.log("perdu")
    } else {
      console.log("gagné")
    }
  }

  const initCanvas = () => {
    if (canvasRef.current !== null) {
      let ctx = canvasRef.current.getContext("2d")
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      let img = new Image()
      img.src = sankofaImage

      img.onload = () => {
        console.log("chargé")
        ctx.drawImage(
          img,
          canvasRef.current.width / 2 - 50,
          canvasRef.current.height / 2 - 50,
          100,
          100
        )
      }
    }
  }

  return (
    <>
      <Plane args={[10, 6, 10, 6]} rotation={[0, Math.PI / 3, 0]} position={[10, 5, -10]}>
        <Html position={[0, 0, 0.1]} transform>
          <canvas
            onPointerEnter={() => switchLerp(true)}
            onPointerLeave={() => switchLerp(false)}
            onMouseDown={(e) => handleMDown(e)}
            onMouseUp={() => {
              clearCanvas()
            }}
            onMouseMove={(e) => handleMMove(e)}
            className={classes.canvas}
            ref={canvasRef}
          ></canvas>
        </Html>
      </Plane>
      <Box position={[10, 9, -10]} onClick={() => initCanvas()}>
        <meshStandardMaterial color="purple" />
      </Box>
    </>
  )
}
