/**
 * ROBOT-3D.JS — Executive 3D AI Assistant / Automaton
 * Procedural Three.js 3D Model with Gyroscopic Orbital Rings, Visor Tracking & Interaction
 * Designed for Ibrahim Yaghi's AI Platform Showcase
 */

(function () {
  'use strict';

  const container = document.getElementById('robot-canvas-container');
  const canvas = document.getElementById('robot-canvas');
  const statusText = document.getElementById('robot-status-text');
  const interactBtn = document.getElementById('robot-interact-btn');

  if (!container || !canvas) return;

  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    renderFallbackGraphic();
    return;
  }

  let scene, camera, renderer;
  let robotGroup, headMesh, visorMesh, ringGroup, innerRing, outerRing;
  let eyeLight, ambientLight, directionalLight, accentLight;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let clock = new THREE.Clock();
  let isHovered = false;

  const assistantStates = [
    'AGENTIC SYSTEM: ORCHESTRATOR ONLINE',
    'INTENT ROUTING: 8 AGENTS DISPATCHED',
    'QDRANT VECTOR DB: NAMESPACES SYNCHRONIZED',
    'PYSPARK RECONCILIATION: OPTIMIZED (<10m)',
    'TELECOM APIS: ZERO-DATA-EXPOSURE ENFORCED'
  ];
  let stateIndex = 0;

  function init() {
    // 1. Scene setup
    scene = new THREE.Scene();

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
    } catch (e) {
      console.warn('WebGL init error, using fallback', e);
      renderFallbackGraphic();
      return;
    }

    // 4. Lighting - Refined Executive Palette (Deep Navy, Pure White, Luminous Blue)
    ambientLight = new THREE.AmbientLight(0x0f1c3d, 1.8);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight.position.set(5, 8, 5);
    scene.add(directionalLight);

    accentLight = new THREE.PointLight(0x38bdf8, 3.5, 12);
    accentLight.position.set(-4, -2, 3);
    scene.add(accentLight);

    const blueBackLight = new THREE.DirectionalLight(0x1d4ed8, 2.5);
    blueBackLight.position.set(0, -6, -4);
    scene.add(blueBackLight);

    // 5. Construct 3D AI Robot Model
    buildRobot();

    // 6. Event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', () => (isHovered = true));
    container.addEventListener('mouseleave', () => (isHovered = false));

    if (interactBtn) {
      interactBtn.addEventListener('click', triggerAssistantPing);
    }
    container.addEventListener('click', triggerAssistantPing);

    // 7. Animation loop
    animate();
  }

  function buildRobot() {
    robotGroup = new THREE.Group();

    // Premium Metallic PBR Materials
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a1329,
      metalness: 0.85,
      roughness: 0.22,
      envMapIntensity: 1.0
    });

    const brushedChromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15
    });

    const visorGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x2563eb,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.5
    });

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: false
    });

    // Robot Head Chassis (Sculpted Rounded Core)
    const headGeom = new THREE.SphereGeometry(1.35, 64, 64);
    headMesh = new THREE.Mesh(headGeom, titaniumMaterial);
    robotGroup.add(headMesh);

    // Visor / Optical Sensor Window (Sleek horizontal curved glass)
    const visorGeom = new THREE.CylinderGeometry(1.36, 1.36, 0.42, 48, 1, true, -Math.PI / 3, (2 * Math.PI) / 3);
    visorMesh = new THREE.Mesh(visorGeom, visorGlowMaterial);
    visorMesh.position.set(0, 0.1, 0.05);
    robotGroup.add(visorMesh);

    // Center Core Light / Optical Pulse
    eyeLight = new THREE.PointLight(0x38bdf8, 2, 4);
    eyeLight.position.set(0, 0.1, 1.4);
    robotGroup.add(eyeLight);

    // Crown / Antenna Fin (Executive Architectural Detail)
    const crownGeom = new THREE.BoxGeometry(0.18, 0.55, 1.2);
    const crownMesh = new THREE.Mesh(crownGeom, brushedChromeMaterial);
    crownMesh.position.set(0, 1.35, -0.1);
    robotGroup.add(crownMesh);

    // Ear Pod Nodes (Left & Right Communication Transceivers)
    const earGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 32);
    earGeom.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earGeom, brushedChromeMaterial);
    leftEar.position.set(1.4, 0.05, 0);
    robotGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeom, brushedChromeMaterial);
    rightEar.position.set(-1.4, 0.05, 0);
    robotGroup.add(rightEar);

    // Neck Collar Assembly
    const neckGeom = new THREE.CylinderGeometry(0.7, 0.95, 0.5, 32);
    const neckMesh = new THREE.Mesh(neckGeom, titaniumMaterial);
    neckMesh.position.set(0, -1.35, 0);
    robotGroup.add(neckMesh);

    // Gyroscopic Multi-Agent Orchestration Orbital Rings
    ringGroup = new THREE.Group();

    // Inner Gyro Ring (Fast orbit)
    const innerRingGeom = new THREE.TorusGeometry(2.1, 0.035, 16, 100);
    innerRing = new THREE.Mesh(innerRingGeom, ringMaterial);
    innerRing.rotation.x = Math.PI / 4;
    ringGroup.add(innerRing);

    // Outer Gyro Ring (Counter-orbit with telemetry beacons)
    const outerRingGeom = new THREE.TorusGeometry(2.65, 0.03, 16, 120);
    outerRing = new THREE.Mesh(outerRingGeom, ringMaterial);
    outerRing.rotation.y = Math.PI / 3;
    ringGroup.add(outerRing);

    // Orbiting Satellite Nodes (representing agents around the core orchestrator)
    const satGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satGeom, satMat);
      const angle = (i * Math.PI) / 2;
      sat.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0);
      innerRing.add(sat);
    }

    robotGroup.add(ringGroup);
    scene.add(robotGroup);
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onMouseMove(event) {
    // Normalize coordinates (-1 to 1) based on screen center
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.targetX = x * 0.75;
    mouse.targetY = y * 0.6;
  }

  function triggerAssistantPing() {
    stateIndex = (stateIndex + 1) % assistantStates.length;
    if (statusText) {
      statusText.textContent = assistantStates[stateIndex];
    }

    // Dynamic Visual Pulse on Ping
    if (eyeLight) {
      eyeLight.intensity = 6;
      setTimeout(() => {
        if (eyeLight) eyeLight.intensity = 2;
      }, 350);
    }

    if (robotGroup) {
      // Small nod / acknowledgment rotation
      robotGroup.rotation.x += 0.2;
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Smooth Damped Cursor Eye Tracking
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    if (robotGroup) {
      // Natural Levitation / Sine Wave Floating Physics
      robotGroup.position.y = Math.sin(elapsed * 1.5) * 0.18;

      // Cursor gaze response
      headMesh.rotation.y = mouse.x * 0.65;
      headMesh.rotation.x = -mouse.y * 0.45;
      visorMesh.rotation.y = mouse.x * 0.65;
      visorMesh.rotation.x = -mouse.y * 0.45;

      // Gyroscopic Ring Revolutions (Multi-Agent Orchestration Visual)
      if (innerRing && outerRing) {
        innerRing.rotation.z = elapsed * 0.55;
        innerRing.rotation.x = Math.PI / 4 + Math.sin(elapsed * 0.4) * 0.2;

        outerRing.rotation.z = -elapsed * 0.35;
        outerRing.rotation.y = Math.PI / 3 + Math.cos(elapsed * 0.3) * 0.25;
      }

      // Subtle Visor Breathing Luminescence
      if (visorMesh && visorMesh.material) {
        visorMesh.material.emissiveIntensity = 0.8 + Math.sin(elapsed * 3) * 0.25;
      }
    }

    renderer.render(scene, camera);
  }

  // Graceful 2D Fallback if WebGL/Three.js fails
  function renderFallbackGraphic() {
    if (!container) return;
    container.innerHTML = `
      <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem;">
        <div style="width:140px; height:140px; border-radius:50%; background:radial-gradient(circle, #2563eb 0%, #070d1e 75%); display:flex; align-items:center; justify-content:center; border:2px solid #38bdf8; box-shadow:0 0 40px rgba(56,189,248,0.4); margin-bottom:1.5rem;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.7"><rect x="3" y="4" width="18" height="14" rx="3"></rect><path d="M12 2v2"></path><circle cx="9" cy="10" r="1.5" fill="#38bdf8"></circle><circle cx="15" cy="10" r="1.5" fill="#38bdf8"></circle><path d="M8 15h8"></path></svg>
        </div>
        <div style="font-family:var(--font-mono); font-size:0.9rem; color:#60a5fa; margin-bottom:0.4rem;">AI AGENT ORCHESTRATOR</div>
        <div style="font-size:0.85rem; color:#94a3b8; max-width:280px;">8 Autonomous Specialized Agents Active in Production at Zain Jordan</div>
      </div>
    `;
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
