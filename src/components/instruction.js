import React from 'react';

export default function Instruction(props) {
    return (
        <section
            className="absolute z-50 left-0 top-0 w-full h-full bg-green-500 flex flex-col justify-center items-center font-mono text-lg p-8 cursor-pointer [&_em]:font-black text-center"
            {...props}
        >
            <p>- Please allow the camera when requested</p>
            <p>
                - <em>Swipe</em> or <em>tap the arrow</em> to switch the filter
            </p>
            <p>
                - <em>Tap the circle</em> to stop
            </p>
            <p>- Tap the screen to enter</p>
        </section>
    );
}
