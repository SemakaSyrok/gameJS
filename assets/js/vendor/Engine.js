import Loader from "./Loader.js";
import Hero from "../models/Hero.js";
import Rock from "../models/Rock.js";

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
    }

    /**
     * Основной цикл
     */
    mainWheel = () => {

        this.timer();
        this.collisionEventer();
        this.logic();
        this.render();
        this.restart();

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
     * Начать
     */
    START = () => {
        this.setModel(new Hero());
        this.createRocks();
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


    };

    /**
     * Начать заново
     */
    RESTART =()  => {
        this.constructor();
        this.mainWheel()
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