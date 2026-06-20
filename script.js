document.addEventListener("DOMContentLoaded", () => {
    
    /* --- DOM Elements --- */
    const entryScreen = document.getElementById("entry-screen");
    const mainContent = document.getElementById("main-content");
    const openSurpriseBtn = document.getElementById("open-surprise-btn");
    const openGiftBtn = document.getElementById("open-gift-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");
    const typewriterText = document.getElementById("typewriter-text");
    const cakeContainer = document.getElementById("cake-container");
    const cakeMessage = document.getElementById("cake-message");
    const bgAnimations = document.getElementById("background-animations");

    /* --- Music Control --- */
    let isPlaying = false;
    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = "🎵 Play Music";
        } else {
            bgMusic.play();
            musicBtn.innerHTML = "⏸️ Pause Music";
        }
        isPlaying = !isPlaying;
    });

    /* --- Transition --- */
    function openSurprise() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = "⏸️ Pause Music";
        }).catch(err => console.log("Audio autoplay prevented."));

        createConfetti(window.innerWidth / 2, window.innerHeight / 2, 60);

        entryScreen.style.opacity = "0";
        
        setTimeout(() => {
            entryScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            
            initScrollReveal();
            startTypewriter();
            startFloatingElements();
        }, 1000);
    }

    openSurpriseBtn.addEventListener("click", openSurprise);
    openGiftBtn.addEventListener("click", openSurprise);

    /* --- Premium English Typewriter Message --- */
    const message = `Dear Ziya,

Happy Birthday to my wonderful little sister! ❤️

Today is incredibly special to me because it is the day Allah blessed my life with you. Getting to be your brother is one of my greatest joys.

Your smile spreads unmatched happiness, and your presence always makes the entire family brighter. Even though we tease each other and fight over the smallest things, life wouldn't be half as beautiful without you around. Your brother always has your back!

May Allah guide you, protect you, and shower your future path with boundless success, good health, and pure happiness. 

I am incredibly lucky and proud to be your big brother. 

Have an amazing day today, Ziya! Enjoy every single second! ✨`;

    function startTypewriter() {
        let i = 0;
        typewriterText.innerHTML = "";
        
        function typeWriter() {
            if (i < message.length) {
                if (message.charAt(i) === '\n') {
                    typewriterText.innerHTML += "<br>";
                } else {
                    typewriterText.innerHTML += message.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 45);
            }
        }
        setTimeout(typeWriter, 1000);
    }

    /* --- Scroll Reveal --- */
    function initScrollReveal() {
        const reveals = document.querySelectorAll(".reveal-section");
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("show-scroll");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        reveals.forEach(reveal => revealObserver.observe(reveal));
    }

    /* --- Cake Interaction --- */
    cakeContainer.addEventListener("click", () => {
        const rect = cakeContainer.getBoundingClientRect();
        createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 120);
        document.querySelector(".cake-instructions").style.display = "none";
        cakeMessage.classList.remove("hidden");
    });

    /* --- Confetti System --- */
    function createConfetti(x, y, amount) {
        const colors = ['#fdf0f3', '#b76e79', '#ffd700', '#ffffff', '#e6e6fa'];
        for (let i = 0; i < amount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const angle = Math.random() * Math.PI * 2;
            const velocity = 60 + Math.random() * 160;
            const tx = Math.cos(angle) * velocity + 'px';
            const ty = Math.sin(angle) * velocity + 'px';
            
            particle.style.backgroundColor = color;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    /* --- English Floating Messages --- */
    const floatingMessagesText = [
        "❤️ Brother Loves You!", 
        "🌸 My Little Sister", 
        "✨ Always Be Happy", 
        "🎂 Where Is My Party?", 
        "💖 Best Sister Ever", 
        "🌙 Allah Bless You Ziya", 
        "🎁 Brother's Princess"
    ];

    const balloonEmojis = ["🎈", "✨", "💖", "🌸", "⭐"];

    function spawnFloatingElement() {
        if(document.visibilityState !== "visible") return;
        const el = document.createElement("div");
        el.classList.add("floating-element");

        const isMessage = Math.random() > 0.5;
        if (isMessage) {
            el.innerText = floatingMessagesText[Math.floor(Math.random() * floatingMessagesText.length)];
            el.classList.add("bg-message");
        } else {
            el.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            el.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
        }

        el.style.left = Math.random() * 90 + "vw";
        const duration = Math.random() * 8 + 12;
        el.style.animationDuration = duration + "s";

        bgAnimations.appendChild(el);
        setTimeout(() => el.remove(), duration * 1000);
    }

    function startFloatingElements() {
        setInterval(spawnFloatingElement, 2000);
    }
});