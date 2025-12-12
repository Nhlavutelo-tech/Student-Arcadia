from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

@app.route('/api/health')
def health():
    return jsonify({'ok': True, 'message': 'python backend OK'})

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json() or request.form.to_dict()
    required = ['name','email','phone','message','userType']
    for f in required:
        if not data.get(f):
            return jsonify({'ok':False,'error':f+' is required'}), 400

    SMTP_HOST = os.getenv('SMTP_HOST')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USER = os.getenv('SMTP_USER')
    SMTP_PASS = os.getenv('SMTP_PASS')
    TO_EMAIL = os.getenv('TO_EMAIL') or SMTP_USER

    if not SMTP_HOST or not SMTP_USER or not SMTP_PASS:
        return jsonify({'ok':False,'error':'SMTP not configured'}), 500

    msg = EmailMessage()
    subject_prefix = os.getenv('EMAIL_SUBJECT_PREFIX','[Student Arcadia]')
    msg['Subject'] = f"{subject_prefix} {data.get('subject','Contact form message')}"
    msg['From'] = os.getenv('FROM_EMAIL') or SMTP_USER
    msg['To'] = TO_EMAIL

    body = f"Type: {data.get('userType')}\nName: {data.get('name')}\nEmail: {data.get('email')}\nPhone: {data.get('phone')}\nSubject: {data.get('subject')}\n\nMessage:\n{data.get('message')}"
    msg.set_content(body)

    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
        server.quit()
        return jsonify({'ok':True})
    except Exception as e:
        return jsonify({'ok':False,'error':str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', '5000')))
