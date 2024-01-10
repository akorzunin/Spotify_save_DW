import * as React from 'react';
import { Heading } from '@react-email/components';
import Email from './Email';

const MailSavePl = () => {
  return (
    <Email>
      <Heading className="text-lg">Discover Weekly playlist Saved</Heading>
    </Email>
  );
};

export default MailSavePl;
