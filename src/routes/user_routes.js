import { Router } from 'express'
import { register_user, login_user } from '../controller/user_controller.js'
import { isAuthorized } from '../middleware/user_mdw.js'
import { create_country, get_all_countries, get_byid, update_country, delete_country } from '../controller/country_controller.js'

export const routes = Router()

// AUTH
routes.post("/register", register_user)
routes.post("/login", login_user)

// COUNTRY
routes.post("/country", isAuthorized, create_country)
routes.get("/country", isAuthorized, get_all_countries)
routes.get("/country/:id", isAuthorized, get_byid)
routes.put("/country/:id", isAuthorized, update_country)
routes.delete("/country/:id", isAuthorized, delete_country)
