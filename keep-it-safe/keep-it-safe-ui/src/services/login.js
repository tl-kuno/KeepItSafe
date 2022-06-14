import http from "./http-common";

class LoginDataService {
    getAll() {
        return http.get()
    }

    getId(id) {
        return http.get(`/id/${id}`)
    }

    getNames() {
        return http.get("/websiteNames")
    }

    suggestTerm(searchTerm, listOfSites) {
        return http.post(`/search?searchTerm=${searchTerm}&listOfSites=${listOfSites}`)
    }

    createLogin(data) {
        return http.post("/login", data)
    }

    updateLogin(data) {
        return http.put("/login", data)
    }

    deleteLogin(id) {
        return http.delete(`/login?id=${id}`)
    }
}

export default new LoginDataService();