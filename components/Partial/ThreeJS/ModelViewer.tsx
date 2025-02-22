import Script from 'next/script';
import React, { useState, useEffect } from 'react';
const ModelViewer = ({data}) => {
    const [useHeight, setHeight] = useState('100%');
    const [useWidth, setWidth] = useState('100%');

    const handleWidth = () => {
        if (window.innerWidth < 600) {
            setWidth('100%');
            setHeight('100%');
        } else {
            setWidth('100%');
            setHeight('500px');
        }
    };

    useEffect(() => {
        handleWidth(); // Initial call to set the dimensions correctly
        window.addEventListener('resize', handleWidth);
        const interval = setInterval(handleWidth, 1000);

        return () => {
            window.removeEventListener('resize', handleWidth);
            clearInterval(interval);
        };
    });

    return (
        <div className="canvas">
                <Script
                    type="module"
                    src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    strategy="lazyOnload"/>
            <model-viewer
                src={data}
                alt="A 3D model"
                ar
                ar-scale="fixed"
                camera-controls touch-action="pan-y"
                shadow-intensity="2"
                skybox-height="2m"
                max-camera-orbit="auto 90deg auto"
                style={{ width: useWidth, height: useHeight }}>
            </model-viewer>
        </div>
    );
};

export default ModelViewer;
