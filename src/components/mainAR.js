import 'aframe';
import 'mind-ar/dist/mindar-face-aframe.prod.js';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Arrow from './arrow';

const animconfig = 'dur: 500; easing: linear;';

function animcomplete(e) {
    e.target.object3D.visible = false;
    e.target.removeEventListener('animationcomplete', animcomplete);
}

export default function MainAR({ assets }) {
    const sceneRef = useRef(null);
    const [cur, setCur] = useState(0);
    const [on, setOn] = useState(true);
    const [ins, setIns] = useState(true);
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, assets.length);
    }, [assets.length]);

    const handleLeft = () => {
        if (cur === assets.length - 1) {
            return;
        }
        const pos = assets[cur].position;
        const pos_ = assets[cur + 1].position;
        //
        itemsRef.current[cur].addEventListener(
            'animationcomplete',
            animcomplete
        );
        itemsRef.current[cur].setAttribute(
            'animation',
            `property: position; from: ${pos.join(` `)}; to: -4 ${pos[1]} ${
                pos[2]
            }; ${animconfig}`
        );
        itemsRef.current[cur + 1].object3D.visible = true;
        itemsRef.current[cur + 1].setAttribute(
            'animation',
            `property: position; to: ${pos_.join(` `)}; from: 4 ${pos_[1]} ${
                pos_[2]
            }; ${animconfig}`
        );
        //
        setCur((a) => a + 1);
    };

    const handleRight = (e) => {
        if (cur === 0) {
            return;
        }
        const pos = assets[cur].position;
        const pos_ = assets[cur - 1].position;
        itemsRef.current[cur].addEventListener(
            'animationcomplete',
            animcomplete
        );
        itemsRef.current[cur].setAttribute(
            'animation',
            `property: position; from: ${pos.join(` `)}; to: 4 ${pos[1]} ${
                pos[2]
            }; ${animconfig}`
        );
        itemsRef.current[cur - 1].object3D.visible = true;
        itemsRef.current[cur - 1].setAttribute(
            'animation',
            `property: position; to: ${pos_.join(` `)}; from: -4 ${pos_[1]} ${
                pos_[2]
            }; ${animconfig}`
        );
        setCur((a) => a - 1);
    };

    const handlerEnter = () => {
        const sceneEl = sceneRef.current;
        let arSystem = sceneEl.systems['mindar-face-system'];
        if (arSystem) {
            init();
        } else {
            const checkInitialization = setInterval(() => {
                arSystem = sceneEl.systems['mindar-face-system'];
                if (arSystem) {
                    clearInterval(checkInitialization);
                    init();
                }
            }, 1000);
        }
        function init() {
            itemsRef.current.forEach((item, i) => {
                i > 0 && (item.object3D.visible = false);
            });
            arSystem.start();
        }
        setIns(!ins);
    };

    const handlersSwipe = useSwipeable({
        onSwipedLeft: handleLeft,
        onSwipedRight: handleRight,
        trackTouch: true,
        trackMouse: true,
    });
    return (
        <>
            {ins && (
                <section
                    className="absolute z-50 left-0 top-0 w-full h-full bg-green-500 flex justify-center items-center font-mono text-lg p-8"
                    onClick={handlerEnter}
                >
                    - Please allow the camera when requested <br></br> - You can
                    either swipe or tap the arrow button <br></br> - You can tap
                    the circle button to stop <br></br> - Tap the screen to
                    enter
                </section>
            )}
            <div className="absolute w-full bottom-0 h-1/6 flex justify-center items-center z-40 pointer-events-none">
                <button
                    className={`w-[45px] h-[45px] pointer-events-auto ${
                        on ? 'bg-red-500' : 'bg-green-500'
                    } rounded-[30px] border-none`}
                    onClick={() => {
                        on
                            ? sceneRef.current.systems[
                                  'mindar-face-system'
                              ].stop()
                            : sceneRef.current.systems[
                                  'mindar-face-system'
                              ].start();
                        setOn(!on);
                    }}
                ></button>
            </div>
            <div className={`${on ? '' : 'hidden'}`}>
                <button
                    className={`flex justify-center items-center overflow-hidden absolute left-0 top-0 w-1/6 h-full min-w-[50px] max-w-[200px] bg-transparent z-30 border-none bg-gradient-to-r from-black group ${
                        cur == 0
                            ? 'opacity-10 pointer-events-none'
                            : 'cursor-pointer'
                    } to-transparent`}
                    onClick={handleRight}
                    disabled={cur == 0 ? true : false}
                >
                    <Arrow className="transform rotate-180 group-hover:border-l-green-500"></Arrow>
                </button>
                <button
                    className={`flex justify-center items-center overflow-hidden absolute right-0 top-0 w-1/6 h-full min-w-[50px] max-w-[200px] bg-transparent z-30 border-none bg-gradient-to-l from-black group ${
                        cur == assets.length - 1
                            ? 'opacity-10 pointer-events-none'
                            : 'cursor-pointer'
                    } to-transparent`}
                    onClick={handleLeft}
                    disabled={cur == assets.length - 1 ? true : false}
                >
                    <Arrow className="group-hover:border-l-green-500"></Arrow>
                </button>
                <nav
                    {...handlersSwipe}
                    className="overflow-hidden absolute w-full h-full bg-transparent z-10"
                ></nav>
                <div className={`overflow-hidden absolute w-full h-full `}>
                    <a-scene
                        ref={sceneRef}
                        mindar-face
                        embedded
                        color-space="sRGB"
                        renderer="colorManagement: true, physicallyCorrectLights"
                        vr-mode-ui="enabled: false"
                        device-orientation-permission-ui="enabled: false"
                    >
                        <a-assets>
                            <a-asset-item
                                id="headModel"
                                src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/face-tracking/assets/sparkar/headOccluder.glb"
                            ></a-asset-item>
                            {assets.map(({ id, src }, i) => {
                                return (
                                    <a-asset-item
                                        key={`${i}-asset-item`}
                                        id={id}
                                        src={src}
                                    ></a-asset-item>
                                );
                            })}
                        </a-assets>
                        <a-camera active="false" position="0 0 0"></a-camera>
                        <a-entity mindar-face-target="anchorIndex: 168">
                            <a-gltf-model
                                mindar-face-occluder
                                position="0 -0.3 0.15"
                                rotation="0 0 0"
                                scale="0.065 0.065 0.065"
                                src="#headModel"
                            ></a-gltf-model>
                        </a-entity>
                        {/* the head */}
                        {assets.map(
                            (
                                { anchorIndex, rotation, position, scale, id },
                                i
                            ) => {
                                return (
                                    <a-entity
                                        key={`${i}-entity`}
                                        mindar-face-target={`anchorIndex: ${anchorIndex}`}
                                    >
                                        <a-gltf-model
                                            position={position.join(` `)}
                                            rotation={rotation}
                                            scale={scale}
                                            src={`#${id}`}
                                            className={`${id}c`}
                                            ref={(el) =>
                                                (itemsRef.current[i] = el)
                                            }
                                        ></a-gltf-model>
                                    </a-entity>
                                );
                            }
                        )}
                    </a-scene>
                </div>
            </div>
        </>
    );
}
