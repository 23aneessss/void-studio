'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Flowing fbm-noise backdrop — the "WebGL distortion" behind the hero */
/* ------------------------------------------------------------------ */

const backdropVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const backdropFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uAspect;

  // value-noise + fbm
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uAspect;

    float t = uTime * 0.04;
    vec2 mouse = (uMouse - 0.5);
    mouse.x *= uAspect;

    // domain-warped fbm for the smoky distortion
    vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 4.2));
    float n = fbm(p * 2.2 + q * 1.4 + mouse * 0.4 + t);

    float glow = smoothstep(0.25, 0.95, n);
    vec3 col = mix(vec3(0.012), vec3(0.04), glow);

    // gold veins where the noise crests
    vec3 gold = vec3(0.788, 0.659, 0.298);
    float vein = pow(glow, 3.5);
    col += gold * vein * 0.22;

    // soft gold spotlight tracking the pointer
    float d = distance(uv * vec2(uAspect, 1.0), uMouse * vec2(uAspect, 1.0));
    col += gold * smoothstep(0.45, 0.0, d) * 0.10;

    // vignette to sink the edges into the void
    float vig = smoothstep(1.25, 0.25, length(p));
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Backdrop({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAspect: { value: 1 },
    }),
    []
  );

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    m.uniforms.uAspect.value = size.width / size.height;
    // ease the shader mouse toward the real pointer
    const target = mouse.current;
    m.uniforms.uMouse.value.x += (target.x - m.uniforms.uMouse.value.x) * 0.05;
    m.uniforms.uMouse.value.y += (target.y - m.uniforms.uMouse.value.y) * 0.05;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={backdropVertex}
        fragmentShader={backdropFragment}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Floating gold particle field                                       */
/* ------------------------------------------------------------------ */

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSpeed;
  varying float vAlpha;
  void main() {
    vec3 pos = position;
    pos.y = mod(pos.y + uTime * aSpeed * 0.25, 14.0) - 7.0;
    pos.x += sin(uTime * 0.2 * aSpeed + position.z) * 0.4;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (90.0 / -mv.z);
    vAlpha = smoothstep(7.0, 2.0, abs(pos.y)) * 0.9;
  }
`;

const particleFragment = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(0.82, 0.69, 0.33, a);
  }
`;

function Particles({ count = 320 }: { count?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      scales[i] = Math.random() * 1.6 + 0.4;
      speeds[i] = Math.random() * 1.2 + 0.3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    g.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    []
  );

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <points geometry={geo} scale={[1, 1, 1]} position={[0, 0, viewport.width > 8 ? -1 : 0]}>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */

export default function HeroCanvas() {
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const handlePointer = (e: React.PointerEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = 1 - e.clientY / window.innerHeight;
    mouse.current.set(x, y);
  };

  return (
    <div
      className="absolute inset-0 h-full w-full"
      onPointerMove={handlePointer}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Backdrop mouse={mouse} />
        <Particles />
      </Canvas>
    </div>
  );
}
