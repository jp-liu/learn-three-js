import { AmbientLight, AxesHelper, BoxBufferGeometry, BoxGeometry, BufferAttribute, BufferGeometry, Clock, Color, DirectionalLight, EquirectangularReflectionMapping, EquirectangularRefractionMapping, LinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, MirroredRepeatWrapping, NearestFilter, PerspectiveCamera, RepeatWrapping, Scene, SphereBufferGeometry, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'


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

const rgbLoader = new RGBELoader()
console.log(rgbLoader);
rgbLoader.loadAsync('texture/hdr/002.hdr').then(texture => {
  texture.mapping = EquirectangularRefractionMapping
  console.log(texture);
  scene.background = texture // 添加环境背景环境
  scene.environment = texture // 为所有物体开启环境贴图
})

// 加载图形
const geometry = new SphereBufferGeometry(1, 20, 20)

const material = new MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1
})
const sphere = new Mesh(geometry, material)
scene.add(sphere)

// 4.渲染内容
const render = new WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight)
render.shadowMap.enabled = true // 开启阴影渲染计算
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
