// smartbin/js/main.js

/**
 * Simple toast/notification helper.
 * Usage: showToast('Message', 'success'|'error'|'info');
 */
function showToast(message, type = 'info') {
  // Create toast element if not exist
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast-${type} show`;
  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Page‑specific init dispatcher based on body id.
 */
function initPage() {
  const pageId = document.body.id;
  switch (pageId) {
    case 'login-page':
      // auth.js will attach its own listeners on DOMContentLoaded
      break;
    case 'dashboard-page':
      // dashboard.js will init when loaded
      break;
    case 'smartbin-page':
      // smartbin.js will init when loaded
      break;
    case 'rewards-page':
      // rewards.js will init when loaded
      break;
    case 'leaderboard-page':
      // leaderboard.js will init when loaded
      break;
    case 'impact-page':
      // impact.js will init when loaded
      break;
    default:
      // landing or other static pages need no extra init
      break;
  }
}

if (document.readyState !== 'loading') {
  initPage();
} else {
  document.addEventListener('DOMContentLoaded', initPage);
}
