// JavaScript Document

function buatPartikel() {
    const wadah = document.getElementById('particles');
    const jumlah = 30;

    for (let i = 0; i < jumlah; i++) {
        const partikel = document.createElement('div');
        partikel.className = 'particle';
        partikel.style.left = Math.random() * 100 + '%';
        partikel.style.animationDelay = Math.random() * 15 + 's';
        partikel.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        if (Math.random() > 0.5) {
            partikel.style.setProperty('--particle-color', '#00B2FF');
            partikel.style.background = '#00B2FF';
        }
        
        wadah.appendChild(partikel);
    }
}

const tombolMenu = document.getElementById('menuToggle');
const tautanMenu = document.getElementById('navLinks');

tombolMenu.addEventListener('click', () => {
    tombolMenu.classList.toggle('active');
    tautanMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        tombolMenu.classList.remove('active');
        tautanMenu.classList.remove('active');
    });
});

const bagian = document.querySelectorAll('section');
const itemNav = document.querySelectorAll('.nav-link');

function updateNav() {
    const posisi = window.pageYOffset + 100;

    bagian.forEach((bag, index) => {
        const atas = bag.offsetTop;
        const tinggi = bag.offsetHeight;

        if (posisi >= atas && posisi < atas + tinggi) {
            itemNav.forEach(i => i.classList.remove('active'));
            const aktif = document.querySelector(`.nav-link[href="#${bag.id}"]`);
            if (aktif) aktif.classList.add('active');
        }
    });
}

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateNav();
});

updateNav();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const tabItem = document.querySelectorAll('.tab-item');
const panelKonten = document.querySelectorAll('.content-panel');

tabItem.forEach(tab => {
    tab.addEventListener('click', () => {
        const idTab = tab.getAttribute('data-tab');
        
        tabItem.forEach(t => t.classList.remove('active'));
        panelKonten.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(idTab).classList.add('active');
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pesan terkirim! Kami akan segera menghubungi Anda.');
    this.reset();
});

buatPartikel();

const setTeks = document.querySelectorAll('.text-set');
let indexSekarang = 0;
let animasiBerjalan = false;

function bungkusTeks(elemen) {
    const teks = elemen.textContent;
    elemen.innerHTML = teks.split('').map((char, i) => 
        `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
}

function animasiMasuk(set) {
    const glitch = set.querySelector('.glitch-text');
    const sub = set.querySelector('.subtitle');
    
    bungkusTeks(glitch);
    glitch.setAttribute('data-text', glitch.textContent);
    
    setTimeout(() => {
        sub.classList.add('visible');
    }, 800);
}

function animasiKeluar(set) {
    const chars = set.querySelectorAll('.char');
    const sub = set.querySelector('.subtitle');
    
    chars.forEach((char, i) => {
        char.style.animationDelay = `${i * 0.02}s`;
        char.classList.add('out');
    });
    
    sub.classList.remove('visible');
}

function rotasiTeks() {
    if (animasiBerjalan) return;
    animasiBerjalan = true;

    const aktif = setTeks[indexSekarang];
    const berikutnya = (indexSekarang + 1) % setTeks.length;
    const setBaru = setTeks[berikutnya];

    animasiKeluar(aktif);

    setTimeout(() => {
        aktif.classList.remove('active');
        setBaru.classList.add('active');
        animasiMasuk(setBaru);
        
        indexSekarang = berikutnya;
        animasiBerjalan = false;
    }, 600);
}

setTeks[0].classList.add('active');
animasiMasuk(setTeks[0]);

setTimeout(() => {
    setInterval(rotasiTeks, 5000);
}, 4000);

setInterval(() => {
    const teksGlitch = document.querySelectorAll('.glitch-text');
    teksGlitch.forEach(teks => {
        if (Math.random() > 0.95) {
            teks.style.animation = 'none';
            setTimeout(() => {
                teks.style.animation = '';
            }, 200);
        }
    });
}, 3000);
