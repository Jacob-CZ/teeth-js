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
        {/* <OrbitControls/> */}
        <spotLight position={[0, 0, 20]} angle={1} penumbra={0.5} intensity={500}/>
        <ambientLight intensity={0.6}/>
        {titles.map((product, index) => {
          if(index % 5 === 0){
            const runningcount = index
            console.log(runningcount)
            if(runningcount + 5 > titles.length) return
          return (
            <group key={index} position-y = { -index}>
              <Model pos={[-7,scrollY,0]} path={titles[runningcount]}/>
              <Model pos={[-3.5,scrollY,0]} path={titles[runningcount +1]}/>
              <Model pos={[0,scrollY,0]} path={titles[runningcount +2]}/>
              <Model pos={[3.5,scrollY,0]} path={titles[runningcount +3]}/>
              <Model pos={[7,scrollY,0]} path={titles[runningcount +4]}/>
            </group>
          )}
        })}
      </Canvas>
      </div>
    </main>
  );
}
