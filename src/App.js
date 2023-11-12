import { useRef, useState } from 'react';
import MainAR from './components/mainAR';
import { assetsModel } from './utils/assets';

export default function App() {
    const [assets, setAssets] = useState(assetsModel);
    return (
        <>
            <MainAR assets={assets}></MainAR>
        </>
    );
}
