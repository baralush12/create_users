from flask import Flask
from flask_mail import Mail
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config.from_object('config.Config')

mail = Mail(app)

# Initialize Limiter without passing the app
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Initialize the limiter with the app
limiter.init_app(app)

from routes import *

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
