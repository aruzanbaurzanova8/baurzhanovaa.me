// Scramble text effect
const el = document.querySelector(".highlight");

if (el) {
  const originalText = el.textContent;
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let frame = 0;
  let isHovering = false;

  function scrambleText() {
    const output = originalText
      .split("")
      .map((char) => {
        if (!isHovering && frame >= originalText.length) return char;
        if (char === " ") return " ";
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    el.textContent = output;

    if (!isHovering && frame < originalText.length) {
      frame += 5;
    }

    requestAnimationFrame(scrambleText);
  }

  window.addEventListener("load", () => {
    frame = 0;
    scrambleText();
  });

  el.addEventListener("mouseenter", () => {
    isHovering = true;
    frame = 0;
  });

  el.addEventListener("mouseleave", () => {
    isHovering = false;
  });
}

const sections = document.querySelectorAll(".section");
const buttons = document.querySelectorAll(".dock-item");

function showSection(id) {
  sections.forEach(section =>
    section.classList.toggle("active", section.id === id)
  );

  buttons.forEach(btn =>
    btn.classList.toggle("active", btn.dataset.target === id)
  );
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.target;

    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        showSection(id);
      });
    } else {
      showSection(id);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        showSection("home");
      });
    } else {
      showSection("home");
    }
  }
});



