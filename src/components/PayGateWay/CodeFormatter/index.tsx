import SyntaxHighlighter from "react-syntax-highlighter";

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
        className="rounded p-16 w-[90%] h-full overflow-auto"
        showLineNumbers={true}
        showInlineLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeFormatter;
