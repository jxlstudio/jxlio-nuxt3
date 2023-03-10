<script setup lang="ts">
    // Playground: https://app.contentful.com/spaces/l22n8qgszx4s/apps/app_installations/graphql-playground/graphql

    // Ideas:
    // Galaxy Skybox
    // Spaceships STL's as lights
    // Loading Screen
    // https://v1.image.nuxtjs.org/ FOR SERVING IMAGES

    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
    // import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js'
    // import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
    // import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

    definePageMeta({
        layout: "homepage"
    })

    // -
    // - Dev Mode??
    // -

    // const devMode = 'yes'
    const devMode = 'no'

    // -
    // -
    // -
    // Variables
    // -
    // -
    // -

    
    const loadingScreen = ref(true)

    const navHeight = 0

    const strDownloadMime = 'image/octet-stream'
    const loadingSpinner = ref(false)
    const keyLightIntensity = ref(1)

    const environment = computed(() => {
        if (devMode || process.env.NODE_ENV === 'development') {
            return 'development'
        }
    })

    // Set up variables that need to be set onMounted
    let container: any,
        windowWidth: any,
        windowHeight: any,
        camera: any,
        scene: any,
        minWindowHeight,
        renderer: any,
        // manager,
        // loader,
        // stlLoader,
        moonTexture,
        // groundNormal,
        controls: any,
        dodecahedronGeometry,
        asteroidMaterial,
        clock: any,
        light1: any,
        light2: any,
        light3: any,
        light4: any,
        light5: any,
        light6: any,
        moonMesh: any,
        moonMaterial,
        grid,
        axis

    const setCameraPosition = {
        // x: 20,
        // y: 35,
        // z: 150
        x: 0,
        y: 150,
        z: 0
    }

    // let asteroidsArray = []

    // -
    // -
    // -
    // Functions
    // -
    // -
    // -


    const init = () => {
        // Enable Cache
        THREE.Cache.enabled = true

        // Set Camera Position
        camera.position.set(setCameraPosition.x, setCameraPosition.y, setCameraPosition.z)
        
        // Add Asteroids
        addAsteroids()

        // Add Moon
        addMoon()
        
        //Add Helpers if devmode enabled
        if (!devMode) {
            addHelpers()
        }

        // Default LoadingManager Setup
        THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
        }

        THREE.DefaultLoadingManager.onLoad = function ( ) {
            loadingScreen.value = false
            console.log( 'Loading Complete!')
        }


        THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
        }

        THREE.DefaultLoadingManager.onError = function ( url ) {
            console.log( 'There was an error loading ' + url )
        }

        // Add Lights
        addLights()

        // Renderer Params
        renderer.setSize( windowWidth, windowHeight )
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.outputEncoding = THREE.sRGBEncoding

        // Set Container
        container.appendChild(renderer.domElement)

        // Set Orbit controls parameters
        controls.maxPolarAngle = Math.PI / 1.5
        controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.00625
        controls.enableZoom = false
        controls.enablePan = false
        controls.screenSpacePanning = false

        // Init WindowResize event Listener
        window.addEventListener('resize', onWindowResize, false)
    }

    const addLights = () => {
        // Moving Lights
        const intensity = 1
        const distance = 100
        const decay = 2

        // Old Colors Archive
        // const c1 = 0x204e7A,
        // c2 = 0x57385c,
        // c3 = 0xa75265,
        // c4 = 0xec7263,
        // c5 = 0xfebe7e,
        // c6 = 0x03A688

        const c1 = 0x204e7A,
        c2 = 0x1D1C87,
        c3 = 0x1F3C91,
        c4 = 0x1F7891,
        c5 = 0x1C8782,
        c6 = 0x189447

        // const sunLight = 0xffefe1
        const sunLight = 0xFA930B
        // const whiteLight = 0xffffff

        const sphere = new THREE.SphereGeometry(0.25, 16, 8)

        light1 = new THREE.PointLight(c1, intensity, distance, decay)
        light1.add(
            new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c1 }))
        )

        light2 = new THREE.PointLight(c2, intensity, distance, decay)
        light2.add(
            new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c2 }))
        )

        light3 = new THREE.PointLight(c3, intensity, distance, decay)
        light3.add(
            new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c3 }))
        )

        light4 = new THREE.PointLight(c4, intensity, distance, decay)
        light4.add(
            new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c4 }))
        )

        light5 = new THREE.PointLight(c5, intensity, distance, decay)
        light5.add(
            new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c5 }))
        )

        light6 = new THREE.PointLight(c6, intensity, distance, decay)
        light6.add(
            new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c6 }))
        )

        scene.add(light1)
        scene.add(light2)
        scene.add(light3)
        scene.add(light4)
        scene.add(light5)
        scene.add(light6)

        // Sun Directional Light
        let dlight = new THREE.DirectionalLight(sunLight, 0.0125)
        dlight.position.set(1, 0, 2).normalize()
        scene.add(dlight)
        
        // const dlightHelper = new THREE.DirectionalLightHelper(dlight, 50, whiteLight)
        // scene.add(dlightHelper)

        // const textureLoader = new THREE.TextureLoader()
        // const textureFlare0 = textureLoader.load( "./lensflare0.png" )
        // const textureFlare1 = textureLoader.load( "./lensflare2.png" )
        // const textureFlare2 = textureLoader.load( "./lensflare3.png" )

        // const lensflare = new Lensflare()

        // lensflare.addElement( new LensflareElement( textureFlare0, 512, 0 ) )
        // lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) )
        // lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) )

        // light1.add(lensflare)
        // light2.add(lensflare)
        // light3.add(lensflare)
        // light4.add(lensflare)
        // light5.add(lensflare)
        // light6.add(lensflare)

    }

    const addAsteroids = () => {
        const totalAsteroids = 1200

        dodecahedronGeometry = new THREE.DodecahedronGeometry(0.5, 0)

        asteroidMaterial = new THREE.MeshStandardMaterial({
            color: 0x555555,
            roughness: 0.5,
            metalness: 1.0
        });

        const max = 0.5
        const min = 0.125
        for (let i = 0; i < totalAsteroids; i++) {
            const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry((Math.random() * (max - min) + min), 0), asteroidMaterial)
            var time = Date.now() * 0.00025;
            var d = 150;
            mesh.position.x = 400 * (0.5 - Math.random());
            mesh.position.y = 150 * (0.5 - Math.random()) + 25;
            mesh.position.z = 200 * (0.5 - Math.random());
            mesh.rotation.y = 3.14 * (0.5 - Math.random());
            mesh.rotation.x = 3.14 * (0.5 - Math.random());
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();
            scene.add(mesh);
            mesh.position.x = Math.sin(time * 0.7) * d;
        }
    }

    const addHelpers = () => {
        // Grid & Axis Helpers
        const size = 10000
        const divisions = 10000
        grid = new THREE.GridHelper(size, divisions, 0x222222, 0x222222)
        axis = new THREE.AxesHelper(1200)
        scene.add(grid)
        scene.add(axis)
    }

    const addMoon = () => {
        moonTexture = new THREE.TextureLoader().load('/moon-high-res.jpg')

        moonMaterial = new THREE.MeshStandardMaterial({
            // color: 0x204E7A,
            map: moonTexture
        })
        
        moonMesh = new THREE.Mesh(
            // new THREE.PlaneGeometry(5000, 5000, 1, 1),
            new THREE.SphereGeometry( 100, 128, 64 ),
            moonMaterial
        )

        moonMesh.position.y = -120
        moonMesh.rotation.y = -Math.PI / 2
        moonMesh.rotation.x = Math.PI / 2
        scene.add(moonMesh)
    }
    
    const render = () => {
        const time = Date.now() * 0.000325
        const d = 100

        // Lights Animation
        light1.position.x = Math.sin(time * 0.7) * d
        light1.position.z = Math.cos(time * 0.3) * d
        light2.position.x = Math.cos(time * 0.3) * d
        light2.position.z = Math.sin(time * 0.7) * d
        light3.position.x = Math.sin(time * 0.7) * d
        light3.position.z = Math.sin(time * 0.5) * d
        light4.position.x = Math.sin(time * 0.3) * d
        light4.position.z = Math.sin(time * 0.5) * d
        light5.position.x = Math.cos(time * 0.3) * d
        light5.position.z = Math.sin(time * 0.5) * d
        light6.position.x = Math.cos(time * 0.7) * d
        light6.position.z = Math.cos(time * 0.5) * d

        // Moon Animation
        moonMesh.rotation.y = Math.cos(time * -0.00025) * d
        moonMesh.rotation.z = Math.sin(time * -0.00025) * d

        controls.update(clock.getDelta())
        renderer.render(scene, camera)
    }

    const animate = () => {
        camera.updateProjectionMatrix()
        requestAnimationFrame(animate)

        controls.update()
        render()
    }

    const onWindowResize = () => {
        // const whRs = getRespWindowHeight()

        camera.aspect = window.innerWidth / (window.innerHeight - navHeight)
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, (window.innerHeight - navHeight))
    }

    const threejsOverlayTextColor = ref('text-white')

    const setBackgroundColor = (color: any) => {
        scene.background = new THREE.Color(color)
        if (color === 0xffffff) {
            threejsOverlayTextColor.value = 'text-black'
        } else {
            threejsOverlayTextColor.value = 'text-white'
        }
    }

    onMounted(() => {
        // Init Loading Screen
        // loadingScreen = document.getElementById("loading")

        // Create Scene & Set Responsive Window Height Minimum
        scene = new THREE.Scene()
        minWindowHeight = 550

        // General Scene Parameters
        windowWidth = window.innerWidth
        windowHeight = (window.innerHeight - navHeight)
        container = document.getElementById("threejs")
        camera = new THREE.PerspectiveCamera( 50, windowWidth / windowHeight, 1, 300 )
        clock = new THREE.Clock()
        setBackgroundColor(0x010101)
        

        // Create Renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true
        })

        // Create OrbitControls
        controls = new OrbitControls(camera, renderer.domElement)

        init()
        animate()
    })
</script>
<template>
    <div id="homepage">
        <transition name="fade">
            <div id="loading" v-if="loadingScreen" class="bg-black absolute w-full h-full top-0 left-0 z-50">
                <!-- <LoadingSpinner class="mx-auto mt-24 w-[48px] h-[48px] p-2 text-white z-50 spinner-center" /> -->
                <div class="spin"></div>
            </div>
        </transition>
        <div id="threejs" class="flex flex-col items-center">
            <transition name="fade">
                <div class="header-content text-white text-center mx-auto w-[85%] md:max-w-[60%] md:w-[500px] z-50">
                    <Logo/>
                    <h1 class="sr-only">Portfolio</h1>
                </div>
            </transition>
            <transition name="fade">
                <div class="absolute bottom-0 left-0 text-center w-full z-50 pb-10">
                    <a href="#content" class="w-[48px] z-50">
                        <ChevronDown class="mx-auto w-[48px] h-[48px] p-2 text-white bg-gray-800  rounded-full opacity-50 hover:opacity-90" />
                    </a>
                </div>
            </transition>
        </div>
        <div id="content" class="h-[2000px]">Content will go here</div>
    </div>
</template>

<style lang="postcss">
#threejs {
    min-height: 100vh;
    background: #000000;
}
#threejs canvas {
    position: relative;
    z-index: 1;
    max-width: 100% !important;
    cursor: move;
}
#threejs .header-content, .spinner-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
/* .loaded {
    display: none;
    transition: display 2.5s linear;
} */
.fade-in {
    animation: fadeIn 0.5s;
    /* animation-delay: 1s; */
}
@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
@keyframes spinner {
    0% {
        transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
        transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
}
.spin::before {
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px #777;
    border-bottom-color: #fff;
    border-radius: 50%;
    content: "";
    height: 40px;
    width: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 125px;
    will-change: transform;
}
</style>
