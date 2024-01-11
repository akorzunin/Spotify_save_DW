import React from 'react';
import { Heading, render } from '@react-email/components';
import Email from '../components/Email';
import MailFooter from '../components/MailFooter';

const MailSavePl = () => {
  return (
    <Email>
      <Heading className="text-lg">Discover Weekly playlist Saved</Heading>
      <MailFooter />
    </Email>
  );
};

const MailSavePlHtml = render(<MailSavePl />, {
    pretty: true,
});

export default MailSavePlHtml;
