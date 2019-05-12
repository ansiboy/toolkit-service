import { controller, action } from "maishu-node-mvc";

@controller()
export class HomeController {
    @action("/")
    public index() {
        return "Toolkit service started."
    }

}