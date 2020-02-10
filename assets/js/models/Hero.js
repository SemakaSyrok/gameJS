import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";

export default class Hero extends Model{

    constructor() {
        super(50, 60, 200, 700, 'HERO');
        this.position = '';
        this.state = {}
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
                case 38: this.goUp();break;
                case 40: this.goDown();break;
            }
            console.log(this)
        })
    };

    goRight = () => {
        if (this.position === 'down') return;
        if(this.rPos >= 1350)
            ENGINE.offset += 3;
        else
            this.lPos += 3;
    };

    goLeft = () => {
        if (this.position === 'down') return;
        if(this.lPos <= 200)
            ENGINE.offset += 0;
        else
            this.lPos -= 3;
    };

    goUp = () => {
        if (this.position === 'fly') return;
        if (this.position === 'down') {
            this.position = '';this.tPos -= 80; return;
        }
        this.tPos -= 250;
    };

    goDown = () => {
        if (this.position === ('fly' || 'down')) return ;

            this.position = 'down';
            this.tPos += 80;

    };

    update = () => {

    };

    render = () => {
        ENGINE.ctx.drawImage(
            Loader.images.hero,
            this.lPos, this.tPos,
            this.width, this.height
        );
    }

}