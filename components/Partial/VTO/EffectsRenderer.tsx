"use client"
import { Camera } from 'components/Partial/vto_modules/camera_util';
import React, { useEffect, useState } from 'react';
import Mediapipe from 'utils/mediapipe_utils';
import Threejs from 'utils/vto_utils';
const EffectsRenderer: React.FC = () => {
    const threejs = new Threejs();
    let model3D: any;
    const [useModel, setModel] = useState(null);
    const LoadRingModel = (model: any, scene: any) => {
        return new Promise((resolve: any, reject: any) => {
            threejs.Loadmodel(model, (glb) => {
                // setModel(glb)

                scene.add(glb);
                model3D = glb;

                resolve();
            });
        });
    };


    useEffect(() => {
        // TODO: implement
        const video: any = document.getElementById('input_video') as HTMLVideoElement
        const canvasElement: any = document.getElementById('output_canvas') as HTMLCanvasElement;
        const threeJSElement: any = document.getElementById('threejs_canvas') as HTMLCanvasElement;
        const canvasCtx = canvasElement.getContext('2d');
        const mediapipe = new Mediapipe();
        const threejs = new Threejs();
        const pos = threejs.Vector();
        const vector = threejs.Vector();
        threejs.GLTFLoader();
        const scene = threejs.scene();
        const threejscamera = threejs.threejscamera(1280,960);
        threejscamera.position.set(0, 0, 20);
        const renderer: any = threejs.renderer(threeJSElement, 1280, 960, true);
        // renderer.setSize(960,1280);
        const Environment = (path: any) => {
            const HDR = threejs.HDRLighting(path);
            scene.environment = HDR;
        }
        Environment("https://demo-assets.pixotronics.com/pixo/presets/environment/env-gem-1.hdr");
        const faceDetection: any = mediapipe.faceDetection();
        faceDetection.setOptions({
            refineLandmarks: true,
            enableGeometry: true
        })
        LoadRingModel('Glasses.glb', scene);
        faceDetection.onResults((results: any) => {

            // Draw the overlays.
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, 1280, 960);
            canvasCtx.drawImage(results.image, 0, 0, 1280, 960);

            if (results.multiFaceLandmarks) {
                if (results.multiFaceLandmarks.length > 0) {
                    if (!model3D) return

                    const LandMark = mediapipe.scaleLandmark(results.multiFaceLandmarks, canvasElement.width, canvasElement.height)
                    //***************************************************** */
                    let optionalX = (LandMark[0][6].x) * 2 - 1;
                    //***************************************************** */
                    let optionalY = (LandMark[0][6].y) * 2 - 1;
                    //***************************************************** */
                    let optionalZ = (LandMark[0][6].z * 2 - 1);
                    vector.set(optionalX, optionalY, optionalZ);
                    vector.unproject(threejscamera);
                    vector.sub(threejscamera.position).normalize();
                    let distance = threejscamera.position.z / vector.z;
                    pos.copy(threejscamera.position).add(vector.multiplyScalar(distance));
                    let ringScale: any = threejs.Vector3(7 / results.multiFaceGeometry[0][14], 7 / results.multiFaceGeometry[0][14], 7 / results.multiFaceGeometry[0][14]);

                    const BufferGeom: any = threejs.makeGeometry(results.multiFaceLandmarks[0]);
                    let raw_matrix_data = results.multiFaceGeometry[0];
                    // maskGeometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));

                    // // Create mask material (e.g., red color)
                    const Material = threejs.Material();

                    // Create mask mesh
                    const maskMesh = threejs.Mesh(BufferGeom, Material);
                    scene.add(maskMesh);
                    const matrix = threejs.Matrix4();
                    matrix.fromArray(raw_matrix_data);
                    var angleInRadians = Math.PI / 4;
                    var angleInRadians180 = angleInRadians * Math.PI + 0.5;
                    var rotationMatrix = threejs.Matrix4().makeRotationX(angleInRadians180);
                    matrix.multiply(rotationMatrix);
                    threejs.updatingPosition(model3D, pos, matrix, ringScale);
                }

            }
            canvasCtx.restore();
            renderer.render(scene, threejscamera);
        })
        const camera = new Camera(video, {
            onFrame: async () => {
                await faceDetection.send({ image: video, smoothFaceIntensity: 0.5 })
            }, width: 1280, height: 960
        })
        camera.start();
    })
    return (
        <div className="container">
            <video className="input_video -scale-x-100" id="input_video" ></video>
            <canvas className="output_canvas" id="output_canvas" width="1280" height="960" ></canvas>
            <canvas className="threejs_canvas" id="threejs_canvas" width="1280" height="960" ></canvas>
            <div id="Loading_animation">
                <div className="lds-dual-ring"></div>
            </div>
        </div>
    );
};

export default EffectsRenderer;
