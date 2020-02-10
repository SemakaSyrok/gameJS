import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";


export default class Rock extends Model{

    constructor(lPos) {
        super(60, 20, lPos, 600, 'ROCK');
    }

    onCollision = () => {

    };

    init = () => {
        ENGINE.ctx.drawImage(Loader.images.rock, this.lPos, this.tPos, this.width, this.height);
    };


    update = () => {

    };

    render = () => {
        ENGINE.ctx.drawImage(
            Loader.images.rock,
            0,0,
            20,80,
            this.lPos - ENGINE.offset, this.tPos,
            80, 20
        );
    }

}