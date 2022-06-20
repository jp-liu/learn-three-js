import './assets/css/index.css'
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

// 3.添加物体
// const geometry = new BoxGeometry(1, 1, 1)
// const material = new MeshBasicMaterial({ color: 0xffffff })
// const cube = new Mesh(geometry, material)
// cube.rotation.set(Math.PI / 4, 0, 0)
// scene.add(cube)
// cube.geometry.attributes.normal     法相：配合光源计算反射，朝向等信息
// cube.geometry.attributes.position   位置：每个面的点的 x，y，z 的坐标
// cube.geometry.attributes.uv         平面位置：图形展开的平面的每个点的信息，用处：比如做海豹，问题，需要平面效果，比如正方形，底面在最上
/* 
   □      -Y
 □ □ □  -X Z X
   □       Y
   □      -Z
*/

const geometry = new BufferGeometry()
const vertices = new Float32Array([
  // 第一个面
  -1, -1, 1,
  1, -1, 1,
  1, 1, 1,
  1, 1, 1,
  -1, 1, 1,
  -1, -1, 1
])
geometry.setAttribute('position', new BufferAttribute(vertices, 3))
const material = new MeshBasicMaterial({ color: 0xffff00 })
const mesh = new Mesh(geometry, material)
scene.add(mesh)

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
