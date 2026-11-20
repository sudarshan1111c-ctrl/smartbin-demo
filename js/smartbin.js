// smartbin/js/smartbin.js

function initSimulator() {
  const user = JSON.parse(localStorage.getItem('smartBinCurrentUser'));
  if (!user) {
    showToast('Please log in first.', 'error');
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    return;
  }

  const greetEl = document.getElementById('student-greeting');
  const identifyBtn = document.getElementById('identify-btn');
  const categorySelect = document.getElementById('waste-category');
  const simulateBtn = document.getElementById('simulate-btn');
  const statusBox = document.getElementById('sensor-status');
  const binIllustration = document.getElementById('bin-illustration');

  // Enable identification (demo – instant)
  greetEl.textContent = `Student: ${user.name} (ID: ${user.id})`;
  identifyBtn.disabled = false;
  identifyBtn.textContent = 'Identify (Demo)';

  identifyBtn.addEventListener('click', () => {
    greetEl.textContent = `Hello, ${user.name}!`;
    identifyBtn.disabled = true;
    categorySelect.disabled = false;
    simulateBtn.disabled = false;
    statusBox.textContent = 'Student identified. Waiting for waste deposit...';
  });

  simulateBtn.addEventListener('click', () => {
    const category = categorySelect.value;
    if (!category) {
      showToast('Select a waste category.', 'error');
      return;
    }
    // Prevent duplicate clicks during processing
    simulateBtn.disabled = true;
    statusBox.textContent = 'Detecting waste...';
    // Simulate sensor animation
    binIllustration.classList.add('bin-active');
    setTimeout(() => {
      binIllustration.classList.remove('bin-active');
      const points = SMARTBIN_POINTS[category] || 0;
      // Update user data
      const deposit = { timestamp: new Date().toISOString(), category, points };
      user.points = (user.points || 0) + points;
      user.deposits = user.deposits || [];
      user.deposits.push(deposit);
      localStorage.setItem('smartBinCurrentUser', JSON.stringify(user));

      statusBox.textContent = `Waste detected (${category}). Deposit verified. +${points} pts credited.`;
      showToast(`+${points} points awarded!`, 'success');
      // Reset UI for next deposit after short pause
      setTimeout(() => {
        categorySelect.selectedIndex = 0;
        simulateBtn.disabled = false;
        statusBox.textContent = 'Waiting for waste deposit...';
      }, 1500);
    }, 1200); // simulate sensor delay
  });
}

if (document.readyState !== 'loading') {
  initSimulator();
} else {
  document.addEventListener('DOMContentLoaded', initSimulator);
}
