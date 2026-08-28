(function() {
    'use strict';

    const CONTACT_EMAIL = 'prattb100@outlook.com';

    const TECH_COLORS = {
        'javascript': '#f7df1e', 'js': '#f7df1e', 'vanilla js': '#f7df1e',
        'html': '#e34f26', 'html5': '#e34f26',
        'css': '#1572b6', 'css3': '#1572b6',
        'python': '#3776ab', 'c++': '#00599c',
        'webrtc': '#e94560', 'real-time chat': '#22d3ee',
        'recommendation engine': '#f59e0b', 'ai integration': '#8b5cf6',
        'mediaPipe pose': '#0075ff', 'three.js': '#049ef4',
        'fbx / glb / gltf': '#f59e0b', 'skeleton retargeting': '#14b8a6',
        'pwa': '#5a0fc8', 'llm agent': '#8b5cf6', 'text-to-speech': '#34d399',
        'video editing': '#f43f5e', 'automation': '#facc15',
        'ai image api': '#c084fc', 'prompt engineering': '#f472b6',
        'web audio': '#fb7185', 'scene management': '#a78bfa',
        'systems programming': '#64748b', 'game loop': '#64748b',
        'responsive design': '#38bdf8', 'seo / json-ld': '#22c55e',
        'open graph': '#e1306c', 'custom domain': '#10b981',
        'ui cloning': '#22d3ee', 'multi-page sites': '#60a5fa',
        'web': '#93c5fd'
    };

    const state = {
        theme: 'light',
        activeFilter: 'all',
        projects: [],
        isMenuOpen: false
    };

    const elements = {
        themeToggle: null,
        navToggle: null,
        navMenu: null,
        filterButtons: null,
        projectsGrid: null,
        noProjects: null,
        contactForm: null,
        toastContainer: null,
        statNumbers: null
    };

    function init() {
        cacheElements();
        loadTheme();
        renderProjects();
        setupEventListeners();
        animateStats();
        setupRevealAnimations();
        updateFilterCounts();
        buildMarquee();
        enhanceSkillChips();
        initSpotlight();
        initTyping();
        initTilt();
        initMagnetic();
        initScrollProgress();
        initPageTransitions();
    }

    function cacheElements() {
        elements.themeToggle = document.getElementById('theme-toggle');
        elements.navToggle = document.querySelector('.nav-toggle');
        elements.navMenu = document.getElementById('nav-menu');
        elements.filterButtons = document.querySelectorAll('.filter-btn');
        elements.projectsGrid = document.getElementById('projects-grid');
        elements.noProjects = document.getElementById('no-projects');
        elements.contactForm = document.getElementById('contact-form');
        elements.toastContainer = document.getElementById('toast-container');
        elements.statNumbers = document.querySelectorAll('.stat-number');
    }

    /* ============ THEME ============ */

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.theme = savedTheme || (prefersDark ? 'dark' : 'light');
        applyTheme(state.theme);
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        state.theme = theme;
        updateThemeToggleIcon();
    }

    function updateThemeToggleIcon() {
        if (elements.themeToggle) {
            const ariaLabel = state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
            elements.themeToggle.setAttribute('aria-label', ariaLabel);
        }
    }

    function toggleTheme() {
        applyTheme(state.theme === 'light' ? 'dark' : 'light');
    }

    /* ============ NAVIGATION ============ */

    function toggleMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        elements.navToggle.setAttribute('aria-expanded', state.isMenuOpen);
        elements.navMenu.classList.toggle('active', state.isMenuOpen);
        document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (state.isMenuOpen) {
            state.isMenuOpen = false;
            elements.navToggle.setAttribute('aria-expanded', 'false');
            elements.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /* ============ PROJECTS ============ */

    function renderProjects(filter) {
        filter = filter || state.activeFilter;
        if (!elements.projectsGrid) return;

        state.projects = getProjectsByCategory(filter);
        elements.projectsGrid.innerHTML = '';

        if (state.projects.length === 0) {
            elements.projectsGrid.classList.add('hidden');
            elements.noProjects.classList.remove('hidden');
            return;
        }

        elements.projectsGrid.classList.remove('hidden');
        elements.noProjects.classList.add('hidden');

        state.projects.forEach(function(project, index) {
            var card = createProjectCard(project, index, filter);
            card.style.animationDelay = (index * 50) + 'ms';
            elements.projectsGrid.appendChild(card);
        });

        setupRevealAnimations();
        initTilt();
        initCardSlideshows();
    }

    function createProjectCard(project, index, filter) {
        var article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('role', 'listitem');

        if (project.featured && index === 0 && filter === 'all') {
            article.classList.add('flagship');
        }

        var hasLiveLink = project.links && project.links.live;
        var hasGithubLink = project.links && project.links.github;
        var hasDocsLink = project.links && project.links.docs;

        var liveBadge = hasLiveLink
            ? '<span class="live-badge"><span class="live-dot"></span>LIVE</span>'
            : '';

        var imageContent;
        if (project.slides && project.slides.length > 1) {
            imageContent = '<div class="card-slideshow" data-slides=\'' + JSON.stringify(project.slides) + '\'>' +
                project.slides.map(function(src, i) {
                    return '<img class="card-slide' + (i === 0 ? ' active' : '') + '" src="' + escapeHtml(src) + '" alt="" loading="' + (i < 2 ? 'eager' : 'lazy') + '">';
                }).join('') +
            '</div>';
        } else if (project.image) {
            imageContent = '<img src="' + escapeHtml(project.image) + '" alt="" loading="lazy">';
        } else {
            imageContent = '<div class="project-placeholder">' + escapeHtml(project.title) + '</div>';
        }

        article.innerHTML =
            '<div class="project-image">' + liveBadge + imageContent + '</div>' +
            '<div class="project-content">' +
                '<div class="project-header">' +
                    '<h3 class="project-title">' + escapeHtml(project.title) + '</h3>' +
                    '<span class="project-category">' + formatCategory(project.category) + '</span>' +
                '</div>' +
                '<p class="project-description">' + escapeHtml(project.description) + '</p>' +
                '<div class="project-tech">' +
                    project.tech.map(function(t) {
                        return '<span class="tech-tag" style="--chip:' + getChipColor(t) + '">' + escapeHtml(t) + '</span>';
                    }).join('') +
                '</div>' +
                '<div class="project-links">' +
                    (hasLiveLink ? '<a href="' + escapeHtml(project.links.live) + '" class="project-link primary" target="_blank" rel="noopener noreferrer" aria-label="View live demo of ' + escapeHtml(project.title) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Live Demo</a>' : '') +
                    (hasGithubLink ? '<a href="' + escapeHtml(project.links.github) + '" class="project-link secondary" target="_blank" rel="noopener noreferrer" aria-label="View source code of ' + escapeHtml(project.title) + '"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> Source</a>' : '') +
                    (hasDocsLink ? '<a href="' + escapeHtml(project.links.docs) + '" class="project-link secondary" target="_blank" rel="noopener noreferrer" aria-label="View documentation for ' + escapeHtml(project.title) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> Docs</a>' : '') +
                '</div>' +
            '</div>';

        return article;
    }

    function formatCategory(category) {
        var labels = { web: 'Web', fullstack: 'Full-Stack', ai: 'AI', games: 'Game', tools: 'Tool' };
        return labels[category] || category;
    }

    function getChipColor(tech) {
        var key = tech.toLowerCase();
        return TECH_COLORS[key] || '#94a3b8';
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /* ============ EVENT LISTENERS ============ */

    function setupEventListeners() {
        if (elements.themeToggle) elements.themeToggle.addEventListener('click', toggleTheme);
        if (elements.navToggle) elements.navToggle.addEventListener('click', toggleMenu);

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });

        elements.filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() { handleFilterChange(btn.dataset.filter); });
        });

        if (elements.contactForm) elements.contactForm.addEventListener('submit', handleFormSubmit);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeMenu();
        });

        document.addEventListener('click', function(e) {
            if (state.isMenuOpen && !elements.navMenu.contains(e.target) && !elements.navToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    function handleFilterChange(filter) {
        state.activeFilter = filter;
        elements.filterButtons.forEach(function(btn) {
            var isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
        renderProjects(filter);
    }

    function updateFilterCounts() {
        elements.filterButtons.forEach(function(btn) {
            var category = btn.dataset.filter;
            var count = category === 'all'
                ? getProjects().length
                : getProjectsByCategory(category).length;
            btn.textContent = btn.textContent.split(' ')[0] + ' (' + count + ')';
        });
    }

    /* ============ CONTACT FORM ============ */

    function handleFormSubmit(e) {
        e.preventDefault();
        var form = e.target;
        var formData = new FormData(form);
        var data = Object.fromEntries(formData.entries());
        var errors = validateForm(data);

        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
        }

        var subjectLabels = { project: 'Project Inquiry', collaboration: 'Collaboration', other: 'Other' };
        var topicLabel = subjectLabels[data.subject] || data.subject;
        var mailSubject = '[Portfolio] ' + topicLabel + ' from ' + data.name.trim();
        var mailBody = 'Name: ' + data.name.trim() + '\nEmail: ' + data.email.trim() + '\nTopic: ' + topicLabel + '\n\nMessage:\n' + data.message.trim();

        window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(mailSubject) + '&body=' + encodeURIComponent(mailBody);
        showToast('Opening your email app with your message filled in...', 'success');
    }

    function validateForm(data) {
        var errors = {};
        if (!data.name || !data.name.trim()) errors.name = 'Name is required';
        if (!data.email || !data.email.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email format';
        if (!data.subject) errors.subject = 'Please select a subject';
        if (!data.message || !data.message.trim()) errors.message = 'Message is required';
        else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
        return errors;
    }

    function showErrors(errors) {
        Object.entries(errors).forEach(function(entry) {
            var field = entry[0], message = entry[1];
            var input = document.getElementById(field);
            var errorEl = input && input.parentElement ? input.parentElement.querySelector('.form-error') : null;
            if (input) input.setAttribute('aria-invalid', 'true');
            if (errorEl) errorEl.textContent = message;
        });
        var firstError = document.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
    }

    function showToast(message, type) {
        if (!elements.toastContainer) return;
        type = type || 'success';
        var toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.setAttribute('role', 'alert');
        toast.textContent = message;
        elements.toastContainer.appendChild(toast);
        setTimeout(function() {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(function() { toast.remove(); }, 300);
        }, 5000);
    }

    /* ============ STATS ============ */

    function animateStats() {
        var stats = getProjectStats();
        var targets = [stats.total, stats.technologies, stats.yearsActive];
        elements.statNumbers.forEach(function(el, i) {
            if (targets[i] !== undefined) animateCounter(el, targets[i]);
        });
    }

    function animateCounter(el, target) {
        var duration = 1500;
        var start = performance.now();
        function update(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    /* ============ REVEAL ANIMATIONS ============ */

    function setupRevealAnimations() {
        var selectors = '.project-card, .section-header, .about-text, .skills-showcase, .timeline-item, .contact-form, .contact-links, .building-card';
        var revealEls = document.querySelectorAll(selectors);

        if (!('IntersectionObserver' in window)) {
            revealEls.forEach(function(el) { el.classList.add('visible'); });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

        revealEls.forEach(function(el) {
            if (!el.classList.contains('visible')) {
                el.classList.add('reveal');
                observer.observe(el);
            }
        });
    }

    /* ============ CARD SLIDESHOWS ============ */

    function initCardSlideshows() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.querySelectorAll('.card-slideshow').forEach(function(slideshow) {
            if (slideshow.dataset.initialized) return;
            slideshow.dataset.initialized = '1';

            var slides = slideshow.querySelectorAll('.card-slide');
            if (slides.length <= 1) return;
            var current = 0;

            var card = slideshow.closest('.project-card');

            function goTo(index) {
                slides[current].classList.remove('active');
                current = index;
                slides[current].classList.add('active');
            }

            var id = setInterval(function() {
                goTo((current + 1) % slides.length);
            }, 2800);

            if (card) {
                card.addEventListener('mouseenter', function() { clearInterval(id); });
                card.addEventListener('mouseleave', function() {
                    id = setInterval(function() {
                        goTo((current + 1) % slides.length);
                    }, 2800);
                });
            }
        });
    }

    /* ============ MARQUEE ============ */

    function buildMarquee() {
        var track = document.getElementById('marquee-track');
        if (!track) return;
        var techs = getUniqueTech();
        var html = '';

        function renderItems() {
            return techs.map(function(t) {
                var color = getChipColor(t);
                return '<span class="marquee-item"><span class="dot" style="background:' + color + '"></span>' + escapeHtml(t) + '</span>';
            }).join('');
        }

        html = renderItems() + renderItems();
        track.innerHTML = html;
    }

    /* ============ SKILL / TECH CHIP COLORS ============ */

    function enhanceSkillChips() {
        document.querySelectorAll('.skill-tag').forEach(function(tag) {
            var text = tag.textContent.trim().toLowerCase();
            var color = getChipColor(text);
            tag.style.setProperty('--chip', color);
        });
    }

    /* ============ SPOTLIGHT ============ */

    function initSpotlight() {
        var spotlight = document.getElementById('hero-spotlight');
        var hero = document.querySelector('.hero');
        if (!spotlight || !hero) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        hero.addEventListener('mousemove', function(e) {
            var rect = hero.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            spotlight.style.setProperty('--mx', x + '%');
            spotlight.style.setProperty('--my', y + '%');
        });
    }

    /* ============ TYPING EFFECT ============ */

    function initTyping() {
        var h1 = document.querySelector('.hero-title');
        if (!h1) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            h1.innerHTML = '<span class="highlight">' + h1.getAttribute('data-text') + '</span>';
            return;
        }

        var text = h1.getAttribute('data-text') || h1.textContent;
        var typed = h1.querySelector('.hero-typed');
        if (!typed) return;
        h1.setAttribute('aria-label', text);
        var i = 0;
        var speed = 45;

        function typeChar() {
            if (i < text.length) {
                typed.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                typed.style.borderRight = 'none';
            }
        }

        typed.style.borderRight = '2px solid var(--color-primary)';
        setTimeout(typeChar, 600);
    }

    /* ============ 3D TILT ON CARDS ============ */

    function initTilt() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if ('ontouchstart' in window) return;

        document.querySelectorAll('.project-card').forEach(function(card) {
            if (card.dataset.tilt) return;
            card.dataset.tilt = '1';

            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var rotateX = ((y / rect.height) - 0.5) * -8;
                var rotateY = ((x / rect.width) - 0.5) * 8;
                card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }

    /* ============ MAGNETIC BUTTONS ============ */

    function initMagnetic() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if ('ontouchstart' in window) return;

        document.querySelectorAll('.magnetic-btn').forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
            });

            btn.addEventListener('mouseleave', function() {
                btn.style.transform = '';
            });
        });
    }

    /* ============ SCROLL PROGRESS BAR ============ */

    function initScrollProgress() {
        var bar = document.getElementById('scroll-progress');
        if (!bar) return;

        window.addEventListener('scroll', function() {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = percent + '%';
        }, { passive: true });
    }

    /* ============ PAGE TRANSITIONS ============ */

    function initPageTransitions() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href$=".html"]');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href || href.charAt(0) === '#') return;
            e.preventDefault();
            document.body.classList.add('page-exit');
            setTimeout(function() { window.location.href = href; }, 220);
        });

        window.addEventListener('pageshow', function() {
            document.body.classList.remove('page-exit');
        });
    }

    /* ============ INIT ============ */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
