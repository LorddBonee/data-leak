async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('https://securevault.loca.lt/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById('response').innerText = data.message || data.error;

  if (res.ok) {
    // Redirect to login page
    window.location.href = 'login.html';
  }
}
