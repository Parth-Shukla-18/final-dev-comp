// import { render } from '@react-email/render';
// import { Preview } from '@react-email/preview'; // Import from @react-email/preview
// import PasswordEmail from './middleware/Email.js'; // Your React email component

// const emailData = {
//   userFirstname: 'John',
//   userId: '12345',
//   requestId: 'abcde',
// };

// const emailHtml = render(<PasswordEmail {...emailData} />);
// console.log(emailHtml);


// // Preview the email in the browser
// Preview.render(<PasswordEmail {...emailData} />);

// console.log("Preview is running. Visit: http://localhost:3000");

import { MyTemplate } from './middlewares/Email.js';
import { render } from '@react-email/render';
import * as React from 'react';

const html = await render(<MyTemplate />);

console.log(html);