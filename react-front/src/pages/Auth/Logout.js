
import { refreshPage } from "../../utilities/refreshPage";

function Logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    refreshPage();
}

export default Logout;
