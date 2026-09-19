/* Infynova Group — site interactions */

(() => {
  'use strict';

  const navbar = document.getElementById('navbar');
  const themeToggle = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  const form = document.getElementById('consultationForm');
  const success = document.getElementById('successMessage');

  /* --------------------------------------------------
     Sticky / scrolled navbar
  -------------------------------------------------- */

  const setNavState = () => {
    if (!navbar) return;

    navbar.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', setNavState, { passive: true });
  setNavState();


  /* --------------------------------------------------
     Theme toggle
  -------------------------------------------------- */

  const updateThemeButton = () => {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains('light');

    themeToggle.textContent = isLight ? '☼' : '◐';

    themeToggle.setAttribute(
      'aria-label',
      isLight ? 'Toggle dark mode' : 'Toggle light mode'
    );

    themeToggle.setAttribute(
      'title',
      isLight ? 'Switch to dark mode' : 'Switch to light mode'
    );
  };


  // Restore previously selected theme
  try {
    const savedTheme = localStorage.getItem('infynova-theme');

    if (savedTheme === 'light') {
      document.body.classList.add('light');
    }
  } catch (_) {
    // Ignore storage errors
  }

  updateThemeButton();


  themeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');

    try {
      localStorage.setItem(
        'infynova-theme',
        isLight ? 'light' : 'dark'
      );
    } catch (_) {
      // Ignore storage errors
    }

    updateThemeButton();
  });


  /* --------------------------------------------------
     Mobile navigation
  -------------------------------------------------- */

  const closeMobileMenu = () => {
    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove('open-mobile');
    navLinks.removeAttribute('style');

    menuBtn.textContent = '☰';

    menuBtn.setAttribute(
      'aria-expanded',
      'false'
    );

    menuBtn.setAttribute(
      'aria-label',
      'Open menu'
    );
  };


  const openMobileMenu = () => {
    if (!navLinks || !menuBtn) return;

    navLinks.classList.add('open-mobile');

    navLinks.style.display = 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '14px';
    navLinks.style.right = '14px';

    navLinks.style.padding = '16px';

    navLinks.style.flexDirection = 'column';
    navLinks.style.alignItems = 'flex-start';

    navLinks.style.border = '1px solid var(--line)';
    navLinks.style.borderRadius = '18px';

    navLinks.style.background = 'rgba(12,12,14,.96)';
    navLinks.style.backdropFilter = 'blur(18px)';

    menuBtn.textContent = '×';

    menuBtn.setAttribute(
      'aria-expanded',
      'true'
    );

    menuBtn.setAttribute(
      'aria-label',
      'Close menu'
    );
  };


  menuBtn?.setAttribute(
    'aria-expanded',
    'false'
  );


  menuBtn?.addEventListener('click', () => {
    const isOpen =
      navLinks?.classList.contains('open-mobile');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });


  // Close menu after clicking a navigation link
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {

      if (window.innerWidth <= 980) {
        closeMobileMenu();
      }

    });
  });


  // Reset menu when switching back to desktop
  window.addEventListener('resize', () => {

    if (window.innerWidth > 980) {
      closeMobileMenu();
    }

  });


  // ESC closes mobile navigation
  document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
      closeMobileMenu();
    }

  });


  /* --------------------------------------------------
     Scroll reveal animations
  -------------------------------------------------- */

  const revealItems =
    document.querySelectorAll('.reveal');


  if ('IntersectionObserver' in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add('in');

              observerInstance.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );


    revealItems.forEach((item) => {
      observer.observe(item);
    });

  } else {

    // Fallback for older browsers
    revealItems.forEach((item) => {
      item.classList.add('in');
    });

  }


  /* --------------------------------------------------
     Consultation form
  -------------------------------------------------- */

  form?.addEventListener('submit', (event) => {

    event.preventDefault();


    // Native HTML validation
    if (!form.checkValidity()) {

      form.reportValidity();

      return;
    }


    if (success) {

      success.style.display = 'block';

      success.textContent =
        'Thank you. Your consultation request has been received.';


      success.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });

    }


    /*
      -----------------------------------------------
      PRODUCTION FORM INTEGRATION
      -----------------------------------------------

      Replace the demo behavior above with your
      actual backend/API.

      Example:

      const formData = new FormData(form);

      fetch('/api/consultation', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

      You can connect this to:
      - Next.js API route
      - Formspree
      - FormSubmit
      - CRM
      - Your own backend
    */

  });

})();