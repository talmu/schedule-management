import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./redux/store";
import Template from "./components/Template";
import Router from "./Router";
// import { ConnectedRouter } from "connected-react-router";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
        <Template>
          <Router history={history} />
        </Template>
        {/* </ConnectedRouter> */}
      </Provider>
    </BrowserRouter>
  );
}

export default App;
