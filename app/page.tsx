"use client"
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import Model from "@/components/Untitled.jsx";
import Model from "@/components/PillBottle3.jsx";
import { useEffect, useState } from "react";
export default function Home() {
  const [scrollY, setScrollY] = useState<Number>(-1)
  const [titles, setTitles] = useState<String[]>([])
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
      <div className="h-screen w-full fixed">
      <Canvas camera={{zoom: 100}} orthographic>
        <spotLight position={[0, 0, 20]} angle={1} penumbra={0.5} intensity={500}/>
        <ambientLight intensity={0.6}/>
        {titles.map((product, index) => {
          const noOfModels = Math.floor(window.innerWidth / 384)
          const renderWidth = (17 / 5) * noOfModels
          const offset = renderWidth / (noOfModels * 2)
          if(index % noOfModels === 0){
            const runningcount = index
            //SKETCH AZ HELL
            if(runningcount + 5 > titles.length) return
          console.log("hit")
          return (
            <group key={index} position-y = { - ((index / noOfModels) * 5) }>
        
              {Array.from({ length: noOfModels }, (v, i) => {
                // Calculate the position for each model
                const position = offset + i * ( renderWidth / (noOfModels)) - (renderWidth / 2)
                return (
                  <Model key={i} pos={[position, scrollY, 0]} path={titles[runningcount + i % noOfModels]} />
                );
              })}
              {/* <Model pos={[-7,scrollY,0]} path={titles[runningcount]}/>
              <Model pos={[-3.5,scrollY,0]} path={titles[runningcount +1]}/>
              <Model pos={[0,scrollY,0]} path={titles[runningcount +2]}/>
              <Model pos={[3.5,scrollY,0]} path={titles[runningcount +3]}/>
              <Model pos={[7,scrollY,0]} path={titles[runningcount +4]}/> */}
            </group>
          )}
        })}
      </Canvas>
      </div>
    </main>
  );
}
