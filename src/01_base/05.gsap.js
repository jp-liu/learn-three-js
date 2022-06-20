import './assets/css/index.css'
import { AxesHelper, BoxGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

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

// gsap 制作动画
const clock = new Clock()
const animation = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: 'power.1.inOut',
  onComplete() {
    console.log('动画结束');
  }
})

window.addEventListener('dblclick', (e) => {
  if (animation.isActive()) {
    animation.pause()
  } else {
    animation.resume()
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

gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: 'power.1.inOut' })

function renderScene(time) {
  orbit.update()
  requestAnimationFrame(renderScene)
  render.render(scene, camera)
}
renderScene()
