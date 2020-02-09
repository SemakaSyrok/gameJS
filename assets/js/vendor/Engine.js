import Loader from "./Loader.js";
import Hero from "../models/Hero.js"

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

        this.collisionEventer();
        this.logic();
        this.render();
        this.restart()

    };

    /**
     * Запуск логики поведения объектов
     */
    logic = () => {
        if (this.models.length > 0) {
            for (let model of this.models)
                model.update();
        }
    }

    /**
     * Отображение
     */
    render = () => {
        this.ctx.clearRect(0,0,1920,1080);
        this.ctx.drawImage(Loader.images.bg, this.offset,0, window.innerWidth, 1180, 0, 0, 3000, window.innerHeight);

        for (let model of this.models)
            model.render();
    };

    /**
     * Запуск цикла заново
     */
    restart =() => {
        if (this.pause === false) {
            this.tick += 1;
            setTimeout(this.mainWheel, 1000/10)
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
    }

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
        this.mainWheel()
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