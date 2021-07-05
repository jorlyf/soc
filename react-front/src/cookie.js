class Cookie {
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
}

export default Cookie;
