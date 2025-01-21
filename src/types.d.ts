declare module "*.glb" {
  const content: string;
  export default content;
}

export interface GLTFResult {
  nodes: {
    Circle004: THREE.Mesh;
    Circle004_1: THREE.Mesh;
    Tab: THREE.Mesh;
  };
  materials: {
    TopOfCan: THREE.Material;
    CanArt: THREE.Material;
  };
}
