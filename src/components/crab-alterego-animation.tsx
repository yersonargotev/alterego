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
            // Animate crab-path-1: slight wiggle
            gsap.to('#crab-path-1', {
                rotation: 2,
                transformOrigin: 'center center',
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            // Animate crab-path-2: slow pulse
            gsap.to('#crab-path-2', {
                scale: 1.02,
                transformOrigin: 'center center',
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

            // Animate crab-path-3: subtle position shift
            gsap.to('#crab-path-3', {
                x: 5, // Shift 5 units on the SVG coordinate system
                y: -3,
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            // Animate crab-path-4: another slight wiggle, different timing/rotation
            gsap.to('#crab-path-4', {
                rotation: -1.5,
                transformOrigin: 'center center',
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 0.5, // Start slightly later than path-1
            });
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