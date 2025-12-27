// ===== Navigation Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.menu-card, .branch-card, .contact-card, .feature-card, .catering-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== Active Navigation Link Highlighting =====
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== WhatsApp Click Tracking (Optional) =====
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('WhatsApp link clicked');
    });
});

// ===== Phone Number Click Tracking (Optional) =====
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Phone number clicked:', this.getAttribute('href'));
    });
});

// ===== Form Validation (if forms are added later) =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// ===== Lazy Loading for Images (if images are added) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Back to Top Button (Optional Enhancement) =====
// Uncomment to add a back-to-top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-green);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
`;
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !phone || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate phone format (basic validation)
        const phoneRegex = /^[0-9]{10,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            showFormMessage('Please enter a valid phone number (10-15 digits).', 'error');
            return;
        }
        
        // Prepare email content
        const emailSubject = encodeURIComponent(`Idly Express Contact: ${getSubjectText(subject)}`);
        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Phone: ${phone}\n` +
            `Email: ${email}\n` +
            `Subject: ${getSubjectText(subject)}\n\n` +
            `Message:\n${message}`
        );
        
        // Prepare WhatsApp message
        const whatsappMessage = encodeURIComponent(
            `Hello Idly Express!\n\n` +
            `Name: ${name}\n` +
            `Phone: ${phone}\n` +
            `Email: ${email}\n` +
            `Subject: ${getSubjectText(subject)}\n\n` +
            `Message: ${message}`
        );
        
        // Show success message with options
        showFormMessage(
            'Form submitted successfully! Choose how you want to send your message:',
            'info'
        );
        
        // Create action buttons
        setTimeout(() => {
            const messageDiv = formMessage;
            messageDiv.innerHTML = `
                <div style="margin-bottom: 1rem;">
                    <p style="margin-bottom: 1rem; font-weight: 600;">Choose your preferred method:</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="mailto:praveenmanickam823@gmail.com?subject=${emailSubject}&body=${emailBody}" 
                           class="btn btn-primary" 
                           style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                            <i class="bi bi-envelope-fill"></i> Send via Email
                        </a>
                        <a href="https://wa.me/919942010288?text=${whatsappMessage}" 
                           class="btn btn-secondary" 
                           target="_blank"
                           style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; background: #25d366; color: white; border: none;">
                            <i class="bi bi-chat-dots-fill"></i> Send via WhatsApp
                        </a>
                    </div>
                </div>
            `;
            messageDiv.className = 'form-message info';
            messageDiv.style.display = 'block';
        }, 100);
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Function to show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds for error messages
    if (type === 'error') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Function to get subject text
function getSubjectText(value) {
    const subjects = {
        'order': 'Place an Order',
        'catering': 'Bulk Catering Inquiry',
        'feedback': 'Feedback',
        'complaint': 'Complaint',
        'other': 'Other'
    };
    return subjects[value] || value;
}

// ===== Form Reset Handler =====
if (contactForm) {
    const resetButton = contactForm.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.textContent = '';
            }, 100);
        });
    }
}

// ===== Console Welcome Message =====
console.log('%c🍛 Idly Express', 'color: #2e7d32; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Idly Express Website!', 'color: #ff8800; font-size: 14px;');
console.log('%cFor inquiries, call: 9942010288', 'color: #666; font-size: 12px;');

