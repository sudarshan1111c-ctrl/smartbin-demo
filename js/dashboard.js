// smartbin/js/dashboard.js

// Load Chart.js dynamically when needed
function loadChartJs(callback) {
  if (window.Chart) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = callback;
  document.head.appendChild(script);
}

function initDashboard() {
  const userData = JSON.parse(localStorage.getItem('smartBinCurrentUser')) || {};
  if (!userData.username) {
    showToast('Please log in first.', 'error');
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    return;
  }

  // Populate summary cards
  document.getElementById('student-name').textContent = userData.name;
  document.getElementById('total-points').textContent = userData.points || 0;
  const deposits = userData.deposits || [];
  document.getElementById('deposit-count').textContent = deposits.length;
  // For demo, assume each point equals 0.1 kg recycled
  const recycledKg = ((userData.points || 0) * 0.1).toFixed(1);
  document.getElementById('waste-recycled').textContent = recycledKg;
  document.getElementById('rewards-redeemed').textContent = (userData.rewardsRedeemed || []).length;

  // Recent activity list (last 5 deposits)
  const activityList = document.getElementById('activity-list');
  activityList.innerHTML = '';
  const recent = deposits.slice(-5).reverse();
  recent.forEach(dep => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${new Date(dep.timestamp).toLocaleString()} – ${dep.category} (+${dep.points} pts)`;
    activityList.appendChild(li);
  });

  // Weekly contribution chart (points per day for last 7 days)
  const ctx = document.getElementById('weeklyChart')?.getContext('2d');
  if (!ctx) return;
  // Aggregate points per day
  const today = new Date();
  const labels = [];
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split('T')[0];
    labels.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
    const dayPoints = deposits
      .filter(p => p.timestamp.startsWith(key))
      .reduce((sum, p) => sum + p.points, 0);
    data.push(dayPoints);
  }
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Points this week',
        data,
        borderColor: 'var(--emerald)',
        backgroundColor: 'rgba(22,163,106,0.2)',
        fill: true,
        tension: 0.3,
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

if (document.readyState !== 'loading') {
  loadChartJs(initDashboard);
} else {
  document.addEventListener('DOMContentLoaded', () => loadChartJs(initDashboard));
}
