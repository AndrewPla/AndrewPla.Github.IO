(function () {
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyToast = document.getElementById("copyToast");
  const reactiveTargets = document.querySelectorAll(".ap-links-btn, .ap-link-item, .ap-links-chip, .ap-priority-card");

  function ripple(target, event) {
    const rect = target.getBoundingClientRect();
    const hasPointer = typeof event.clientX === "number" && typeof event.clientY === "number";
    const x = hasPointer ? event.clientX - rect.left : rect.width / 2;
    const y = hasPointer ? event.clientY - rect.top : rect.height / 2;
    const bubble = document.createElement("span");
    bubble.className = "ap-ripple";
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
    target.appendChild(bubble);
    window.setTimeout(() => bubble.remove(), 520);
  }

  reactiveTargets.forEach((target) => {
    target.addEventListener("click", (event) => ripple(target, event));
  });

  if (!copyEmailBtn || !copyToast) return;

  async function copyEmail() {
    const email = copyEmailBtn.dataset.email || "";
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      copyToast.textContent = "Email copied.";
    } catch {
      copyToast.textContent = "Clipboard blocked. Email: " + email;
    }

    copyToast.classList.add("is-visible");
    window.clearTimeout(copyToast._hideTimer);
    copyToast._hideTimer = window.setTimeout(() => {
      copyToast.classList.remove("is-visible");
    }, 2200);
  }

  copyEmailBtn.addEventListener("click", copyEmail);
})();
