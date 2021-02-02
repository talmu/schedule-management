import "./App.css";
import React, { useState, useEffect } from "react";
import { initializeDB, RemoteDbReplication } from "./data/Database";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { Provider as RxDBProvider } from "rxdb-hooks";
import { store, history } from "./redux/store";
import Template from "./components/Template";
import Router from "./Router";
import Loading from "./components/Loading";

const App = () => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      const _db = await initializeDB();
      const cancellations = RemoteDbReplication(_db);
      setDb(_db);

      return cancellations;
    };
    initDB();
  }, []);

  return (
    <BrowserRouter>
      {!db ? (
        <Loading />
      ) : (
        <RxDBProvider db={db}>
          <StoreProvider store={store}>
            <Template>
              <Router history={history} />
            </Template>
          </StoreProvider>
        </RxDBProvider>
      )}
    </BrowserRouter>
  );
};

export default App;
