import { Canvas } from "@react-three/fiber";
import Can from "./Can"
import { OrbitControls } from "@react-three/drei";


type Props = {}

export default function Home({}: Props) {
  return (
    <div className="absolute w-screen h-[150vh]">
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[0, -2, 10]} intensity={5}/>
        <Can position={[0, -1, 0]} scale={0.2} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}