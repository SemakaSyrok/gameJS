import Loader from "./Loader.js";
import Hero from "../models/Hero.js";
import Rock from "../models/Rock.js";
import Creature from "../models/Creature.js";
import Hiena from "../models/Hiena.js";

export default class Engine {

    constructor(canvas) {
        this.models = [];
        this.tick = 0;
        this.seconds = 0;
        this.pause = false;
        this.canvas = canvas;
        this.ctx;
        this.offset = 0;

        this.CanvasINIT(this.canvas);

        document.removeEventListener('keydown', () => {});
        document.addEventListener('keydown', e => {
            if(e.keyCode === 27) ENGINE.PAUSE();
        })
    }

    /**
     * Основной цикл
     */
    mainWheel = () => {

        this.timer();
        this.collisionEventer();
        this.logic();
        this.gusCreator();
        this.render();
        this.restart();

    };

    gusCreator = () => {
        let guses = this.models.filter(m => m.tag === 'CREATURE');

        if(guses.length < 2) {
            let rocks = this.models.filter(m => m.tag === 'ROCK');
            let rock = rocks[Math.floor(Math.random() * rocks.length)];
            ENGINE.setModel(new Creature(rock.lPos - 10 + Math.floor(Math.random() * 20)));
        }

    };

    timer = () => {
        this.tick++;
        if(this.tick % 24 ===0)
            this.seconds++;

        document.querySelector('#time').innerHTML = `${Math.floor(this.seconds / 60)}:${this.seconds % 60}`;
    };

    /**
     * Запуск логики поведения объектов
     */
    logic = () => (this.models.length > 0) ? this.models.forEach((m,i,arr) => m.update()) : null;

    /**
     * Отображение
     */
    render = () => {
        this.ctx.clearRect(0,0,1920,1080);
        this.ctx.drawImage(
            Loader.images.bg,
            this.offset, 0,
            window.innerWidth, 1180,
            0,0,
            3000, window.innerHeight
        );

        for (let model of this.models) {
            model.render();
        }

    };

    /**
     * Запуск цикла заново
     */
    restart =() => {
        if (this.pause === false) {
            setTimeout(this.mainWheel, 1000/20)
        }
    };

    ENDGAME = _ => {
        ENGINE.pause = true;
        let data = {
            time: Math.round(ENGINE.tick / 24),
            score: document.getElementById('score').innerHTML || 0,
            name: document.getElementById('name').innerHTML,
        };

        fetch('/server/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(r => {
            r.json()
        }).then(r => {
            console.log(r)
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            document.getElementById('endGame').style.display = 'block';
        })
    };

    /**
     * Отслеживание соприкосновений
     */
    collisionEventer = () => {
        if (this.models.length <= 0) return;

        for(let model of this.models)
        {
            for (let subModel of this.models)
            {
                if (model === subModel) continue;
                if (model.lPos <= subModel.rPos &&
                    model.rPos >= subModel.lPos &&
                    model.tPos <= subModel.bPos &&
                    model.bPos >= subModel.tPos
                ) model.onCollision(subModel)
            }
        }
    };

    /**
     * Добавить модель
     */
    setModel = (model) => {
        model.init();
        this.models.push(model)
    };

    /**
     * Удалить модель
     */
    unSetModel = model => {

        this.models = this.models.filter(m => m.id !== model.id);
    };

    /**
     * Начать
     */
    START = () => {
        this.setModel(new Hero());
        this.createRocks();
        Loader.audio.play();
        this.mainWheel()
    };

    /**
     * Создать камни
     */
    createRocks = _ => {

        for(let i = 300, j = 0; j <= 10; i += Math.floor(Math.random() * 200) + 120, j++)
        {
            this.setModel(new Rock(i))
        }

        for(let i = 300, j = 1; j <= 5; i += 500, j++)
        {
            setTimeout( function() {
                ENGINE.setHiena(i)
            },j*1000 , i);
        }


    };

    PAUSE = _ => {
        if(this.pause === false)
            this.pause = !this.pause;
        else {
            this.pause = !this.pause;
            this.mainWheel();
        }
    };

    setHiena = i => {
        ENGINE.setModel(new Hiena(i));
    };

    /**
     * Начать заново
     */
    RESTART =()  => {
        this.models = [];
        this.tick = 0;
        this.seconds = 0;
        this.pause = false;
        this.canvas = canvas;
        this.ctx;
        this.offset = 0;

        this.CanvasINIT(this.canvas);
        this.START();
        document.getElementById('endGame').style.display = 'none';
    };

    CanvasINIT=(canvas) => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        this.ctx = canvas.getContext('2d');
    };

    /**
     * Отладка
     */
    DUMP =()  =>{
        console.log(this)
    };


}



//МУЗЫЫЫЫЫКУУУУУ!!!!!!!!!!!!музон