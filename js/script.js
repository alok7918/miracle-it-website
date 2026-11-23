// Miracle IT landing page interactions
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

// Back-to-top visibility
const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 450);
});

// Simple testimonial slider
const testimonials = [
  {
    name: "Rahul Verma",
    course: "Java Full Stack Student",
    text: "“The training at Miracle IT was completely practical and industry-oriented. The trainers are very supportive and the projects helped me a lot in my placement.”",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Neha Sharma",
    course: "Python Development Student",
    text: "“I learned by building projects instead of only studying theory. The mentors explained concepts clearly and helped me improve my confidence.”",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Aman Khan",
    course: "MERN Stack Student",
    text: "“The course structure was easy to follow and the practical assignments gave me a better understanding of real development work.”",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
  }
];
let currentTestimonial = 0;

function showTestimonial(index) {
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  const item = testimonials[currentTestimonial];
  document.getElementById("testimonialName").textContent = item.name;
  document.getElementById("testimonialCourse").textContent = item.course;
  document.getElementById("testimonialText").textContent = item.text;
  document.getElementById("testimonialAvatar").src = item.image;
  document.getElementById("slideDots").textContent =
    testimonials.map((_, i) => i === currentTestimonial ? "●" : "○").join("  ");
}

document.getElementById("prevTestimonial").addEventListener("click", () => showTestimonial(currentTestimonial - 1));
document.getElementById("nextTestimonial").addEventListener("click", () => showTestimonial(currentTestimonial + 1));

// Mark the current navigation item while scrolling
const sections = document.querySelectorAll("main section[id], #about, #courses, #faculty, #placements, #testimonials, #contact");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id || current;
  });
  navAnchors.forEach(anchor => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`);
  });
});