import os
from typing import Final

class Config:
    SECRET_KEY: Final[str] = os.getenv('FLASK_SECRET_KEY')
    MAIL_SERVER: Final[str] = 'smtp.gmail.com'
    MAIL_PORT: Final[int] = 587
    MAIL_USE_TLS: Final[bool] = True
    MAIL_USERNAME: Final[str] = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD: Final[str] = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER: Final[str] = os.getenv('MAIL_DEFAULT_SENDER')
    RECIPIENT_EMAIL: Final[str] = os.getenv('RECIPIENT_EMAIL')
    DEBUG: Final[bool] = os.getenv('FLASK_DEBUG', 'False') == 'True'
