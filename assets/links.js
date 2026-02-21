(function () {
  const shell = document.getElementById("apTreeShell");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyToast = document.getElementById("copyToast");

  if (shell) {
    shell.addEventListener("pointermove", (event) => {
      const rect = shell.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 1.2;
      const rotateY = (x - 0.5) * 1.2;
      shell.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    shell.addEventListener("pointerleave", () => {
      shell.style.transform = "";
    });
  }

  if (!copyEmailBtn || !copyToast) return;

  async function copyEmail() {
    const email = copyEmailBtn.dataset.email || "";
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      copyToast.textContent = "Email copied. Paste away.";
      copyToast.classList.add("is-visible");
    } catch {
      copyToast.textContent = "Clipboard blocked. Email: " + email;
      copyToast.classList.add("is-visible");
    }

    window.clearTimeout(copyToast._hideTimer);
    copyToast._hideTimer = window.setTimeout(() => {
      copyToast.classList.remove("is-visible");
    }, 2200);
  }

  copyEmailBtn.addEventListener("click", copyEmail);
})();
