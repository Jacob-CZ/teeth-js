"use client"
import { Environment, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Model from "@/components/PillBottle3.jsx";
import { use, useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";
import useMousePosition from "@/components/useMousePosition";
import { motion } from 'framer-motion';
import { tree } from "next/dist/build/templates/app-page";
import ProductPage from "@/components/productPage";
const DisableRender = () => useFrame(() => null, 1000)
export default function Home() {
  const [scrollY, setScrollY] = useState<Number>(-1)
  const [titles, setTitles] = useState<String[]>([])
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const maskRef = useRef<HTMLDivElement>(null);
  const size = isHovered ? 5000 : 0;
  useEffect(() => {
    window.onscroll = () => {
      setScrollY(window.scrollY /100 )
    }
    
  fetch("/api")
  .then((res) => res.json())
  .then((data) => setTitles(data));
  },[])
  useEffect(() => {
    if (isHovered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
  , [isHovered]);

  return (
    <main className="w-full h-[700vh]">
      <div ref={maskRef} className={styles.mask} style={{maskPosition : `50% 50%`, maskSize : `${size}px ${size}px`, pointerEvents : isHovered ? "all" : "none"}} >
        <ProductPage returnToEshop={() => setIsHovered(false)} product={selectedProduct} acitve={isHovered}/>
      </div>
      <div className="h-screen w-full fixed">
      <Canvas camera={{zoom: 100}} orthographic >
        {isHovered && <DisableRender/>}
        {/* <OrbitControls /> */}
        <Plane scale={20} position={[0,0,-3]}>
          <meshStandardMaterial color={"#FCFBE4"}  />
        </Plane>
        <spotLight position={[0, 0, 20]} angle={1} penumbra={0.5} intensity={500} color={"#FCFBE4"} />
        <ambientLight intensity={1.5} color={"#FCFBE4"} />
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
                  <Model key={i} pos={[position, scrollY, 0]} path={titles[runningcount + i % noOfModels]} onClick={() => setIsHovered(true)}  setProduct={(product:string) => setSelectedProduct(product)}/>
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
