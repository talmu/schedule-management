import "./App.css";
import DrawerApp from "./components/TodoList/DrawerApp";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <DrawerApp />
    </Provider>
  );
}

export default App;
