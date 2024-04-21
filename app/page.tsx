"use client"
import { Environment, OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "@/components/PillBottle3.jsx";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
export default function Home() {
  const [scrollY, setScrollY] = useState<Number>(-1)
  const [titles, setTitles] = useState<String[]>([])
  const [isMaskVisible, setIsMaskVisible] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      setScrollY(window.scrollY /100 )
    }
    
  fetch("/api")
  .then((res) => res.json())
  .then((data) => setTitles(data));
  },[])
  
  return (
    <main className="w-full h-[700vh]">
      {/* <div className={styles.mask}>
        <div className=" bg-slate-900 w-screen h-screen">
          testtttt
        </div>
      </div> */}
      <div className="h-screen w-full fixed">
      <Canvas camera={{zoom: 100}} orthographic shadows>
        {/* <OrbitControls /> */}
        <Plane scale={20} position={[0,0,-3]} receiveShadow>
          <meshStandardMaterial color="white" />
        </Plane>
        <spotLight position={[0, 0, 20]} angle={1} penumbra={0.5} intensity={500} castShadow shadow-mapSize-width={2048 * 2} 
        shadow-mapSize-height={2048 * 2}/>
        <ambientLight intensity={0.6}/>
        {titles.map((product, index) => {
          const noOfModels = Math.floor(window.innerWidth / 384)
          const renderWidth = (17 / 5) * noOfModels
          const offset = renderWidth / (noOfModels * 2)
          if(index % noOfModels === 0){
            const runningcount = index
          return (
            <group key={index} position-y = { - ((index / noOfModels) * 5) }>
        
              {Array.from({ length: noOfModels }, (v, i) => {
                // Calculate the position for each model
                const position = offset + i * ( renderWidth / (noOfModels)) - (renderWidth / 2)
                if (titles[runningcount + i % noOfModels]){
                return (
                  <Model key={i} pos={[position, scrollY, 0]} path={titles[runningcount + i % noOfModels]} onClick={() => setIsMaskVisible(true)} />
                  );}
                else return null
              })}
            </group>
          )}
        })}
      </Canvas>
      </div>
    </main>
  );
}
