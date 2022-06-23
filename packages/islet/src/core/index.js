import { Mesh, MeshBasicMaterial, MeshStandardMaterial, Scene, SphereBufferGeometry, TextureLoader, VideoTexture } from "three";
import { createCamera } from "./camera";
import { createRender } from "./render";
import { createOrbitControl } from "./control";

export function setupThree() {
  const context = createContext()
  const camera = createCamera(context)
  const render = createRender(context)

  const container = context.container = document.body
  container.appendChild(render.domElement)

  const control = createOrbitControl(context)

  // createPlane(context)
  const sphereGeometry = new SphereBufferGeometry(1000, 60, 40)
  const sphereMaterial = new MeshBasicMaterial({
    map: new TextureLoader().load('textures/sky.jpg')
  })
  sphereGeometry.scale(1, 1, -1)
  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.name = 'sphere'
  context.add(sphere)

  // 视频纹理
  const video = document.createElement('video')
  video.src = './textures/sky.mp4'
  video.loop = true
  window.addEventListener('click', () => {
    if (video.paused) {
      video.play()
      sphereMaterial.map = new VideoTexture(video)
      sphereMaterial.map.needsUpdate = true
    }
  })

  function animationFrame() {
    render.render(context.scene, camera)
    requestAnimationFrame(animationFrame)
  }

  animationFrame()
}

function createContext() {
  const context = {
    width: 0,
    height: 0,
    cameraOptions: { fov: 75, aspect: 0, near: 0.5, far: 2000 },
    scene: new Scene(),

    add(item) {
      this.scene.add(item)
    },

    updateSize({ width, height, ratio }) {
      this.camera.aspect = ratio
      this.camera.updateProjectionMatrix()
      this.render.setSize(width, height)
    }
  }

  const { width, height, ratio } = useWindowSize('getSize', context.updateSize.bind(context))
  context.width = width
  context.height = height
  context.cameraOptions.aspect = ratio

  return context
}

const events = {}
function useWindowSize(eventName, cb) {
  if (eventName) {
    if (events[eventName]) events[eventName].push(cb)
    else events[eventName] = [cb]
  }

  const obj = {
    width: window.innerWidth,
    height: window.innerHeight,
    ratio: window.innerWidth / window.innerHeight,
  }

  window.addEventListener('resize', () => {
    const obj = {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight,
    }
    events[eventName].forEach(cb => cb(obj))
  })

  return obj
}

// // 监听屏幕的大小改变，修改渲染器的宽高，相机的比例
// window.addEventListener("resize", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // 实例化控制器
// const controls = new OrbitControls(camera, renderer.domElement);

// function render() {
//   // 渲染场景
//   renderer.render(scene, camera);
//   // 引擎自动更新渲染器
//   requestAnimationFrame(render);
// }
// render();

// // 添加平面
// const planeGeometry = new THREE.PlaneGeometry(100, 100);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
