import os
from typing import Any

from dotenv import load_dotenv
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_mail import Mail

# Load environment variables
load_dotenv()

# Initialize Flask application
app: Flask = Flask(__name__)
app.config.from_object('config.Config')

# Initialize Flask-Mail
mail: Mail = Mail(app)

# Initialize Limiter without passing the app
limiter: Limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Initialize the limiter with the app
limiter.init_app(app)

# Import routes after app initialization to avoid circular imports
from routes import *

if __name__ == '__main__':
    # Run the Flask application
    app.run(debug=app.config['DEBUG'])