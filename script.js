 const themeToggleBtn = document.getElementById('theme-toggle');

 // Check if the element exists
 if (!themeToggleBtn) {
	console.error("Error: Could not find button with id 'theme-toggle'. Check my index.html file.");
} else {
	console.log("Theme toggle button loaded successfully.");
 }

	// Check saved state in localStorage
	const currentTheme = localStorage.getItem('theme');
	if (currentTheme === 'light') {
		document.body.classList.add('light-mode');
		themeToggleBtn.textContent = '☀️';
	} else {
		document.body.classList.remove('light-mode');
		themeToggleBtn.textContent = '🌙';
	}

	// Toggle Logic
	themeToggleBtn.addEventListener('click', () => {
		document.body.classList.toggle('light-mode');

		let theme = 'dark';
		if (document.body.classList.contains('light-mode')) {
			theme = 'light';
			themeToggleBtn.textContent = '☀️';
		} else {
		themeToggleBtn.textContent = '🌙';
		}

		localStorage.setItem('theme', theme);
		console.log('Theme toggled to: ${theme}');
	});