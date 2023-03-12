import { MathUtils } from "three"

export const CameraLerp = (current, position, add = 0) =>
  MathUtils.lerp(current, -(position * Math.PI) / 20 + add, 0.05)
