from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, Regexp

class UserForm(FlaskForm):
    class Meta:
        csrf = False

    firstname = StringField('First Name', validators=[DataRequired()])
    lastname = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Business Email', validators=[DataRequired(), Email()])
    mobilephone = StringField('Mobile Phone Number', validators=[DataRequired(), Regexp(r'^\d{10,15}$', message="Mobile phone number must contain only digits and be between 10 and 15 digits long")])
    phone = StringField('Office Number')
    company = StringField('Company Name', validators=[DataRequired()])
    jobtitle = StringField('Job Title', validators=[DataRequired()])
    country = SelectField('Country', validators=[DataRequired()], choices=[
        ('', 'Please Select'),
        ('United States', 'United States'),
        ('United Kingdom', 'United Kingdom'),
        ('Israel', 'Israel'),
    ])
    enable_valve_control = BooleanField('Enable Open/Close Valve Control')
    escalation_level = SelectField('User Escalation Level', validators=[DataRequired()], choices=[
        ('', 'Please Select'),
        ('1. Main contact', '1. Main contact'),
        ('2. Second contact', '2. Second contact'),
        ('3. Third contact', '3. Third contact'),
        ('4. Fourth contact', '4. Fourth contact'),
        ('5. Fifth contact', '5. Fifth contact'),
        ('6. Sixth contact', '6. Sixth contact'),
        ('Emergency', 'Emergency'),
        ('Email', 'Email'),
        ('none', 'None')
    ])
    comments = TextAreaField('Comments')
