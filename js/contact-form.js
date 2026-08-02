(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var button = form.querySelector(".btn-send");
  var note = document.getElementById("form-note");
  var buttonLabel = button ? button.textContent : "";

  var toast = document.getElementById("toast");
  var toastOverlay = document.getElementById("toast-overlay");
  var toastMessage = document.getElementById("toast-message");
  var toastClose = document.getElementById("toast-close");
  var toastConfirm = document.getElementById("toast-confirm");

  function showErrorToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add("is-visible", "is-error");
    if (toastOverlay) toastOverlay.classList.add("is-visible");
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove("is-visible");
    if (toastOverlay) toastOverlay.classList.remove("is-visible");
  }

  if (toastClose) toastClose.addEventListener("click", hideToast);
  if (toastConfirm) toastConfirm.addEventListener("click", hideToast);
  if (toastOverlay) toastOverlay.addEventListener("click", hideToast);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hideToast();
  });

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
        window.location.href = "thank-you.html";
      })
      .catch(function () {
        if (note) {
          note.textContent =
            "Something went wrong sending that. Please email hello@figfernstudio.com directly.";
        }
        showErrorToast("Something went wrong. Please email hello@figfernstudio.com directly.");
        if (button) {
          button.disabled = false;
          button.textContent = buttonLabel;
        }
      });
  });
})();
