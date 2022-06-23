import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";

export function createPlane(context) {
  const planeGeometry = new PlaneGeometry(100, 100)
  const g = new MeshBasicMaterial({color: 0xffffff})
  const mesh = new Mesh(planeGeometry, g)
  console.log(mesh);
  context.scene.add(mesh)
}
