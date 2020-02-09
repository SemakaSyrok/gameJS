
export default class Model{

    constructor(width, height, lPos, tPos, tag) {
        this.width = width;
        this.height = height;
        this.lPos = lPos;
        this.tPos = tPos;
        this.tag = tag;
    }

    get rPos () { return this.lPos + this.width}
    get bPos () { return this.tPos + this.height}

    update() {

    }

    render() {

    }

    onCollision (model) {

    }


}