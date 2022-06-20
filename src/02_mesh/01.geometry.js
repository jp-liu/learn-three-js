import { AxesHelper, BoxGeometry, BufferAttribute, BufferGeometry, Clock, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
import { GUI } from 'dat.gui'

// 1.场景
const scene = new Scene()

// 2.创建相机
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

for (let i = 0; i < 50; i++) {
  // 每一个三角形三个点，没一个顶点需要三个值
  const geometry = new BufferGeometry()
  const positionArr = new Float32Array(9)
  for (let j = 0; j < 9; j++) {
    positionArr[j] = Math.random() * 10 - 5
  }
  geometry.setAttribute('position', new BufferAttribute(positionArr, 3))
  const color = new Color(Math.random(), Math.random(), Math.random())
  const material = new MeshBasicMaterial({ color, transparent: true, opacity: 0.6 })
  const mesh = new Mesh(geometry, material)

  scene.add(mesh)
}

// 4.渲染内容
const render = new WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(render.domElement)

// 5.轨道控制器
const orbit = new OrbitControls(camera, render.domElement)
orbit.enableDamping = true
orbit.update()

// 6.坐标轴
const axes = new AxesHelper(5)
scene.add(axes)

window.addEventListener('dblclick', (e) => {
  const fullScreenElement = document.fullscreenElement
  if (fullScreenElement) {
    document.exitFullscreen()
  } else {
    render.domElement.requestFullscreen()
  }
})
window.addEventListener('resize', () => {
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  render.setSize(width, height)
  render.setPixelRatio(window.devicePixelRatio)
})

function renderScene(time) {
  orbit.update()
  requestAnimationFrame(renderScene)
  render.render(scene, camera)
}
renderScene()
