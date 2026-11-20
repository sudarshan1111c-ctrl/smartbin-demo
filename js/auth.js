// smartbin/js/auth.js

/**
 * Demo student accounts (username / studentId)
 */
const DEMO_ACCOUNTS = [
  { username: 'alice', id: '2023001', name: 'Alice Johnson' },
  { username: 'bob', id: '2023002', name: 'Bob Patel' },
];

function findAccount(username, id) {
  return DEMO_ACCOUNTS.find(acc => acc.username === username && acc.id === id);
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  const username = document.getElementById('username').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const account = findAccount(username, studentId);
  if (!account) {
    showToast('Invalid demo credentials', 'error');
    return;
  }
  // Store current user in localStorage for the session
  const userData = {
    username: account.username,
    id: account.id,
    name: account.name,
    points: 0,
    deposits: [], // each deposit will be stored later
    rewardsRedeemed: []
  };
  localStorage.setItem('smartBinCurrentUser', JSON.stringify(userData));
  showToast(`Welcome, ${account.name}!`, 'success');
  // Small delay then redirect to dashboard
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
}

if (document.readyState !== 'loading') {
  document.getElementById('login-form').addEventListener('submit', handleLogin);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
  });
}
