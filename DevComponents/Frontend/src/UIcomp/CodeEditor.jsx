import React from 'react'
import { useEffect , useRef } from 'react';
import ReactDOMServer from 'react-dom/server';


const CodePreview = ({ htmlCode, cssCode, jsCode, reactCode }) => {
  const iframeRef = useRef(null);
  
  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const reactString = reactCode || <div></div>;
    
    const completeCode = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
         <style>
          html, body {
            width :full; 
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
          }
          ${cssCode}
      </style>
        </head>
        <body>
          <div id="root"></div>
          ${htmlCode}
          <script type="text/babel">
            function App() {
              return ${reactString};
            }
            ReactDOM.render(<App />, document.getElementById('root'));
          </script>
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    
    doc.open();
    doc.write(completeCode);
    doc.close();
  }, [htmlCode , cssCode , jsCode , reactCode]);

  return (
    <div className="bg-gray-100">
      <iframe ref={iframeRef} title="Output" className="mx-auto h-[300px] w-full"></iframe>
    </div>
  );
};

const CodeEditor = ({ htmlCode , cssCode , jsCode , reactCode} ) => {
  
  return (
    <div className="p-2">
      {/* <h2 className="text-2xl font-bold text-center">Live Code Editor</h2> */}
      <CodePreview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} reactCode={reactCode} />
    </div>
  ); 
}; 

export default CodeEditor