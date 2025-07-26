// The Times – Single Image Hero
// Custom JavaScript for scroll behavior, nav shrink, and parallax/fade effects

// 1. Smooth Scrolling for Anchor Links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// 2. Navbar Shrink on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

// 3. Parallax/Fade Effect for Hero Overlay
const heroOverlay = document.querySelector('.hero-overlay');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroOverlay) {
    // Subtle fade and scale as you scroll down
    const fade = Math.max(1 - scrollY / 400, 0.7);
    const scale = Math.max(1 - scrollY / 2000, 0.96);
    heroOverlay.style.opacity = fade;
    heroOverlay.style.transform = `scale(${scale})`;
  }
});

// Countdown Clock Logic
// Target date: August 1, 2025, 10:00 AM
const countdownDate = new Date('2025-08-01T10:00:00').getTime();
const countdownEls = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  if (distance < 0) {
    countdownEls.days.textContent = '00';
    countdownEls.hours.textContent = '00';
    countdownEls.minutes.textContent = '00';
    countdownEls.seconds.textContent = '00';
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  countdownEls.days.textContent = String(days).padStart(2, '0');
  countdownEls.hours.textContent = String(hours).padStart(2, '0');
  countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
  countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Job Application Form Logic
const jobForm = document.getElementById('job-form');
if (jobForm) {
  jobForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get form values
    const name = jobForm.fullname.value.trim();
    const email = jobForm.email.value.trim();
    const position = jobForm.position.value;
    const message = jobForm.message.value.trim();
    // Compose mailto link (CV cannot be attached via mailto)
    const subject = encodeURIComponent('Job Application – ' + position + ' – ' + name);
    const body = encodeURIComponent(
      `Full Name: ${name}\n` +
      `Email: ${email}\n` +
      `Position: ${position}\n` +
      `Message: ${message}\n` +
      `CV: [Please attach your CV manually]`
    );
    window.location.href = `mailto:info@youragency.com?subject=${subject}&body=${body}`;
    // Show animated success message
    showFormSuccess();
  });
}

function showFormSuccess() {
  let msg = document.createElement('div');
  msg.className = 'form-success-anim';
  msg.textContent = 'Thank you! Your application email is being prepared.';
  document.querySelector('.form-animate').appendChild(msg);
  setTimeout(() => {
    msg.classList.add('fade-out');
    setTimeout(() => msg.remove(), 800);
  }, 2200);
}

// Language Switcher Logic
const translations = {
  en: {
    heroTitle: "Caffe & Bar Restaurant LEDI",
    heroSubtitle: "COMING SOON",
    heroDesc: "LEDI Caffe & Bar Restaurant will soon open near K3 Block.",
    joinTitle: "Join Our Team",
    fullName: "Full Name",
    email: "Email",
    position: "Position",
    waiter: "Waiter",
    chef: "Chef",
    barista: "Barista",
    other: "Other",
    message: "Message",
    uploadCV: "Upload CV (PDF/DOC)",
    sendApplication: "Send Application",
    formNote: "* File attachments via mailto are not supported by browsers. Please attach your CV manually in your email if needed.",
    countdownDays: "d",
    countdownHours: "h",
    countdownMinutes: "m",
    countdownSeconds: "s",
    copyright: "© 2025 UN Design. All rights reserved."
  },
  sr: {
    heroTitle: "Caffe & Bar Restaurant LEDI",
    heroSubtitle: "USKORO",
    heroDesc: "Uskoro ce biti otvoren LEDI Caffe & Bar Restaurant u blizini K3 Bloka",
    joinTitle: "Pridruži se našem timu",
    fullName: "Ime i prezime",
    email: "Email",
    position: "Pozicija",
    waiter: "Konobar",
    chef: "Kuvаr",
    barista: "Barista",
    other: "Ostalo",
    message: "Poruka",
    uploadCV: "Priloži CV (PDF/DOC)",
    sendApplication: "Pošalji prijavu",
    formNote: "* Slanje fajlova putem mailto nije podržano u brauzerima. Priložite CV ručno u svom emailu ako je potrebno.",
    countdownDays: "d",
    countdownHours: "s",
    countdownMinutes: "m",
    countdownSeconds: "s",
    copyright: "© 2025 UN Design. Sva prava zadržana."
  }
};

const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  // Hero
  document.querySelector('[data-translate="heroTitle"]').textContent = translations[lang].heroTitle;
  document.querySelector('[data-translate="heroSubtitle"]').textContent = translations[lang].heroSubtitle;
  document.querySelector('[data-translate="heroDesc"]').textContent = translations[lang].heroDesc;
  // Form
  document.querySelector('[data-translate="joinTitle"]').textContent = translations[lang].joinTitle;
  document.querySelector('[data-translate="fullName"]').textContent = translations[lang].fullName;
  document.querySelector('[data-translate="email"]').textContent = translations[lang].email;
  document.querySelector('[data-translate="position"]').textContent = translations[lang].position;
  document.querySelector('#position option[value="Waiter"]').textContent = translations[lang].waiter;
  document.querySelector('#position option[value="Chef"]').textContent = translations[lang].chef;
  document.querySelector('#position option[value="Barista"]').textContent = translations[lang].barista;
  document.querySelector('#position option[value="Other"]').textContent = translations[lang].other;
  document.querySelector('[data-translate="message"]').textContent = translations[lang].message;
  document.querySelector('[data-translate="uploadCV"]').textContent = translations[lang].uploadCV;
  document.querySelector('[data-translate="sendApplication"]').textContent = translations[lang].sendApplication;
  document.querySelector('[data-translate="formNote"]').textContent = translations[lang].formNote;
  // Copyright
  document.querySelector('[data-translate="copyright"]').textContent = translations[lang].copyright;
  // Update active button
  langBtns.forEach(btn => btn.classList.remove('active'));
  document.getElementById('lang-' + lang).classList.add('active');
}
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.getAttribute('data-lang'));
  });
});
// Add coffee bean emoji on hover for language buttons
langBtns.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    if (!btn.textContent.includes('☕')) btn.textContent += ' ☕';
  });
  btn.addEventListener('mouseleave', () => {
    btn.textContent = btn.textContent.replace(' ☕', '');
  });
});
// Add data-translate attributes to HTML for all translatable text.
// Set default language
setLanguage('en');

// Coffee Steam Animation
function createCoffeeSteam() {
  const steamContainer = document.createElement('div');
  steamContainer.id = 'coffee-steam';
  for (let i = 0; i < 5; i++) {
    const steam = document.createElement('div');
    steam.className = 'steam';
    steam.style.left = (30 + i * 18) + '%';
    steamContainer.appendChild(steam);
  }
  const heroOverlay = document.querySelector('.hero-overlay');
  if (heroOverlay) heroOverlay.insertBefore(steamContainer, heroOverlay.firstChild);
}
createCoffeeSteam(); 