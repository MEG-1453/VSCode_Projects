import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Text,
  MeshTransmissionMaterial,
  Environment,
  Float,
  OrbitControls,
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'

// Kristal Obje (Ana Odak)
const CrystalShape = () => {
  const mesh = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = t * 0.2
    mesh.current.rotation.y = t * 0.25
  })

  return (
    <mesh ref={mesh}>
      {/* Geometri: Karmaşık bir düğüm şekli */}
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />

      {/* MATERYAL: İşte olayı bitiren yer burası. 
          Normal material değil, ışığı kıran TransmissionMaterial */}
      <MeshTransmissionMaterial
        backside
        backsideThickness={5}
        thickness={2}
        roughness={0}
        transmission={1} // Tam geçirgenlik (Cam)
        ior={1.5} // Kırılma indisi (Cam gibi davran)
        chromaticAberration={1} // Renklerin kenarlarda ayrışması (Gökkuşağı etkisi)
        anisotropy={20}
        distortion={0.5} // Işığı bükme
        distortionScale={0.5}
        temporalDistortion={0.2}
        color={"#a2d2ff"} // Hafif buz mavisi tonu
      />
    </mesh>
  )
}

// Arka Plandaki Yazı (Camın arkasından gözükecek)
const BackgroundText = () => {
  return (
    <group position={[0, 0, -2]}>
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        fontSize={3}
        color="white"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 0]}
        fillOpacity={0.5}
      >
        REACT
      </Text>
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        fontSize={1.5}
        color="#ff99c8"
        anchorX="center"
        anchorY="middle"
        position={[0, -1, 0]}
      >
        THREE FIBER
      </Text>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000000' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>

        {/* Ortam Rengi */}
        <color attach="background" args={['#101010']} />

        {/* Yazılar */}
        <BackgroundText />

        {/* Süzülen Kristal */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <CrystalShape />
        </Float>

        {/* Gerçekçi Işıklandırma Ortamı (HDR) 
            City, Studio, Apartment gibi hazır setler var. */}
        <Environment preset="city" />

        {/* Yere Vuran Gölge */}
        <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#4fa3d1" />

        {/* Kontrol */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}