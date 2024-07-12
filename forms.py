from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, Regexp

class UserForm(FlaskForm):
    class Meta:
        csrf = False

    firstname = StringField('First Name / שם פרטי', validators=[DataRequired()])
    lastname = StringField('Last Name / שם משפחה', validators=[DataRequired()])
    email = StringField('Business Email / דוא״ל עסקי', validators=[DataRequired(), Email()])
    mobilephone = StringField('Mobile Phone Number / מספר טלפון נייד', validators=[DataRequired(), Regexp(r'^\d{10,15}$', message="Mobile phone number must contain only digits and be between 10 and 15 digits long")])
    phone = StringField('Office Number / מספר טלפון במשרד')
    company = StringField('Company Name / שם החברה', validators=[DataRequired()])
    jobtitle = StringField('Job Title / תפקיד', validators=[DataRequired()])
    country = SelectField('Country / מדינה', validators=[DataRequired()], choices=[
        ('', 'Please Select / בחר בבקשה'),
        ('United States', 'United States / ארצות הברית'),
        ('United Kingdom', 'United Kingdom / בריטניה'),
        ('Israel', 'Israel / ישראל'),
    ])
    enable_valve_control = BooleanField('Enable Open/Close Valve Control / אפשר שליטה בפתיחה/סגירה של הברזים')
    escalation_level = SelectField('User Escalation Level / רמת הסלמה למשתמש', validators=[DataRequired()], choices=[
        ('', 'Please Select / בחר בבקשה'),
        ('1. Main contact', '1. Main contact / איש קשר ראשי'),
        ('2. Second contact', '2. Second contact / איש קשר משני'),
        ('3. Third contact', '3. Third contact / איש קשר שלישי'),
        ('4. Fourth contact', '4. Fourth contact / איש קשר רביעי'),
        ('5. Fifth contact', '5. Fifth contact / איש קשר חמישי'),
        ('6. Sixth contact', '6. Sixth contact / איש קשר שישי'),
        ('Emergency', 'Emergency / חירום'),
        ('Email', 'Email / דוא"ל בלבד'),
        ('none', 'None / ללא')
    ])
    comments = TextAreaField('Comments / הערות')