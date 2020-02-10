import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";


export default class Creature extends Model{

    constructor(lPos) {
        super(60, 20, lPos + Math.floor(Math.random()*30) , 620, 'Creature');
    }

    onCollision = () => {

    };

    init = () => {
        console.log('Гусеница создана')
    };


    update = () => {

    };

    render = () => {
        ENGINE.ctx.drawImage(
            Loader.images.gus,
            this.lPos - ENGINE.offset, this.tPos- 50,
            80, 20
        );
    }

}