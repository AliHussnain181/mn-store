"use client"
import React, { useEffect } from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';


const About = () => {
    useEffect(() => {
        const tl = gsap.timeline();

        tl.from('.about-image', {
            duration: 1,
            scale: 1.1,
            opacity: 0,
            ease: 'power3.out',
        });
        // Animation for the paper plane icon
        tl.from('.paper-plane', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'power3.out',
        });

        // Animation for the title
        tl.from('.about-title', {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out',
        }, "-=0.5"); // Start this animation 0.5 seconds before the previous one ends

        // Animation for the paragraphs
        tl.from('.about-paragraph', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out',
        });

        // Animation for the purchase link
        tl.from('.purchase-link', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: 'power3.out',
        });

        // Animation for the image

    }, []);

    return (
        <div id='about' className='text-black w-full'>
            <div className='w-[90%] sm:w-[75%] lg:w-[90%] lg:h-[90vh] mx-auto h-full  mb-7 lg:flex  my-24'>
                <div className=''>
                    <Image
                        width={800}
                        height={800}
                        className='w-full rounded-md lg:h-[90vh] about-image'
                        src='/mn.jpg'
                        alt='about'
                    />
                </div>
                <div className='lg:px-11 lg:w-[60%] overflow-hidden font-Special'>
                    <div className='w-16 h-16 bg-[#22d3ee] rounded-full my-10 overflow-hidden paper-plane'>
                        <IoPaperPlaneOutline className='bg-transparent m-auto mt-4 text-3xl' />
                    </div>
                    <h1 className='font-Raleway text-3xl overflow-hidden font-bold font-Mono my-7 tracking-wide lg:text-5xl about-title'>Refreshingly Unique Company About.</h1>
                    <p className='font-Mono my-7 font-Plus about-paragraph'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean</p>
                    <p className='font-Mono my-7 font-Plus about-paragraph'>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences</p>
                    <Link href="/" className='text-sm font-Space text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% purchase-link'>View Products</Link>
                </div>
            </div>
        </div>
    );
};

export default About;

