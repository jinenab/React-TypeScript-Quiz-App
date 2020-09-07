import React from "react";

//Functon Components
// type AppProps=({message?:string})
// export const Message = ({ message }: AppProps) => <div>{message}</div>;

//React.FunctionComponent
const App: React.FunctionComponent<{
  message: string;
}> = ({ message }) => <div>{message}</div>;
//export default App;

// const Title: React.FunctionComponent<{ title: string }> = ({
//   children,
//   title,
// }) => <div title={title}>{children}</div>;
// export default Title
