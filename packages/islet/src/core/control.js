import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function createOrbitControl(context) {
  const control = new OrbitControls(context.camera, context.render.domElement)
  context.control = control
  return control
}
