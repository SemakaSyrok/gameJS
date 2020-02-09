import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";

export default class Hero extends Model{

    constructor() {
        super(50, 60, 500, 700, 'HERO')
    }

    /**
     * 37  ->
     * 39  <-
     */
    init = () => {
        this.img = Loader.images.hero;
        document.removeEventListener('keydown', function(){});
        document.addEventListener('keydown', e => {
            console.log(e.keyCode)
            switch (e.keyCode) {
                case 39: this.goRight();break;
                case 37: this.goLeft();break;
            }
        })
    };

    goRight = () => {
        if(this.rPos >= 1350)
            ENGINE.offset += 3;
        else
            this.lPos += 3;
    };

    goLeft = () => {
        if(this.lPos <= 200)
            ENGINE.offset += 0;
        else
            this.lPos -= 3;
    };

    update = () => {

    };

    render = () => {
        ENGINE.ctx.drawImage(this.img, this.lPos, this.tPos, this.width, this.height);
    }

}