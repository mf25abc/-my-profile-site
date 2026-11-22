/* Contact form: client-side validation and confirmation only.
   Nothing is sent to a server. */

(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var summary = document.getElementById("error-summary");
  var summaryList = summary.querySelector("ul");
  var success = document.getElementById("success-message");
  var message = document.getElementById("message");
  var counter = document.getElementById("message-count");
  var MAX_MESSAGE = 1000;

  var rules = [
    {
      id: "full-name",
      check: function (v) { return v.trim().length >= 2; },
      text: "Enter your full name"
    },
    {
      id: "email",
      check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      text: "Enter an email address in the correct format, like name@example.com"
    },
    {
      id: "phone",
      check: function (v) { return v.trim() === "" || /^[0-9 +()-]{7,20}$/.test(v.trim()); },
      text: "Enter a phone number using only numbers, spaces, brackets, + or -"
    },
    {
      id: "reason",
      check: function (v) { return v !== ""; },
      text: "Select a reason for getting in touch"
    },
    {
      id: "message",
      check: function (v) { return v.trim().length >= 10 && v.length <= MAX_MESSAGE; },
      text: "Enter a message between 10 and " + MAX_MESSAGE + " characters"
    },
    {
      id: "consent",
      check: function (_v, el) { return el.checked; },
      text: "Confirm you are happy to be contacted"
    }
  ];

  function updateCounter() {
    var remaining = MAX_MESSAGE - message.value.length;
    counter.textContent = remaining >= 0
      ? remaining + " characters remaining"
      : Math.abs(remaining) + " characters too many";
  }
  message.addEventListener("input", updateCounter);
  updateCounter();

  function setError(field, text) {
    var errorEl = document.getElementById(field.id + "-error");
    if (text) {
      field.setAttribute("aria-invalid", "true");
      errorEl.textContent = text;
    } else {
      field.removeAttribute("aria-invalid");
      errorEl.textContent = "";
    }
  }

  function validateField(rule) {
    var field = document.getElementById(rule.id);
    var ok = rule.check(field.value, field);
    setError(field, ok ? "" : rule.text);
    return ok;
  }

  // Re-check a field when the user leaves it, but only once it has been flagged
  rules.forEach(function (rule) {
    var field = document.getElementById(rule.id);
    var evt = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "blur";
    field.addEventListener(evt, function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(rule);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    success.hidden = true;
    summaryList.innerHTML = "";

    var failed = rules.filter(function (rule) { return !validateField(rule); });

    if (failed.length) {
      failed.forEach(function (rule) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + rule.id;
        a.textContent = rule.text;
        a.addEventListener("click", function (e) {
          e.preventDefault();
          document.getElementById(rule.id).focus();
        });
        li.appendChild(a);
        summaryList.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
      return;
    }

    summary.hidden = true;
    var name = document.getElementById("full-name").value.trim().split(" ")[0];
    document.getElementById("success-name").textContent = name;
    form.reset();
    updateCounter();
    success.hidden = false;
    success.focus();
  });

  form.addEventListener("reset", function () {
    rules.forEach(function (rule) {
      setError(document.getElementById(rule.id), "");
    });
    summary.hidden = true;
    setTimeout(updateCounter, 0);
  });
})();
