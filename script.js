// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const scrollToTopBtn = document.getElementById('scrollToTop');
const themeToggle = document.getElementById('checkbox');
const loaderWrapper = document.querySelector('.loader-wrapper');
const sections = document.querySelectorAll('section');
const progressBars = document.querySelectorAll('.progress');
const typingText = document.querySelector('.typing-text');

// Cybersecurity-specific elements
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const strengthMeter = document.getElementById('strengthMeter');
const strengthText = document.getElementById('strengthText');
const passwordFeedback = document.getElementById('passwordFeedback');
const copyPgpKey = document.getElementById('copyPgpKey');

// Security terms for typing animation
const securityTerms = [
    "Security Professional",
    "Penetration Tester",
    "Ethical Hacker",
    "Cybersecurity Analyst",
    "Security Researcher"
];
let termIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check user preference for dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') === null) {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', toggleDarkMode);

// Enhanced typing animation for terminal effect
function typeText() {
    const currentTerm = securityTerms[termIndex];
    
    if (isWaiting) {
        setTimeout(typeText, 2000); // Wait at completed term
        isWaiting = false;
        return;
    }
    
    if (!isDeleting && charIndex <= currentTerm.length) {
        // Add random typing delay for more realistic effect
        const typingDelay = Math.random() * 50 + 100;
        typingText.textContent = currentTerm.substring(0, charIndex);
        charIndex++;
        setTimeout(typeText, typingDelay);
    } else if (isDeleting && charIndex >= 0) {
        typingText.textContent = currentTerm.substring(0, charIndex);
        charIndex--;
        setTimeout(typeText, 50);
    } else {
        isDeleting = !isDeleting;
        
        if (!isDeleting) {
            termIndex = (termIndex + 1) % securityTerms.length;
            isWaiting = true;
        }
        
        setTimeout(typeText, 100);
    }
}

// Sticky Header with improved performance using requestAnimationFrame
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    if (lastScrollY > 50) {
        header.classList.add('scrolled');
        header.style.padding = '1rem 5%';
    } else {
        header.classList.remove('scrolled');
        header.style.padding = '1.5rem 5%';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
    
    // Show/hide scroll to top button
    if (lastScrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top button
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Project Filtering with animation
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            // Add cyber glitch effect on filtering
            card.classList.add('glitch-effect');
            
            setTimeout(() => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.classList.remove('glitch-effect');
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('glitch-effect');
                    }, 300);
                }
            }, 200);
        });
    });
});

// Form Validation with improved feedback
if (contactForm) {
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        group.appendChild(errorElement);
        
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
    
    function validateInput(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (!input.value.trim()) {
            errorElement.textContent = `${input.placeholder} is required`;
            input.classList.add('error');
            return false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            errorElement.textContent = 'Please enter a valid email address';
            input.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
            return true;
        }
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form inputs
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Validate all inputs
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message with better UI feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                const formSuccess = document.createElement('div');
                formSuccess.className = 'form-success';
                formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                
                contactForm.reset();
                contactForm.style.opacity = '0';
                
                setTimeout(() => {
                    contactForm.parentElement.appendChild(formSuccess);
                    
                    setTimeout(() => {
                        formSuccess.remove();
                        contactForm.style.opacity = '1';
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 4000);
                }, 300);
            }, 1500);
        }
    });
}

// Smooth scrolling with improved performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial slider
let currentSlide = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDotsContainer = document.querySelector('.testimonial-dots');

// Create dots if testimonials exist
if (testimonialSlides.length > 0) {
    // Create dots
    testimonialSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        testimonialDotsContainer.appendChild(dot);
    });
    
    // Auto-advance slides
    setInterval(() => {
        goToSlide((currentSlide + 1) % testimonialSlides.length);
    }, 5000);
}

function goToSlide(slideIndex) {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    currentSlide = slideIndex;
    
    testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Animation on scroll with Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skills')) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.setProperty('--progress-width', width);
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
            
            // Unobserve after animation
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Matrix-like background animation for hero section
function createMatrixBackground() {
    const cyberGrid = document.querySelector('.cyber-grid');
    
    if (!cyberGrid) return;
    
    // Add occasional glowing dots
    setInterval(() => {
        const dot = document.createElement('div');
        dot.classList.add('matrix-dot');
        
        // Random position
        const posX = Math.floor(Math.random() * cyberGrid.offsetWidth);
        const posY = Math.floor(Math.random() * cyberGrid.offsetHeight);
        
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;
        
        // Random size and opacity
        const size = Math.floor(Math.random() * 3) + 2;
        const opacity = Math.random() * 0.5 + 0.3;
        
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = opacity;
        
        cyberGrid.appendChild(dot);
        
        // Remove dot after animation
        setTimeout(() => {
            dot.remove();
        }, 2000);
    }, 100);
}

// Terminal typing simulation
function simulateTerminal() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    const terminalResponses = document.querySelectorAll('.terminal-response:not(.typing-terminal)');
    const typingTerminal = document.querySelector('.typing-terminal');
    
    let lineIndex = 0;
    
    // Initially hide all lines and responses
    terminalLines.forEach((line, i) => {
        if (i > 0) line.style.opacity = "0";
    });
    
    terminalResponses.forEach(response => {
        response.style.opacity = "0";
    });
    
    if (typingTerminal) typingTerminal.style.opacity = "0";
    
    // Simulate typing
    function typeNextLine() {
        if (lineIndex >= terminalLines.length) return;
        
        terminalLines[lineIndex].style.opacity = "1";
        
        setTimeout(() => {
            // Show response if available
            if (terminalResponses[lineIndex]) {
                terminalResponses[lineIndex].style.opacity = "1";
            }
            
            // If it's the typing terminal (with the typing animation)
            if (lineIndex === 0 && typingTerminal) {
                typingTerminal.style.opacity = "1";
                typeText();
            }
            
            lineIndex++;
            if (lineIndex < terminalLines.length) {
                setTimeout(typeNextLine, 1000);
            }
        }, 500);
    }
    
    setTimeout(typeNextLine, 1000);
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    // Length check
    if (password.length < 8) {
        feedback.push("Password is too short (minimum 8 characters)");
    } else {
        strength += 1;
    }
    
    if (password.length >= 12) {
        strength += 1;
    }
    
    // Character type checks
    if (/[A-Z]/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add uppercase letters");
    }
    
    if (/[a-z]/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add lowercase letters");
    }
    
    if (/[0-9]/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add numbers");
    }
    
    if (/[^A-Za-z0-9]/.test(password)) {
        strength += 1;
    } else {
        feedback.push("Add special characters");
    }
    
    // Check for common patterns
    if (/123|abc|qwerty|password|admin|letmein|welcome/i.test(password)) {
        strength -= 1;
        feedback.push("Avoid common patterns and words");
    }
    
    // Repeat characters
    if (/(.)\1{2,}/.test(password)) {
        strength -= 1;
        feedback.push("Avoid repeating characters");
    }
    
    // Set a minimum floor
    strength = Math.max(0, strength);
    
    // Map strength to percentage and text
    let strengthPercent = (strength / 6) * 100;
    let strengthLabel = "";
    let strengthColor = "";
    
    if (strength <= 1) {
        strengthLabel = "Very Weak";
        strengthColor = "#ff3b30";
    } else if (strength <= 2) {
        strengthLabel = "Weak";
        strengthColor = "#ff9500";
    } else if (strength <= 3) {
        strengthLabel = "Moderate";
        strengthColor = "#ffcc00";
    } else if (strength <= 4) {
        strengthLabel = "Good";
        strengthColor = "#34c759";
    } else {
        strengthLabel = "Strong";
        strengthColor = "#00ff41";
    }
    
    return {
        strength: strengthPercent,
        label: strengthLabel,
        color: strengthColor,
        feedback: feedback
    };
}

// Initialize password strength meter
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const result = checkPasswordStrength(this.value);
        
        strengthMeter.style.width = `${result.strength}%`;
        strengthMeter.style.backgroundColor = result.color;
        strengthText.textContent = result.label;
        
        // Display feedback
        if (this.value.length === 0) {
            passwordFeedback.innerHTML = '';
        } else if (result.feedback.length === 0) {
            passwordFeedback.innerHTML = '<div class="feedback-item success"><i class="fas fa-check-circle"></i> Great password!</div>';
        } else {
            passwordFeedback.innerHTML = result.feedback.map(item => 
                `<div class="feedback-item"><i class="fas fa-info-circle"></i> ${item}</div>`
            ).join('');
        }
    });
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
}

// Copy PGP key to clipboard
if (copyPgpKey) {
    copyPgpKey.addEventListener('click', function() {
        // Sample PGP public key (replace with your actual key)
        const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
mQINBGCB1rUBEACnm0+DUH+Q/7U73ATZc8TnrwLF6MguVBcIc3xLj3OKlxpOISe7
NMTl1SNGC/JDnAkMd3VrwQmLp+zJSt9XWU3A7GXDiiHJZhDV0ZkpEDMiVHDK/Dpg
LM9SbdEwXlL598JsK9aKQWEiv4fQy7Cfyn3uWiZnIxJC9J/yO9oYYPGdQTt6NbWM
... (truncated for brevity)
U8cVwNd9RA/JRRsZbLa1r7tSCPrO
-----END PGP PUBLIC KEY BLOCK-----`;

        navigator.clipboard.writeText(pgpKey).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
}

// Page load events
window.addEventListener('load', () => {
    // Hide loader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
    
    // Start cybersecurity animations
    setTimeout(() => {
        createMatrixBackground();
        simulateTerminal();
    }, 1500);
    
    // Initially show all projects
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
});

// Security Tools Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const toolTabs = document.querySelectorAll('.tool-tab');
    const toolContents = document.querySelectorAll('.tool-content');
    
    if (toolTabs.length > 0) {
        toolTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const toolType = tab.getAttribute('data-tool');
                
                // Update active tab
                toolTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding content
                toolContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${toolType}-tool`) {
                        // Animated transition
                        content.style.opacity = '0';
                        content.classList.add('active');
                        
                        setTimeout(() => {
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                        }, 50);
                    }
                });
            });
        });
    }
    
    // Initialize Hash Generator
    const hashInput = document.getElementById('hashInput');
    const generateHashBtn = document.getElementById('generateHash');
    const hashResult = document.getElementById('hashResult');
    const copyHashBtn = document.getElementById('copyHash');
    
    if (generateHashBtn) {
        generateHashBtn.addEventListener('click', function() {
            if (!hashInput.value.trim()) {
                showToolError(hashResult, 'Please enter some text to hash');
                return;
            }
            
            try {
                const text = hashInput.value;
                const hashType = document.querySelector('input[name="hashType"]:checked').value;
                let hash = '';
                
                switch (hashType) {
                    case 'md5':
                        hash = CryptoJS.MD5(text).toString();
                        break;
                    case 'sha1':
                        hash = CryptoJS.SHA1(text).toString();
                        break;
                    case 'sha256':
                        hash = CryptoJS.SHA256(text).toString();
                        break;
                    default:
                        hash = CryptoJS.MD5(text).toString();
                }
                
                hashResult.value = hash;
                hashResult.classList.add('success-highlight');
                
                setTimeout(() => {
                    hashResult.classList.remove('success-highlight');
                }, 1000);
                
            } catch (error) {
                showToolError(hashResult, 'Error generating hash');
                console.error('Hash error:', error);
            }
        });
    }
    
    // Copy hash to clipboard
    if (copyHashBtn) {
        copyHashBtn.addEventListener('click', function() {
            copyToClipboard(hashResult);
        });
    }
    
    // Initialize Text Encoder/Decoder
    const encoderInput = document.getElementById('encoderInput');
    const encodeBtn = document.getElementById('encodeText');
    const decodeBtn = document.getElementById('decodeText');
    const encoderResult = document.getElementById('encoderResult');
    const copyEncoderBtn = document.getElementById('copyEncoder');
    
    if (encodeBtn) {
        encodeBtn.addEventListener('click', function() {
            if (!encoderInput.value.trim()) {
                showToolError(encoderResult, 'Please enter some text to encode');
                return;
            }
            
            try {
                const text = encoderInput.value;
                const encoderType = document.querySelector('input[name="encoderType"]:checked').value;
                let result = '';
                
                switch (encoderType) {
                    case 'base64':
                        result = btoa(text);
                        break;
                    case 'uri':
                        result = encodeURIComponent(text);
                        break;
                    case 'hex':
                        result = toHex(text);
                        break;
                    default:
                        result = btoa(text);
                }
                
                encoderResult.value = result;
                encoderResult.classList.add('success-highlight');
                
                setTimeout(() => {
                    encoderResult.classList.remove('success-highlight');
                }, 1000);
                
            } catch (error) {
                showToolError(encoderResult, 'Error encoding text');
                console.error('Encoding error:', error);
            }
        });
    }
    
    if (decodeBtn) {
        decodeBtn.addEventListener('click', function() {
            if (!encoderInput.value.trim()) {
                showToolError(encoderResult, 'Please enter some text to decode');
                return;
            }
            
            try {
                const text = encoderInput.value;
                const encoderType = document.querySelector('input[name="encoderType"]:checked').value;
                let result = '';
                
                switch (encoderType) {
                    case 'base64':
                        result = atob(text);
                        break;
                    case 'uri':
                        result = decodeURIComponent(text);
                        break;
                    case 'hex':
                        result = fromHex(text);
                        break;
                    default:
                        result = atob(text);
                }
                
                encoderResult.value = result;
                encoderResult.classList.add('success-highlight');
                
                setTimeout(() => {
                    encoderResult.classList.remove('success-highlight');
                }, 1000);
                
            } catch (error) {
                showToolError(encoderResult, 'Error decoding text. Make sure the input is valid for the selected format.');
                console.error('Decoding error:', error);
            }
        });
    }
    
    // Copy encoder result to clipboard
    if (copyEncoderBtn) {
        copyEncoderBtn.addEventListener('click', function() {
            copyToClipboard(encoderResult);
        });
    }
    
    // Visitor counter animation
    const visitorCount = document.getElementById('visitorCount');
    if (visitorCount) {
        const startCount = 1300;
        const endCount = 1337;
        const duration = 3000; // 3 seconds
        const step = Math.ceil((endCount - startCount) / (duration / 50));
        let currentCount = startCount;
        
        const countInterval = setInterval(() => {
            currentCount += step;
            if (currentCount >= endCount) {
                currentCount = endCount;
                clearInterval(countInterval);
            }
            visitorCount.textContent = currentCount.toString();
        }, 50);
    }
});

// Helper functions for security tools
function copyToClipboard(element) {
    if (!element) return;
    
    element.select();
    element.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            const parent = element.parentElement;
            const copyBtn = parent.querySelector('.btn-icon');
            
            if (copyBtn) {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                }, 1500);
            }
        }
    } catch (err) {
        console.error('Could not copy text: ', err);
    }
}

function showToolError(element, message) {
    if (!element) return;
    
    element.value = message;
    element.classList.add('error-highlight');
    
    setTimeout(() => {
        element.classList.remove('error-highlight');
    }, 2000);
}

function toHex(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return result;
}

function fromHex(hex) {
    let result = '';
    for (let i = 0; i < hex.length; i += 2) {
        result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return result;
}

// Enhanced Matrix animation for hero section
function enhancedMatrixBackground() {
    const heroParticles = document.getElementById('heroParticles');
    if (!heroParticles) return;
    
    // Matrix characters
    const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // Device-aware settings
    const isMobile = window.innerWidth <= 768;
    const density = isMobile ? 15 : 25; // Fewer characters on mobile
    
    // Create matrix columns
    for (let i = 0; i < density; i++) {
        createMatrixColumn(heroParticles, matrixChars, isMobile);
    }
    
    // Add digital rain effect
    setInterval(() => {
        if (Math.random() > 0.7) {
            createMatrixColumn(heroParticles, matrixChars, isMobile);
        }
    }, 500);
}

function createMatrixColumn(container, chars, isMobile) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    
    // Random position and properties
    const posX = Math.floor(Math.random() * container.offsetWidth);
    const delay = Math.random() * 2;
    const speed = Math.random() * 2 + 1;
    const length = isMobile ? 
        Math.floor(Math.random() * 8) + 5 : 
        Math.floor(Math.random() * 15) + 8;
    
    column.style.left = `${posX}px`;
    column.style.animationDelay = `${delay}s`;
    column.style.animationDuration = `${speed}s`;
    
    // Add characters to column
    for (let i = 0; i < length; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-character';
        char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // First character is brighter
        if (i === 0) {
            char.style.color = 'white';
        } else {
            const opacity = 1 - (i / length);
            char.style.opacity = opacity;
        }
        
        column.appendChild(char);
    }
    
    container.appendChild(column);
    
    // Remove after animation completes
    setTimeout(() => {
        column.remove();
    }, (delay + speed) * 1000 + 1000);
}

// Initialize enhanced matrix background on page load
window.addEventListener('load', () => {
    // ... existing code ...
    
    // Start enhanced matrix animation for hero section
    setTimeout(() => {
        enhancedMatrixBackground();
    }, 1500);
});

// Add this CSS to your styles.css or create a style tag in the head
document.head.insertAdjacentHTML('beforeend', `
<style>
.matrix-column {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: -20px;
    animation: matrixRain linear forwards;
    z-index: var(--z-background);
}

@keyframes matrixRain {
    0% { transform: translateY(-100px); opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0.2; }
}

.success-highlight {
    animation: highlightSuccess 1s ease;
}

.error-highlight {
    animation: highlightError 1s ease;
    color: var(--accent-color) !important;
}

@keyframes highlightSuccess {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(0, 255, 65, 0.2); }
}

@keyframes highlightError {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(255, 0, 60, 0.2); }
}
</style>
`);

// Create fallback placeholder image
document.addEventListener('DOMContentLoaded', function() {
    // Create fallback placeholder image programmatically in case the 
    // placeholder.jpg is not available
    function createFallbackImage() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = 320;
        canvas.height = 180;
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(1, '#020c1b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add project icon
        ctx.font = '40px "Font Awesome 5 Free"';
        ctx.fillStyle = '#00ff41';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('\uf121', canvas.width / 2, canvas.height / 2 - 20); // code icon
        
        // Add text
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.fillText('Project preview unavailable', canvas.width / 2, canvas.height / 2 + 30);
        
        return canvas.toDataURL('image/jpeg');
    }

    // Apply fallback to all project images if needed
    const projectImages = document.querySelectorAll('.project-card img');
    const fallbackImageData = createFallbackImage();
    
    projectImages.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.getAttribute('data-fallback-applied')) {
                this.src = fallbackImageData;
                this.setAttribute('data-fallback-applied', 'true');
                this.classList.add('img-error');
            }
        });
    });
    
    // Preload placeholder to ensure it's available
    const preloadPlaceholder = new Image();
    preloadPlaceholder.src = 'images/projects/placeholder.jpg';
});
