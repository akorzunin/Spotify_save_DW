import MailSavePlHtml  from './emails/mail-save-pl';
import MailNotifyHtml  from './emails/mail-notify';


await Bun.write('../templates/mail_save_pl.html', MailSavePlHtml);
await Bun.write('../templates/mail_notify.html', MailNotifyHtml);
