async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const secret = document.getElementById('secret').value;

  const res = await fetch('http://localhost:8081/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById('response').innerText = data.error || 'Login failed';
    return;
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('capabilities', JSON.stringify(data.capabilities));

  // Optionally store secret if user has 'store' capability
  if (secret && data.capabilities.includes('store')) {
    await fetch('http://localhost:8081/api/users/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`
      },
      body: JSON.stringify({ sensitive: secret })
    });
  }

  window.location.href = 'dashboard.html';
}
