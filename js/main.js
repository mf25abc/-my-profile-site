/* Shared behaviour: JS flag, footer year, portfolio quick-view dialogs */

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

// Current year in the footer
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Portfolio quick-view pop-ups (native <dialog> gives focus trapping and Esc to close)
(function () {
  var lastTrigger = null;

  document.querySelectorAll("[data-dialog-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      var dialog = document.getElementById(button.getAttribute("data-dialog-open"));
      if (!dialog || typeof dialog.showModal !== "function") {
        // Very old browser: fall back to the full project page
        var fallback = button.getAttribute("data-fallback");
        if (fallback) window.location.href = fallback;
        return;
      }
      lastTrigger = button;
      dialog.showModal();
      var heading = dialog.querySelector("h2");
      if (heading) heading.focus();
    });
  });

  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.querySelectorAll("[data-dialog-close]").forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function () {
        dialog.close();
      });
    });

    // Clicking the backdrop (outside the dialog box) closes it
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    // Return focus to the button that opened it (WCAG 2.4.3 focus order)
    dialog.addEventListener("close", function () {
      if (lastTrigger) lastTrigger.focus();
    });
  });
})();
