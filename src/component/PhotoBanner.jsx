import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

function PhotoBanner() {
    const [allImages, setAllImages] = useState({ pc: [], sp: [] });
    const [currentTab, setCurrentTab] = useState('sp');
    const [visibleCount, setVisibleCount] = useState(25);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        fetch('/images/image.json')
            .then((response) => response.json())
            .then((data) => {
                setAllImages(data);
            })
            .catch((error) => console.error("Error loading images layout:", error));
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                setShowTop(window.scrollY > 480);
                ticking = false;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentImagesData = allImages[currentTab] || [];
    const displayedImages = currentImagesData.slice(0, visibleCount);
    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setVisibleCount(25);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 25);
    };

    return (
        <>
        <div className='w-full min-h-screen py-12 px-4' style={{ backgroundColor: '#0D0B1A', color: '#fff' }}>
            <div className="max-w-7xl mx-auto">

                <h2 className="text-3xl font-bold text-center mb-6">Banner Design</h2>

                {/* --- ปุ่มสลับโหมด PC / SP (Tab Switcher) --- */}
                <div className="flex justify-center gap-4 mb-10">
                    <button type="button"
                        onClick={() => handleTabChange('sp')}
                        className={`btn ${currentTab === 'sp' ? 'is-active' : 'btn-subtle'}`}
                    >
                        Smartphone (SP)
                    </button>
                    <button type="button"
                        onClick={() => handleTabChange('pc')}
                        className={`btn ${currentTab === 'pc' ? 'is-active' : 'btn-subtle'}`}
                    >
                        Desktop (PC)
                    </button>
                </div>

                <div className={`grid gap-4 items-start ${currentTab === 'sp'
                        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
                        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' 
                    }`}
                >

                    {Array.from({ length: currentTab === 'sp' ? 5 : 3 }).map((_, colIndex) => (
                        <div
                            key={colIndex}

                            className={`flex flex-col gap-4 ${currentTab === 'sp'
                                    ? `${colIndex >= 2 ? 'hidden sm:flex' : ''} ${colIndex >= 3 ? 'sm:hidden md:flex' : ''} ${colIndex >= 4 ? 'md:hidden lg:flex' : ''}`
                                    : `${colIndex >= 1 ? 'hidden sm:flex' : ''} ${colIndex >= 2 ? 'sm:hidden md:flex' : ''}`
                                }`}
                        >
                            {displayedImages
                                .filter((_, imgIndex) => {
                                    let activeCols = 1;
                                    if (currentTab === 'sp') {
                                        if (windowWidth >= 1024) activeCols = 5;
                                        else if (windowWidth >= 768) activeCols = 4;
                                        else if (windowWidth >= 640) activeCols = 3;
                                        else activeCols = 2;
                                    } else {
                                        if (windowWidth >= 768) activeCols = 3;
                                        else if (windowWidth >= 640) activeCols = 2;
                                        else activeCols = 1;
                                    }
                                    return imgIndex % activeCols === colIndex;
                                })
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-xl overflow-hidden shadow-lg border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                                        style={{ borderColor: '#3b1f6b', backgroundColor: '#1a1535' }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={`${currentTab} Banner ${item.id}`}
                                            className="w-full h-auto block"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>

                {visibleCount < currentImagesData.length && (
                    <div className="text-center mt-12">
                        <button type="button"
                            onClick={handleLoadMore}
                            className="btn btn-primary btn-lg"
                        >
                            Load More ({visibleCount} / {currentImagesData.length})
                        </button>
                    </div>
                )}

            </div>
        </div>

        {/* Portal ไป document.body โดยตรง — เพราะ App.js มี wrapper div ที่ใส่
            transition-transform ซึ่งทำให้ position:fixed ธรรมดายึดกับ viewport ไม่ได้ */}
        {showTop && createPortal(
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to Top"
                className="btn-icon is-solid fixed bottom-6 right-6 z-[90] shadow-lg"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5" />
                    <path d="M5 12l7-7 7 7" />
                </svg>
            </button>,
            document.body
        )}
        </>
    )
}

export default PhotoBanner
