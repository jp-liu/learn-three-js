import './assets/css/index.css'
import { AxesHelper, BoxGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
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
orbit.update()

// 6.坐标轴
const axes = new AxesHelper(5)
scene.add(axes)

// 设置始终
const clock = new Clock()

function renderScene(time) {
  // let time = clock.getElapsedTime()
  let deltaTime = clock.getDelta()
  // console.log('时钟运行总时长', time);
  console.log('两次获取时间间隔', deltaTime);

  // const t = time / 1000 % 5
  // cube.position.x = t * 1
  
  requestAnimationFrame(renderScene)
  render.render(scene, camera)
}
renderScene()
