/**
 * Handles dynamic form generation for user onboarding.
 */
document.addEventListener("DOMContentLoaded", function () {
  // DOM element references
  const userCountSelect = document.getElementById("userCount");
  const generateFormsBtn = document.getElementById("generateForms");
  const userForm = document.getElementById("userForm");
  const userEntries = document.getElementById("userEntries");
  const formUserCount = document.getElementById("formUserCount");

  /**
   * Creates a user entry form.
   * @param {number} index - The index of the user entry.
   * @returns {HTMLElement} The created user entry form.
   */
  function createUserEntry(index) {
    const userEntry = document.createElement("div");
    userEntry.className = "user-entry";
    const isHebrew = document.documentElement.lang === "he";

    // Helper function to get localized text
    const getText = (en, he) => (isHebrew ? he : en);

    userEntry.innerHTML = `
      <h2>${getText("User", "משתמש")} ${index + 1}</h2>
      ${createFormGroup(
        index,
        "firstname",
        getText("First Name", "שם פרטי"),
        "text",
        true
      )}
      ${createFormGroup(
        index,
        "lastname",
        getText("Last Name", "שם משפחה"),
        "text",
        true
      )}
      ${createFormGroup(
        index,
        "email",
        getText("Business Email", "דוא״ל עסקי"),
        "email",
        true,
        getText(
          "Must have the same domain as your company.",
          "חייב להיות זהה ולפי הדומיין של החברה שלך"
        )
      )}
      ${createFormGroup(
        index,
        "mobilephone",
        getText("Mobile Phone Number", "מספר טלפון נייד"),
        "tel",
        true
      )}
      ${createFormGroup(
        index,
        "phone",
        getText("Office Number", "מספר טלפון במשרד"),
        "tel",
        false
      )}
      ${createFormGroup(
        index,
        "company",
        getText("Company Name", "שם החברה"),
        "text",
        true
      )}
      ${createFormGroup(
        index,
        "jobtitle",
        getText("Job Title", "תפקיד"),
        "text",
        true
      )}
      ${createCountrySelect(index, isHebrew)}
      ${createValveControlCheckbox(index, isHebrew)}
      ${createEscalationLevelSelect(index, isHebrew)}
      ${createCommentsArea(index, isHebrew)}
    `;
    return userEntry;
  }

  /**
   * Creates a form group HTML string.
   * @param {number} index - The index of the user entry.
   * @param {string} name - The name of the form field.
   * @param {string} label - The label text.
   * @param {string} type - The input type.
   * @param {boolean} required - Whether the field is required.
   * @param {string} [description] - Optional field description.
   * @returns {string} The HTML string for the form group.
   */
  function createFormGroup(
    index,
    name,
    label,
    type,
    required,
    description = ""
  ) {
    return `
      <div class="form-group">
        <label for="user_${index}-${name}">${label}${required ? " *" : ""}</label>
        <input type="${type}" name="user_${index}-${name}" id="user_${index}-${name}" ${required ? "required" : ""}>
        ${
          description
            ? `<div class="field-description">${description}</div>`
            : ""
        }
      </div>
    `;
  }

  /**
   * Creates a country select dropdown.
   * @param {number} index - The index of the user entry.
   * @param {boolean} isHebrew - Whether the current language is Hebrew.
   * @returns {string} The HTML string for the country select dropdown.
   */
  function createCountrySelect(index, isHebrew) {
    const getText = (en, he) => (isHebrew ? he : en);
    return `
      <div class="form-group">
        <label for="user_${index}-country">${getText("Country", "מדינה")} *</label>
        <select name="user_${index}-country" id="user_${index}-country" required>
          <option value="">${getText("Please Select", "בחר בבקשה")}</option>
          <option value="United States">${getText(
            "United States",
            "ארצות הברית"
          )}</option>
          <option value="United Kingdom">${getText(
            "United Kingdom",
            "בריטניה"
          )}</option>
          <option value="Israel">${getText("Israel", "ישראל")}</option>
        </select>
      </div>
    `;
  }

  /**
   * Creates a valve control checkbox.
   * @param {number} index - The index of the user entry.
   * @param {boolean} isHebrew - Whether the current language is Hebrew.
   * @returns {string} The HTML string for the valve control checkbox.
   */
  function createValveControlCheckbox(index, isHebrew) {
    const getText = (en, he) => (isHebrew ? he : en);
    return `
      <div class="form-group">
        <label>
          <input type="checkbox" name="user_${index}-enable_valve_control" id="user_${index}-enable_valve_control">
          <span>${getText(
            "Enable Open/Close Valve Control",
            "אפשר שליטה בפתיחה/סגירה של הברזים"
          )}</span>
        </label>
        <div class="field-description">
          ${getText(
            "I agree that this user can remotely control the valves on my sites.",
            "אני מסכים שמשתמש זה יכול לשלוט מרחוק בברזים באתרים שלי"
          )}
        </div>
      </div>
    `;
  }

  /**
   * Creates an escalation level select dropdown.
   * @param {number} index - The index of the user entry.
   * @param {boolean} isHebrew - Whether the current language is Hebrew.
   * @returns {string} The HTML string for the escalation level select dropdown.
   */
  function createEscalationLevelSelect(index, isHebrew) {
    const getText = (en, he) => (isHebrew ? he : en);
    const options = [
      ["", getText("Please Select", "בחר בבקשה")],
      ["1. Main contact", getText("1. Main contact", "1. איש קשר ראשי")],
      ["2. Second contact", getText("2. Second contact", "2. איש קשר משני")],
      ["3. Third contact", getText("3. Third contact", "3. איש קשר שלישי")],
      ["4. Fourth contact", getText("4. Fourth contact", "4. איש קשר רביעי")],
      ["5. Fifth contact", getText("5. Fifth contact", "5. איש קשר חמישי")],
      ["6. Sixth contact", getText("6. Sixth contact", "6. איש קשר שישי")],
      ["Emergency", getText("Emergency", "חירום")],
      ["Email", getText("Email", 'דוא"ל בלבד')],
      ["none", getText("None", "ללא")],
    ];

    return `
      <div class="form-group">
        <label for="user_${index}-escalation_level">${getText("User Escalation Level", "רמת האסקלציה למשתמש")} *</label>
        <select name="user_${index}-escalation_level" id="user_${index}-escalation_level" required>
          ${options
            .map(([value, text]) => `<option value="${value}">${text}</option>`)
            .join("")}
        </select>
        <div class="field-description">
          ${getText(
            "Select the priority for this user to escalate in case of a significant and ongoing water event. Our WINT 24/7 support team will contact your team in the order indicated in this list.",
            "בחר את העדיפות למשתמש זה לרשימת אסקלציה במקרה של אירוע מים משמעותי ומתמשך. צוות התמיכה 24/7 של WINT ייצור קשר עם הצוות שלך לפי הסדר המצוין ברשימה זו."
          )}
        </div>
      </div>
    `;
  }

  /**
   * Creates a comments textarea.
   * @param {number} index - The index of the user entry.
   * @param {boolean} isHebrew - Whether the current language is Hebrew.
   * @returns {string} The HTML string for the comments textarea.
   */
  function createCommentsArea(index, isHebrew) {
    const getText = (en, he) => (isHebrew ? he : en);
    return `
      <div class="form-group">
        <label for="user_${index}-comments">${getText("Comments", "הערות")}</label>
        <textarea name="user_${index}-comments" id="user_${index}-comments" placeholder="${getText("We are here for you! Tell us what's on your mind :)", "אנחנו כאן בשבילך! ספר לנו מה על דעתך :)")}"></textarea>
      </div>
    `;
  }

  // Event listener for form generation
  generateFormsBtn.addEventListener("click", function () {
    const userCount = parseInt(userCountSelect.value);
    formUserCount.value = userCount;
    userEntries.innerHTML = "";
    for (let i = 0; i < userCount; i++) {
      userEntries.appendChild(createUserEntry(i));
    }
    userForm.classList.remove("hidden");
  });

  // Re-populate forms if they exist
  if (!userForm.classList.contains("hidden")) {
    const userCount = parseInt(formUserCount.value);
    userEntries.innerHTML = "";
    for (let i = 0; i < userCount; i++) {
      userEntries.appendChild(createUserEntry(i));
    }
  }
});
