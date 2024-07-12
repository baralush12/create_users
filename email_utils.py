from datetime import datetime
from io import StringIO
from typing import List, Dict, Any, Tuple

import csv
import pandas as pd
from flask_mail import Message

from app import mail, app


def send_email(data: List[Dict[str, Any]]) -> Tuple[bool, str]:
    """
    Send an email with user onboarding data as a CSV attachment.

    Args:
        data (List[Dict[str, Any]]): List of dictionaries containing user data.

    Returns:
        Tuple[bool, str]: A tuple containing a boolean indicating success or failure,
                          and an error message (if any).
    """
    # Create a DataFrame from the input data
    df = pd.DataFrame(data)
    df['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Convert DataFrame to CSV
    output = StringIO()
    df.to_csv(output, index=False, quoting=csv.QUOTE_NONNUMERIC, encoding='utf-8-sig')
    output.seek(0)

    # Prepare email
    recipient_email = app.config['RECIPIENT_EMAIL']
    msg = Message('WINT User Onboarding Data', recipients=[recipient_email])
    msg.body = "Please find attached the CSV file with the user onboarding data."
    
    # Attach CSV file to email
    current_time = datetime.now().strftime('%Y%m%d_%H%M%S')
    msg.attach(f"wint_users_{current_time}.csv", 
               "text/csv", 
               output.getvalue().encode('utf-8-sig'))

    try:
        # Send email
        mail.send(msg)
        app.logger.info(f"Email sent successfully to {recipient_email}")
        return True, ""
    except Exception as e:
        error_message = str(e)
        app.logger.error(f"Failed to send email: {error_message}")
        return False, error_message