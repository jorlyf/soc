class Cookie {
    constructor() {
        this.cookiesList = ["token", "userId"];
    }
    set(data) {
        document.cookie = `${data.name}=${data.value}`
    }
    getToken() {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (cookie) {
            return cookie;
        } else {
            return null;
        }
    }
    getUserId() {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (cookie) {
            return cookie;
        } else {
            return null;
        }
    }
    removeAll() {
        this.cookiesList.map((e) => {
            this.set({ "name": e, "value": undefined });
        })
        this.set({ "name": "userId", "value": 0 })
    }W
}

export default Cookie;
