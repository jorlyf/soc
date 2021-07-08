
import { refreshPage } from "../../scripts";

function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    refreshPage();
}

export default Logout;
