import { Heading, Link, Text } from '@react-email/components';
import React from 'react';

const MailFooter = () => {
  return (
    <>
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
    </>
  );
};

export default MailFooter;
