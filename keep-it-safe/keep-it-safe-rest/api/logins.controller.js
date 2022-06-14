import LoginsDAO from "../dao/loginsDAO.js"
import * as fs from 'fs'
import * as url from "url";

export default class LoginsController {

    static async apiGetLogins(req,res,next) {
        const loginsPerPage = req.query.loginsPerPage ? parseInt(req.query.loginsPerPage, 10) : 2000
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.websiteName) {
            filters.websiteName = req.query.websiteName
        }

        const { loginsList, totalNumLogins } = await LoginsDAO.getLogins({
            filters,
            page,
            loginsPerPage,
        })

        let response = {
            logins: loginsList,
            page: page,
            filters: filters,
            entries_per_page: loginsPerPage,
            total_results: totalNumLogins,
        }
        res.json(response)
    }


    static async apiPostLogin(req, res, next) {
        try {
            const websiteName = req.body.websiteName
            const username = req.body.username
            const password = req.body.password
        
        const loginResponse = await LoginsDAO.addLogin(
            websiteName,
            username,
            password
        )

        res.json({status:"Login Added"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }

    static async apiUpdateLogin(req, res, next) {
        try {
            const loginId= req.body._id
            const websiteName = req.body.websiteName
            const username = req.body.username
            const password = req.body.password            

            const loginResponse = await LoginsDAO.updateLogin(
                loginId,
                websiteName,
                username,
                password
            )
        
            var { error } = loginResponse
            if (error) {
                res.status(400).json({error})
            }

            res.json({status:"Login Updated"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }

    static async apiDeleteLogin(req, res, next) {
        try {
            const queryObject   = url.parse(req.url, true).query;
            const loginId = queryObject["id"]
            const loginResponse = await LoginsDAO.deleteLogin(loginId)
            res.json({status:"Login Deleted"})
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error:e.message})
        }
    }

    static async apiGetLoginById(req, res, next) {
        try {
            let loginId = req.query.id
            let loginResponse = await LoginsDAO.getLoginById(loginId)
            res.json(loginResponse)    
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }

    static async apiGetWebsiteNames(req, res, next) {
        try {
            let websiteNames = await LoginsDAO.getWebsiteNames()
            res.json(websiteNames)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
    static async apiSearchCorrect(req, res, next)  {
        const queryObject   = url.parse(req.url, true).query;
        const searchTerm    = queryObject["searchTerm"]
        const listOfSites   = queryObject["listOfSites"]
        const arrayOfSites  = listOfSites.split(",")
        var stringToWrite   = "#" + String(searchTerm)

        arrayOfSites.forEach((value) => {
            stringToWrite += "\n"
            stringToWrite += String(value)
        })

        const pipeline = 'C:/OSU/Term5/CS361_SE/KeepItSafe/keep-it-safe/communication_pipe.txt'
        
        fs.writeFile(pipeline, stringToWrite, (err) => { 
            if (err) { 
                console.log(err); 
            } 
            })
        setTimeout( () => {
            var suggestions = fs.readFileSync(pipeline).toString().split("\n");
            res.json({data:suggestions})
        }, 250)
    }
}