import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

// import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
// import kotlin from "react-syntax-highlighter/dist/esm/languages/hljs/kotlin";
// import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";

// SyntaxHighlighter.registerLanguage("javascript", js);
// SyntaxHighlighter.registerLanguage("kotlin", kotlin);
// SyntaxHighlighter.registerLanguage("python", python);

interface CodeFormatterProps {
  language: string;
  style?: any;
  children: JSX.Element[] | JSX.Element | string;
}

const CodeFormatter = ({ language, style, children }: CodeFormatterProps) => {
  return (
    <SyntaxHighlighter language={language} style={style} showLineNumbers>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeFormatter;
