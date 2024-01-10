import * as React from 'react';
import {
  Body,
  Container,
  Heading,
  Html,
  Link,
  Tailwind,
  Text,
} from '@react-email/components';

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
          );`,
          }}
        >
          {children}
          <Heading className="flex flex-row items-center justify-center gap-x-2 text-2xl">
            <Text className="text-2xl">(☞ﾟヮﾟ)☞</Text>
            <Link href="{{ host }}">spotifysavedw</Link>
          </Heading>
          <Heading className="flex flex-row items-center gap-x-2 text-base">
            <Link href="https://open.spotify.com/playlist/{{dw_link}}">
              Link to your DW playlist
            </Link>
            <Text className="text-xl"> ☜(ﾟヮﾟ☜)</Text>
          </Heading>
          <Text>With best regards spotifysavedw service</Text>
          <Link href="{{ unsubscribe }}">Unsubscribe</Link>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default Email;
