// Project Data
const projects = [
    {
        id: 1,
        title: "Learning based Model Predictive Path Integral Controller for Autonomous Surface Vehicles",
        description: "SOOKSHMA is a mini Autonomous Surface Vehicle (ASV) developed by the Marine Autonomous Vehicles Lab (MAVLAB), IIT Madras for easy deployment for research purposes.",
        image: "./mppi.png",
        category: "software",   
        tags: ["Arduino DUE", "ROS2", "Micro ROS", "Jetson nano", "SBG", "UWB"],
        demoLink: "https://youtu.be/lidJ2G9E-nc",
        codeLink: "https://github.com/Akash7736/sookshma"
    },
    {
        id: 2,
        title: "Project SOOKSHMA",
        description: "SOOKSHMA is a mini Autonomous Surface Vehicle (ASV) developed by the Marine Autonomous Vehicles Lab (MAVLAB), IIT Madras for easy deployment for research purposes.",
        image: "./sookshma.png",
        category: "data-analysis",
        tags: ["Arduino DUE", "ROS2", "Micro ROS", "Jetson nano", "SBG", "UWB"],
        demoLink: "https://youtu.be/lidJ2G9E-nc",
        codeLink: "https://github.com/Akash7736/sookshma"
    },
    {
        id: 3,
        title: "Njord Challenge 2023",
        description: "Njord Challenge 2023 is a competiton organized by Norwegian University of Science and Technology (NTNU). There are certain tasks such as maneuvering, docking and collision avoidance. to be performed by the autonomous surface vehicle.",
        image: "./Njord_Challenge.jpg",
        category: "software",
        tags: ["Catamaran", "ROS1", "rosserial", "yolov8", "APF", "Lidar", "Stereo Vision"],
        demoLink: "https://drive.google.com/file/d/1_r9HlQPlLPjAaWwX4GdzddVPvV2Hofsu/view",
        codeLink: "#"
    },
    {
        id: 4,
        title: "Ultra Wide Band Indoor Localization",
        description: "Ultra Wide Band Indoor Localization is a project to localize the position of the autonomous surface vehicle using the Ultra Wide Band (UWB) technology.",
        image: "./uwb.jpg",
        category: "experiments",
        tags: ["UWB", "ROS2", "Micro ROS", "Jetson nano", "SBG", "UWB"],
        demoLink: "#",
        codeLink: "https://github.com/Akash7736/UWB"
    },
    {
        id: 5,
        title: "Virtual Robotx Challenge 2023",
        description: "Virtual Roborx Challenge 2023 is a competiton organized by Roborx, IIT Madras. There are certain tasks such as maneuvering, docking and collision avoidance. to be performed by the autonomous surface vehicle.",
        image: "./vrx.png",
        category: "software",
        tags: ["Catamaran", "ROS1", "rosserial", "yolov8", "APF", "Lidar", "Stereo Vision"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 6,
        title: "OMAE Conference 2024 Singapore",
        description: "43rd International Conference on Ocean, Offshore and Arctic Engineering - OMAE 2024 by American Society of Mechanical Engineers (ASME)",
        image: "./omae24.jpg",
        category: "conference",
        tags: ["ROS2", "Micro ROS", "Jetson nano", "SBG", "UWB"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 7,
        title: "IEEE Oceans 2024 Halifax Canada",
        description: "The OCEANS 2024 Halifax conference is for global maritime professionals to learn, innovate and lead in the protection and utilization of the world's largest natural resource – our OCEANS..",
        image: "./ieeeoceans24.png",
        category: "conference",
        tags: ["ROS2", "Micro ROS", "Jetson nano", "SBG", "UWB"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 8,
        title: "IEEE Underwater Technology Conference 2025 Taiwan",
        description: "The Underwater Technology (UT) symposium, one of the IEEE Oceanic Engineering Society's premier events, has been at the forefront of technological advancements in the underwater field for the past 27 years.",
        image: "./ut25.jpeg",
        category: "conference",
        tags: ["ROS2", "Micro ROS", "Jetson nano", "SBG", "UWB"],
        demoLink: "#",
        codeLink: "#"
    }
];

// Publication Data
const publications = [
    {
        id: 1,
        title: "Deep Reinforcement Learning for Ship Collision Avoidance and Path Tracking",
        authors: "AN Singh, A Vijayakumar, S Balasubramaniyam, A Somayajula",
        journal: "International Conference on Offshore Mechanics and Arctic Engineering",
        year: 2024,
        link: "#" // Add the actual link if available
    },
    {
        id: 2,
        title: "Model Predictive Path Integral Docking of Fully Actuated Surface Vessel",
        authors: "A Vijayakumar, A Somayajula",
        journal: "arXiv preprint arXiv:2501.09668",
        year: 2025,
        link: "#" // Add the actual link if available
    },
    {
        id: 3,
        title: "Learning Autonomous Docking Operation of Fully Actuated Autonomous Surface Vessel from Expert data",
        authors: "A Vijayakumar, MA Atman, A Somayajula",
        journal: "OCEANS 2024-Halifax",
        year: 2024,
        link: "#" // Add the actual link if available
    },
    {
        id: 4,
        title: "Extraction of Ship Collision Avoidance Patterns From AIS Data",
        authors: "A Vijayakumar, AN Singh, A Somayajula",
        journal: "International Conference on Offshore Mechanics and Arctic Engineering",
        year: 2024,
        link: "#" // Add the actual link if available
    },
    {
        id: 5,
        title: "Data Driven Identification and Model Predictive Control for a Catamaran Surface Vessel",
        authors: "V Deogaonkar, M Ibrahim M, A Vijayakumar, A Somayajula",
        journal: "International Conference on Offshore Mechanics and Arctic Engineering",
        year: 2024,
        link: "#" // Add the actual link if available
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projects-grid');
const conferencesGrid = document.getElementById('conferences-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contact-form');
const publicationsGrid = document.getElementById('publications-grid');

// Function to render projects
function renderProjects(projectsList) {
    projectsGrid.innerHTML = '';
    
    projectsList.forEach(project => {
        if (project.category !== 'conference') {
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
        }
    });
}

// Function to render conferences
function renderConferences(conferencesList) {
    conferencesGrid.innerHTML = '';
    
    conferencesList.forEach(conference => {
        if (conference.category === 'conference') {
            const conferenceCard = document.createElement('div');
            conferenceCard.className = 'conference-card';
            
            conferenceCard.innerHTML = `
                <div class="conference-image">
                    <img src="${conference.image}" alt="${conference.title}">
                </div>
                <div class="conference-content">
                    <h3 class="conference-title">${conference.title}</h3>
                    <p class="conference-description">${conference.description}</p>
                    <div class="conference-tags">
                        ${conference.tags.map(tag => `<span class="conference-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            conferencesGrid.appendChild(conferenceCard);
        }
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

// Function to render publications
function renderPublications(publicationsList) {
    publicationsGrid.innerHTML = '';
    
    publicationsList.forEach(publication => {
        const publicationCard = document.createElement('div');
        publicationCard.className = 'publication-card';
        
        publicationCard.innerHTML = `
            <div class="publication-content">
                <h3 class="publication-title">${publication.title}</h3>
                <p class="publication-authors">${publication.authors}</p>
                <p class="publication-journal">${publication.journal}, ${publication.year}</p>
                <a href="${publication.link}" class="publication-link" target="_blank">Read More</a>
            </div>
        `;
        
        publicationsGrid.appendChild(publicationCard);
    });
}

// Initialize projects and conferences
renderProjects(projects);
renderConferences(projects);
renderPublications(publications);

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
