import { AmbientLight, AxesHelper, BoxBufferGeometry, BoxGeometry, BufferAttribute, BufferGeometry, Clock, Color, CubeTextureLoader, DirectionalLight, LinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, MirroredRepeatWrapping, NearestFilter, PerspectiveCamera, RepeatWrapping, Scene, SphereBufferGeometry, TextureLoader, WebGLRenderer } from 'three';
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
camera.position.set(0, 0, 2)
scene.add(camera)

// 加载图形
const cubeLoader = new CubeTextureLoader()
const cubeXp = cubeLoader.load(
  [
    'texture/environmentMaps/1/px.jpg',
    'texture/environmentMaps/1/nx.jpg',
    'texture/environmentMaps/1/py.jpg',
    'texture/environmentMaps/1/ny.jpg',
    'texture/environmentMaps/1/pz.jpg',
    'texture/environmentMaps/1/nz.jpg',
  ]
)
console.log(cubeXp);

const geometry = new SphereBufferGeometry(1, 20, 20)
const material = new MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1,
  envMap: cubeXp
})
const sphere = new Mesh(geometry, material)
scene.add(sphere)
scene.background = cubeXp

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

// 7.光源
const aLight = new AmbientLight(0xffffff, 0.5)
scene.add(aLight)
const dLight = new DirectionalLight(0xffffff, 0.5)
dLight.position.set(10, 10, 10)
scene.add(dLight)

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
