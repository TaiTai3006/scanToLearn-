import { Provider } from "react-redux";
import store from "./redux/store";
import NavBar from "./component/NavBar";


export default function App() {
  return (
    <Provider store={store}>
     <NavBar/>
    </Provider>
  );
}
