import React from 'react';

export default function Arrow({ className }) {
    return (
        <div
            className={`${className} border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-l-[30px] border-l-white border-solid`}
        ></div>
    );
}
