import {
  BufferGeometryNode,
  extend,
  MaterialNode,
  useFrame,
} from '@react-three/fiber'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Plane, shaderMaterial } from '@react-three/drei'
import React from 'react'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { Mesh, ShaderMaterial } from 'three'

class NoiseMaterial extends shaderMaterial(
  {
    scale: 1.5,
    size: 0.2,
    density: 4.0,
    time: 0.0,
    bg: new THREE.Color('#111033'),
    yellow: new THREE.Color('#ffd600'),
    orange: new THREE.Color('#ff7300'),
  },
  vertex,
  fragment
) {}

extend({ NoiseMaterial })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    noiseMaterial: MaterialNode<NoiseMaterial, typeof NoiseMaterial>
  }
}

const Noise = () => {
  const Data = () => {
    const material = useRef<ShaderMaterial>()

    useFrame(({ clock }) => {
      material.current.uniforms.time.value = Math.sin(
        (2 * Math.PI * clock.getElapsedTime()) / 10
      )
    })

    return (
      <Plane args={[12, 14.75]}>
        <noiseMaterial ref={material} side={THREE.DoubleSide} />
      </Plane>
    )
  }

  return <Data />
}
export default Noise
