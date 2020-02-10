import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";
import Creature from "./Creature.js";


export default class Rock extends Model{

    constructor(lPos) {
        super(80, 20, lPos, 600, 'ROCK');
    }

    onCollision = () => {

    };

    init = () => {
        if (Math.random() > 0.4) {
            ENGINE.setModel(new Creature(this.lPos));
        }
    };


    update = () => {

    };

    render = () => {
        ENGINE.ctx.drawImage(
            Loader.images.rock,
            this.lPos - ENGINE.offset, this.tPos,
            80, 20
        );
    }

}