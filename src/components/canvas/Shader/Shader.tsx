import * as THREE from 'three'
import {
  useFrame,
  extend,
  Object3DNode,
  MaterialNode,
  BufferGeometryNode,
  SphereBufferGeometryProps,
} from '@react-three/fiber'
import { MutableRefObject, useRef, useState } from 'react'
import { shaderMaterial } from '@react-three/drei'

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { useRouter } from 'next/router'

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    colorShiftMaterial: MaterialNode<
      ColorShiftMaterial,
      typeof ColorShiftMaterial
    >
  }
}

class ColorShiftMaterial extends shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
  },
  vertex,
  fragment
) {}

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
ColorShiftMaterial.key = THREE.MathUtils.generateUUID()

extend({ ColorShiftMaterial })

const Shader = (props) => {
  const meshRef = useRef<SphereBufferGeometryProps>(null)
  const [hovered, setHover] = useState(false)
  const router = useRouter()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
    }
    if (meshRef.current.material) {
      meshRef.current.material.uniforms.time.value +=
        Math.sin(delta / 2) * Math.cos(delta / 2)
    }
  })

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <sphereBufferGeometry />
      {/* <colorShiftMaterial key={ColorShiftMaterial.key} time={3} /> */}
    </mesh>
  )
}

export default Shader
