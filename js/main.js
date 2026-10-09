/* ============================================================
   main.js — interactivity for navbar, hero, about
   ============================================================ */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        initTypewriter();
        initParticles();
        initReveal();
        initCounters();
        initSkillBars();
        initContactForm();
        initScrollTop();
        initFooterYear();
    });

    /* ---------- Navbar: scroll state, mobile menu, active link ---------- */
    function initNavbar() {
        const navbar = document.getElementById('header');
        const toggle = document.getElementById('navToggle');
        const nav = document.getElementById('navList');
        const links = Array.from(document.querySelectorAll('.nav__link'));
        if (!navbar) return;

        const onScroll = () => {
            navbar.classList.toggle('is-scrolled', window.scrollY > 20);
            setActiveLink();
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                const open = nav.classList.toggle('is-open');
                toggle.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
            });
        }

        // Close mobile menu after clicking a link
        links.forEach((link) => {
            link.addEventListener('click', () => {
                if (nav) nav.classList.remove('is-open');
                if (toggle) {
                    toggle.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Highlight the section currently in view
        function setActiveLink() {
            const sections = links
                .map((l) => document.querySelector(l.getAttribute('href')))
                .filter(Boolean);
            const pos = window.scrollY + window.innerHeight * 0.35;
            let current = sections[0];
            sections.forEach((sec) => { if (sec.offsetTop <= pos) current = sec; });
            links.forEach((l) => {
                l.classList.toggle('is-active', current && l.getAttribute('href') === '#' + current.id);
            });
        }
    }

    /* ---------- Hero typewriter effect ---------- */
    function initTypewriter() {
        const el = document.getElementById('typewriter');
        if (!el) return;

        const words = ['Full Stack AI Engineer', 'Problem Solver', 'Web Developer', 'AI Enthusiast'];
        let w = 0, c = 0, deleting = false;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = words[0];
            return;
        }

        (function type() {
            const word = words[w];
            el.textContent = deleting ? word.slice(0, c--) : word.slice(0, c++);

            let delay = deleting ? 55 : 110;
            if (!deleting && c === word.length + 1) { deleting = true; delay = 1600; }
            else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 320; }

            setTimeout(type, delay);
        })();
    }

    /* ---------- Hero floating particles ---------- */
    function initParticles() {
        const host = document.getElementById('hero-particles');
        if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const count = window.innerWidth < 680 ? 18 : 36;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'hero__particle';
            const size = Math.random() * 3 + 1;
            p.style.width = p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.bottom = '-10px';
            p.style.animationDuration = (Math.random() * 14 + 10) + 's';
            p.style.animationDelay = -(Math.random() * 20) + 's';
            p.style.opacity = String(Math.random() * 0.5 + 0.15);
            host.appendChild(p);
        }
    }

    /* ---------- Scroll reveal (IntersectionObserver) ---------- */
    function initReveal() {
        const items = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            items.forEach((i) => i.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, idx) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('is-visible'), idx * 90);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });
        items.forEach((i) => io.observe(i));
    }

    /* ---------- Animated statistic counters ---------- */
    function initCounters() {
        const nums = document.querySelectorAll('.stat-card__num');
        if (!nums.length) return;

        const run = (el) => {
            const target = parseInt(el.dataset.count, 10) || 0;
            const dur = 1500;
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(eased * target);
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.5 });
        nums.forEach((n) => io.observe(n));
    }

    /* ---------- Skill progress bars ---------- */
    function initSkillBars() {
        const skills = document.querySelectorAll('.skill');
        if (!skills.length) return;

        const animate = (el) => {
            const level = parseInt(el.dataset.level, 10) || 0;
            el.style.setProperty('--skill-width', level + '%');
            el.classList.add('is-animated');
        };

        if (!('IntersectionObserver' in window)) { skills.forEach(animate); return; }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, idx) => {
                if (e.isIntersecting) {
                    setTimeout(() => animate(e.target), idx * 80);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.4 });
        skills.forEach((s) => io.observe(s));
    }

    /* ---------- Contact form validation + states ---------- */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const name = form.querySelector('#formName');
        const email = form.querySelector('#formEmail');
        const message = form.querySelector('#formMessage');
        const feedback = form.querySelector('#formFeedback');
        const submitBtn = form.querySelector('#submitBtn');

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const setError = (field, msg) => {
            const errEl = document.getElementById(field.name + 'Error');
            field.classList.toggle('is-invalid', !!msg);
            if (errEl) errEl.textContent = msg || '';
            return !msg;
        };

        const validateName = () => setError(name, name.value.trim().length < 2 ? 'Nama minimal 2 karakter.' : '');
        const validateEmail = () => setError(email, !emailRe.test(email.value.trim()) ? 'Masukkan email yang valid.' : '');
        const validateMessage = () => setError(message, message.value.trim().length < 10 ? 'Pesan minimal 10 karakter.' : '');

        name.addEventListener('input', validateName);
        email.addEventListener('input', validateEmail);
        message.addEventListener('input', validateMessage);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            feedback.textContent = '';
            feedback.className = 'form__feedback';

            const ok = [validateName(), validateEmail(), validateMessage()].every(Boolean);
            if (!ok) {
                feedback.textContent = 'Mohon perbaiki kesalahan di atas.';
                feedback.classList.add('is-error');
                return;
            }

            // Simulate async send (no backend)
            const txt = submitBtn.querySelector('.btn__text');
            const load = submitBtn.querySelector('.btn__loading');
            submitBtn.disabled = true;
            if (txt) txt.hidden = true;
            if (load) load.hidden = false;

            setTimeout(() => {
                if (txt) txt.hidden = false;
                if (load) load.hidden = true;
                submitBtn.disabled = false;
                feedback.textContent = 'Terima kasih! Pesan Anda berhasil dikirim.';
                feedback.classList.add('is-success');
                form.reset();
            }, 1400);
        });
    }

    /* ---------- Scroll to top button ---------- */
    function initScrollTop() {
        const btn = document.getElementById('scrollTop');
        if (!btn) return;
        const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 500);
        window.addEventListener('scroll', toggle, { passive: true });
        toggle();
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ---------- Footer year ---------- */
    function initFooterYear() {
        const el = document.getElementById('footerYear');
        if (el) el.textContent = String(new Date().getFullYear());
    }
})();
