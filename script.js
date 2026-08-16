// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Nav Toggler ---
    const navToggler = document.getElementById("nav-toggler");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (navToggler && navMenu) {
        navToggler.addEventListener("click", () => {
            navToggler.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggler.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // --- GSAP Animations (Architectural CAD Build) ---
    const heroTl = gsap.timeline({ 
        delay: 0.2,
        scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // 1st: Crosshairs snap into place (like a CAD software loading)
    heroTl.to(".crosshair", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
    })
    
    // 2nd: Dimension lines draw themselves
    .to(".dim-horizontal", {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut"
    }, "-=0.2")
    .to(".dim-vertical", {
        height: "100%",
        duration: 0.8,
        ease: "power2.inOut"
    }, "-=0.6")
    
    // 3rd: Dimension labels fade in and Blueprint Grid becomes visible
    .to(".dim-text", {
        opacity: 1,
        duration: 0.5
    }, "-=0.3")
    .to(".architect-draft-box", {
        "--grid-opacity": 1,
        duration: 0.5
    })
    
    // 4th: Layer 1 - The Blueprint Outline fades in and slides slightly
    .fromTo(".hero-title-outline", 
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 2.0, ease: "power2.out" }
    , "-=0.5")
    
    // 5th: Layer 2 - The Scaffolding/Hatching builds up smoothly
    .to(".hero-title-hatch", {
        opacity: 1, // Optimized: Opacity fade instead of heavy clipPath geometry
        duration: 2.0,
        ease: "power2.inOut"
    }, "-=1.5")

    // 6th: Layer 3 - The Solid Concrete pours smoothly over it
    .to(".hero-title-solid", {
        opacity: 1, // Optimized: Opacity fade instead of heavy clipPath geometry
        duration: 2.0,
        ease: "power2.inOut"
    }, "-=1.5")

    // 7th: Paragraph and button slide in
    .to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out"
    }, "-=1.5")
    .to(".hero-content .hero-cta", {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out"
    }, "-=1.0");

    // --- About Section Animations ---
    // Fade the global background video in/out when about section is in view
    gsap.fromTo("#global-bg-video",
        { opacity: 0 },
        {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: ".about-section",
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reverse play reverse"
            }
        }
    );

    gsap.from(".about-title", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "power4.out"
    });

    gsap.to(".about-cta", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        x: 0,
        opacity: 1,
        duration: 1.5,
        delay: 0.1, // Reduced delay so it appears almost immediately
        ease: "power4.out"
    });

    // --- About Section Animations ---
    // The text is now statically displayed in a split layout so the auto-slider is removed.

    // --- Projects Carousel Logic ---
    const projectsData = [
        {
            num: "01",
            title: "The Horizon Villa",
            meta: "Los Angeles, CA  |  Residential",
            desc: "A breathtaking modern villa perfectly integrated into the coastal cliffs. Features sweeping glass facades and sustainable luxury materials."
        },
        {
            num: "02",
            title: "Lumina Towers",
            meta: "New York, NY  |  Commercial",
            desc: "Redefining the skyline with an innovative dual-tower design. Lumina incorporates vertical gardens and state-of-the-art energy efficiency."
        },
        {
            num: "03",
            title: "Eco-Retreat",
            meta: "Bali, Indonesia  |  Hospitality",
            desc: "A luxury resort built entirely with locally sourced bamboo and reclaimed wood, offering a zero-carbon footprint experience in the jungle."
        },
        {
            num: "04",
            title: "The Apex Museum",
            meta: "London, UK  |  Cultural",
            desc: "An avant-garde architectural masterpiece featuring a twisted titanium exterior that reflects the surrounding historic cityscape."
        },
        {
            num: "05",
            title: "Zenith Residence",
            meta: "Tokyo, Japan  |  Residential",
            desc: "A minimalist urban sanctuary that balances raw concrete textures with warm wooden interiors and serene zen gardens."
        },
        {
            num: "06",
            title: "Oasis Pavilion",
            meta: "Dubai, UAE  |  Public Space",
            desc: "A futuristic public pavilion engineered for extreme climates, offering a naturally cooled, shaded ecosystem beneath parametric canopies."
        },
        {
            num: "07",
            title: "Alpine Ridge",
            meta: "Swiss Alps  |  Hospitality",
            desc: "A luxurious mountain resort seamlessly integrated into the snow-capped peaks, featuring floor-to-ceiling vistas and geothermal heating."
        },
        {
            num: "08",
            title: "The Glass Nexus",
            meta: "Berlin, Germany  |  Commercial",
            desc: "A state-of-the-art corporate headquarters utilizing dynamic smart glass and open collaborative atrium spaces."
        }
    ];

    const pNum = document.getElementById("p-num");
    const pTitle = document.getElementById("p-title");
    const pMeta = document.getElementById("p-meta");
    const pDesc = document.getElementById("p-desc");
    const infoDisplay = document.querySelector(".project-info-display");

    if (infoDisplay && projectsData.length > 0) {
        let currentIndex = 0;
        const numItems = projectsData.length;

        function updateSlider() {
            currentIndex = (currentIndex + 1) % numItems;

            // Text Update Animation (Smooth left-to-right changes)
            gsap.to(".project-info-display > *:not(.p-btn)", {
                x: 50, // Moves to the right while fading out
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    const data = projectsData[currentIndex];
                    pNum.innerText = data.num;
                    pTitle.innerText = data.title;
                    pMeta.innerText = data.meta;
                    pDesc.innerText = data.desc;
                    
                    // Comes in from the left, moving to its original position (0)
                    gsap.fromTo(".project-info-display > *:not(.p-btn)", 
                        { x: -50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                    );
                }
            });
        }

        // Auto-play interval (5 seconds for a slower, richer feel)
        setInterval(updateSlider, 5000);

        // Entrance scroll animation
        const projTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".projects-section",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Text slides in from left to native position
        projTl.fromTo(".project-info-display > *:not(.p-btn)", 
            { x: -150, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
        )
        // Button slides in from right to exact center (native position)
        .fromTo(".p-btn", 
            { x: 150, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, 
            "-=1.0"
        );
    }

    // --- Signature Portfolio Section Animations ---
    const portfolioTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });

    // Text block slides in from left
    portfolioTl.from(".contact-typography", {
        x: -150,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    // Image slider block slides in from right
    .from(".contact-slider-container", {
        x: 150,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    }, "-=1.0");

    // Parallax effect INSIDE the text
    gsap.to(".text-mask", {
        backgroundPosition: "center 100%", // Moves the image inside the text
        ease: "none",
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // --- Signature Portfolio Auto Slider ---
    const sigTitles = [
        "INITIATE PROJECT",
        "ELEVATE VISION",
        "SCULPT SPACE",
        "DESIGN FUTURE",
        "BUILD HORIZON",
        "CRAFT LEGACY",
        "REDEFINE LIMITS",
        "SHAPE TOMORROW"
    ];
    const sigDescs = [
        "Share your vision with us. Our architects will help you shape the future of your space.",
        "Transforming raw concepts into monumental realities with precision and elegance.",
        "Crafting environments that breathe with nature and stand the test of time.",
        "Pushing the boundaries of modern architecture through sustainable innovation.",
        "Merging structural integrity with breathtaking aesthetic brilliance.",
        "Leaving a lasting mark on the skyline with iconic, timeless design.",
        "Breaking conventions to engineer the impossible and inspire awe.",
        "Pioneering the next era of architectural excellence for generations."
    ];
    let sigIndex = 0;
    
    // Auto-play interval for Signature Portfolio
    setInterval(() => {
        sigIndex = (sigIndex + 1) % sigTitles.length;
        
        // Text animation (fade and move right, then in from left)
        gsap.to(["#sig-title", "#sig-desc"], {
            x: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.in",
            onComplete: () => {
                document.getElementById("sig-title").innerHTML = sigTitles[sigIndex];
                document.getElementById("sig-desc").innerHTML = sigDescs[sigIndex];
                
                gsap.fromTo(["#sig-title", "#sig-desc"],
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                );
            }
        });
        
        // Image animation (slide auto left to right)
        gsap.to("#signature-slider-img", {
            x: "100%", // slide completely out to right
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                const img = document.getElementById("signature-slider-img");
                if (img) {
                    img.src = `assets/slide${sigIndex + 1}.png`;
                    gsap.fromTo(img,
                        { x: "-100%", opacity: 0 },
                        { x: "0%", opacity: 1, duration: 1.0, ease: "power3.out" }
                    );
                }
            }
        });
    }, 5000);

    // --- Why Choose Us Animations ---
    gsap.from(".why-row", {
        scrollTrigger: {
            trigger: ".why-choose-us",
            start: "top 60%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });


    // Why Choose Us Auto Slider
    const whyNums = ["01", "02", "03", "04", "05", "06", "07"];
    const whyTitles = [
        "VISIONARY ARCHITECTURE", 
        "UNCOMPROMISING PRECISION", 
        "SUSTAINABLE LUXURY",
        "TIMELESS INNOVATION",
        "GLOBAL EXPERTISE",
        "BESPOKE EXPERIENCE",
        "SEAMLESS EXECUTION"
    ];
    const whyDescs = [
        "We transcend traditional design by fusing structural elegance with raw, fluid beauty, crafting monumental sanctuaries that breathe with their surroundings.",
        "Every line drawn is a commitment to the future. Our unparalleled attention to detail ensures that every angle and material aligns with perfection.",
        "By embracing sustainable innovation and bold aesthetics, we engineer zero-carbon environments that inspire awe without compromising our planet.",
        "Pioneering new methods and smart materials to create structures that adapt, evolve, and remain iconic for generations.",
        "Bringing together a world-class team of designers, engineers, and visionaries to execute projects on a monumental global scale.",
        "Translating your deepest aspirations into physical reality through an intimate, bespoke collaborative design process.",
        "From visionary concept to flawless completion, we oversee every detail to guarantee uncompromising quality and delivery."
    ];
    let whyIndex = 0;

    setInterval(() => {
        gsap.to(["#why-num", "#why-title", "#why-desc"], {
            x: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                whyIndex = (whyIndex + 1) % whyNums.length;
                document.getElementById("why-num").innerHTML = whyNums[whyIndex];
                document.getElementById("why-title").innerHTML = whyTitles[whyIndex];
                document.getElementById("why-desc").innerHTML = whyDescs[whyIndex];
                
                gsap.fromTo(["#why-num", "#why-title", "#why-desc"],
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                );
            }
        });
    }, 4000);



});

// --- Anti-Gravity Effect Logic (Optimized for 120fps) ---
function enableZeroLagAntiGravity() {
    // Instead of using requestAnimationFrame which causes layout thrashing,
    // we use GSAP ScrollTrigger which is perfectly synced to the compositor thread.
    gsap.to(".hero-content", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        yPercent: -40, // Moves up 40% of its height, creating the anti-gravity float
        ease: "none"
    });
}

// Ensure it runs after EVERYTHING loads to keep current state intact:
window.addEventListener('load', enableZeroLagAntiGravity);

// Frame Drop Preventer (Runs smooth at 60 FPS)
document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector("video");
    
    if (video) {
        // Video render optimization
        video.setAttribute("muted", "true");
        video.setAttribute("playsinline", "true");
        
        // Auto pause video when scrolled completely out of view to save GPU power
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.05 });

        observer.observe(video);
    }
});
