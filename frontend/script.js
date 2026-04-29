console.log("🌸 Sweet Surprise App Loaded - v2.1 (Fixed)");

const initApp = () => {
    const hubCards = document.querySelectorAll('.hub-card');
    const contentOverlay = document.getElementById('content-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const contentBody = document.querySelector('.content-body');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const grandFinale = document.getElementById('grand-finale');
    const finalCelebrate = document.getElementById('final-celebrate');
    const loginBtn = document.getElementById('login-btn');
    const loginScreen = document.getElementById('login-screen');
    const surpriseMessage = document.getElementById('surprise-message');
    const finalTransition = document.getElementById('final-transition');
    const seeSurpriseBtn = document.getElementById('see-surprise-btn');
    const magicalCake = document.getElementById('magical-cake');
    const cakeContainer = document.querySelector('.cake-container');
    const beginMagicBtn = document.getElementById('begin-magic-btn');
    const landingSection = document.getElementById('landing');
    const messageCard = document.querySelector('.message-card');
    // Stage management
    const setStage = (stageName, push = true) => {
        // Hide all screens
        loginScreen.classList.add('hidden');
        surpriseMessage.classList.add('hidden');
        surpriseMessage.classList.remove('active');
        finalTransition.classList.add('hidden');
        finalTransition.classList.remove('active');
        magicalCake.classList.add('hidden');
        magicalCake.classList.remove('active');
        landingSection.classList.add('hidden');
        landingSection.classList.remove('active');
        document.body.classList.remove('logged-in');

        if (stageName === 'login') {
            loginScreen.classList.remove('hidden');
        } else if (stageName === 'surprise') {
            surpriseMessage.classList.remove('hidden');
            surpriseMessage.classList.add('active');
        } else if (stageName === 'wish') {
            finalTransition.classList.remove('hidden');
            finalTransition.classList.add('active');
        } else if (stageName === 'cake') {
            magicalCake.classList.remove('hidden');
            magicalCake.classList.add('active');
        } else if (stageName === 'main') {
            landingSection.classList.remove('hidden');
            landingSection.classList.add('active');
            document.body.classList.add('logged-in');
        }

        if (push) {
            history.pushState({ stage: stageName }, "", "");
        }
    };

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.stage) {
            setStage(event.state.stage, false);
        } else {
            setStage('login', false);
        }
    });

    // Initialize first state
    history.replaceState({ stage: 'login' }, "", "");

    // Login logic
    const handleLogin = () => {
        const usernameInput = document.getElementById('username');
        if (!usernameInput) return;
        
        const username = usernameInput.value.trim().toLowerCase();
        console.log("Login attempt with:", username);

        if (username === 'ankit' || username === 'ankit sir') {
            setStage('surprise');
        } else if (username === "") {
            alert('Please enter your sweet name! 🍬');
        } else {
            alert('Oops! Only Ankit (Cutu) can enter this sweet world! 🙅‍♂️🍭');
        }
    };

    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
        
        // Also handle Enter key
        document.getElementById('username').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    }

    // Surprise Message Click logic -> Go to Final Transition
    messageCard.addEventListener('click', () => {
        setStage('wish');
    });

    // Final Transition Button logic -> Go to Magical Cake
    seeSurpriseBtn.addEventListener('click', () => {
        setStage('cake');
    });

    // Magical Cake logic -> Wish (Confetti)
    cakeContainer.addEventListener('click', () => {
        fireConfetti(false);
        const hint = document.querySelector('.cake-hint');
        hint.textContent = "Wish made! Now begin the magic... ✨";
        hint.style.color = "#ff00ff";
    });

    // Begin Magic Button logic -> Go straight to Secret Message
    beginMagicBtn.addEventListener('click', () => {
        setStage('main');
        openSection('secret'); // Open the secret message overlay immediately
        fireConfetti(true);
    });

    // Login particles
    const createLoginParticle = () => {
        if (loginScreen.classList.contains('hidden')) return;
        const p = document.createElement('div');
        p.className = 'bg-confetti';
        const size = Math.random() * 6 + 2;
        const colors = ['#FFD700', '#FF69B4', '#9370DB', '#00FA9A', '#FF4500'];
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        p.style.opacity = Math.random();
        loginScreen.appendChild(p);
        setTimeout(() => p.remove(), 5000);
    };
    setInterval(createLoginParticle, 200);

    // Surprise Message floating items
    const icons = ['🎁', '✨', '🎈', '🍭', '💖', '🌟'];
    for (let i = 0; i < 15; i++) {
        const item = document.createElement('div');
        item.className = 'floating-item';
        item.textContent = icons[Math.floor(Math.random() * icons.length)];
        item.style.left = `${Math.random() * 100}vw`;
        item.style.animationDuration = `${Math.random() * 5 + 8}s`;
        item.style.animationDelay = `${Math.random() * 10}s`;
        item.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        surpriseMessage.appendChild(item);
    }

    // Particle Background
    const particleContainer = document.getElementById('particle-container');
    const createParticle = () => {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 10 + 5;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.animationDuration = `${Math.random() * 10 + 10}s`;
        p.style.opacity = Math.random() * 0.5;
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 20000);
    };
    setInterval(createParticle, 500);

    // Music Toggle
    let isMusicPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🎵 Play Music';
        } else {
            bgMusic.play().then(() => {
                musicToggle.textContent = '⏸ Pause Music';
            }).catch(e => {
                console.error("Music play failed:", e);
                alert("Click the page first to allow music!");
            });
        }
        isMusicPlaying = !isMusicPlaying;
    });

    bgMusic.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        musicToggle.textContent = '❌ Music Error';
    });

    // Content Data
    const sections = {
        surprise: {
            title: "🎁 Surprise!",
            render: () => {
                const div = document.createElement('div');
                div.className = 'surprise-text';
                contentBody.appendChild(div);
                
                const message = "HAPPY BIRTHDAY ANKIT SIR (CUTU)! 🥳\n\nTera birthday hai, toh duniya celebrate karegi... but pehle main! 🎈\n\nTu sirf dost nahi hai, tu meri daily dose of chaos + happiness hai 😭❤️";
                let i = 0;
                const type = () => {
                    if (i < message.length) {
                        div.innerHTML += message.charAt(i) === '\n' ? '<br>' : message.charAt(i);
                        i++;
                        setTimeout(type, 50);
                    } else {
                        // Trigger confetti when typing finishes
                        fireConfetti();
                    }
                };
                type();
            }
        },
        special: {
            title: "💖 Why You're Special",
            render: () => {
                const reasons = [
                    "Tu woh insaan hai jo 3 AM pe bhi 'haan bol' deta hai ☎️",
                    "Tere bina group chat = sarkari office 😴",
                    "Tu sirf dost nahi hai, tu meri daily dose of chaos + happiness hai 😭❤️",
                    "Tera advice = Google se better (sometimes 😂)",
                    "You make ordinary days feel like mini adventures ✨",
                    "Duniya mein log dhundte hain, mujhe toh mil gaya — tu! 🫶"
                ];
                const grid = document.createElement('div');
                grid.className = 'special-grid';
                reasons.forEach((text, i) => {
                    const card = document.createElement('div');
                    card.className = 'special-card';
                    card.style.animationDelay = `${i * 0.2}s`;
                    card.innerHTML = `<p>${text}</p>`;
                    grid.appendChild(card);
                });
                contentBody.appendChild(grid);
            }
        },
        memory: {
            title: "📸 Memory Lane",
            render: () => {
                const memories = [
                    { t: "The First Meeting", d: "Pata nahi kaise baat shuru hui, but ab band nahi hoti 😂" },
                    { t: "Food Adventure", d: "Jab hum dono ne 'diet start Monday se' bola aur Friday ko pizza order kiya 🍕" },
                    { t: "Rainy Day Chaos", d: "Baarish mein bheegna was never a plan, but best memory ban gayi 🌧️" },
                    { t: "3 AM Calls", d: "Neend nahi aati thi ya tujhe bore hona tha? Either way, best calls ever 🌙" },
                    { t: "That Tough Day", d: "Jab sab galat ja raha tha, tu wahan tha. Bas. ❤️" }
                ];
                const timeline = document.createElement('div');
                timeline.className = 'timeline';
                memories.forEach(m => {
                    const item = document.createElement('div');
                    item.className = 'timeline-item';
                    item.innerHTML = `<h4>${m.t}</h4><p>${m.d}</p>`;
                    timeline.appendChild(item);
                });
                contentBody.appendChild(timeline);
            }
        },
        secret: {
            title: "👀 Secret Message",
            render: () => {
                const container = document.createElement('div');
                container.className = 'secret-container';
                container.innerHTML = `
                    <div class="unreveal-text">
                        Happiest birthday Ankit sir, Your birthday is the perfect time to remind you what a wonderful person you are. You get more amazing day by day! <br><br>
                        "May your birthday be filled with love, joy, and countless blessings. You deserve every bit of it". <br><br>
                        "I hope you achieve more than you have ever dreamed of,". <br><br>
                        And haa aap khud ko jitna bhi bura banane ki koshish kro aap ache hi rhoge kyuki aap ache ho bs negative jada sochte! 🔪
                    </div>
                    <p class="reveal-hint">Click to read... 🤫</p>
                `;
                contentBody.appendChild(container);
                const text = container.querySelector('.unreveal-text');
                text.onclick = () => {
                    text.classList.toggle('revealed');
                    if(text.classList.contains('revealed')) {
                        fireConfetti();
                        // Add final celebration button if it doesn't exist
                        if (!container.querySelector('.celebrate-btn')) {
                            const btn = document.createElement('button');
                            btn.className = 'celebrate-btn';
                            btn.style.marginTop = '3rem';
                            btn.textContent = 'Click to trigger final celebration! 🎊';
                            btn.onclick = () => {
                                contentOverlay.classList.add('hidden');
                                grandFinale.classList.remove('hidden');
                                fireConfetti(true);
                            };
                            container.appendChild(btn);
                        }
                    }
                };
            }
        }
    };

    const viewedSections = new Set();

    // Interaction Hub Click
    hubCards.forEach(card => {
        card.addEventListener('click', () => {
            const sectionKey = card.getAttribute('data-section');
            viewedSections.add(sectionKey);
            openSection(sectionKey);
        });
    });

    const openSection = (key) => {
        contentBody.innerHTML = '';
        contentOverlay.classList.remove('hidden');
        sections[key].render();
        
        // Show grand finale button if all sections viewed
        if (viewedSections.size === 4) {
            setTimeout(() => {
                const btn = document.createElement('button');
                btn.className = 'celebrate-btn';
                btn.style.marginTop = '2rem';
                btn.textContent = 'Trigger Final Celebration! 🎊';
                btn.onclick = () => {
                    contentOverlay.classList.add('hidden');
                    grandFinale.classList.remove('hidden');
                    fireConfetti(true);
                };
                contentBody.appendChild(btn);
            }, 1000);
        }
    };

    closeBtn.addEventListener('click', () => {
        contentOverlay.classList.add('hidden');
    });

    finalCelebrate.addEventListener('click', () => {
        fireConfetti(true);
    });

    // Sprinkle generation
    const sprinkleContainers = document.querySelectorAll('.sprinkles');
    const colors = ['#FF69B4', '#FFD700', '#00FA9A', '#00BFFF', '#FF4500', '#FFFFFF'];
    
    sprinkleContainers.forEach(container => {
        for (let i = 0; i < 15; i++) {
            const s = document.createElement('div');
            s.className = 'sprinkle';
            s.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            s.style.left = `${Math.random() * 90}%`;
            s.style.top = `${Math.random() * 80}%`;
            s.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(s);
        }
    });

    // Confetti Engine
    const fireConfetti = (isBig = false) => {
        if (isBig) {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 3000 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        } else {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 3000
            });
        }
    };
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
