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

	document.addEventListener('DOMContentLoaded', () => {
  // 1. Data-Driven Metadata Array
  const projectsData = [
    {
      id: 1,
      title: "DevStudio Portfolio",
      category: "Frontend",
      tech: ["HTML5", "CSS3", "JavaScript"],
      description: "A high-performance portfolio featuring glassmorphic UI and theme toggling.",
      image: "https://placehold.co/400x200",
      demoLink: "https://example.com",
      githubLink: "https://github.com"
    },
    {
      id: 2,
      title: "Task Management API",
      category: "Full Stack",
      tech: ["Node.js", "Express", "MongoDB"],
      description: "RESTful API backend for managing tasks with user authorization.",
      image: "https://placehold.co/400x200",
      demoLink: "https://example.com",
      githubLink: "https://github.com"
    },
    {
      id: 3,
      title: "CSS Glassmorphism Generator",
      category: "Utilities",
      tech: ["JavaScript", "CSS3"],
      description: "A web utility tool to generate glassmorphism code snippets.",
      image: "https://placehold.co/400x200",
      demoLink: "https://example.com",
      githubLink: "https://github.com"
    }
  ];

  // DOM Element References
  const projectsGrid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalTech = document.getElementById('modal-tech');
  const modalDescription = document.getElementById('modal-description');
  const modalDemo = document.getElementById('modal-demo');
  const modalGithub = document.getElementById('modal-github');

  let activeCategory = 'all';

  // 2. Render Project Cards Dynamically
  function renderProjects(data) {
    projectsGrid.innerHTML = '';

    if (data.length === 0) {
      projectsGrid.innerHTML = '<p>No matching projects found.</p>';
      return;
    }

    data.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card', 'glass-card');
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:8px;margin-bottom:10px;" />
        <h3>${project.title}</h3>
        <p><strong>Category:</strong> ${project.category}</p>
        <div class="tech-pills">
          ${project.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      `;

      card.addEventListener('click', () => openModal(project));
      projectsGrid.appendChild(card);
    });
  }

  // 3. Category & Search Filter Handler
  function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filtered = projectsData.filter(project => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                            project.tech.some(t => t.toLowerCase().includes(searchTerm));

      return matchesCategory && matchesSearch;
    });

    renderProjects(filtered);
  }

  // Filter Tab Buttons Event Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.dataset.category;
      filterProjects();
    });
  });

  // Live Search Listener
  searchInput.addEventListener('input', filterProjects);

  // 4. Modal Display Logic
  function openModal(project) {
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalDescription.textContent = project.description;
    modalDemo.href = project.demoLink;
    modalGithub.href = project.githubLink;

    modalTech.innerHTML = project.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
    modal.classList.remove('hidden');
  }

  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

  // Close Modal when clicking outside the content box
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Initial Render
  renderProjects(projectsData);
});