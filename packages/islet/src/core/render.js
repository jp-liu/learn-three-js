import { WebGLRenderer } from "three";

export function createRender(context) {
  const render = new WebGLRenderer({
    // 抗锯齿
    antialias: true,
    logarithmicDepthBuffer: true, // 对数深度缓冲区
  })

  render.setSize(context.width, context.height)
  context.render = render
  return render
}
