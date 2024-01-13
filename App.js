import { Provider } from "react-redux";
import store from "./redux/store";
import { Navigation } from "./component/Navigation";
import AddFolder from "./screen/AddFolder";
import FolderDetailScreen from "./screen/FolderDetailScreen";
import SelectFolderScreen from "./screen/SelectFolderScreen";
export default function App() {
  return (
    <Provider store={store}>
     <Navigation/>
     {/* <SelectFolderScreen/> */}
    </Provider>
  );
}
