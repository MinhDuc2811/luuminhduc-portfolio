'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STARS = [
  { x: 5, y: 42 }, { x: 14, y: 25 }, { x: 22, y: 44 }, { x: 34, y: 30 },
  { x: 41, y: 42 }, { x: 52, y: 28 }, { x: 61, y: 40 }, { x: 68, y: 26 },
  { x: 78, y: 44 }, { x: 88, y: 32 }, { x: 95, y: 41 },
]
const TREES_FAR = [10, 18, 33, 47, 63, 80, 91]
const TREES_MID = [14, 45, 68, 87]
const TREES_NEAR = [24, 55, 72]
const GROUND_LIGHTS = [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99]
const CHARACTER_X = 38

const RIDGE_FAR_POINTS: [number, number][] = [
  [0, 22], [8, 25], [16, 21], [26, 27], [36, 23], [46, 28],
  [56, 24], [66, 29], [76, 25], [86, 28], [100, 24],
]
const RIDGE_MID_POINTS: [number, number][] = [
  [0, 15], [10, 17], [20, 14], [32, 18], [42, 14],
  [54, 19], [66, 15], [78, 20], [90, 16], [100, 18],
]
const RIDGE_NEAR_POINTS: [number, number][] = [
  [0, 8], [10, 10], [20, 7], [30, 11], [42, 7],
  [52, 12], [64, 8], [74, 13], [84, 9], [100, 11],
]

function ridgeHeightAt(x: number, points: [number, number][]): number {
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    if (x >= x1 && x <= x2) {
      const t = (x - x1) / (x2 - x1)
      return y1 + (y2 - y1) * t
    }
  }
  return points[points.length - 1][1]
}

const AMBER = '#f0b429'
const TEAL = '#4fd1c5'
const STAR_COLOR = '#e8eaed'
const RIDGE_FAR = '#161b26'
const RIDGE_MID = '#1c2432'
const RIDGE_NEAR = '#242e3d'
const GROUND_LINE = '#1d232e'

// scene space: x in [0,100], y in [0,50] (y grows upward), z used purely for layering
function Tree({ x, y, scale = 1, z = 0.1 }: { x: number; y: number; scale?: number; z?: number }) {
  return (
    <group position={[x, y, z]} scale={scale}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.8, 2, 0.1]} />
        <meshBasicMaterial color="#285a55" />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[3.2, 1.6, 0.1]} />
        <meshBasicMaterial color="#2f6b64" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[2.4, 1.6, 0.1]} />
        <meshBasicMaterial color="#2f6b64" />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[1.6, 1.6, 0.1]} />
        <meshBasicMaterial color="#2f6b64" />
      </mesh>
    </group>
  )
}

function Character({ x, y, scale = 1, z = 2.6 }: { x: number; y: number; scale?: number; z?: number }) {
  return (
    <group position={[x, y, z]} scale={scale}>
      {/* legs */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.6, 1.6, 0.1]} />
        <meshBasicMaterial color="#161b26" />
      </mesh>
      {/* body */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[2.2, 2.4, 0.1]} />
        <meshBasicMaterial color={AMBER} />
      </mesh>
      {/* head */}
      <mesh position={[0, 4.6, 0]}>
        <boxGeometry args={[1.6, 1.4, 0.1]} />
        <meshBasicMaterial color="#e8b98a" />
      </mesh>
      {/* hat */}
      <mesh position={[0, 5.5, 0]}>
        <boxGeometry args={[2, 0.9, 0.1]} />
        <meshBasicMaterial color="#161b26" />
      </mesh>
    </group>
  )
}

function Twinkle({ x, y, size, color, delay, z = 0.05 }: { x: number; y: number; size: number; color: string; delay: number; z?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() + delay
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 1.6))
  })
  return (
    <mesh ref={ref} position={[x, y, z]}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial color={color} transparent opacity={1} />
    </mesh>
  )
}

function Sun() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.85 + 0.15 * Math.sin(t * 1.2)
  })
  return (
    <mesh ref={ref} position={[93, 43, 0.05]}>
      <circleGeometry args={[2, 16]} />
      <meshBasicMaterial color={AMBER} transparent opacity={1} />
    </mesh>
  )
}

function Ridge({ points, color, z }: { points: [number, number][]; color: string; z: number }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(points[0][0], points[0][1])
    points.slice(1).forEach(([x, y]) => s.lineTo(x, y))
    s.lineTo(100, 0)
    s.lineTo(0, 0)
    s.closePath()
    return s
  }, [points])

  return (
    <mesh position={[0, 0, z]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <mesh position={[50, 25, -1]}>
        <planeGeometry args={[100, 50]} />
        <meshBasicMaterial color="#0a0e14" />
      </mesh>

      {STARS.map((s, i) => (
        <Twinkle key={`star-${i}`} x={s.x} y={s.y} size={0.5} color={STAR_COLOR} delay={(i % 5) * 0.6} />
      ))}

      <Sun />

      <Ridge points={RIDGE_FAR_POINTS} color={RIDGE_FAR} z={1} />
      {TREES_FAR.map((x, i) => (
        <Tree key={`tf-${i}`} x={x} y={ridgeHeightAt(x, RIDGE_FAR_POINTS)} scale={0.9} z={1.5} />
      ))}

      <Ridge points={RIDGE_MID_POINTS} color={RIDGE_MID} z={1.8} />
      {TREES_MID.map((x, i) => (
        <Tree key={`tm-${i}`} x={x} y={ridgeHeightAt(x, RIDGE_MID_POINTS)} scale={1.2} z={1.9} />
      ))}

      <Ridge points={RIDGE_NEAR_POINTS} color={RIDGE_NEAR} z={2} />
      {TREES_NEAR.map((x, i) => (
        <Tree key={`tn-${i}`} x={x} y={ridgeHeightAt(x, RIDGE_NEAR_POINTS)} scale={1.6} z={2.5} />
      ))}

      <Character x={CHARACTER_X} y={ridgeHeightAt(CHARACTER_X, RIDGE_NEAR_POINTS)} scale={1.4} z={5} />

      <mesh position={[50, 1.5, 3]}>
        <planeGeometry args={[100, 1]} />
        <meshBasicMaterial color={GROUND_LINE} />
      </mesh>
      {GROUND_LIGHTS.map((x, i) => (
        <Twinkle key={`gl-${i}`} x={x} y={1.8} size={0.6} color={TEAL} delay={(i % 4) * 0.4} z={3.1} />
      ))}
    </>
  )
}

export default function PixelLandscape() {
  return (
    <div className="w-full h-[150px] bg-bg" style={{ imageRendering: 'pixelated' }}>
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 10] }}
        onCreated={({ camera, size }) => {
          const cam = camera as THREE.OrthographicCamera
          cam.left = 0
          cam.right = 100
          cam.top = 50
          cam.bottom = 0
          cam.near = 0.1
          cam.far = 20
          cam.updateProjectionMatrix()
        }}
        gl={{ antialias: false }}
        dpr={1}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
