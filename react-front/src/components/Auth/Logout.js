import Cookie from "../../cookie";

function Logout() {
    const cookie = new Cookie();
    cookie.set({"name": "token", "value": null})
}

export default Logout;
