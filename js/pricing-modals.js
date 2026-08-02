(function () {
  var overlay = document.getElementById("toast-overlay");
  var emailModal = document.getElementById("plan-email-modal");
  var detailsModal = document.getElementById("plan-details-modal");
  if (!overlay || !emailModal || !detailsModal) return;

  var emailForm = document.getElementById("plan-email-form");
  var emailInput = document.getElementById("plan-email-input");
  var emailPlanField = document.getElementById("plan-email-plan-field");
  var emailSubmit = document.getElementById("plan-email-submit");
  var emailNote = document.getElementById("plan-email-note");
  var emailPlanName = document.getElementById("plan-email-name");

  var detailsForm = document.getElementById("plan-details-form");
  var detailsPlanField = document.getElementById("plan-details-plan-field");
  var detailsEmailField = document.getElementById("plan-details-email-field");
  var detailsSubmit = document.getElementById("plan-details-submit");
  var detailsNote = document.getElementById("plan-details-note");
  var detailsSkip = document.getElementById("plan-details-skip");

  var contactForm = document.getElementById("contact-form");
  var ajaxUrl = contactForm
    ? contactForm.getAttribute("action").replace("formsubmit.co/", "formsubmit.co/ajax/")
    : "https://formsubmit.co/ajax/hello@figfernstudio.com";

  function trackLead(stage, plan) {
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        event_category: "pricing_modal",
        event_label: plan,
        lead_stage: stage,
      });
    }
  }

  function showModal(modal) {
    overlay.classList.add("is-visible");
    modal.classList.add("is-visible");
  }

  function hideAll() {
    emailModal.classList.remove("is-visible");
    detailsModal.classList.remove("is-visible");
    overlay.classList.remove("is-visible");
  }

  document.querySelectorAll(".plan-cta").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var plan = btn.getAttribute("data-plan") || "";

      emailForm.reset();
      emailPlanField.value = plan;
      if (emailPlanName) emailPlanName.textContent = plan;
      if (emailNote) emailNote.textContent = "";
      if (emailSubmit) {
        emailSubmit.disabled = false;
        emailSubmit.textContent = "Continue";
      }

      showModal(emailModal);
      emailInput.focus();
    });
  });

  document.getElementById("plan-email-close").addEventListener("click", hideAll);
  document.getElementById("plan-details-close").addEventListener("click", hideAll);
  if (detailsSkip) detailsSkip.addEventListener("click", hideAll);
  overlay.addEventListener("click", hideAll);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hideAll();
  });

  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (emailSubmit) {
      emailSubmit.disabled = true;
      emailSubmit.textContent = "Sending...";
    }
    if (emailNote) emailNote.textContent = "";

    fetch(ajaxUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(emailForm),
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(function () {
        trackLead("email_only", emailPlanField.value);

        var plan = emailPlanField.value;
        var email = emailInput.value;

        detailsForm.reset();
        detailsPlanField.value = plan;
        detailsEmailField.value = email;
        if (detailsNote) detailsNote.textContent = "";
        if (detailsSubmit) {
          detailsSubmit.disabled = false;
          detailsSubmit.textContent = "Send details";
        }

        emailModal.classList.remove("is-visible");
        showModal(detailsModal);
      })
      .catch(function () {
        if (emailNote) {
          emailNote.textContent =
            "That didn't go through. Please try again, or email hello@figfernstudio.com directly.";
        }
        if (emailSubmit) {
          emailSubmit.disabled = false;
          emailSubmit.textContent = "Continue";
        }
      });
  });

  detailsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (detailsSubmit) {
      detailsSubmit.disabled = true;
      detailsSubmit.textContent = "Sending...";
    }
    if (detailsNote) detailsNote.textContent = "";

    fetch(ajaxUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(detailsForm),
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(function () {
        window.location.href = "thank-you.html";
      })
      .catch(function () {
        if (detailsNote) {
          detailsNote.textContent =
            "That didn't go through. Please try again, or email hello@figfernstudio.com directly.";
        }
        if (detailsSubmit) {
          detailsSubmit.disabled = false;
          detailsSubmit.textContent = "Send details";
        }
      });
  });
})();
