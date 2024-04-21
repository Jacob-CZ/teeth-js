import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
export default function Model(props) {
  const groupRef = useRef()
  const contRef = useRef()
  const { nodes, materials } = useGLTF('/pillBottle3.glb')
  const [hovered, setHovered] = useState(false)
  const { scale } = useSpring({ scale: hovered ? [1.5, 1.6, 1.5] : [1, 1.1, 1] })
  const { position } = useSpring({ position: hovered ? [0,  -0.7,  -0.5] :[0, 0, 0] })
  const texture = useTexture("/labels_out/" + props.path)
  useTexture.preload("/labels_out/" + props.path)
  texture.flipY = false
  useEffect(() => {
    if (groupRef.current) {
      // Calculate the bounding box of the model
      const bbox = new THREE.Box3().setFromObject(groupRef.current)
      groupRef.current.setCenter = bbox.getCenter(new THREE.Vector3())
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.pointer.x + Math.PI *1.05 - props.pos[0] / 10
      groupRef.current.rotation.x = -state.pointer.y * 0.2 
    }
  })
  const handleClick = () => {
    props.onClick()
    props.setProduct(props.path)
  }


  
  return (
    <group ref={contRef} position={props.pos} onClick={handleClick} castShadow>
      <a.group ref={groupRef} {...props} dispose={null} position={position} onPointerEnter={() => setHovered(true)} scale={scale} onPointerLeave={() => setHovered(false)}  >
        <mesh geometry={nodes.Circle001.geometry} castShadow>
          <meshStandardMaterial side={THREE.DoubleSide} roughness={0.1}  />
        </mesh>
        <mesh geometry={nodes.Circle_1.geometry} material={materials.img_mat} castShadow>
          <meshStandardMaterial map={texture} roughness={0} transparent/>
        </mesh>
        <mesh geometry={nodes.Circle_2.geometry} material={materials.material1} castShadow >
          <meshStandardMaterial roughness={0.1}/>
        </mesh>
      </a.group>
    </group>
  )
}

useGLTF.preload('/pillBottle3.glb')
