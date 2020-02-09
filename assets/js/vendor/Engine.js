
export default class Engine {

    constructor(canvas) {
        this.models = [];
        this.tick = 0;
        this.seconds = 0;
        this.pause = false;
        this.canvas = canvas;
        this.ctx;
        this.bg = new Image(1920, 1080);
        this.bg.src = '/assets/img/fon.jpg';
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
        this.ctx.drawImage(this.bg, 0,0,1920,1080);

        for (let model of this.models)
            model.render();
    }

    /**
     * Запуск цикла заново
     */
    restart =() => {
        if (this.pause === false) {
            this.tick += 1;
            console.log(this.tick);
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
        this.models.push(model)
    }

    /**
     * Начать
     */
    START = () => {
        this.mainWheel()
    }

    /**
     * Начать заново
     */
    RESTART =()  => {
        this.constructor();
        this.mainWheel()
    }

    CanvasINIT=(canvas) => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        this.ctx = canvas.getContext('2d');
    }

    /**
     * Отладка
     */
    DUMP =()  =>{
        console.log(this)
    }


}