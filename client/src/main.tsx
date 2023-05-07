import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import ApoloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const client = new ApoloClient({
  uri: `http://localhost:8000/graphql`,
});
import { routes } from "./routes/routes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        {
          routes.map(({path, element}) => <Route path={path} key={path} element={element} />)
        }
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
