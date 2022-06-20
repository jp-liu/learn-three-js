import { AmbientLight, AxesHelper, BoxBufferGeometry, BoxGeometry, BufferAttribute, BufferGeometry, Clock, Color, DirectionalLight, LinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, MirroredRepeatWrapping, NearestFilter, PerspectiveCamera, RepeatWrapping, Scene, TextureLoader, WebGLRenderer } from 'three';
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
const geometry = new BoxBufferGeometry()
const textureLoader = new TextureLoader()
const door = textureLoader.load('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.jiaju.com%2Fsupportsjiaju%2Fproduct%2F4e%2F29%2Fo145307001267698058.jpg&refer=http%3A%2F%2Fstatic.jiaju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658325079&t=6b37fb85aa1b3782733becbbc246d2dd')

// 白色对应区块会留下，黑色会被透明掉，
// 其实就是类似打光，白色会遮挡光，然后就看到了，黑色就直接传过去了
const alphaTexture = textureLoader.load('./texture/transparent.png')
console.log(alphaTexture);
const material = new MeshStandardMaterial({
  color: 0xffffff,
  map: door,
  alphaMap: alphaTexture,
  transparent: true
})
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
