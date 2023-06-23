import { unauthorizedResponse } from "../utils/api.response.js"

export default function (req, res, next){
    if(!(req.user.role == "buyer")) return unauthorizedResponse("Access denied! You must be a buyer to use this route!",res)
    next()
}