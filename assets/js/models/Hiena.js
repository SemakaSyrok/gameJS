import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";


export default class Hiena extends Model{

    constructor(lPos) {
        super(50, 60, lPos  , 700, 'HIENA');
        this.StartPos = lPos;
        this.SPEED = 4;
        this.position = 'left';
        this.cooldown = 0;
        console.log('Гиена создана' + lPos)
    }

    onCollision = model => {
        if (model.tag === 'HERO') {
            if(this.cooldown <= 0) {
                model.state.hp -= 30;
                this.cooldown = 24;
            }
        }

    };

    init = () => {

    };


    update = () => {
        if (this.position === 'left') {
            this.lPos -= this.SPEED;
            if (this.lPos < this.StartPos - 250) {
                this.position = 'right';return;
            }
        }
        if (this.position === 'right') {
            this.lPos += this.SPEED;
            if (this.lPos > this.StartPos + 250) {
                this.position = 'left';return;
            }
        }
        this.cooldown--;
    };

    render = () => {
        ENGINE.ctx.drawImage(
            Loader.images.hiena,
            this.lPos - ENGINE.offset, this.tPos,
            this.width, this.height
        );
    }

}