import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';

type emailTemplateName = 'requestResetPassword' | 'passwordChanged';

export async function sendEmail(
  email: string,
  subject: string,
  payload: object,
  templateName: emailTemplateName,
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const source = fs.existsSync(
    path.resolve(
      __dirname,
      '..',
      'app',
      'views',
      'emails',
      `${templateName}.hbs`,
    ),
  )
    ? fs.readFileSync(
        path.resolve(
          __dirname,
          '..',
          'app',
          'views',
          'emails',
          `${templateName}.hbs`,
        ),
        'utf-8',
      )
    : fs.readFileSync(
        path.resolve(
          __dirname,
          '..',
          '..',
          'src',
          'app',
          'views',
          'emails',
          `${templateName}.hbs`,
        ),
        'utf-8',
      );
  const logoAttachment = fs.existsSync(
    path.resolve(__dirname, '..', 'app', 'views', 'assets', 'logo.png'),
  )
    ? {
        filename: 'logo.png',
        path: path.resolve(
          __dirname,
          '..',
          'app',
          'views',
          'assets',
          'logo.png',
        ),
        cid: 'logo',
      }
    : {
        filename: 'logo.png',
        path: path.resolve(
          __dirname,
          '..',
          '..',
          'src',
          'app',
          'views',
          'assets',
          'logo.png',
        ),
        cid: 'logo',
      };
  const template = Handlebars.compile(source);
  const options = () => ({
    from: '"Truckz" <suporte@truckz.com.br>',
    to: email,
    subject,
    attachments: [logoAttachment],
    html: template(payload),
  });

  transporter.sendMail(options(), (error) => {
    if (error) {
      return error;
    }
  });
}
