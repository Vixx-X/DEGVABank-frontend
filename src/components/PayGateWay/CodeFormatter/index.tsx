import SyntaxHighlighter from "react-syntax-highlighter";

// import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
// import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
// import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin";
// import python from "react-syntax-highlighter/dist/esm/languages/prism/python";

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
    <div className="w-full flex justify-center my-4 h-full">
      <SyntaxHighlighter
        language={language}
        style={style}
        className="rounded p-16 w-[90%] h-full overflow-auto !flex !items-center"
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeFormatter;
