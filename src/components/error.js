import React from 'react';

export default function Error(props) {
    return (
        <section
            className="absolute z-50 left-0 top-0 w-full h-full bg-red-500 flex flex-col justify-center items-center font-mono text-lg p-8 cursor-pointer [&_em]:font-black text-center text-white"
            {...props}
        >
            <p>
                - There is something wrong... Please make sure you allow the
                camera usage request or refresh this site
            </p>
        </section>
    );
}
