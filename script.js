(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    }));
  }

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const propertyCards = [...document.querySelectorAll('.property-card')];

  function applyFilter(filter) {
    propertyCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
    filterButtons.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));

  document.querySelectorAll('[data-filter-link]').forEach(link => {
    link.addEventListener('click', () => {
      const filter = link.dataset.filterLink;
      applyFilter(filter);
    });
  });

  const form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const interest = String(data.get('interest') || '').trim();
      const message = String(data.get('message') || '').trim();

      const lines = [
        'Assalam-o-Alaikum, Adil Real Estate.',
        '',
        'I would like to make an inquiry.',
        `Name: ${name}`,
        `Phone / WhatsApp: ${phone}`,
        `Interested in: ${interest}`,
        message ? `Message: ${message}` : ''
      ].filter(Boolean);

      const url = `https://wa.me/923003680046?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();