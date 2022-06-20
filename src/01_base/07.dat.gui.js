import './assets/css/index.css'
import { AxesHelper, BoxGeometry, Clock, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
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

// 3.添加物体
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xffffff })
const cube = new Mesh(geometry, material)
cube.rotation.set(Math.PI / 4, 0, 0)
scene.add(cube)

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

const gui = new GUI()
gui.add(cube.position, 'x', 0, 5, 0.01).name('移动X轴').onFinishChange((e) => {
  console.log('移动完毕');
})

const params = {
  color: 0xffffff,
  visible: true,
  to() {
    gsap.to(cube.position, { x: 5, duration: 5})
  }
}
const f = gui.addFolder('设置立方体')
f.addColor(params, 'color').onChange(e => {
  console.log('颜色：', e);
  cube.material.color = new Color(e)
})
f.add(params, 'visible').onChange(e => {
  cube.visible = e
})
f.add(params, 'to')


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
