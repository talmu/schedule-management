import "./App.css";
import React, { useState, useEffect } from "react";
import { initializeDB, RemoteDbReplication } from "./data/Database";
import { BrowserRouter } from "react-router-dom";
import { Provider as RxDBProvider } from "rxdb-hooks";
import Template from "./components/Template";
import Router from "./Router";
import Loading from "./components/Loading";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const App = () => {
  const [db, setDb] = useState(null);
  const theme = createMuiTheme({
    // spacing: 2,
    props: {
      MuiButton: {
        size: "small",
      },
      MuiFilledInput: {
        margin: "dense",
      },
      MuiFormControl: {
        margin: "dense",
      },
      MuiFormHelperText: {
        margin: "dense",
      },
      MuiIconButton: {
        size: "small",
      },
      MuiInputBase: {
        margin: "dense",
      },
      MuiInputLabel: {
        margin: "dense",
      },
      MuiListItem: {
        dense: true,
      },
      MuiOutlinedInput: {
        margin: "dense",
      },
      MuiFab: {
        size: "small",
      },
      MuiTable: {
        size: "small",
      },
      MuiTextField: {
        margin: "dense",
      },
    },
  });
  // console.log(theme.spacing());
  // theme.spacing("auto", "auto");

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
          <ThemeProvider theme={theme}>
            <Template>
              <Router />
            </Template>
          </ThemeProvider>
        </RxDBProvider>
      )}
    </BrowserRouter>
  );
};

export default App;
