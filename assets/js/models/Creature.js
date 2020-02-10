import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";


export default class Creature extends Model{

    constructor(lPos) {
        super(60, 45, lPos + Math.floor(Math.random()*30) , 568, 'CREATURE');
    }

    onCollision = model => {

    };

    init = () => {
        console.log('Гусеница создана')
    };


    update = () => {

    };

    render = () => {
        ENGINE.ctx.drawImage(
            Loader.images.gus,
            this.lPos - ENGINE.offset, this.tPos,
            this.width, this.height
        );
    }

}