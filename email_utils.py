from flask_mail import Message
from app import mail, app
import pandas as pd
from io import StringIO
from datetime import datetime
import csv

def send_email(data):
    df = pd.DataFrame(data)
    df['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    output = StringIO()
    df.to_csv(output, index=False, quoting=csv.QUOTE_NONNUMERIC, encoding='utf-8-sig')
    output.seek(0)

    recipient_email = app.config['RECIPIENT_EMAIL']
    msg = Message('WINT User Onboarding Data', recipients=[recipient_email])
    msg.body = "Please find attached the CSV file with the user onboarding data."
    
    msg.attach(f"wint_users_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv", 
               "text/csv", 
               output.getvalue().encode('utf-8-sig'))

    try:
        mail.send(msg)
        app.logger.info(f"Email sent successfully to {recipient_email}")
        return True, None
    except Exception as e:
        app.logger.error(f"Failed to send email: {str(e)}")
        return False, str(e)
