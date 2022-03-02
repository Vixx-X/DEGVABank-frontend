import SyntaxHighlighter from "react-syntax-highlighter";

interface CodeFormatterProps {
  language: string;
  style?: any;
  children: JSX.Element[] | JSX.Element | string;
}

const CodeFormatter = ({ language, style, children }: CodeFormatterProps) => {
  return (
    <SyntaxHighlighter language={language} style={style}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeFormatter;
