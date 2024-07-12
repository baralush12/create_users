from datetime import datetime
from flask import render_template, request, flash, redirect, session, url_for
from app import app, limiter
from email_utils import send_email
from forms import UserForm

@app.route('/en')
def index():
    return render_template('index_en.html', user_count=1, forms=None)

@app.route('/he')
def index_he():
    return render_template('index_he.html', user_count=1, forms=None)

@app.route('/submit', methods=['POST'])
@limiter.limit("10 per minute")
def submit():
    user_count = int(request.form.get('userCount', 1))
    forms = [UserForm(request.form, prefix=f"user_{i}") for i in range(user_count)]

    all_valid = all(form.validate() for form in forms)

    if all_valid:
        data = [{
            'firstname': form.firstname.data,
            'lastname': form.lastname.data,
            'email': form.email.data,
            'mobilephone': form.mobilephone.data,
            'phone': form.phone.data,
            'company': form.company.data,
            'jobtitle': form.jobtitle.data,
            'country': form.country.data,
            'enable_valve_control': form.enable_valve_control.data,
            'escalation_level': form.escalation_level.data,
            'comments': form.comments.data,
        } for form in forms]

        success, error = send_email(data)
        if success:
            session['submitted_data'] = data
            session['submission_time'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            return redirect(url_for('thank_you'))
        else:
            flash(f'An error occurred while processing your submission. Please try again later. Error: {error}', 'error')
    else:
        flash('Please correct the errors in the form and resubmit.', 'error')

    # Determine which template to render based on the referer
    if request.referrer and '/he' in request.referrer:
        return render_template('index_he.html', forms=forms, user_count=user_count)
    else:
        return render_template('index.html', forms=forms, user_count=user_count)

@app.route('/thank-you')
def thank_you():
    submitted_data = session.get('submitted_data', [])
    submission_time = session.get('submission_time', '')
    language = 'he' if '/he' in request.referrer else 'en'
    return render_template('thank_you.html', data=submitted_data, submission_time=submission_time, language=language)