"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
// @ts-expect-error - maath types
import * as random from "maath/random/dist/maath-random.esm";

// Light beam / spectrum effect
function LightBeam({ scrollProgress }: { scrollProgress: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (meshRef.current && lightRef.current) {
            // Move light based on scroll
            const angle = scrollProgress * Math.PI * 4;
            meshRef.current.position.x = Math.cos(angle) * 2;
            meshRef.current.position.y = Math.sin(angle) * 2;

            lightRef.current.position.copy(meshRef.current.position);

            // Pulse effect
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 1;
            lightRef.current.intensity = pulse * 3;
        }
    });

    return (
        <group>
            {/* Light source */}
            <pointLight ref={lightRef} color="#00f597" intensity={3} distance={10} />

            {/* Visible light sphere */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshBasicMaterial color="#00f597" />
            </mesh>

            {/* Light cone/beam */}
            <mesh position={[0, 0, 0]}>
                <coneGeometry args={[0.5, 3, 32, 1, true]} />
                <meshBasicMaterial
                    color="#00f597"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

// Spectrum particles that react to scroll
function SpectrumParticles({ scrollProgress }: { scrollProgress: number }) {
    const ref = useRef<THREE.Points>(null);

    const count = 3000;
    const positions = useMemo(() => {
        return random.inSphere(new Float32Array(count * 3), { radius: 3 });
    }, []);

    const colors = useMemo(() => {
        const colors = new Float32Array(count * 3);
        const color1 = new THREE.Color("#00f597"); // green
        const color2 = new THREE.Color("#64c6fc"); // blue
        const color3 = new THREE.Color("#d865f3"); // purple

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const mixFactor = i / count;
            let color;

            if (mixFactor < 0.33) {
                color = color1.clone().lerp(color2, mixFactor * 3);
            } else if (mixFactor < 0.66) {
                color = color2.clone().lerp(color3, (mixFactor - 0.33) * 3);
            } else {
                color = color3.clone().lerp(color1, (mixFactor - 0.66) * 3);
            }

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        return colors;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Rotate based on scroll
            ref.current.rotation.y = scrollProgress * Math.PI * 2;
            ref.current.rotation.x = scrollProgress * Math.PI;

            // Pulse size
            const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1;
            ref.current.scale.setScalar(scale);
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.01}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
            <bufferAttribute
                attach="attributes-color"
                count={colors.length / 3}
                array={colors}
                itemSize={3}
            />
        </Points>
    );
}

// Tunnel effect that changes with scroll
function ScrollTunnel({ scrollProgress }: { scrollProgress: number }) {
    const ref = useRef<THREE.Points>(null);

    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 2;
            const angle = Math.random() * Math.PI * 2;
            pos[i3] = Math.cos(angle) * radius;
            pos[i3 + 1] = Math.sin(angle) * radius;
            pos[i3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array as Float32Array;
            const speed = 1 + scrollProgress * 3; // Speed increases with scroll

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3 + 2] += delta * speed;
                if (positions[i3 + 2] > 5) {
                    positions[i3 + 2] = -5;
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#64c6fc"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// Camera controller based on scroll
function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
    const { camera } = useThree();

    useFrame(() => {
        // Move camera based on scroll
        camera.position.z = 1 + scrollProgress * 5;
        camera.position.y = scrollProgress * 2;
        camera.lookAt(0, scrollProgress * 2, 0);
    });

    return null;
}

// Main scene component
function Scene({ scrollProgress }: { scrollProgress: number }) {
    return (
        <>
            <ScrollCamera scrollProgress={scrollProgress} />
            <ambientLight intensity={0.2} />





            {/* Additional atmospheric lights */}
        </>
    );
}

export function FullscreenCanvas() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / scrollHeight;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                <Scene scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    );
}
