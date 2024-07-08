document.addEventListener("DOMContentLoaded", function () {
  const userCountSelect = document.getElementById("userCount");
  const generateFormsBtn = document.getElementById("generateForms");
  const userForm = document.getElementById("userForm");
  const userEntries = document.getElementById("userEntries");
  const formUserCount = document.getElementById("formUserCount");

  function createUserEntry(index) {
    const userEntry = document.createElement("div");
    userEntry.className = "user-entry";
    userEntry.innerHTML = `
        <h2>User ${index + 1}</h2>
        <div class="form-group">
          <label for="user_${index}-firstname">First Name *</label>
          <input type="text" name="user_${index}-firstname" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-lastname">Last Name *</label>
          <input type="text" name="user_${index}-lastname" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-email">Business Email *</label>
          <input type="email" name="user_${index}-email" required>
          <div class="field-description">Must have the same domain as your company.</div>
        </div>
        <div class="form-group">
          <label for="user_${index}-mobilephone">Mobile Phone Number *</label>
          <input type="tel" name="user_${index}-mobilephone" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-phone">Office Number</label>
          <input type="tel" name="user_${index}-phone">
        </div>
        <div class="form-group">
          <label for="user_${index}-company">Company Name *</label>
          <input type="text" name="user_${index}-company" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-jobtitle">Job Title *</label>
          <input type="text" name="user_${index}-jobtitle" required>
        </div>
        <div class="form-group">
          <label for="user_${index}-country">Country *</label>
          <select name="user_${index}-country" required>
            <option value="">Please Select</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Israel">Israel</option>
            <!-- Add more countries as needed -->
          </select>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" name="user_${index}-enable_valve_control">
            <span>Enable Open/Close Valve Control</span>
          </label>
          <div class="field-description">I agree that this user can remotely control the valves on my sites.</div>
        </div>
        <div class="form-group">
          <label for="user_${index}-escalation_level">User Escalation Level *</label>
          <select name="user_${index}-escalation_level" required>
            <option value="">Please Select</option>
            <option value="1. Main contact">1. Main contact</option>
            <option value="2. Second contact">2. Second contact</option>
            <option value="3. Third contact">3. Third contact</option>
            <option value="4. Fourth contact">4. Fourth contact</option>
            <option value="5. Fifth contact">5. Fifth contact</option>
            <option value="6. Sixth contact">6. Sixth contact</option>
            <option value="Emergency">Emergency</option>
            <option value="Email">Email</option>
            <option value="none">None</option>
          </select>
          <div class="field-description">
            <small>Select the priority for this user to escalate in case of a significant and ongoing water event. <br>Our WINT 24/7 support team will contact your team in the order indicated in this list.</small>
          </div>
        </div>
        <div class="form-group">
          <label for="user_${index}-comments">Comments</label>
          <textarea name="user_${index}-comments" placeholder="We are here for you! Tell us what's on your mind :)"></textarea>
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
