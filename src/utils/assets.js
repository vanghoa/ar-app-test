import helmet from '../model/motorcycleHelmet.glb';

export const assetsModel = [
    {
        anchorIndex: 152,
        rotation: '0 -0 0',
        position: [0, 0.7, -0.5],
        scale: '0.005 0.005 0.005',
        src: helmet,
        id: 'helmet',
    },
    {
        anchorIndex: 10,
        rotation: '0 -0 0',
        position: [0, 1, -0.5],
        scale: '0.35 0.35 0.35',
        src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/face-tracking/assets/hat/scene.gltf',
        id: 'hatModel',
    },
    {
        anchorIndex: 10,
        rotation: '0 -0 0',
        position: [0, -0.2, -0.5],
        scale: '0.008 0.008 0.008',
        src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/face-tracking/assets/hat2/scene.gltf',
        id: 'hatModel2',
    },
    {
        anchorIndex: 168,
        rotation: '0 -0 0',
        position: [0, 0, 0],
        scale: '0.01 0.01 0.01',
        src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/face-tracking/assets/glasses/scene.gltf',
        id: 'glassesModel',
    },
    {
        anchorIndex: 168,
        rotation: '0 -90 0',
        position: [0, -0.3, 0],
        scale: '0.6 0.6 0.6',
        src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/face-tracking/assets/glasses2/scene.gltf',
        id: 'glassesModel2',
    },
];
