import { Provider } from "react-redux";
import store from "./redux/store";
import { Navigation } from "./component/Navigation";
import AddFolder from "./screen/AddFolder";
import FolderDetailScreen from "./screen/FolderDetailScreen";
export default function App() {
  return (
    <Provider store={store}>
     <Navigation/>
     {/* <FolderDetailScreen/> */}
    </Provider>
  );
}
