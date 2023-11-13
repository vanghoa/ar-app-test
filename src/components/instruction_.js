import React from 'react';

export default function InstructionStart(props) {
    return (
        <section
            className="absolute z-30 left-0 top-0 w-full h-full bg-blue-500 flex flex-col justify-center items-center font-mono text-lg p-8 [&_em]:font-black text-center"
            {...props}
        >
            <p>
                - <em>Swipe</em> or <em>tap the arrow</em> to switch the filter
            </p>
            <p>
                - <em>Tap the circle</em> to start
            </p>
        </section>
    );
}
