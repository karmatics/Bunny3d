class Simple3dShapes {
  constructor() {}

  static buildPrimitives(app, scene) {
      const meshes = [];
      const THREE = app.THREE;

      // Root bunny character group
      const bunnyGroup = new THREE.Group();
      bunnyGroup.name = 'BunnyCharacter';

      // Premium physical materials with soft velvet sheen for realistic plush fur
      const furMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xfcf8f2), // Fluffy cream-white
        metalness: 0.0,
        roughness: 0.62,
        sheen: 1.0,
        sheenRoughness: 0.5,
        sheenColor: new THREE.Color(0xffffff),
        reflectivity: 0.5
      });

      const bellyMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffffff),
        metalness: 0.0,
        roughness: 0.68,
        sheen: 0.8,
        sheenColor: new THREE.Color(0xffffff)
      });

      const pinkMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffafc4), // Soft pastel pink
        metalness: 0.0,
        roughness: 0.45,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2
      });

      const eyeMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x121417),
        metalness: 0.1,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03
      });

      const eyeSparkleMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff)
      });

      const blushMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff8da1),
        transparent: true,
        opacity: 0.45,
        depthWrite: false
      });

      const teethMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffffff),
        roughness: 0.2,
        clearcoat: 0.5
      });

      const carrotMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xff6e1a),
        metalness: 0.05,
        roughness: 0.25,
        clearcoat: 0.4
      });

      const carrotLeavesMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x2cb658),
        metalness: 0.05,
        roughness: 0.45
      });

      // Helper to register interactive clickable & paintable meshes
      const register = (mesh, partType = 'fur') => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData.locked = false;
        mesh.userData.bunnyPartType = partType;
        meshes.push(mesh);
        return mesh;
      };

      // ---------------------------------------------------------
      // 1. PLUMP BODY & TUMMY
      // ---------------------------------------------------------
      const bodyGeom = new THREE.SphereGeometry(0.55, 36, 32);
      const body = new THREE.Mesh(bodyGeom, furMat.clone());
      body.scale.set(0.98, 1.15, 0.95);
      body.position.set(0, 0.62, 0);
      bunnyGroup.add(register(body, 'fur'));

      // Soft belly puff
      const bellyGeom = new THREE.SphereGeometry(0.42, 32, 28);
      const belly = new THREE.Mesh(bellyGeom, bellyMat.clone());
      belly.scale.set(0.82, 0.95, 0.35);
      belly.position.set(0, 0.58, 0.32);
      bunnyGroup.add(register(belly, 'belly'));

      // ---------------------------------------------------------
      // 2. CHIBI HEAD & FACIAL FEATURES
      // ---------------------------------------------------------
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 1.28, 0.06);

      const headGeom = new THREE.SphereGeometry(0.46, 36, 32);
      const head = new THREE.Mesh(headGeom, furMat.clone());
      head.scale.set(1.12, 1.0, 1.02);
      headGroup.add(register(head, 'fur'));

      // Chubby left & right cheeks
      const cheekGeom = new THREE.SphereGeometry(0.22, 24, 20);
      const leftCheek = new THREE.Mesh(cheekGeom, furMat.clone());
      leftCheek.scale.set(1.1, 0.85, 1.0);
      leftCheek.position.set(-0.31, -0.11, 0.16);
      headGroup.add(register(leftCheek, 'fur'));

      const rightCheek = new THREE.Mesh(cheekGeom, furMat.clone());
      rightCheek.scale.set(1.1, 0.85, 1.0);
      rightCheek.position.set(0.31, -0.11, 0.16);
      headGroup.add(register(rightCheek, 'fur'));

      // Soft rosy cheek blush
      const blushGeom = new THREE.SphereGeometry(0.09, 16, 16);
      const leftBlush = new THREE.Mesh(blushGeom, blushMat);
      leftBlush.scale.set(1.0, 0.7, 0.3);
      leftBlush.position.set(-0.36, -0.1, 0.28);
      headGroup.add(leftBlush);

      const rightBlush = new THREE.Mesh(blushGeom, blushMat);
      rightBlush.scale.set(1.0, 0.7, 0.3);
      rightBlush.position.set(0.36, -0.1, 0.28);
      headGroup.add(rightBlush);

      // Muzzle pads (snout)
      const muzzleGroup = new THREE.Group();
      muzzleGroup.position.set(0, -0.09, 0.40);

      const muzzlePadGeom = new THREE.SphereGeometry(0.11, 20, 20);
      const leftMuzzlePad = new THREE.Mesh(muzzlePadGeom, bellyMat.clone());
      leftMuzzlePad.scale.set(1.0, 0.9, 0.8);
      leftMuzzlePad.position.set(-0.075, 0, 0);
      muzzleGroup.add(register(leftMuzzlePad, 'belly'));

      const rightMuzzlePad = new THREE.Mesh(muzzlePadGeom, bellyMat.clone());
      rightMuzzlePad.scale.set(1.0, 0.9, 0.8);
      rightMuzzlePad.position.set(0.075, 0, 0);
      muzzleGroup.add(register(rightMuzzlePad, 'belly'));

      // Adorable tiny heart-shaped nose
      const noseGeom = new THREE.SphereGeometry(0.052, 20, 20);
      const nose = new THREE.Mesh(noseGeom, pinkMat.clone());
      nose.scale.set(1.1, 0.8, 0.9);
      nose.position.set(0, 0.05, 0.06);
      muzzleGroup.add(register(nose, 'pink'));

      // Cute front bunny buck teeth
      const toothGeom = new THREE.BoxGeometry(0.075, 0.07, 0.02);
      const tooth = new THREE.Mesh(toothGeom, teethMat);
      tooth.position.set(0, -0.075, -0.01);
      muzzleGroup.add(tooth);

      headGroup.add(muzzleGroup);

      // Big kawaii expressive eyes
      const eyeGeom = new THREE.SphereGeometry(0.092, 24, 24);
      const sparkleBigGeom = new THREE.SphereGeometry(0.034, 16, 16);
      const sparkleSmallGeom = new THREE.SphereGeometry(0.016, 12, 12);

      [-1, 1].forEach((side) => {
        const eyePivot = new THREE.Group();
        eyePivot.position.set(side * 0.23, 0.05, 0.36);
        eyePivot.rotation.y = side * 0.22;

        const eye = new THREE.Mesh(eyeGeom, eyeMat.clone());
        eye.scale.set(0.88, 1.0, 0.55);
        eyePivot.add(register(eye, 'eye'));

        // Main big pupil highlight
        const sparkleBig = new THREE.Mesh(sparkleBigGeom, eyeSparkleMat);
        sparkleBig.position.set(side * 0.02, 0.032, 0.046);
        eyePivot.add(sparkleBig);

        // Cute secondary catchlight
        const sparkleSmall = new THREE.Mesh(sparkleSmallGeom, eyeSparkleMat);
        sparkleSmall.position.set(-side * 0.025, -0.025, 0.046);
        eyePivot.add(sparkleSmall);

        headGroup.add(eyePivot);
      });

      // ---------------------------------------------------------
      // 3. TALL, SOFT, EXPRESSIVE EARS
      // ---------------------------------------------------------
      const earOuterGeom = new THREE.CapsuleGeometry(0.12, 0.68, 16, 24);
      const earInnerGeom = new THREE.CapsuleGeometry(0.08, 0.55, 16, 24);

      // Left Ear
      const leftEarGroup = new THREE.Group();
      leftEarGroup.position.set(-0.21, 0.40, -0.02);
      leftEarGroup.rotation.z = 0.16;
      leftEarGroup.rotation.x = -0.08;

      const leftEarOuter = new THREE.Mesh(earOuterGeom, furMat.clone());
      leftEarOuter.scale.set(1.15, 1.0, 0.42);
      leftEarOuter.position.set(0, 0.38, 0);
      leftEarGroup.add(register(leftEarOuter, 'fur'));

      const leftEarInner = new THREE.Mesh(earInnerGeom, pinkMat.clone());
      leftEarInner.scale.set(1.0, 1.0, 0.32);
      leftEarInner.position.set(0, 0.35, 0.035);
      leftEarGroup.add(register(leftEarInner, 'pink'));
      headGroup.add(leftEarGroup);

      // Right Ear (playfully perked)
      const rightEarGroup = new THREE.Group();
      rightEarGroup.position.set(0.21, 0.40, -0.02);
      rightEarGroup.rotation.z = -0.12;
      rightEarGroup.rotation.x = -0.05;

      const rightEarOuter = new THREE.Mesh(earOuterGeom, furMat.clone());
      rightEarOuter.scale.set(1.15, 1.0, 0.42);
      rightEarOuter.position.set(0, 0.38, 0);
      rightEarGroup.add(register(rightEarOuter, 'fur'));

      const rightEarInner = new THREE.Mesh(earInnerGeom, pinkMat.clone());
      rightEarInner.scale.set(1.0, 1.0, 0.32);
      rightEarInner.position.set(0, 0.35, 0.035);
      rightEarGroup.add(register(rightEarInner, 'pink'));
      headGroup.add(rightEarGroup);

      bunnyGroup.add(headGroup);

      // ---------------------------------------------------------
      // 4. FRONT PAWS (Tucked affectionately in front)
      // ---------------------------------------------------------
      const pawGeom = new THREE.CapsuleGeometry(0.085, 0.22, 16, 16);
      const padGeom = new THREE.SphereGeometry(0.04, 12, 12);

      [-1, 1].forEach((side) => {
        const arm = new THREE.Group();
        arm.position.set(side * 0.24, 0.65, 0.32);
        arm.rotation.x = 0.55;
        arm.rotation.z = -side * 0.35;

        const pawMesh = new THREE.Mesh(pawGeom, furMat.clone());
        pawMesh.scale.set(1.0, 1.0, 0.85);
        arm.add(register(pawMesh, 'fur'));

        const pawPad = new THREE.Mesh(padGeom, pinkMat.clone());
        pawPad.scale.set(1.0, 1.1, 0.4);
        pawPad.position.set(0, -0.11, 0.06);
        arm.add(register(pawPad, 'pink'));

        bunnyGroup.add(arm);
      });

      // ---------------------------------------------------------
      // 5. CHUNKY HIND FEET & TOE-BEANS
      // ---------------------------------------------------------
      const hindFootGeom = new THREE.CapsuleGeometry(0.13, 0.36, 16, 20);
      const mainToePadGeom = new THREE.SphereGeometry(0.06, 16, 14);
      const miniToePadGeom = new THREE.SphereGeometry(0.03, 12, 12);

      [-1, 1].forEach((side) => {
        const footGroup = new THREE.Group();
        footGroup.position.set(side * 0.42, 0.12, 0.12);
        footGroup.rotation.x = Math.PI * 0.48;
        footGroup.rotation.z = side * 0.18;

        const footMesh = new THREE.Mesh(hindFootGeom, furMat.clone());
        footMesh.scale.set(1.08, 1.0, 0.82);
        footGroup.add(register(footMesh, 'fur'));

        // Main paw pad on bottom
        const mainPad = new THREE.Mesh(mainToePadGeom, pinkMat.clone());
        mainPad.scale.set(1.1, 1.0, 0.4);
        mainPad.position.set(0, -0.06, 0.11);
        footGroup.add(register(mainPad, 'pink'));

        // 3 cute little toe beans
        [-0.055, 0, 0.055].forEach((offsetX, idx) => {
          const miniPad = new THREE.Mesh(miniToePadGeom, pinkMat.clone());
          miniPad.scale.set(1.0, 1.0, 0.4);
          miniPad.position.set(offsetX, 0.13, 0.11);
          footGroup.add(register(miniPad, 'pink'));
        });

        bunnyGroup.add(footGroup);
      });

      // ---------------------------------------------------------
      // 6. FLUFFY COTTON CLOUD TAIL
      // ---------------------------------------------------------
      const tailGroup = new THREE.Group();
      tailGroup.position.set(0, 0.32, -0.52);

      const tailCenterGeom = new THREE.SphereGeometry(0.18, 24, 24);
      const tailPuffGeom = new THREE.SphereGeometry(0.11, 16, 16);

      const tailCenter = new THREE.Mesh(tailCenterGeom, bellyMat.clone());
      tailGroup.add(register(tailCenter, 'belly'));

      // Clustered cloud puffs
      [
        [0.08, 0.06, 0.03],
        [-0.08, 0.05, 0.03],
        [0, -0.07, 0.04],
        [0, 0.09, -0.04]
      ].forEach(([px, py, pz]) => {
        const puff = new THREE.Mesh(tailPuffGeom, bellyMat.clone());
        puff.position.set(px, py, pz);
        tailGroup.add(register(puff, 'belly'));
      });
      bunnyGroup.add(tailGroup);

      // ---------------------------------------------------------
      // 7. FRESH CRISP 3D CARROT ACCESSORY
      // ---------------------------------------------------------
      const carrotGroup = new THREE.Group();
      carrotGroup.position.set(0.38, 0.38, 0.38);
      carrotGroup.rotation.z = -0.55;
      carrotGroup.rotation.x = 0.35;

      const carrotConeGeom = new THREE.ConeGeometry(0.10, 0.52, 24);
      const carrotBody = new THREE.Mesh(carrotConeGeom, carrotMat);
      carrotBody.rotation.x = Math.PI;
      carrotBody.position.set(0, 0, 0);
      carrotGroup.add(register(carrotBody, 'carrot'));

      // Cute green carrot leaves
      const leafGeom = new THREE.CylinderGeometry(0.015, 0.025, 0.22, 12);
      [-0.22, 0, 0.22].forEach((ang, i) => {
        const leaf = new THREE.Mesh(leafGeom, carrotLeavesMat);
        leaf.position.set(Math.sin(ang) * 0.04, 0.35, Math.cos(ang) * 0.04);
        leaf.rotation.z = ang * 1.5;
        leaf.rotation.x = (i - 1) * 0.25;
        carrotGroup.add(register(leaf, 'carrotLeaf'));
      });
      bunnyGroup.add(carrotGroup);

      // Add overall bunny model to the Three.js scene
      scene.add(bunnyGroup);

      // Ambient ground grid with modern cyber-glow styling
      const grid = new THREE.GridHelper(8, 20, 0xffa0c0, 0x2d333b);
      grid.position.y = 0.0;
      grid.visible = true;
      scene.add(grid);

      // ---------------------------------------------------------
      // 8. LIFELIKE ANIMATION LOOP CONTROLLER
      // ---------------------------------------------------------
      const updateAnimation = (t) => {
        // Gentle breathing (chest rises and falls)
        const breath = Math.sin(t * 2.8) * 0.022;
        body.scale.set(0.98 + breath, 1.15 + breath * 0.6, 0.95 + breath);
        belly.scale.set(0.82 + breath * 1.2, 0.95 + breath * 0.8, 0.35 + breath);

        // Inquisitive head sway
        headGroup.rotation.y = Math.sin(t * 1.2) * 0.06;
        headGroup.rotation.z = Math.sin(t * 0.9) * 0.035;

        // Realistic rapid bunny nose sniffing twitches
        const sniffCycle = Math.sin(t * 14);
        if (sniffCycle > 0.3) {
          muzzleGroup.scale.set(1.0, 1.0 + Math.sin(t * 32) * 0.08, 1.0 + Math.sin(t * 32) * 0.06);
        } else {
          muzzleGroup.scale.set(1.0, 1.0, 1.0);
        }

        // Playful ear twitches with soft physics sway
        const twitchTrigger = Math.sin(t * 0.85);
        const isTwitching = twitchTrigger > 0.82;
        const earTwitch = isTwitching ? Math.sin(t * 40) * 0.14 : 0;

        leftEarGroup.rotation.z = 0.16 + Math.sin(t * 2.4) * 0.04 + earTwitch;
        leftEarGroup.rotation.x = -0.08 + Math.cos(t * 2.0) * 0.03;

        rightEarGroup.rotation.z = -0.12 - Math.sin(t * 2.4) * 0.03 - (isTwitching ? Math.cos(t * 35) * 0.12 : 0);
        rightEarGroup.rotation.x = -0.05 + Math.sin(t * 1.8) * 0.03;

        // Subtle tail wiggle
        tailGroup.rotation.y = Math.sin(t * 3.5) * 0.1;
        tailGroup.rotation.x = Math.sin(t * 2.2) * 0.06;
      };

      return { meshes, grid, bunnyGroup, updateAnimation };
    }
}

globalThis.Simple3dShapes = Simple3dShapes;
if (typeof module !== 'undefined' && module.exports) module.exports = Simple3dShapes;