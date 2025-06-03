import * as React from 'react';
import { Html, Button, Hr, Text } from "@react-email/components";
import { render } from '@react-email/render';

export function MyTemplate(props) {
  return (
    <Html lang="en">
      <Text>Some title</Text>
      <Hr />
      <Button href="https://example.com">Click me</Button>
    </Html>
  );
}

const text = await render(<MyTemplate />)
console.log(text)
export default MyTemplate;