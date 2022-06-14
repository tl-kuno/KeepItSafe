import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let logins

export default class LoginsDAO {
    static async injectDB(conn) {
        if (logins) {
            return
        }
        try {
            logins = await conn.db(process.env.LOGINS_NS).collection("logins")
        } catch (e) {
        console.error(
            `Unable to establish a collection handle in loginsDAO: ${e}`,
            )
        }
    }

    static async getLogins({
        filters=null,
        page = 0,
        loginsPerPage = 2000,
    } = {}) {
        let query
        if (filters) {
            if ("websiteName" in filters) {
                query = {$text: { $search: filters["websiteName"]}}
            }
        }

        let cursor
    
        try {
            cursor = await logins
                .find(query)
        } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return { loginslist: [], totalNumLogins: 0 }
        }
    
        const displayCursor = cursor.limit(loginsPerPage).skip(loginsPerPage * page)
    
        try {
            const loginsList = await displayCursor.toArray()
            const totalNumLogins = await logins.countDocuments(query)
        
        return { loginsList, totalNumLogins }
        } catch (e) {
        console.error(`Unable to convert cursor to array or problem counting documents, ${e}`,
            )
        return { loginsList: [], totalNumLogins: 0 }
        }
    }

    static async addLogin(websiteName, username, password) {
        try {
            const loginDoc = {
                websiteName: websiteName,
                username: username,
                password: password,}
            
            return await logins.insertOne(loginDoc)
            } catch(e) {
            console.error(`Unable to post login: ${e}`)
            return {error: e}
            }
        }

    static async updateLogin(loginId, websiteName, username, password) {
        try {
            const updateResponse = await logins.updateOne(
                { _id:ObjectId(loginId)},
                { $set: {
                    websiteName: websiteName,
                    username: username,
                    password: password
                }},
            )
        return updateResponse
        } catch (e) {
        console.error(`Unable to update review: ${e}`)
        return {error: e}
        }
    }
    
    static async deleteLogin(loginId) {
        try {
            const deleteResponse = await logins.deleteOne({
                _id: ObjectId(loginId),
            })
            return deleteResponse
        } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return {error:e}
        }
    }

    static async getLoginById(loginId) {
        try {
           const getOneResponse = await logins.findOne({
             _id: ObjectId(loginId),
           })
           return getOneResponse
        } catch (e) {
            console.error(`Unable to retrieve ${id}: ${e}`)
            return {error:e}
        }
    }

  static async getWebsiteNames() {
    let websiteNames = []
    try {
      websiteNames = await logins.distinct("websiteName")
      return websiteNames
    } catch (e) {
      console.error(`Unable to get website names, ${e}`)
      return websiteNames
    }
  }

}