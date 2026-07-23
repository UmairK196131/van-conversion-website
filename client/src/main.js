import './styles/main.css';

const healthCheck = document.getElementById('api-status');

async function checkApiHealth() {
  if (!healthCheck) return;

  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    healthCheck.textContent = data.status === 'ok' ? 'API connected' : 'API unavailable';
    healthCheck.classList.add(data.status === 'ok' ? 'text-accent' : 'text-red-600');
  } catch {
    healthCheck.textContent = 'API unavailable';
    healthCheck.classList.add('text-red-600');
  }
}

checkApiHealth();
