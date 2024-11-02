import os
from dotenv import load_dotenv, find_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart

LINK_URL="https://managy-front-404252599785.us-west2.run.app/"
PET_IMG_PATH = "data/img/managyicon.png"
PET_IMG_ATTACH_NAME='Managy_pet.png'
FOOT = f"""\
        <p>Sincerely,<br><a href="{LINK_URL}">Managy team</a></p>
        <img src="cid:managy_image" alt="Managy Icon - Flaticon" width="70">
    """

def send_token_password(to: str, token):

    dotenv_path = find_dotenv()
    load_dotenv(dotenv_path)

    MAIL = "jtarazonaj@unal.edu.co"
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

    with (smtplib.SMTP("smtp.gmail.com", 587) as smtp):
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login(MAIL, MAIL_PASSWORD)

        # Crear el objeto MIMEMultipart para el mensaje
        msg = MIMEMultipart()
        msg["From"] = MAIL
        msg["To"] = to
        msg["Subject"] = "Managy Reset Password Token"

        # Contenido del mensaje en formato HTML
        body = f"""\
        <html>
          <body>
            <p>Greetings,</p>
            <p>Your token to reset your password is: {token}</p>
            <p>Return to forgot password site and include the token
            in your request.</p>
            {FOOT}
          </body>
        </html>
        """
        # Adjuntar el contenido del mensaje al objeto MIMEText
        msg.attach(MIMEText(body, "html", "utf-8"))

        # Adjuntar la imagen como un archivo MIME
        with open(PET_IMG_PATH, "rb") as f:
            image = MIMEImage(f.read(), name=PET_IMG_ATTACH_NAME)
            image.add_header('Content-ID', '<managy_image>')
            msg.attach(image)

        smtp.sendmail(MAIL, to, msg.as_string())
        #------------

    return 0
