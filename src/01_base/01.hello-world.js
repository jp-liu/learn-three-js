import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
const geometry = new BoxGeometry(4, 4, 4)
const material = new MeshBasicMaterial({ color: 0xffffff })
const cube = new Mesh(geometry, material)
scene.add(cube)

// 4.渲染内容
const render = new WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(render.domElement)


// 5.轨道控制器
const orbit = new OrbitControls(camera, render.domElement)
orbit.update()

// 6.坐标轴
const axes = new AxesHelper(50)
scene.add(axes)

function renderScene() {
  requestAnimationFrame(renderScene)
  render.render(scene, camera)
}
renderScene()
