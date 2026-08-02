(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var button = form.querySelector(".btn-send");
  var note = document.getElementById("form-note");
  var buttonLabel = button ? button.textContent : "";

  var toast = document.getElementById("toast");
  var toastMessage = document.getElementById("toast-message");
  var toastClose = document.getElementById("toast-close");
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 6000);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove("is-visible");
    clearTimeout(toastTimer);
  }

  if (toastClose) toastClose.addEventListener("click", hideToast);

  var ajaxUrl = form.getAttribute("action").replace(
    "formsubmit.co/",
    "formsubmit.co/ajax/"
  );

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    if (note) {
      note.textContent = "Sending your message...";
    }

    fetch(ajaxUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(function () {
        form.reset();
        if (note) {
          note.textContent =
            "Thanks! Your message is on its way — we will get back to you soon.";
        }
        showToast("Thanks for reaching out — we will get back to you soon.");
      })
      .catch(function () {
        if (note) {
          note.textContent =
            "Something went wrong sending that. Please email hello@figfernstudio.com directly.";
        }
        showToast("Something went wrong. Please email hello@figfernstudio.com directly.");
      })
      .finally(function () {
        if (button) {
          button.disabled = false;
          button.textContent = buttonLabel;
        }
      });
  });
})();
