/**
 * APP.JS — Core Application Controller
 * Scroll reveals, Metric Counters, Agent Filtering, Mobile Menu, Clipboard Toast
 * Created for Ibrahim Yaghi's Portfolio
 */

(function () {
  'use strict';

  function init() {
    initHeaderScroll();
    initScrollReveals();
    initMetricCounters();
    initAgentFilters();
    initClipboard();
    initMobileNav();
    initActiveNavLinks();
  }

  // 1. Header scroll effect
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. IntersectionObserver for Reveal Items
  function initScrollReveals() {
    const items = document.querySelectorAll('.reveal-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    items.forEach(el => observer.observe(el));
  }

  // 3. Metric Counter Animation
  function initMetricCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          if (!isNaN(target)) {
            animateCounter(entry.target, target);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(element, target) {
    let current = 0;
    const duration = 1600;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  // 4. Agent Cards Filtering
  function initAgentFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const agentCards = document.querySelectorAll('.agent-card');

    if (!filterButtons.length || !agentCards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        agentCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 5. One-Click Copy Email & Toast Notification
  function initClipboard() {
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast-notice');
    const email = 'ibrahem.yaghi@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showToast).catch(() => fallbackCopy(email));
      } else {
        fallbackCopy(email);
      }
    });

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast();
      } catch (err) {
        console.error('Copy fallback failed', err);
      }
      document.body.removeChild(textarea);
    }

    function showToast() {
      if (!toast) return;
      copyBtn.textContent = 'Copied!';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        copyBtn.textContent = 'Copy';
      }, 3000);
    }
  }

  // 6. Mobile Navigation
  function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link or action button inside
    const links = navLinks.querySelectorAll('.nav-link, a, .btn');
    links.forEach(l => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Dismiss drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('is-open')) {
        if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
          navLinks.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // 7. Active Navigation Link Highlighting on Scroll
  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 160;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' + currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
