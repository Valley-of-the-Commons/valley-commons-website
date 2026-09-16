// The Constellation of the Commons, vanilla-three twin of the Learn AI London
// /valley 3D view (src/app/valley/ValleyGraph.tsx). The three category axes are
// the three spatial dimensions: solar/lunar on X, global/local on Y, vision/impl
// on Z. Each talk is a glowing node placed by its tags; hover or tap blooms a
// label (title, speaker, three emoji) that links to the companion. three.js and
// its helpers are loaded from a pinned CDN on demand, so the rest of the static
// site pays nothing until the reader opens this view.

const THREE_URL = "https://esm.sh/three@0.184.0";
const OC_URL = "https://esm.sh/three@0.184.0/examples/jsm/controls/OrbitControls.js";
const CSS2D_URL = "https://esm.sh/three@0.184.0/examples/jsm/renderers/CSS2DRenderer.js";

const R = 5; // half-extent of the cube (origin to each pole)
const SPREAD = 2.05; // fan-out of same-octant talks from their shared corner
const SOLAR = "#ffb454"; // warm: Solarpunk nodes (+X)
const LUNAR = "#9b8cff"; // cool: Lunarpunk nodes (-X)

function corner(tags) {
  return [tags[0] === "solar" ? R : -R, tags[1] === "global" ? R : -R, tags[2] === "vision" ? R : -R];
}
function fan(i, n) {
  if (n <= 1) return [0, 0, 0];
  const ga = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - ((i + 0.5) / n) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const th = ga * i;
  return [Math.cos(th) * r * SPREAD, y * SPREAD, Math.sin(th) * r * SPREAD];
}
function layout(talks) {
  const byOct = new Map();
  for (const t of talks) {
    const k = t.tags.join("|");
    (byOct.get(k) || byOct.set(k, []).get(k)).push(t);
  }
  const pos = new Map();
  for (const arr of byOct.values()) {
    const c = corner(arr[0].tags);
    arr.forEach((t, i) => {
      const o = fan(i, arr.length);
      pos.set(t.id, [c[0] + o[0], c[1] + o[1], c[2] + o[2]]);
    });
  }
  return pos;
}

function emojiFor(AXES, tags) {
  return [
    tags[0] === "solar" ? AXES.x.pos.emoji : AXES.x.neg.emoji,
    tags[1] === "global" ? AXES.y.pos.emoji : AXES.y.neg.emoji,
    tags[2] === "vision" ? AXES.z.pos.emoji : AXES.z.neg.emoji,
  ];
}

// A soft radial sprite used as an additive glow halo behind each node (a cheap
// stand-in for a bloom post-process).
function haloTexture(THREE) {
  const s = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function poleEl(emoji, label, color) {
  const el = document.createElement("div");
  el.className = "vg-pole";
  el.style.setProperty("--pole", color);
  el.innerHTML = `<span class="vg-pole__emoji">${emoji}</span><span class="vg-pole__label">${label}</span>`;
  return el;
}

function cardEl(talk, emojis) {
  const el = document.createElement("div");
  el.className = "vg-card";
  el.style.setProperty("--accent", talk.spine);
  el.style.display = "none";
  const link = talk.href
    ? `<a class="vg-card__open" href="${talk.href}">Open companion &rarr;</a>`
    : `<span class="vg-card__soon">Companion coming soon</span>`;
  el.innerHTML =
    `<span class="vg-card__emojis">${emojis.join(" ")}</span>` +
    `<span class="vg-card__title">${talk.talk}</span>` +
    `<span class="vg-card__speaker">${talk.speaker}</span>` +
    link;
  return el;
}

export async function mountConstellation(container, talks, AXES) {
  const [THREE, ocMod, cssMod] = await Promise.all([
    import(THREE_URL),
    import(OC_URL),
    import(CSS2D_URL),
  ]);
  const { OrbitControls } = ocMod;
  const { CSS2DRenderer, CSS2DObject } = cssMod;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 200);
  camera.position.set(13, 8, 16);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.inset = "0";
  labelRenderer.domElement.style.pointerEvents = "none";
  container.appendChild(labelRenderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const p1 = new THREE.PointLight(0xffffff, 2.2, 120);
  p1.position.set(12, 14, 10);
  scene.add(p1);
  const p2 = new THREE.PointLight(0x8ea2ff, 1.1, 120);
  p2.position.set(-14, -8, -12);
  scene.add(p2);

  // Axis lines through the origin
  const axisMat = (hex) => new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.28 });
  const axisLine = (a, b, hex) => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
    scene.add(new THREE.Line(g, axisMat(hex)));
  };
  axisLine([-R - 1.2, 0, 0], [R + 1.2, 0, 0], SOLAR);
  axisLine([0, -R - 1.2, 0], [0, R + 1.2, 0], 0x5ad19a);
  axisLine([0, 0, -R - 1.2], [0, 0, R + 1.2], 0x7fb0ff);

  // Pole captions
  const addPole = (at, emoji, label, color) => {
    const o = new CSS2DObject(poleEl(emoji, label, color));
    o.position.set(...at);
    scene.add(o);
  };
  addPole([R + 2, 0, 0], AXES.x.pos.emoji, AXES.x.pos.label, SOLAR);
  addPole([-R - 2, 0, 0], AXES.x.neg.emoji, AXES.x.neg.label, LUNAR);
  addPole([0, R + 2, 0], AXES.y.pos.emoji, AXES.y.pos.label, "#5ad19a");
  addPole([0, -R - 2, 0], AXES.y.neg.emoji, AXES.y.neg.label, "#5ad19a");
  addPole([0, 0, R + 2], AXES.z.pos.emoji, AXES.z.pos.label, "#7fb0ff");
  addPole([0, 0, -R - 2], AXES.z.neg.emoji, AXES.z.neg.label, "#7fb0ff");

  // Nodes
  const pos = layout(talks);
  const halo = haloTexture(THREE);
  const sphereGeo = new THREE.SphereGeometry(0.32, 32, 32);
  const raycastMeshes = [];
  const nodes = [];

  for (const t of talks) {
    const color = t.tags[0] === "solar" ? SOLAR : LUNAR;
    const group = new THREE.Group();
    const [x, y, z] = pos.get(t.id);
    group.position.set(x, y, z);

    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1.0,
      roughness: 0.35,
      metalness: 0.1,
    });
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.userData.talk = t;
    group.add(mesh);

    const spriteMat = new THREE.SpriteMaterial({
      map: halo,
      color,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.setScalar(2.1);
    group.add(sprite);

    const emojis = emojiFor(AXES, t.tags);
    const card = cardEl(t, emojis);
    const labelObj = new CSS2DObject(card);
    labelObj.position.set(0, 0.6, 0);
    // CSS2DRenderer manages each label's style.display from object.visible, so
    // drive show/hide through .visible (not the element's own display).
    labelObj.visible = false;
    group.add(labelObj);

    scene.add(group);
    raycastMeshes.push(mesh);
    nodes.push({ t, group, mesh, mat, sprite, labelObj, baseY: y, seed: Math.random() * Math.PI * 2, scale: 1 });
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.35;
  controls.minDistance = 7;
  controls.maxDistance = 42;

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hovered = null;
  let active = null;

  function pick(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(raycastMeshes, false)[0];
    return hit ? hit.object.userData.talk.id : null;
  }
  function onMove(ev) {
    hovered = pick(ev);
    renderer.domElement.style.cursor = hovered ? "pointer" : "grab";
  }
  function onClick(ev) {
    const id = pick(ev);
    active = id;
  }
  renderer.domElement.addEventListener("pointermove", onMove);
  renderer.domElement.addEventListener("click", onClick);

  const clock = new THREE.Clock();
  let raf = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    const el = clock.getElapsedTime();
    controls.autoRotate = active === null;
    for (const n of nodes) {
      n.group.position.y = n.baseY + Math.sin(el * 0.6 + n.seed) * 0.08;
      const open = n.t.id === hovered || n.t.id === active;
      const target = open ? 1.55 : 1;
      n.scale += (target - n.scale) * 0.15;
      n.mesh.scale.setScalar(n.scale);
      n.mat.emissiveIntensity = open ? 2.2 : 1.0;
      n.sprite.material.opacity = open ? 0.85 : 0.5;
      n.labelObj.visible = open;
    }
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();
  tick();

  return function destroy() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    renderer.domElement.removeEventListener("pointermove", onMove);
    renderer.domElement.removeEventListener("click", onClick);
    controls.dispose();
    sphereGeo.dispose();
    halo.dispose();
    nodes.forEach((n) => n.mat.dispose());
    renderer.dispose();
    container.innerHTML = "";
  };
}
