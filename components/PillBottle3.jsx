import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
export default function Model(props) {
  const groupRef = useRef()
  const contRef = useRef()
  const { nodes, materials } = useGLTF('/pillBottle3.glb')
  const [center, setCenter] = useState(new THREE.Vector3(0,0,0))
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const { scale } = useSpring({ scale: hovered ? [1.5, 1.6, 1.5] : [1, 1.1, 1] })
  const { position } = useSpring({ position: hovered ? [0,  -0.7,  -0.5] :[0, 0, 0] })
  const { transmission } = useSpring({ transmission: active ? 1 : 0 })
  const texture = useTexture("/lables_jpeg/" + props.path)
  texture.flipY = false
  useEffect(() => {
    if (groupRef.current) {
      // Calculate the bounding box of the model
      const bbox = new THREE.Box3().setFromObject(groupRef.current)
      setCenter(bbox.getCenter(new THREE.Vector3()))
      groupRef.current.setCenter = bbox.getCenter(new THREE.Vector3())
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.pointer.x + Math.PI *1.05 - props.pos[0] / 10
      groupRef.current.rotation.x = -state.pointer.y * 0.2 
    }
  })

  
  return (
    <group ref={contRef} position={props.pos} onClick={() => {setActive(!active); props.onClick}}>
      <a.group ref={groupRef} {...props} dispose={null} position={position} onPointerEnter={() => setHovered(true)} scale={scale} onPointerLeave={() => setHovered(false)}  >
        <mesh geometry={nodes.Circle001.geometry} >
          <a.meshPhysicalMaterial side={THREE.DoubleSide} roughness={0.1}  transmission={transmission} thickness={0.5}/>
        </mesh>
        <mesh geometry={nodes.Circle_1.geometry} material={materials.img_mat}>
          <a.meshPhysicalMaterial map={texture}  opacity={active ? 0 : 1} transparent/>
        </mesh>
        <mesh geometry={nodes.Circle_1.geometry}>
          <a.meshPhysicalMaterial roughness={0.1} transmission={transmission} thickness={0.5} />
        </mesh>
        <mesh geometry={nodes.Circle_2.geometry} material={materials.material1}  >
          <a.meshPhysicalMaterial roughness={0.1}  transmission={transmission} thickness={0.5}/>
        </mesh>
      </a.group>
    </group>
  )
}

useGLTF.preload('/pillBottle3.glb')