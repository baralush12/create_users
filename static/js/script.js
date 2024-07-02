document.addEventListener("DOMContentLoaded", function () {
  const userCountSelect = document.getElementById("userCount");
  const generateFormsBtn = document.getElementById("generateForms");
  const userForm = document.getElementById("userForm");
  const userEntries = document.getElementById("userEntries");

  function createUserEntry(index) {
    const userEntry = document.createElement("div");
    userEntry.className = "user-entry";
    userEntry.innerHTML = `
          <h2>User ${index + 1}</h2>
          <div class="form-group">
              <label for="firstname_${index}">First name *</label>
              <input type="text" name="firstname_${index}" required>
          </div>
          <div class="form-group">
              <label for="lastname_${index}">Last name *</label>
              <input type="text" name="lastname_${index}" required>
          </div>
          <div class="form-group">
              <label for="email_${index}">Business Email *</label>
              <input type="email" name="email_${index}" required>
              <div class="field-description">Must have the same domain as your company</div>
          </div>
          <div class="form-group">
              <label for="mobilephone_${index}">Mobile phone number *</label>
              <input type="tel" name="mobilephone_${index}" required>
          </div>
          <div class="form-group">
              <label for="phone_${index}">Office number</label>
              <input type="tel" name="phone_${index}">
          </div>
          <div class="form-group">
              <label for="company_${index}">Company name *</label>
              <input type="text" name="company_${index}" required>
          </div>
          <div class="form-group">
              <label for="jobtitle_${index}">Job function *</label>
              <input type="text" name="jobtitle_${index}" required>
          </div>
          <div class="form-group">
              <label for="country_${index}">Country *</label>
              <select name="country_${index}" required>
                  <option value="">Please Select</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Israel">Israel</option>
                  <!-- Add more countries as needed -->
              </select>
          </div>
          <div class="form-group">
              <label>
                  <input type="checkbox" name="special_attention__c_${index}">
                  <span>Enable Open/Close Valve Control</span>
              </label>
              <div class="field-description">I agree that this user can remote control the valves on my sites</div>
          </div>
          <div class="form-group">
              <label for="alert_order__c_${index}">User Escalation Level *</label>
              <select name="alert_order__c_${index}" required>
                  <option value="">Please Select</option>
                  <option value="1. Main contact">1. Main contact</option>
                  <option value="2. Second contact">2. Second contact</option>
                  <option value="3. Third contact">3. Third contact</option>
                  <option value="4. Fourth contact">4. Fourth contact</option>
                  <option value="5. Fifth contact">5. Fifth contact</option>
                  <option value="6. sixth contact">6. sixth contact</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Email">Email</option>
                  <option value="none">none</option>
              </select>
              <div class="field-description">WINT 24/7 support team contacts your team according to the order of the escalation level on this list. Select the priority for this user when a significant water event escalation is required:</div>
          </div>
          <div class="form-group">
              <label for="message_${index}">Comments</label>
              <textarea name="message_${index}" placeholder="We are here for you! Tell us what's on your mind :)"></textarea>
          </div>
      `;
    return userEntry;
  }

  generateFormsBtn.addEventListener("click", function () {
    const userCount = parseInt(userCountSelect.value);
    userEntries.innerHTML = "";
    for (let i = 0; i < userCount; i++) {
      userEntries.appendChild(createUserEntry(i));
    }
    userForm.style.display = "block";
  });
});
