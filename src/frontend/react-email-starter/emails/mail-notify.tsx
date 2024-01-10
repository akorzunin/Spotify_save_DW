import * as React from 'react';
import { Heading } from '@react-email/components';
import Email from './Email';

const MailNotify = () => {
  return (
    <Email>
      <Heading className="text-lg">
        Don't forget to save your Discover Weekly playlist at
      </Heading>
    </Email>
  );
};

export default MailNotify;
