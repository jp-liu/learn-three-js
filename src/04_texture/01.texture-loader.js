import { AmbientLight, AxesHelper, BoxBufferGeometry, BoxGeometry, BufferAttribute, BufferGeometry, Clock, Color, DirectionalLight, LinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, MirroredRepeatWrapping, NearestFilter, PerspectiveCamera, PlaneBufferGeometry, RepeatWrapping, Scene, TextureLoader, WebGLRenderer } from 'three';
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
  20
)
camera.position.set(0, 0, 2)
scene.add(camera)

// 加载图形
const geometry = new BoxBufferGeometry(1, 1, 1, 100, 100, 100)
const textureLoader = new TextureLoader()
const door = textureLoader.load('texture/door/color.jpg')
const alphaMap = textureLoader.load('texture/door/alpha.jpg') // 透明度贴图
const aoMap = textureLoader.load('texture/door/ambientOcclusion.jpg') // 基础贴图
const hMap = textureLoader.load('texture/door/height.jpg') // 置换贴图，可以让图片出现凹凸效果
const mMap = textureLoader.load('texture/door/metalness.jpg') // 金属贴图
const rMap = textureLoader.load('texture/door/roughness.jpg') // 光滑度贴图,镜面反射
const nMap = textureLoader.load('texture/door/normal.jpg') // 法线贴图，漫反射，得到各个方向的光反射

const material = new MeshStandardMaterial({
  color: 0xffffff,
  map: door,
  alphaMap: alphaMap,
  aoMap: aoMap,
  displacementMap: hMap,
  displacementScale: 0.1,
  roughness: 1,
  roughnessMap: rMap,
  metalness: 1,
  metalnessMap: mMap,
  normalMap: nMap,
  transparent: true
})
const cube = new Mesh(geometry, material)
geometry.setAttribute('uv2', new BufferAttribute(geometry.attributes.uv.array, 2))

scene.add(cube)

const planeGeometry = new PlaneBufferGeometry(1, 1, 100, 100)
const plane = new Mesh(planeGeometry, material)
plane.position.set(1.5, 0, 0)
planeGeometry.setAttribute('uv2', new BufferAttribute(planeGeometry.attributes.uv.array, 2))
scene.add(plane)


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
dLight.position.set(2, 2, 2)
dLight.target = cube
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
