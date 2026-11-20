// smartbin/js/leaderboard.js

function renderTable(tableId, data) {
  const tbody = document.querySelector(`${tableId} tbody`);
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach((row, index) => {
    const tr = document.createElement('tr');
    // Highlight top 3 with special badge colors
    const rankBadge = index < 3 ? `<span class="badge bg-gold">#${index + 1}</span>` : `#${index + 1}`;
    tr.innerHTML = `
      <td>${rankBadge}</td>
      <td>${row.name}</td>
      <td>${row.dept}</td>
      <td>${row.points}</td>
    `;
    tbody.appendChild(tr);
  });
}

function initLeaderboard() {
  // Load config first (already loaded globally via config.js if present)
  if (!window.SMARTBIN_LEADERBOARD) {
    console.error('Leaderboard config missing');
    return;
  }
  renderTable('#weekly-table', SMARTBIN_LEADERBOARD.weekly);
  renderTable('#monthly-table', SMARTBIN_LEADERBOARD.monthly);
}

if (document.readyState !== 'loading') {
  initLeaderboard();
} else {
  document.addEventListener('DOMContentLoaded', initLeaderboard);
}
