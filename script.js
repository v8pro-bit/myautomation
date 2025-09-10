document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', () => {
    const link = box.getAttribute('data-link');
    navigator.clipboard.writeText(link).then(() => {
      box.classList.add('clicked');
      box.style.backgroundColor = 'red';  
    });
  });
});

function filterBoxes(league, element) {
  // Remove active from all buttons
  document.querySelectorAll('.league-bar span').forEach(span => {
    span.classList.remove('active');
  });
  element.classList.add('active');

  // Show/hide boxes based on league
  document.querySelectorAll('.box').forEach(box => {
    const matchLeague = box.getAttribute('data-league');
    box.classList.toggle('hidden', matchLeague !== league);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.getElementById('themeSwitcher');

  // 1. Theme toggle setup
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
    body.classList.remove('dark');
    toggle.checked = true;
  } else {
    body.classList.add('dark');
    body.classList.remove('light');
    toggle.checked = false;
  }

  // Listen for theme toggle change and save choice
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('light');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark');
      body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  });

  // 2. Filter Buttons setup
  const filterButtons = document.querySelectorAll('.league-bar span');
  filterButtons.forEach(btn => btn.classList.remove('active'));

  const nflButton = Array.from(filterButtons).find(btn =>
    btn.textContent.trim().toUpperCase() === 'NFL'
  );

  if (nflButton) {
    filterBoxes('NFL', nflButton);  // This will also add active class
  } else {
    // Show all if no NFL found
    document.querySelectorAll('.box').forEach(box => box.classList.remove('hidden'));
  }

  // 3. Add click listeners to filter buttons so user can switch leagues
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const league = btn.textContent.trim();
      filterBoxes(league, btn);
    });
  });
});


