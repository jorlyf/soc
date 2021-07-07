import Cookie from "../../Cookie";
import { refreshPage } from "../../scripts";

function Logout() {
    const cookie = new Cookie();
    cookie.removeAll();
    refreshPage();
}

export default Logout;
