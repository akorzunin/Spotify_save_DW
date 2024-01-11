import React from 'react';
import { Heading, render } from '@react-email/components';
import Email from './components/Email';
import MailFooter from './components/MailFooter';

const MailNotify = () => {
  return (
    <Email>
      <Heading className="text-lg">
        Don't forget to save your Discover Weekly playlist at
      </Heading>
      <MailFooter />
    </Email>
  );
};
const MailNotifyHtml = render(<MailNotify />, {
  pretty: true,
});

export default MailNotify;
