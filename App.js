import { Provider } from "react-redux";
import { store } from "./redux/reducers";
import { Navigation } from "./component/Navigation";
import AddFolder from "./screen/AddFolder";
import FolderDetailScreen from "./screen/FolderDetailScreen";
import SelectFolderScreen from "./screen/SelectFolderScreen";
import CourseScreen from "./screen/CourseScreen";
export default function App() {
  return (
    <Provider store={store}>
     <Navigation/>
     {/* <SelectFolderScreen/> */}

    </Provider>
  );
}
