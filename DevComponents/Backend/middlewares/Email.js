// import * as React from 'react'; 
// import { Body, Button, Container, Head, Hr, Html, Preview, Section, Text } from '@react-email/components';

// export function PasswordEmail ({ userFirstname, userId, requestId }){
//   return (<Html>
//     <Head />
//     <Body style={{ backgroundColor: '#ffffff' }}>
//       {/* Preview text for email client */}
//       <Preview>Click "Yes, I'm In" to confirm your login request.</Preview>

//       <Container style={{ margin: '0 auto', padding: '20px 0 48px' }}>
//         {/* Greeting */}
//         <Text style={{ fontSize: '16px', lineHeight: '26px' }}>Hi {userFirstname},</Text>

//         {/* Message */}
//         <Text style={{ fontSize: '16px', lineHeight: '26px' }}>
//           We noticed a login attempt on your account. If this was you, click the button below to confirm.
//         </Text>

//         {/* Button to trigger backend */}
//         <Section style={{ textAlign: 'center' }}>
//           <Button
//             href={`http://localhost:5000/button-click?userId=${userId}&requestId=${requestId}`} // Replace localhost with your production URL
//             aria-label="Confirm Login"
//             style={{
//               backgroundColor: '#5F51E8',
//               borderRadius: '3px',
//               color: '#fff',
//               fontSize: '16px',
//               textDecoration: 'none',
//               textAlign: 'center',
//               display: 'block',
//               padding: '12px',
//             }}
//           >
//             Yes, I'm In
//           </Button>
//         </Section>

//         {/* Closing text */}
//         <Text style={{ fontSize: '16px', lineHeight: '26px' }}>
//           Best,
//           <br />
//           The DeveloperUi.in Team
//         </Text>

//         {/* Horizontal rule */}
//         <Hr style={{ borderColor: '#cccccc', margin: '20px 0' }} />

//         {/* Footer information */}
//         <Text style={{ color: '#8898aa', fontSize: '12px' }}>
//           470 Noor Ave STE B #1148, South San Francisco, CA 94080
//         </Text>
//       </Container>
//     </Body>
//   </Html>)
// };

// export default PasswordEmail;

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