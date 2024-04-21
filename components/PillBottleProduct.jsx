import React, { useRef, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { Box3, Vector3, DoubleSide } from 'three';
import { useFrame } from '@react-three/fiber';

export default function Model(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/pillBottle3.glb')
  const texture = useTexture("/labels_out/" + props.path)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() / 5
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() ) -1.8
    }
  }
  )
  useEffect(() => {
    if (groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new Vector3());
      groupRef.current.position.x -= center.x;
      groupRef.current.position.y -= center.y;
      groupRef.current.position.z -= center.z;
    }
  }, []);

  return (
    <group ref={groupRef} {...props} dispose={null} scale={[1,1.1,1]}>
      <mesh geometry={nodes.Circle001.geometry} >
        <meshStandardMaterial side={2} roughness={0.1} />
      </mesh>
      <mesh geometry={nodes.Circle_1.geometry} material={materials.img_mat} >
        <meshStandardMaterial roughness={0} map={texture}/>
      </mesh>
      <mesh geometry={nodes.Circle_2.geometry} material={materials.material1}>
        <meshStandardMaterial roughness={0.1} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/pillBottle3.glb')