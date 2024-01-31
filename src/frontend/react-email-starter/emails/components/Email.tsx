import * as React from 'react';
import { Body, Container, Html, Tailwind } from '@react-email/components';

interface IEmail {
  children: React.ReactNode;
}

const Email = ({ children }: IEmail) => (
  <Tailwind>
    <Html>
      <Body>
        <Container
          style={{
            maxWidth: '600px',
            padding: '32px',
            backgroundImage: `linear-gradient(
          45deg,
          #fa8bff 0%,
          #2bd2ff 52%,
          #2bff88 90%
          )`,
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default Email;
