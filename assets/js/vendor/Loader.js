

export default class Loader {

    static images = {};

    static audio;

    static INIT = () => {
        this.images.bg = new Image(3000,1080);
        this.images.bg.src = '/assets/img/fon.jpg';
        this.images.hero = new Image(50,60);
        this.images.hero.src = '/assets/timon/timon.png';


        // this.audio.au = new Audio('http://wsr-0/assets/Music/41461198_326895439.mp3');
    }

}