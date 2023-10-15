import './styles/global/App.scss';
import { Route, Routes} from "react-router-dom";
import ClientPage from "./web-pages/client/client";
import AdminPage from "./web-pages/admin/admin";
import {observer} from "mobx-react-lite";
import Policies from './components/client/Legal';

function App() {

  return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ClientPage/>}/>
                <Route path='/legal' element={<Policies/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
        </div>
  );
}

export default observer(App);