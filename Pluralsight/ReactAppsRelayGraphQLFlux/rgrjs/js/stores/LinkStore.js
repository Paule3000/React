import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";
import {EventEmitter} from "events";

let _links = [];

// Stores are always singletons
class LinkStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType) {
                case ActionTypes.RECEIVE_LINKS:
                    console.log("3. Instore");
                    _links = action.links;
                    this.emit("change");
                    break;
                default:
                    // Do Nothing
            }
        });
    }

    getAll() {
        return _links;
    }
}

export default new LinkStore();
