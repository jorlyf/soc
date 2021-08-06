
import { refreshPage } from "../../scripts";

function Logout() {
    localStorage.removeItem('accesToken');
    refreshPage();
}

export default Logout;
