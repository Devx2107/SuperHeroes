import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const vertex = `varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragment = `
  varying vec2 vUv;
  uniform float uTime,uMode,uReveal,uIntensity;
  uniform vec3 uAccent;
  uniform vec2 uPointer;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+12.7;a*=.5;}return v;}
  void main(){
    vec2 uv=vUv+uPointer*.012;
    float mist=fbm(uv*5.+vec2(uTime*.022,-uTime*.012));
    float cloud=fbm(uv*3.-vec2(uTime*.014,0.));
    float beam=pow(max(0.,1.-abs(uv.x-.65-(1.-uv.y)*.17)*2.7),6.)*uv.y;
    vec3 color=vec3(.018,.022,.027)+uAccent*mist*.075;
    if(uMode<.5){
      vec3 ray=normalize(vec3((uv-.5)*vec2(2.4,1.4),-1.));
      float fog=0.,transmittance=1.;
      for(int step=0;step<16;step++){
        vec3 p=vec3(0.,.1,4.)+ray*(float(step)*.42);
        float density=fbm(p.xz*.6+vec2(uTime*.022,p.y*.15));
        density*=(1.-smoothstep(-1.2,1.2,p.y))*.06;
        fog+=density*transmittance;transmittance*=1.-density;
      }
      float shafts=pow(max(0.,sin((uv.x-uv.y*.18)*15.)),28.)*uv.y;
      color+=uAccent*(fog*.35+shafts*.055);
    }else if(uMode<1.5){
      float rays=pow(max(0.,cos(atan(uv.x-.65,1.1-uv.y)*32.+uTime*.03)),8.);
      color+=uAccent*(beam*.24+rays*beam*.11);
    }else if(uMode<2.5){
      vec2 p=uv-vec2(.65,.53);float a=atan(p.y,p.x),r=length(p);
      float spokes=pow(1.-abs(sin(a*8.)),40.);
      float rings=pow(1.-abs(sin(r*49.+sin(a*8.)*.8)),28.);
      color+=uAccent*(spokes+rings)*.10*(1.-smoothstep(uReveal*.9-.05,uReveal*.9,r));
      color+=vec3(.04,.06,.12)*pow(noise(uv*80.),18.);
    }else if(uMode<3.5){
      float storm=pow(cloud,3.);float flash=pow(max(0.,sin(uTime*1.4)),38.);
      color+=uAccent*(storm*.48+flash*cloud*.18);
    }else{
      vec2 grid=abs(fract(uv*vec2(40.,24.))-.5);
      float lines=1.-smoothstep(.015,.035,min(grid.x,grid.y));
      float scan=pow(max(0.,1.-abs(uv.y-fract(uTime*.08))*25.),3.);
      color+=uAccent*(lines*.045+scan*.09);
    }
    float vignette=1.-smoothstep(.2,.9,length((vUv-.5)*vec2(1.,.8)));
    gl_FragColor=vec4(color*vignette*uIntensity,1.);
  }
`;
const particleVertex = `
  uniform float uTime,uMode,uReveal; attribute float aSeed; varying float vAlpha;
  void main(){vec3 p=position;
    if(uMode<.5){p.y=mod(p.y+uTime*.08+4.,8.)-4.;p.x+=sin(uTime*.22+aSeed*20.)*.18;}
    else if(uMode>3.5){float a=uTime*.16+aSeed*6.283;p.x+=sin(a)*.3;p.y+=cos(a)*.3;}
    else{p.y+=sin(uTime*.3+aSeed*12.)*.15;}
    vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
    gl_PointSize=clamp((uMode>3.5?12.:18.)/-mv.z,1.,5.);
    vAlpha=(.2+.8*aSeed)*uReveal;
  }
`;
const particleFragment = `uniform vec3 uAccent; varying float vAlpha; void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(uAccent,(1.-smoothstep(.05,.5,d))*vAlpha*.65);}`;
const modes = { batman: 0, superman: 1, spiderman: 2, thor: 3, ironman: 4 };
const motifModes = { shadow: 0, crystal: 1, web: 2, storm: 3, reactor: 4 };

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose();
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach((material) => material?.dispose());
  });
}

export function createSceneEngine(canvas, initial, report = () => {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(initial.dpr || 1, 1.5));
  renderer.setSize(initial.width, initial.height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    42,
    initial.width / initial.height,
    0.1,
    40,
  );
  camera.position.z = 8;
  const uniforms = {
    uTime: { value: 0 },
    uMode: { value: 0 },
    uReveal: { value: 0 },
    uIntensity: { value: 1 },
    uAccent: { value: new THREE.Color("#ed5444") },
    uPointer: { value: new THREE.Vector2() },
  };
  const atmosphere = new THREE.Mesh(
    new THREE.PlaneGeometry(38, 22),
    new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      depthWrite: false,
    }),
  );
  atmosphere.position.z = -8;
  scene.add(atmosphere);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(initial.width / 2, initial.height / 2),
    0.5,
    0.4,
    0.8,
  );
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  let current,
    outgoing,
    activeHero,
    visible = true,
    quality = "high",
    destroyed = false;
  let started = performance.now(),
    last = started,
    transitionTime = started,
    frames = 0,
    totalFrame = 0;
  const pointer = { x: 0, y: 0 };
  const pointerTarget = new THREE.Vector2();
  let viewportWidth = initial.width,
    viewportHeight = initial.height,
    viewportDpr = initial.dpr || 1;

  function buildGroup(mode, accent) {
    const group = new THREE.Group();
    const localUniforms = {
      uTime: uniforms.uTime,
      uMode: { value: mode },
      uReveal: { value: 0 },
      uAccent: { value: new THREE.Color(accent) },
    };
    const count = mode === 4 ? 5000 : mode === 0 ? 2600 : 900;
    const positions = new Float32Array(count * 3),
      seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = -Math.random() * 7;
      seeds[i] = Math.random();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const points = new THREE.Points(
      geometry,
      new THREE.ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: localUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    group.add(points);
    const material = new THREE.MeshBasicMaterial({
      color: accent,
      wireframe: mode !== 1,
      transparent: true,
      opacity: 0.2,
    });
    if (mode === 1) {
      const shards = new THREE.InstancedMesh(
        new THREE.OctahedronGeometry(0.08),
        material,
        90,
      );
      const dummy = new THREE.Object3D();
      for (let i = 0; i < 90; i++) {
        dummy.position.set(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 7,
          -Math.random() * 5,
        );
        dummy.scale.set(1, 2 + Math.random() * 4, 1);
        dummy.rotation.set(Math.random() * 3, Math.random() * 3, 0);
        dummy.updateMatrix();
        shards.setMatrixAt(i, dummy.matrix);
      }
      group.add(shards);
    } else if (mode === 4) {
      for (let i = 0; i < 4; i++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.7 + i * 0.28, 0.007, 4, 100),
          material,
        );
        ring.position.set(1.8, 0.2, -1 - i * 0.2);
        ring.rotation.x = i * 0.12;
        group.add(ring);
      }
    } else if (mode === 2) {
      material.dispose();
      const vertices = [];
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        vertices.push(
          2,
          0,
          -2,
          2 + Math.cos(angle) * 6,
          Math.sin(angle) * 4,
          -3,
        );
        for (let r = 1; r < 6; r++) {
          const next = ((i + 1) / 16) * Math.PI * 2;
          vertices.push(
            2 + Math.cos(angle) * r,
            Math.sin(angle) * r * 0.7,
            -2,
            2 + Math.cos(next) * r,
            Math.sin(next) * r * 0.7,
            -2,
          );
        }
      }
      const web = new THREE.BufferGeometry();
      web.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      web.setDrawRange(0, 0);
      const lines = new THREE.LineSegments(
        web,
        new THREE.LineBasicMaterial({
          color: accent,
          transparent: true,
          opacity: 0.22,
        }),
      );
      lines.userData.web = true;
      group.add(lines);
    } else if (mode === 3) {
      material.dispose();
      const positions = new Float32Array(12 * 10 * 6);
      const arcs = new THREE.BufferGeometry();
      arcs.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const lightning = new THREE.LineSegments(
        arcs,
        new THREE.LineBasicMaterial({
          color: "#b5ceff",
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
        }),
      );
      lightning.userData.lightning = true;
      group.add(lightning);
    } else {
      material.dispose();
    }
    group.userData.uniforms = localUniforms;
    group.userData.mode = mode;
    group.userData.count = count;
    scene.add(group);
    return group;
  }

  function hero(id, accent, motif) {
    if (id === activeHero || destroyed) return;
    activeHero = id;
    if (outgoing) {
      scene.remove(outgoing);
      disposeObject(outgoing);
    }
    outgoing = current;
    const mode = motifModes[motif] ?? modes[id] ?? 1;
    current = buildGroup(mode, accent);
    transitionTime = performance.now();
    uniforms.uMode.value = mode;
    uniforms.uAccent.value.set(accent);
    uniforms.uReveal.value = 0;
    renderer
      .compileAsync(scene, camera)
      .then(() => {
        if (!destroyed && activeHero === id)
          report({
            type: "ready",
            hero: id,
            motif: Object.keys(motifModes)[mode],
          });
      })
      .catch(() => {});
  }
  function resize(width, height, dpr = 1) {
    viewportWidth = Math.max(1, width);
    viewportHeight = Math.max(1, height);
    viewportDpr = dpr;
    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(dpr, quality === "high" ? 1.5 : 1));
    renderer.setSize(viewportWidth, viewportHeight, false);
    composer.setSize(viewportWidth, viewportHeight);
  }
  function update(now = performance.now()) {
    if (destroyed || !visible) {
      last = now;
      return;
    }
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    uniforms.uTime.value += delta;
    const progress = Math.min((now - transitionTime) / 1100, 1);
    uniforms.uReveal.value = progress;
    uniforms.uPointer.value.lerp(
      pointerTarget.set(pointer.x, pointer.y),
      0.045,
    );
    camera.position.x += (pointer.x * 0.12 - camera.position.x) * 0.035;
    camera.position.y += (-pointer.y * 0.08 - camera.position.y) * 0.035;
    if (current) {
      current.userData.uniforms.uReveal.value = progress;
      current.rotation.y = pointer.x * 0.022;
      current.children.forEach((child, index) => {
        if (child.userData.web)
          child.geometry.setDrawRange(
            0,
            Math.floor(
              (child.geometry.attributes.position.count * progress) / 2,
            ) * 2,
          );
        if (child.userData.lightning) {
          const arr = child.geometry.attributes.position.array;
          const flash = Math.pow(
            Math.max(0, Math.sin(uniforms.uTime.value * 1.4)),
            30,
          );
          child.material.opacity = flash * 0.85;
          if (flash > 0.15) {
            for (let i = 0; i < arr.length; i += 6) {
              const segment = (i / 6) % 10,
                arc = Math.floor(i / 60);
              const xx = (arc % 4) * 2.5 - 4;
              arr[i] =
                xx + Math.sin(segment * 4 + uniforms.uTime.value * 20) * 0.18;
              arr[i + 1] = 3.5 - segment * 0.5;
              arr[i + 2] = -2;
              arr[i + 3] =
                xx +
                Math.sin((segment + 1) * 4 + uniforms.uTime.value * 20) * 0.18;
              arr[i + 4] = 3.5 - (segment + 1) * 0.5;
              arr[i + 5] = -2;
            }
            child.geometry.attributes.position.needsUpdate = true;
          }
        }
        if (current.userData.mode === 4 && index > 0)
          child.rotation.z += delta * (index % 2 ? 0.08 : -0.12);
      });
    }
    if (outgoing) {
      outgoing.userData.uniforms.uReveal.value = 1 - progress;
      if (progress === 1) {
        scene.remove(outgoing);
        disposeObject(outgoing);
        outgoing = null;
      }
    }
    if (quality === "high") composer.render();
    else renderer.render(scene, camera);
    frames++;
    totalFrame += delta * 1000;
    if (frames % 180 === 0) {
      report({
        type: "stats",
        hero: activeHero,
        particles: current?.userData.count,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        frameMs: +(totalFrame / 180).toFixed(1),
      });
      totalFrame = 0;
    }
  }
  hero(initial.hero, initial.accent, initial.motif);
  report({ type: "initialized" });
  return {
    update,
    hero,
    resize,
    pointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
    visibility(value) {
      visible = value;
      last = performance.now();
    },
    quality(value) {
      quality = value;
      resize(viewportWidth, viewportHeight, viewportDpr);
    },
    intensity(value) {
      uniforms.uIntensity.value = value;
    },
    dispose() {
      destroyed = true;
      disposeObject(scene);
      bloom.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
