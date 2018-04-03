export default class {
    constructor(src, volume){
        this.volume = volume || 0.4
        this.sound = document.createElement("audio");
        this.sound.volume = this.volume;
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play(){
        if(this.sound.currentTime > 0) {
            this.sound.pause();
            this.sound.currentTime = 0;
        }

        this.sound.play();
    }
    stop(){
        this.sound.pause();
    }

    init(){
        this.sound.volume = 0.0;
        this.sound.play();
        this.sound.pause();
        this.sound.volume = this.volume;
        this.sound.currentTime = 0;
    }
}