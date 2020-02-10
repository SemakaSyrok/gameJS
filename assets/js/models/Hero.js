import Model from "../vendor/Model.js";
import Loader from "../vendor/Loader.js";

export default class Hero extends Model{

    constructor() {
        super(50, 60, 200, 700, 'HERO');
        this.position = '';
        this.state = {
            hp:100
        }
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
        })
    };

    goRight = () => {
        if (this.position === 'down') return;
        if(this.rPos >= 1350)
            ENGINE.offset += 3;

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
        this.position = 'fly';
    };

    goDown = () => {
        if (this.position === ('fly' || 'down')) return ;

            this.position = 'down';
            this.tPos += 80;

    };

    update = () => {
        if (this.tPos < 700) this.tPos += 4;
        if (this.tPos >= 700 && this.position === 'fly') this.position = '';
        if (ENGINE.tick % 24 === 0) this.state.hp -= 1;
        document.querySelector('#hp').innerHTML = this.state.hp;
    };

    onCollision = model => {
        console.log(model.tag);
        if(model.tag === 'ROCK') this.tPos -= 4;

        if(model.tag === 'CREATURE') {
            this.state.hp += 5;
            if (this.state.hp > 100) this.state.hp = 100;
            ENGINE.unSetModel(model);
        }
    };

    render = () => {
        ENGINE.ctx.drawImage(
            Loader.images.hero,
            this.lPos- ENGINE.offset, this.tPos,
            this.width, this.height
        );
    }

}