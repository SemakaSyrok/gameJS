
export default class UI {

    static state = {
        isStarted: null
    };

    static startGame = () => {
        document.querySelector('#startMenu').style.display = 'none';
        document.querySelector('#video').style.display = 'block';
        this.state.isStarted = setTimeout("document.querySelector('#startMenu').style.display = 'none';\n" +
            "        document.querySelector('#video').style.display = 'none';\n" +
            "        document.querySelector('#panel').style.display = 'block';;" +
            "ENGINE.START()", 2000);
    };

    static startGameOnce = () => {
        document.querySelector('#startMenu').style.display = 'none';
        document.querySelector('#video').style.display = 'none';
        document.querySelector('#panel').style.display = 'block';
        clearTimeout(this.state.isStarted);
        ENGINE.START();
    };


}