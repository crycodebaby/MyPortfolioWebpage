// ==========================================================================
// Spezifische JavaScript-Funktionen für die Landing Page
// Enthält die Three.js-Logik für die 3D-Szene in der Hero-Section
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Three.js 3D-Szene für die Hero-Section
    // - Erstellt eine dunkle Szene mit geometrischen Formen und einer mystischen Lichtquelle
    // - Fügt Interaktivität durch Mausbewegungen hinzu
    // ==========================================================================
    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    // Renderer-Einstellungen
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Kamera-Position
    camera.position.z = 5;

    // Geometrische Formen erstellen
    const shapes = [];
    const shapeTypes = [
        new THREE.BoxGeometry(0.5, 0.5, 0.5), // Würfel
        new THREE.TetrahedronGeometry(0.4), // Tetraeder
        new THREE.SphereGeometry(0.3, 32, 32) // Kugel
    ];

    for (let i = 0; i < 20; i++) {
        const geometry = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const material = new THREE.MeshPhongMaterial({
            color: 0xD4AF37, // Goldene Farbe
            shininess: 100,
            specular: 0xFFFFFF
        });
        const shape = new THREE.Mesh(geometry, material);

        // Zufällige Position
        shape.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );

        // Zufällige Rotation
        shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        shapes.push(shape);
        scene.add(shape);
    }

    // Mystische Lichtquelle: Pulsierende goldene Kugel
    const lightSphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xD4AF37 });
    const lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);
    scene.add(lightSphere);

    // Punktlichtquelle, das von der Kugel ausgeht
    const pointLight = new THREE.PointLight(0xD4AF37, 2, 50);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Ambiente Licht für sanfte Beleuchtung
    const ambientLight = new THREE.AmbientLight(0x2A4D69, 0.3);
    scene.add(ambientLight);

    // Maus-Interaktivität
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animations-Loop
    function animate() {
        requestAnimationFrame(animate);

        // Formen rotieren
        shapes.forEach(shape => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
        });

        // Lichtkugel bewegen und pulsieren
        const time = Date.now() * 0.001;
        lightSphere.position.x = Math.sin(time) * 2;
        lightSphere.position.y = Math.cos(time) * 2;
        lightSphere.scale.set(
            1 + Math.sin(time * 2) * 0.2,
            1 + Math.sin(time * 2) * 0.2,
            1 + Math.sin(time * 2) * 0.2
        );
        pointLight.position.copy(lightSphere.position);

        // Kamera basierend auf Mausbewegung bewegen
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Fenstergröße anpassen
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});