import React , { useState } from "react";
import { LoginSignupForm , EmailPassword , OtpVerification ,ChangePassword } from "./UserForm";
import {  ReactCode ,NonReactCode , PostForm } from "./PostForm";
import { ActionProvider } from './Context'

    const allForms = [
      LoginSignupForm,
      EmailPassword,
      // OtpVerification,
      PostForm,
      // CodingLanguage,
      ReactCode,
      NonReactCode,
      
    ];
  
  
    const FormSwitcher = ({ind = 0}) => {
      const [currentFormIndex, setCurrentFormIndex] = useState(ind);
    
      const navigate = (index) => {
        if(index < allForms.length){
          setCurrentFormIndex(index);
        }
      };
    
      const SelectedForm = allForms[currentFormIndex];
      if (!SelectedForm) return <div>Form not found</div>;
    
      return (
        <ActionProvider>
          <div>
            <SelectedForm navigate={navigate} />
          </div>
        </ActionProvider>
      );
    };
    
    export default FormSwitcher;