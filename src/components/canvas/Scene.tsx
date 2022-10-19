import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Extrude, OrbitControls, Center } from '@react-three/drei'
import React from 'react'

const extrudeSettings = { steps: 2, depth: 10, bevelEnabled: false }
const SIDE = 10

const Block = (props) => {
  const shape = React.useMemo(() => {
    const _shape = new THREE.Shape()

    _shape.moveTo(0, 0)
    _shape.lineTo(SIDE, 0)
    _shape.lineTo(SIDE, SIDE * 2)
    _shape.lineTo(0, SIDE * 2)
    _shape.lineTo(0, SIDE * 3)
    _shape.lineTo(-SIDE, SIDE * 3)
    _shape.lineTo(-SIDE, SIDE)
    _shape.lineTo(0, SIDE)

    return _shape
  }, [])

  return (
    <>
      <Extrude args={[shape, extrudeSettings]} {...props}>
        <meshPhysicalMaterial
          flatShading
          color='indigo'
          thickness={SIDE}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={1}
          transmission={0.8}
          ior={1.25}
          attenuationTint='#fff'
          attenuationDistance={0}
        />
      </Extrude>
    </>
  )
}

const Scene = () => {
  const router = useRouter()
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

  return (
    <>
      <mesh
        dpr={window.devicePixelRatio}
        camera={{ position: new THREE.Vector3(8, 5, 40) }}
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={1}
      >
        <color attach='background' args={['#06092c']} />
        <pointLight position={[-20, 10, 25]} />
        <gridHelper
          args={[100, 20, '#4D089A', '#4D089A']}
          position={[0, 0, -10]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Block />
        <OrbitControls autoRotate autoRotateSpeed={3} />
      </mesh>
    </>
  )
}
export default Scene
