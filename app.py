from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
import pandas as pd
from io import StringIO
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
app.config['RECIPIENT_EMAIL'] = os.getenv('RECIPIENT_EMAIL')  # Add this line

app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = []
    for key, value in request.form.items():
        if key.startswith('firstname_'):
            index = key.split('_')[1]
            user_data = {
                'firstname': value,
                'lastname': request.form.get(f'lastname_{index}'),
                'email': request.form.get(f'email_{index}'),
                'mobilephone': request.form.get(f'mobilephone_{index}'),
                'phone': request.form.get(f'phone_{index}'),
                'company': request.form.get(f'company_{index}'),
                'jobtitle': request.form.get(f'jobtitle_{index}'),
                'country': request.form.get(f'country_{index}'),
                'enable_valve_control': request.form.get(f'special_attention__c_{index}') == 'on',
                'escalation_level': request.form.get(f'alert_order__c_{index}'),
                'comments': request.form.get(f'message_{index}'),
            }
            data.append(user_data)

    df = pd.DataFrame(data)
    df['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    output = StringIO()
    df.to_csv(output, index=False)
    output.seek(0)

    # Create the email
    recipient_email = app.config['RECIPIENT_EMAIL']
    msg = Message('WINT User Onboarding Data', recipients=[recipient_email])
    msg.body = "Please find attached the CSV file with the user onboarding data."
    
    # Attach the CSV file
    msg.attach(f"wint_users_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv", 
               "text/csv", 
               output.getvalue())

    try:
        # Send the email
        mail.send(msg)
        app.logger.info(f"Email sent successfully to {recipient_email}")
        flash('Thank you for submitting the user information. Our team will process it shortly.', 'success')
    except Exception as e:
        app.logger.error(f"Failed to send email: {str(e)}")
        flash(f'An error occurred while processing your submission. Please try again later.', 'error')


    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=1)