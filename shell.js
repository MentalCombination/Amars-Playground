/* shell.js — auto-injects the Playground top bar into any subapp
 *
 * Usage in subapp <head>:
 *   <script src="../shell.js"></script>
 *
 * Optional: set a custom title by adding a data attribute on the script tag:
 *   <script src="../shell.js" data-title="My App"></script>
 *
 * Optional: mark the app as full-bleed (bar floats over content, e.g. camera):
 *   <script src="../shell.js" data-float></script>
 *
 * Optional: add right-side content (slot for extra buttons):
 *   After shell.js loads, call: pgShellRight('<button>...</button>')
 */

(function () {
  const scriptTag = document.currentScript;

  function init() {
    // Resolve title: data-title > app.json name > document.title > folder name
    const folder = location.pathname.split('/').filter(Boolean).pop() || '';

    // Try to read app.json for metadata
    fetch('./app.json')
      .then(r => r.ok ? r.json() : {})
      .catch(() => ({}))
      .then(meta => {
        const title = (scriptTag && scriptTag.dataset.title)
          || meta.name
          || document.title
          || folder;

        const isFloat = scriptTag && scriptTag.hasAttribute('data-float');

        injectBar(title, isFloat);
      });
  }

  function injectBar(title, isFloat) {
    // Load Google Font if not already loaded
    if (!document.querySelector('link[href*="DM+Sans"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap';
      document.head.appendChild(link);
    }

    // Load shell.css
    if (!document.querySelector('link[href*="shell.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '../shell.css';
      document.head.appendChild(link);
    }

    // Build bar HTML
    const bar = document.createElement('div');
    bar.id = 'pg-shell';
    bar.innerHTML = `
      <div id="pg-shell-inner">
        <a id="pg-back" href="../" aria-label="Back to Playground">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Apps
        </a>
        <div id="pg-shell-title">${escHtml(title)}</div>
        <div id="pg-shell-right"></div>
      </div>
    `;
    document.body.insertBefore(bar, document.body.firstChild);

    // Offset page content unless floating
    if (!isFloat) {
      document.documentElement.style.setProperty(
        '--pg-shell-offset',
        'calc(env(safe-area-inset-top, 0px) + 52px)'
      );
      document.body.classList.add('pg-shell-offset');
    }
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Expose utility to add right-side content
  window.pgShellRight = function (html) {
    const slot = document.getElementById('pg-shell-right');
    if (slot) slot.innerHTML = html;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
