'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AlteregoSVG from '@/components/icons/alterego';

gsap.registerPlugin(useGSAP);

interface CrabAlteregoAnimationProps {
    className?: string;
}

const CrabAlteregoAnimation: React.FC<CrabAlteregoAnimationProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Example: Animate one of the elements, e.g., 'crab-element-1'
            // This is a placeholder animation. You'll need to inspect the SVG
            // to see what 'crab-element-1' corresponds to and adjust the animation.
            gsap.to('#crab-element-1', {
                rotation: 15,
                transformOrigin: '50% 50%', // Adjust as needed
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

            // You could also animate other parts:
            // gsap.to('#crab-element-2', { ... });
            // gsap.to('#crab-body', { scale: 1.02, repeat: -1, yoyo: true, duration: 1.5 });
        },
        { scope: containerRef } // Scope the GSAP selectors to this component
    );

    return (
        <div ref={containerRef} className={className}>
            <AlteregoSVG style={{ width: '100%', height: 'auto', maxWidth: '300px' }} />
        </div>
    );
};

export default CrabAlteregoAnimation; 