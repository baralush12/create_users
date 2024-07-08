import os

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY')
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')
    RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'
