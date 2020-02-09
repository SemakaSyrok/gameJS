import UI from "./UI.js";


export default class UserController {

    static INIT = () => {
        document.querySelector('#startGame').addEventListener('click', UI.startGame);
        document.querySelector('#startGameStart').addEventListener('click', UI.startGameOnce);
    };


    static keyDown = () => {

    }

}