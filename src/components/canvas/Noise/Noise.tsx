import { extend, useFrame } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Plane, shaderMaterial } from '@react-three/drei'
import React from 'react'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'

const Noise = () => {
  const router = useRouter()
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

  const NoiseMaterial = shaderMaterial(
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
  )

  extend({ NoiseMaterial })

  const Data = () => {
    const material = useRef()

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

  return (
    <>
      <mesh
        dpr={window.devicePixelRatio}
        camera={{ position: new THREE.Vector3(0, 0, 10) }}
      >
        <Data />
      </mesh>
    </>
  )
}
export default Noise
