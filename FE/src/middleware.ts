import { chain } from "../middlewares/chain"
import { middlewareRedirectPage } from "../middlewares/middlewareRedirectPage"


export default chain([middlewareRedirectPage])
