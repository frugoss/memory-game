const memoryGame = {
    tileNumber : 20,
    tileOnRow : 5,
    divBoard : null,
    divScore : null,
    tiles : [],
    tilesChecked : [],
    counter : 0,
    tilesPng : [
        'icon/1.png',
        'icon/2.png',
        'icon/3.png',
        'icon/4.png',
        'icon/5.png',
        'icon/6.png',
        'icon/7.png',
        'icon/8.png',
        'icon/9.png',
        'icon/10.png'
    ],
    canGet : true,
    tilesPairs : 0,

    tileClick(e) {
        if (this.canGet){
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.tilesPng[e.target.dataset.cardType] + ')';
            }
            if (this.tilesChecked.length === 2){
                this.canGet = false;
                if(this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this),500);
                } else {
                    setTimeout(this.resetTiles.bind(this),500);
                }
                this.counter++;
                this.divScore.innerText = "Ilość prób: " + this.counter;
            }
        }
    },

    deleteTiles(){
        this.tilesChecked[0].remove();
        this.tilesChecked[1].remove();

        this.canGet = true;
        this.tilesChecked = [];

        this.tilesPairs++;
        if(this.tilesPairs >= this.tileNumber / 2) {
            alert('Udało się odgadnąć wszystkie obrazki')
        }
    },

    resetTiles(){
        this.tilesChecked[0].style.backgroundImage = 'url(icon/main.png)';
        this.tilesChecked[1].style.backgroundImage = 'url(icon/main.png)';

        this.tilesChecked = [];
        this.canGet = true;
    },

    startGame() {

        this.divBoard = document.querySelector('.memory-field');
        this.divBoard.innerHTML = ' ';

        this.divScore = document.querySelector('.memory-score');
        this.divScore.innerHTML = 'Ilość prób: 0';

        this.tiles = [];
        this.tilesChecked = [];
        this.canGet = true;
        this.counter = 0;
        this.tilesPairs = 0;

        for (let i = 0; i < this.tileNumber; i++) {
            this.tiles.push(Math.floor(i / 2));
        }
        for (let i = this.tileNumber - 1; i > 0; i--) {
            const random = Math.floor(Math.random() * i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[random];
            this.tiles[random] = tmp;
        }

        for (let i = 0; i < this.tileNumber; i++) {
            const tile = document.createElement('div');
            tile.classList.add("memory-tile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.left = 5 + (tile.offsetWidth + 10) * (i % this.tileOnRow) + 'px';
            tile.style.top = 5 + (tile.offsetHeight + 10) * (Math.floor(i / this.tileOnRow)) + 'px';

            tile.addEventListener('click', this.tileClick.bind(this));
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.game-start');
    startButton.addEventListener('click', () => memoryGame.startGame());
});


