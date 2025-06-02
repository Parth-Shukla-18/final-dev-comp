import { Resend } from 'resend';
import React from 'react';
import PasswordEmail from './Email.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordUpdatedMail = async (toEmail, userName) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'DeveloperUi.in', // our email
      to: toEmail, // targety email
      subject: 'Your DeveloperUi.in Password Was Updated',
      react: <PasswordEmail userName={userName} />,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Mail Send Error:', err);
    return { success: false, error: err };
  }
};
