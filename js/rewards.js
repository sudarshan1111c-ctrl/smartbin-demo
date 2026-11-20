// smartbin/js/rewards.js

// Ensure config is loaded
if (!window.SMARTBIN_REWARDS) {
  console.error('Rewards config missing');
}

function renderRewards() {
  const grid = document.getElementById('rewards-grid');
  if (!grid) return;
  grid.innerHTML = '';
  SMARTBIN_REWARDS.forEach(reward => {
    const col = document.createElement('div');
    col.className = 'col-6 col-sm-4 col-md-3';
    col.innerHTML = `
      <div class="card h-100 category-card">
        <img src="${reward.img}" class="card-img-top" alt="${reward.name}">
        <div class="card-body p-2 text-center">
          <h6 class="card-title mb-1">${reward.name}</h6>
          <small>${reward.points} pts</small>
          <button class="btn btn-sm btn-primary w-100 mt-2" data-id="${reward.id}">Redeem</button>
        </div>
      </div>`;
    grid.appendChild(col);
  });

  // Attach click handlers
  grid.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      redeemReward(id);
    });
  });
}

function redeemReward(id) {
  const user = JSON.parse(localStorage.getItem('smartBinCurrentUser'));
  if (!user) {
    showToast('Please log in first.', 'error');
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    return;
  }
  const reward = SMARTBIN_REWARDS.find(r => r.id === id);
  if (!reward) return;
  if ((user.points || 0) < reward.points) {
    showToast('Insufficient points for this reward.', 'error');
    return;
  }
  // deduct points and record redemption
  user.points -= reward.points;
  user.rewardsRedeemed = user.rewardsRedeemed || [];
  user.rewardsRedeemed.push({ ...reward, timestamp: new Date().toISOString() });
  localStorage.setItem('smartBinCurrentUser', JSON.stringify(user));
  showToast(`Redeemed ${reward.name}!`, 'success');
  // Optionally re-render dashboard if open elsewhere
}

if (document.readyState !== 'loading') {
  renderRewards();
} else {
  document.addEventListener('DOMContentLoaded', renderRewards);
}
