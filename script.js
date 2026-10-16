/**
 * Campus Event Planner - Pinterest Moodboard Interactive Vanilla JavaScript
 * Features:
 *  - 3D Perspective Tilt on Event Cards
 *  - Floating 3D Moodboard Parallax Engine
 *  - Category Filter Pills (Tech, Arts, Athletics, All)
 *  - Responsive Mobile Navigation Menu
 *  - Stationery Note Modal Dialog with LocalStorage RSVP Tracking
 *  - Interactive Suggestion / Contact Form Handler
 *  - Reduced Motion Accessibility Compliance
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Accessibility: Detect reduced-motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2. Interactive 3D Perspective Tilt for Moodboard Event Cards
  const tiltCards = document.querySelectorAll("[data-tilt]");

  if (!prefersReducedMotion) {
    tiltCards.forEach(function (card) {
      const cardInner = card.querySelector(".card-inner");

      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Gentle, sophisticated tilt (-10deg to +10deg)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        if (cardInner) {
          cardInner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        }
      });

      card.addEventListener("mouseleave", function () {
        if (cardInner) {
          cardInner.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        }
      });
    });

    // 3. Hero Moodboard 3D Parallax Tracking
    const heroSection = document.getElementById("hero");
    const floatingElements = document.querySelectorAll(".floating-3d");

    if (heroSection && floatingElements.length > 0) {
      heroSection.addEventListener("mousemove", function (e) {
        const rect = heroSection.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

        floatingElements.forEach(function (el) {
          const speed = parseFloat(el.getAttribute("data-speed")) || 2;
          const shiftX = mouseX * speed * 10;
          const shiftY = mouseY * speed * 10;
          el.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
        });
      });

      heroSection.addEventListener("mouseleave", function () {
        floatingElements.forEach(function (el) {
          el.style.transform = "";
        });
      });
    }
  }

  // 4. Responsive Mobile Navigation Menu
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 5. Category Filter Pills
  const filterPills = document.querySelectorAll(".pill-btn");
  const eventCards = document.querySelectorAll(".event-card");

  filterPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      filterPills.forEach(function (p) {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      const category = pill.getAttribute("data-category");

      eventCards.forEach(function (card) {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
          setTimeout(function () {
            card.style.opacity = "1";
            card.style.transform = "";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(function () {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  // 6. Event Details Modal Data & Handlers
  const eventDetailsData = {
    1: {
      title: "Annual AI & Robotics Symposium",
      category: "Technology & Workshop",
      meta: "Nov 12, 2026 · 10:00 AM - 4:00 PM · Science & Engineering Center (Lab 402)",
      desc: "Join researchers, student makers, and guest speakers for an inspiring day showcasing autonomous systems, machine learning competitions, and live hardware demos. Complimentary matcha lattes and certificates provided."
    },
    2: {
      title: "Starlight Symphony & Art Gala",
      category: "Arts & Culture",
      meta: "Nov 18, 2026 · 6:00 PM - 10:00 PM · Campus Amphitheater Lawn",
      desc: "A magical autumn evening under open skies and fairy lights featuring the University Symphony Orchestra, original student compositions, ceramic galleries, and cozy spiced apple cider. Cozy picnic blankets encouraged!"
    },
    3: {
      title: "Inter-Collegiate Futsal Championship",
      category: "Athletics & Fitness",
      meta: "Nov 22, 2026 · 1:00 PM - 7:00 PM · Sports Complex Arena",
      desc: "Sixteen spirited student teams battle in high-intensity 5-on-5 matches. Experience energetic cheering, halftime penalty shootouts, winner medals, and local artisan food trucks."
    },
    4: {
      title: "Alumni Startup & Career Fair",
      category: "Career & Networking",
      meta: "Dec 04, 2026 · 11:00 AM - 5:00 PM · Student Union Great Hall",
      desc: "Connect directly with alumni founders across technology, design, media, and biotechnology. Bring your portfolio or resume for 1-on-1 critiques, coffee networking, and internship discussions."
    }
  };

  const modalBackdrop = document.getElementById("eventModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalDismissBtn = document.getElementById("modalDismissBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalBadge = document.getElementById("modalBadge");
  const modalMeta = document.getElementById("modalMeta");
  const modalDesc = document.getElementById("modalDesc");
  const modalRsvpBtn = document.getElementById("modalRsvpBtn");
  let currentEventId = null;

  function openModal(eventId) {
    const data = eventDetailsData[eventId];
    if (!data || !modalBackdrop) return;

    currentEventId = eventId;
    modalTitle.textContent = data.title;
    modalBadge.textContent = data.category;
    modalMeta.textContent = data.meta;
    modalDesc.textContent = data.desc;

    // Check saved RSVP status
    const saved = localStorage.getItem(`campus_event_rsvp_${eventId}`);
    if (saved === "true") {
      modalRsvpBtn.textContent = "✓ In My Moodboard (Saved) ♡";
      modalRsvpBtn.style.background = "#2B1B3D";
      modalRsvpBtn.style.color = "#C8F3DF";
    } else {
      modalRsvpBtn.textContent = "RSVP • Add to My Moodboard ♡";
      modalRsvpBtn.style.background = "";
      modalRsvpBtn.style.color = "";
    }

    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".btn-card-action").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const eventId = btn.getAttribute("data-event-id");
      openModal(eventId);
    });
  });

  // Clicking anywhere on the event card opens its details
  eventCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".btn-card-action")) return;
      const btn = card.querySelector(".btn-card-action");
      if (btn) {
        const eventId = btn.getAttribute("data-event-id");
        openModal(eventId);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener("click", closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });

  // Toggle RSVP status
  if (modalRsvpBtn) {
    modalRsvpBtn.addEventListener("click", function () {
      if (!currentEventId) return;
      const key = `campus_event_rsvp_${currentEventId}`;
      const isSaved = localStorage.getItem(key) === "true";

      if (isSaved) {
        localStorage.removeItem(key);
        modalRsvpBtn.textContent = "RSVP • Add to My Moodboard ♡";
        modalRsvpBtn.style.background = "";
        modalRsvpBtn.style.color = "";
      } else {
        localStorage.setItem(key, "true");
        modalRsvpBtn.textContent = "✓ In My Moodboard (Saved) ♡";
        modalRsvpBtn.style.background = "#2B1B3D";
        modalRsvpBtn.style.color = "#C8F3DF";
      }
    });
  }

  // 7. Proposal / Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = document.getElementById("studentName");
      const nameVal = nameInput ? nameInput.value : "Student";

      alert(`✿ Thank you, ${nameVal}! Your campus event proposal has been received. Our Activities Committee will get back to your campus email soon.`);
      contactForm.reset();
    });
  }

  console.log("Campus Moments: Pinterest moodboard engine loaded successfully ✿");
});
