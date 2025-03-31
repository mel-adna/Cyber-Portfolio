document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('checkbox');
  const body = document.body;
  
  // Check for saved theme preference or use system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  // Apply the saved theme or default based on system preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeToggle.checked = false;
  }
  
  // Toggle theme when checkbox changes
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  });
});
