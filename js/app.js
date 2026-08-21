const nav = document.getElementById("nav");
const toggle = document.querySelector(".nav__toggle");
const drawer = document.getElementById("drawer");
const year = document.getElementById("year");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

year.textContent = new Date().getFullYear();

const setOpen = (open) => {
  drawer.hidden = !open;
  drawer.classList.toggle("is-open", open);
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Zatvori izbornik" : "Otvori izbornik");
  document.body.style.overflow = open ? "hidden" : "";
};

setOpen(false);

const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toggle.addEventListener("click", () => setOpen(drawer.hidden));

drawer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setOpen(false);
    if (lightbox.open) lightbox.close();
  }
});

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}

document.querySelectorAll(".gallery__item").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImg.src = button.dataset.src;
    lightboxImg.alt = button.querySelector("img").alt;
    lightbox.showModal();
  });
});

lightbox.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
