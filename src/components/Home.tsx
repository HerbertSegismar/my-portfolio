import { Canvas } from "@react-three/fiber";
import Can from "./Can"
import { OrbitControls } from "@react-three/drei";


type Props = {}

export default function Home({}: Props) {
  return (
    <div className="absolute w-screen h-[100vh] left-0">
      <h2 className="text-white ~text-5xl/8xl text-center tracking-wide uppercase drop-shadow-lg">
        Unleash the{" "}
        <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent font-bold">
          Spirit
        </span>
        , drink <br /> the Spice of{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-lime-500 bg-clip-text text-transparent font-bold">
          Lemon
        </span>
      </h2>
      <Canvas>
        <ambientLight intensity={3} />
        <Can position={[0, -1, 0]} scale={0.2} />
        <OrbitControls />
        <directionalLight position={[0, -2, 10]} intensity={5} />
      </Canvas>
    </div>
  );
}