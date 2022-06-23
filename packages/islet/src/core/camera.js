import { PerspectiveCamera } from "three";

export function createCamera(context) {
  const { cameraOptions } = context
  const camera = new PerspectiveCamera(
    cameraOptions.fav,
    cameraOptions.aspect,
    cameraOptions.near,
    cameraOptions.far
  )
  camera.position.set(-50, 50, 130)
  context.camera = camera

  context.add(camera)

  return camera
}

