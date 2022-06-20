import { AxesHelper, BoxBufferGeometry, BoxGeometry, BufferAttribute, BufferGeometry, Clock, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from 'three';
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

// 加载图形
const geometry = new BoxBufferGeometry()
const material = new MeshBasicMaterial({ color: 0xffffff })
const textureLoader = new TextureLoader()
const door = textureLoader.load('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqhrenderpicoss.kujiale.com%2Fr%2F2019%2F02%2F21%2FL4D1113ENDDVBZKX5FEJKFNOPCLH3WKTQ8_1000x1000.jpg&refer=http%3A%2F%2Fqhrenderpicoss.kujiale.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658243662&t=a7105d8873928c0d193d728b6e295818')
material.map = door
console.log(door);
const cube = new Mesh(geometry, material)
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
