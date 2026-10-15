import { codeToHtml } from "shiki";

interface CodeProps {
  children: string;
  language?: string;
}

export default async function Code({ children, language = "typescript" }: CodeProps) {
  // Generates highlighted HTML directly on the server
  const html = await codeToHtml(children.trim(), {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div 
      className="mt-2 overflow-x-auto text-sm rounded-2xl bg-[#24292e] p-4 border border-stone-800"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// "use client";

// import { useEffect, useRef } from "react";
// import Prism from "prismjs";
// import "prismjs/themes/prism-okaidia.css";
// import "prismjs/components/prism-typescript";

// interface CodeProps {
//   children: string;
//   language?: string;
// }

// export default function Code({ children, language = "typescript" }: CodeProps) {
//   const codeRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     // Prism.highlightAll();

//     if (codeRef.current) {
//       Prism.highlightElement(codeRef.current);
//     }
//   }, [children]);

//   return (
//     <pre className="bg-stone-900 p-4 rounded-2xl mt-2 overflow-x-auto text-sm">
//       <code ref={codeRef} className={`language-${language}`}>
//         {children}
//       </code>
//     </pre>
//   );
// }