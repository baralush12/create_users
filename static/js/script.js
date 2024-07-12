document.addEventListener("DOMContentLoaded", function () {
  const userCountSelect = document.getElementById("userCount");
  const generateFormsBtn = document.getElementById("generateForms");
  const userForm = document.getElementById("userForm");
  const userEntries = document.getElementById("userEntries");
  const formUserCount = document.getElementById("formUserCount");

  function createUserEntry(index) {
    const userEntry = document.createElement("div");
    userEntry.className = "user-entry";
    const isHebrew = document.documentElement.lang === "he";
    userEntry.innerHTML = `
        <h2>${isHebrew ? "משתמש" : "User"} ${index + 1}</h2>
        <div class="form-group">
          <label for="user_${index}-firstname">${
      isHebrew ? "שם פרטי" : "First Name"
    } *</label>
          <input type="text" name="user_${index}-firstname" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-lastname">${
      isHebrew ? "שם משפחה" : "Last Name"
    } *</label>
          <input type="text" name="user_${index}-lastname" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-email">${
      isHebrew ? "דוא״ל עסקי" : "Business Email"
    } *</label>
          <input type="email" name="user_${index}-email" required>
          <div class="field-description">${
            isHebrew
              ? "חייב להיות זהה ולפי הדומיין של החברה שלך"
              : "Must have the same domain as your company."
          }</div>
        </div>
        <div class="form-group">
          <label for="user_${index}-mobilephone">${
      isHebrew ? "מספר טלפון נייד" : "Mobile Phone Number"
    } *</label>
          <input type="tel" name="user_${index}-mobilephone" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-phone">${
      isHebrew ? "מספר טלפון במשרד" : "Office Number"
    }</label>
          <input type="tel" name="user_${index}-phone">
        </div>
        <div class="form-group">
          <label for="user_${index}-company">${
      isHebrew ? "שם החברה" : "Company Name"
    } *</label>
          <input type="text" name="user_${index}-company" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-jobtitle">${
      isHebrew ? "תפקיד" : "Job Title"
    } *</label>
          <input type="text" name="user_${index}-jobtitle" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-country">${
      isHebrew ? "מדינה" : "Country"
    } *</label>
          <select name="user_${index}-country" required>
            <option value="">${
              isHebrew ? "בחר בבקשה" : "Please Select"
            }</option>
            <option value="United States">${
              isHebrew ? "ארצות הברית" : "United States"
            }</option>
            <option value="United Kingdom">${
              isHebrew ? "בריטניה" : "United Kingdom"
            }</option>
            <option value="Israel">${isHebrew ? "ישראל" : "Israel"}</option>
          </select>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" name="user_${index}-enable_valve_control">
            <span>${
              isHebrew
                ? "אפשר שליטה בפתיחה/סגירה של הברזים"
                : "Enable Open/Close Valve Control"
            }</span>
          </label>
          <div class="field-description">${
            isHebrew
              ? "אני מסכים שמשתמש זה יכול לשלוט מרחוק בברזים באתרים שלי"
              : "I agree that this user can remotely control the valves on my sites."
          }</div>
        </div>
        <div class="form-group">
          <label for="user_${index}-escalation_level">${
      isHebrew ? "רמת האסקלציה למשתמש" : "User Escalation Level"
    } *</label>
          <select name="user_${index}-escalation_level" required>
            <option value="">${
              isHebrew ? "בחר בבקשה" : "Please Select"
            }</option>
            <option value="1. Main contact">${
              isHebrew ? "1. איש קשר ראשי" : "1. Main contact"
            }</option>
            <option value="2. Second contact">${
              isHebrew ? "2. איש קשר משני" : "2. Second contact"
            }</option>
            <option value="3. Third contact">${
              isHebrew ? "3. איש קשר שלישי" : "3. Third contact"
            }</option>
            <option value="4. Fourth contact">${
              isHebrew ? "4. איש קשר רביעי" : "4. Fourth contact"
            }</option>
            <option value="5. Fifth contact">${
              isHebrew ? "5. איש קשר חמישי" : "5. Fifth contact"
            }</option>
            <option value="6. Sixth contact">${
              isHebrew ? "6. איש קשר שישי" : "6. Sixth contact"
            }</option>
            <option value="Emergency">${
              isHebrew ? "חירום" : "Emergency"
            }</option>
            <option value="Email">${isHebrew ? 'דוא"ל בלבד' : "Email"}</option>
            <option value="none">${isHebrew ? "ללא" : "None"}</option>
          </select>
          <div class="field-description">
            ${
              isHebrew
                ? "בחר את העדיפות למשתמש זה לרשימת אסקלציה במקרה של אירוע מים משמעותי ומתמשך. צוות התמיכה 24/7 של WINT ייצור קשר עם הצוות שלך לפי הסדר המצוין ברשימה זו."
                : "Select the priority for this user to escalate in case of a significant and ongoing water event. Our WINT 24/7 support team will contact your team in the order indicated in this list."
            }
          </div>
        </div>
        <div class="form-group">
          <label for="user_${index}-comments">${
      isHebrew ? "הערות" : "Comments"
    }</label>
          <textarea name="user_${index}-comments" placeholder="${
      isHebrew
        ? "אנחנו כאן בשבילך! ספר לנו מה על דעתך :)"
        : "We are here for you! Tell us what's on your mind :)"
    }"></textarea>
        </div>
      `;
    return userEntry;
  }

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
  if (userForm.classList.contains("hidden") === false) {
    const userCount = parseInt(formUserCount.value);
    userEntries.innerHTML = "";
    for (let i = 0; i < userCount; i++) {
      userEntries.appendChild(createUserEntry(i));
    }
    userForm.classList.remove("hidden");
  }
});
