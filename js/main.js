document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".top-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      const clickedInsideNav = nav instanceof HTMLElement ? nav.contains(target) : false;
      if (!clickedInsideNav && !menuToggle.contains(target) && navLinks.classList.contains("open")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  const onScroll = () => {
    if (!nav) {
      return;
    }
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }
      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const contactForm = document.querySelector("#contactForm");
  const successMessage = document.querySelector("#formSuccess");
  if (contactForm && successMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.querySelector("#name");
      const phoneInput = document.querySelector("#phone");
      const messageInput = document.querySelector("#message");
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const name = nameInput instanceof HTMLInputElement ? nameInput.value.trim() : "";
      const phone = phoneInput instanceof HTMLInputElement ? phoneInput.value.trim() : "";
      const message = messageInput instanceof HTMLTextAreaElement ? messageInput.value.trim() : "";
      const phoneIsValid = /^[0-9]{10}$/.test(phone);

      if (name.length < 2 || !phoneIsValid || message.length < 10) {
        successMessage.style.display = "block";
        successMessage.textContent = "Please enter a valid name, 10-digit phone number, and message details.";
        return;
      }

      const text = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;
      const waUrl = `https://wa.me/918847555819?text=${encodeURIComponent(text)}`;
      successMessage.style.display = "block";
      successMessage.textContent = "Thanks! Redirecting to WhatsApp...";
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true;
        submitButton.textContent = "Redirecting...";
      }

      window.setTimeout(() => {
        window.open(waUrl, "_blank", "noopener");
        contactForm.style.display = "none";
        successMessage.textContent = "We'll contact you on WhatsApp shortly!";
      }, 900);
    });
  }

  const productCarouselData = {
    "cloth-hang-tags": [
      {
        title: "Premium Kraft Hang Tags",
        meta: "CLOTH HANG TAGS",
        desc: "Strong card stock with matte finish for boutique and premium apparel."
      },
      {
        title: "Gloss Coated Garment Tags",
        meta: "CLOTH HANG TAGS",
        desc: "High sheen print for retail visibility and strong shelf appeal."
      },
      {
        title: "Barcode Price Tags",
        meta: "CLOTH HANG TAGS",
        desc: "Clean barcode printing with sharp readability for inventory workflows."
      },
      {
        title: "Embossed Brand Tags",
        meta: "CLOTH HANG TAGS",
        desc: "Raised texture options for distinctive tactile brand presentation."
      }
    ],
    "heat-transfer-labels": [
      {
        title: "Soft Touch Neck Labels",
        meta: "HEAT TRANSFER",
        desc: "Skin-friendly neck labels with durable adhesion and no scratch feel."
      },
      {
        title: "Sportswear Transfer Labels",
        meta: "HEAT TRANSFER",
        desc: "Performance-grade labels designed for stretch fabrics and active wear."
      },
      {
        title: "Wash-Care Transfer Sets",
        meta: "HEAT TRANSFER",
        desc: "Fine text transfer for care and composition instructions that last."
      },
      {
        title: "High Opacity White Transfers",
        meta: "HEAT TRANSFER",
        desc: "Bright, visible labeling on dark garments with stable color hold."
      }
    ],
    "woven-labels": [
      {
        title: "Damask Woven Labels",
        meta: "WOVEN LABELS",
        desc: "Fine weave definition with smooth finish for premium garment branding."
      },
      {
        title: "Satin Edge Labels",
        meta: "WOVEN LABELS",
        desc: "Soft edges and crisp woven detail for comfort-focused applications."
      },
      {
        title: "Center Fold Labels",
        meta: "WOVEN LABELS",
        desc: "Balanced fold construction for side seam and neck branding placement."
      },
      {
        title: "End Fold Brand Labels",
        meta: "WOVEN LABELS",
        desc: "Secure end fold labels for stitched finishing in bulk production."
      }
    ],
    stickers: [
      {
        title: "Product Packaging Stickers",
        meta: "STICKERS",
        desc: "Custom adhesive labels for boxes, jars, pouches, and retail packaging."
      },
      {
        title: "Transparent Branding Stickers",
        meta: "STICKERS",
        desc: "Clear finish stickers for minimal and premium product presentation."
      },
      {
        title: "Tamper Evident Labels",
        meta: "STICKERS",
        desc: "Security-focused stickers for safe packaging and trust signaling."
      },
      {
        title: "Die-Cut Promo Stickers",
        meta: "STICKERS",
        desc: "Custom shape stickers for marketing inserts and brand campaigns."
      }
    ],
    "hologram-stickers": [
      {
        title: "Tamper Proof Hologram Labels",
        meta: "HOLOGRAM STICKERS",
        desc: "Security hologram labels designed to reveal tampering and protect branded goods."
      },
      {
        title: "Custom Logo Hologram Stickers",
        meta: "HOLOGRAM STICKERS",
        desc: "Branded hologram stickers with custom logos, patterns, and serial features."
      },
      {
        title: "Void Security Hologram Seals",
        meta: "HOLOGRAM STICKERS",
        desc: "Protective hologram seals that leave a visible void mark when removed."
      },
      {
        title: "Serialized Hologram Stickers",
        meta: "HOLOGRAM STICKERS",
        desc: "Numbered hologram stickers for track-and-trace, warranty, and authentication workflows."
      }
    ]
  };

  const carouselTeardowns = new WeakMap();
  const mobileBreakpointQuery = window.matchMedia("(max-width: 767px)");

  const initButtonRipples = () => {
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height) * 1.15;
        ripple.className = "btn-ripple";
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        button.appendChild(ripple);
        ripple.addEventListener("animationend", () => {
          ripple.remove();
        });
      });
    });
  };

  const initRevealAnimations = () => {
    const revealTargets = document.querySelectorAll(
      ".section-title, .trust-item, .card, .service-item, .contact-card"
    );

    if (revealTargets.length === 0) {
      return;
    }

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 70, 280)}ms`);
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach((element) => {
      revealObserver.observe(element);
    });
  };

  const initParallax = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 899px)").matches;
    if (reducedMotion || isMobile) {
      return;
    }

    const layers = [];
    const heroContainer = document.querySelector(".hero .container");
    const pageHeroContainer = document.querySelector(".page-hero .container");
    const ctaBanner = document.querySelector(".cta-banner");

    if (heroContainer) {
      heroContainer.classList.add("parallax-layer");
      layers.push({ element: heroContainer, speed: 0.05 });
    }
    if (pageHeroContainer) {
      pageHeroContainer.classList.add("parallax-layer");
      layers.push({ element: pageHeroContainer, speed: 0.045 });
    }
    if (ctaBanner) {
      ctaBanner.classList.add("parallax-layer");
      layers.push({ element: ctaBanner, speed: 0.03 });
    }

    if (layers.length === 0) {
      return;
    }

    let ticking = false;
    const updateParallax = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      layers.forEach(({ element, speed }) => {
        element.style.transform = `translate3d(0, ${Math.round(scrollY * speed)}px, 0)`;
      });
      ticking = false;
    };

    const onParallaxScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", onParallaxScroll, { passive: true });
    updateParallax();
  };

  const initDesktopTilt = () => {
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 900px)"
    ).matches;
    if (!supportsHover) {
      return;
    }

    const tiltTargets = document.querySelectorAll(".card, .contact-card");
    tiltTargets.forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const relativeX = (event.clientX - rect.left) / rect.width;
        const relativeY = (event.clientY - rect.top) / rect.height;
        const rotateY = (relativeX - 0.5) * 7;
        const rotateX = (0.5 - relativeY) * 7;
        element.style.transform = `translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      });

      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    });
  };

  const createCardMarkup = (item) => {
    const card = document.createElement("article");
    card.className = "orbit-card";
    card.innerHTML = `
      <div class="orbit-card-media" role="img" aria-label="${item.title} image placeholder">Preview</div>
      <div class="orbit-card-meta">${item.meta}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;
    return card;
  };

  const setupMobileCarousel = (carouselElement, data) => {
    const viewport = carouselElement.querySelector(".carousel-viewport");
    const container = carouselElement.querySelector(".carousel-container");
    if (!viewport || !container) {
      return () => {};
    }

    carouselElement.classList.add("mobile-mode");
    container.innerHTML = "";
    viewport.querySelectorAll(".carousel-control").forEach((button) => button.remove());

    data.forEach((item) => {
      container.appendChild(createCardMarkup(item));
    });

    const cards = Array.from(container.querySelectorAll(".orbit-card"));
    if (cards.length === 0) {
      return () => {};
    }

    let currentIndex = 0;
    let autoSlideTimer = 0;
    let resumeTimer = 0;
    let scrollSettleTimer = 0;
    let isProgrammaticScroll = false;

    const updateActiveCard = () => {
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      currentIndex = nearestIndex;
      cards.forEach((card, index) => {
        card.classList.toggle("is-active", index === nearestIndex);
      });
    };

    const scrollToIndex = (index, behavior = "smooth") => {
      const count = cards.length;
      if (count === 0) {
        return;
      }

      currentIndex = (index + count) % count;
      const targetCard = cards[currentIndex];
      if (!targetCard) {
        return;
      }

      const left = targetCard.offsetLeft - (viewport.clientWidth - targetCard.offsetWidth) / 2;
      isProgrammaticScroll = true;
      viewport.scrollTo({ left: Math.max(0, left), behavior });
      window.clearTimeout(scrollSettleTimer);
      scrollSettleTimer = window.setTimeout(() => {
        isProgrammaticScroll = false;
        updateActiveCard();
      }, 380);
    };

    const stopAutoSlide = () => {
      window.clearInterval(autoSlideTimer);
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideTimer = window.setInterval(() => {
        scrollToIndex(currentIndex + 1);
      }, 3000);
    };

    const pauseAndResumeAutoSlide = () => {
      if (isProgrammaticScroll) {
        return;
      }
      stopAutoSlide();
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(startAutoSlide, 2200);
    };

    const onScroll = () => {
      updateActiveCard();
      pauseAndResumeAutoSlide();
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("touchstart", pauseAndResumeAutoSlide, { passive: true });
    viewport.addEventListener("pointerdown", pauseAndResumeAutoSlide, { passive: true });

    requestAnimationFrame(() => {
      scrollToIndex(0, "auto");
      startAutoSlide();
    });

    return () => {
      stopAutoSlide();
      window.clearTimeout(resumeTimer);
      window.clearTimeout(scrollSettleTimer);
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("touchstart", pauseAndResumeAutoSlide);
      viewport.removeEventListener("pointerdown", pauseAndResumeAutoSlide);
    };
  };

  const setupDesktopCarousel = (carouselElement, data) => {
    const viewport = carouselElement.querySelector(".carousel-viewport");
    const container = carouselElement.querySelector(".carousel-container");
    if (!viewport || !container) {
      return () => {};
    }

    carouselElement.classList.remove("mobile-mode");
    container.innerHTML = "";
    viewport.querySelectorAll(".carousel-control").forEach((button) => button.remove());

    const cardCount = data.length;
    const cardWidth =
      parseFloat(getComputedStyle(carouselElement).getPropertyValue("--carousel-card-w")) || 300;
    const cssRadius =
      parseFloat(getComputedStyle(carouselElement).getPropertyValue("--carousel-radius")) || 500;
    const radius = Math.max(cssRadius, cardWidth * 0.72);

    let currentRotation = 0;
    let velocity = 0;
    let isDragging = false;
    let isHovering = false;
    let resumeAfter = 0;
    let lastX = 0;
    const dragSpeed = 0.14;
    const friction = 0.94;
    const stepAngle = 360 / cardCount;
    let animationFrameId = 0;

    const leftButton = document.createElement("button");
    leftButton.type = "button";
    leftButton.className = "carousel-control left";
    leftButton.setAttribute("aria-label", "Rotate carousel left");
    leftButton.innerHTML = "&#10094;";

    const rightButton = document.createElement("button");
    rightButton.type = "button";
    rightButton.className = "carousel-control right";
    rightButton.setAttribute("aria-label", "Rotate carousel right");
    rightButton.innerHTML = "&#10095;";

    viewport.appendChild(leftButton);
    viewport.appendChild(rightButton);

    data.forEach((item, index) => {
      const angle = (index * 360) / cardCount;
      const card = createCardMarkup(item);
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) rotateY(180deg)`;
      container.appendChild(card);
    });

    const onStart = (event) => {
      isDragging = true;
      const point = "touches" in event ? event.touches[0] : event;
      lastX = point.pageX;
      velocity = 0;
    };

    const onMove = (event) => {
      if (!isDragging) {
        return;
      }
      if ("touches" in event) {
        event.preventDefault();
      }
      const point = "touches" in event ? event.touches[0] : event;
      const deltaX = point.pageX - lastX;
      currentRotation += deltaX * dragSpeed;
      velocity = deltaX * dragSpeed;
      lastX = point.pageX;
    };

    const onEnd = () => {
      isDragging = false;
    };

    const normalizeRotation = (value) => ((value % 360) + 360) % 360;
    const getNearestIndex = () => {
      const normalized = normalizeRotation(-currentRotation);
      return Math.round(normalized / stepAngle) % cardCount;
    };
    const pauseAutoRotate = (durationMs) => {
      resumeAfter = Date.now() + durationMs;
    };
    const snapToIndex = (index) => {
      currentRotation = -(index * stepAngle);
      velocity = 0;
    };

    const onPointerDown = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest(".carousel-control")) {
        return;
      }
      onStart(event);
      if (event.pointerId !== undefined) {
        viewport.setPointerCapture(event.pointerId);
      }
    };
    const onMouseEnter = () => {
      isHovering = true;
    };
    const onMouseLeave = () => {
      isHovering = false;
    };
    const onWheel = (event) => {
      velocity += event.deltaY * 0.007;
    };
    const onLeftPointerDown = (event) => {
      event.stopPropagation();
    };
    const onRightPointerDown = (event) => {
      event.stopPropagation();
    };
    const onLeftClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextIndex = (getNearestIndex() - 1 + cardCount) % cardCount;
      snapToIndex(nextIndex);
      pauseAutoRotate(2500);
    };
    const onRightClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextIndex = (getNearestIndex() + 1) % cardCount;
      snapToIndex(nextIndex);
      pauseAutoRotate(2500);
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onEnd);
    viewport.addEventListener("pointercancel", onEnd);
    viewport.addEventListener("mouseenter", onMouseEnter);
    viewport.addEventListener("mouseleave", onMouseLeave);
    viewport.addEventListener("wheel", onWheel, { passive: true });
    leftButton.addEventListener("pointerdown", onLeftPointerDown);
    rightButton.addEventListener("pointerdown", onRightPointerDown);
    leftButton.addEventListener("click", onLeftClick);
    rightButton.addEventListener("click", onRightClick);

    const animate = () => {
      const canAutoRotate = !isHovering && Date.now() >= resumeAfter;
      if (!isDragging && canAutoRotate) {
        currentRotation += velocity;
        velocity *= friction;
        if (Math.abs(velocity) < 0.01) {
          currentRotation -= 0.035;
        }
      }
      container.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onEnd);
      viewport.removeEventListener("pointercancel", onEnd);
      viewport.removeEventListener("mouseenter", onMouseEnter);
      viewport.removeEventListener("mouseleave", onMouseLeave);
      viewport.removeEventListener("wheel", onWheel);
      leftButton.removeEventListener("pointerdown", onLeftPointerDown);
      rightButton.removeEventListener("pointerdown", onRightPointerDown);
      leftButton.removeEventListener("click", onLeftClick);
      rightButton.removeEventListener("click", onRightClick);
    };
  };

  const initializeProductCarousels = () => {
    const isMobileCarousel = mobileBreakpointQuery.matches;
    const carousels = document.querySelectorAll(".product-carousel");

    carousels.forEach((carouselElement) => {
      const category = carouselElement.dataset.category || "";
      const data = productCarouselData[category];
      if (!data || data.length === 0) {
        return;
      }

      const previousTeardown = carouselTeardowns.get(carouselElement);
      if (typeof previousTeardown === "function") {
        previousTeardown();
      }

      const teardown = isMobileCarousel
        ? setupMobileCarousel(carouselElement, data)
        : setupDesktopCarousel(carouselElement, data);
      carouselTeardowns.set(carouselElement, teardown);
    });
  };

  let resizeReinitTimer = 0;
  const onResize = () => {
    window.clearTimeout(resizeReinitTimer);
    resizeReinitTimer = window.setTimeout(initializeProductCarousels, 150);
  };

  if (typeof mobileBreakpointQuery.addEventListener === "function") {
    mobileBreakpointQuery.addEventListener("change", initializeProductCarousels);
  } else {
    mobileBreakpointQuery.addListener(initializeProductCarousels);
  }

  window.addEventListener("resize", onResize, { passive: true });
  initButtonRipples();
  initRevealAnimations();
  initParallax();
  initDesktopTilt();
  initializeProductCarousels();
});
