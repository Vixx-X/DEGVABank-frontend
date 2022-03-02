import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import CodeFormatter from "@components/PayGateWay/CodeFormatter";
import type { NextPage } from "next";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Documentation: NextPage = () => {
  return (
    <MainLayout>
      <CodeFormatter language="javascript" style={a11yDark}>
        {"(num) => num + 1"}
      </CodeFormatter>
    </MainLayout>
  );
};

export default Documentation;