// Project Data
const projects = [
    {
        id: 1,
        title: "Project SOOKSHMA",
        description: "SOOKSHMA is a mini Autonomous Surface Vehicle (ASV) developed by the Marine Autonomous Vehicles Lab (MAVLAB), IIT Madras for easy deployment for research purposes.",
        image: "./sookshma.png",
        category: "data-analysis",
        tags: ["Arduino DUE", "ROS2", "Micro ROS", "Jetson nano", "SBG", "UWB"],
        demoLink: "https://youtu.be/lidJ2G9E-nc",
        codeLink: "#"
    },
    // {
    //     id: 2,
    //     title: "Simulation Software",
    //     description: "A software tool for simulating laboratory conditions and predicting outcomes.",
    //     image: "/api/placeholder/400/320",
    //     category: "software",
    //     tags: ["JavaScript", "React", "Node.js"],
    //     demoLink: "#",
    //     codeLink: "#"
    // },
    // {
    //     id: 3,
    //     title: "Chemical Reaction Experiment",
    //     description: "Documentation and analysis of a series of chemical reaction experiments.",
    //     image: "/api/placeholder/400/320",
    //     category: "experiments",
    //     tags: ["Chemistry", "Lab Equipment", "Documentation"],
    //     demoLink: "#",
    //     codeLink: "#"
    // },
    // {
    //     id: 4,
    //     title: "Molecular Structure Visualization",
    //     description: "Interactive visualization tool for examining molecular structures.",
    //     image: "/api/placeholder/400/320",
    //     category: "software",
    //     tags: ["WebGL", "Three.js", "Biochemistry"],
    //     demoLink: "#",
    //     codeLink: "#"
    // },
    // {
    //     id: 5,
    //     title: "Genetic Data Analysis",
    //     description: "Analysis of genetic data to identify patterns and correlations.",
    //     image: "/api/placeholder/400/320",
    //     category: "data-analysis",
    //     tags: ["R", "Bioinformatics", "Statistics"],
    //     demoLink: "#",
    //     codeLink: "#"
    // },
    // {
    //     id: 6,
    //     title: "Material Properties Test",
    //     description: "Systematic testing of material properties under various conditions.",
    //     image: "/api/placeholder/400/320",
    //     category: "experiments",
    //     tags: ["Physics", "Materials Science", "Testing"],
    //     demoLink: "#",
    //     codeLink: "#"
    // }
];

// DOM Elements
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contact-form');

// Function to render projects
function renderProjects(projectsList) {
    projectsGrid.innerHTML = '';
    
    projectsList.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Make the entire card clickable
        projectCard.addEventListener('click', () => {
            window.location.href = `project-details.html?id=${project.id}`;
        });
        projectCard.style.cursor = 'pointer';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link" onclick="event.stopPropagation();"><i>🔍</i> Demo</a>
                    <a href="${project.codeLink}" class="project-link" onclick="event.stopPropagation();"><i>📂</i> Code</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Filter projects
function filterProjects(category) {
    if (category === 'all') {
        renderProjects(projects);
    } else {
        const filteredProjects = projects.filter(project => project.category === category);
        renderProjects(filteredProjects);
    }
}

// Initialize projects
renderProjects(projects);

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        filterProjects(filter);
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Initialize 3D models when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with the 3D models section
    if (document.getElementById('3d-models')) {
        // Create ASV model
        createModelViewer('asv-model', {
            modelType: 'asv',
            modelColor: 0x3486eb
        });
        
        // Create AUV model
        createModelViewer('auv-model', {
            modelType: 'auv',
            modelColor: 0xf7a440,
            addWater: true
        });
    }
});

// Animate skill bars on scroll
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width') + '%';
        bar.style.width = width;
    });
}

// Contact form submission (Demo only)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form and does not actually send messages.');
        contactForm.reset();
    });
}

// Scroll event for animations
window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsSectionTop < windowHeight * 0.8) {
            animateSkillBars();
        }
    }
});

// Check if skills section is already visible on page load
window.addEventListener('load', () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsSectionTop < windowHeight) {
            animateSkillBars();
        }
    }
});

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.project-card, .about-content, .skill-category, .contact-info, .contact-form');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight * 0.9) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Check elements on load and scroll
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// Dynamic year for copyright
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
}

// Add project - for future use with form or API
function addProject(project) {
    projects.push(project);
    // Re-render with current filter
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
        filterProjects(activeFilter.getAttribute('data-filter'));
    } else {
        renderProjects(projects);
    }
}

// Theme toggle functionality - can be expanded later
let darkMode = false;

function toggleTheme() {
    darkMode = !darkMode;
    
    if (darkMode) {
        document.documentElement.style.setProperty('--light', '#1a1a2e');
        document.documentElement.style.setProperty('--dark', '#e1e1e1');
        document.documentElement.style.setProperty('--text', '#e1e1e1');
        document.documentElement.style.setProperty('--gray', '#333344');
    } else {
        document.documentElement.style.setProperty('--light', '#f5f7fa');
        document.documentElement.style.setProperty('--dark', '#2c3e50');
        document.documentElement.style.setProperty('--text', '#333');
        document.documentElement.style.setProperty('--gray', '#e1e5eb');
    }
}
