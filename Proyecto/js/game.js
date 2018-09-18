var game = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColor: '#00f',
  context: null,
  state: null,
  lastStateChange: 30,
  elements: [],
  start: function(canvas) {
    this.x = canvas.x;
    this.y = canvas.y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.context;
    this.state = gameStatesEnum.playing;
    setInterval(this.update.bind(this), 1000/60);
  },
  pause: function() {
    if(this.state === gameStatesEnum.pause) {
      this.state = gameStatesEnum.playing;
    } else if(this.state === gameStatesEnum.playing) {
      this.state = gameStatesEnum.pause;
    }
    this.lastStateChange = 0;
  },
  win: function() {
    this.state = gameStatesEnum.win;
  },
  over: function() {
    this.state = gameStatesEnum.over;
  },
  update: function() {
    ++this.lastStateChange;
    if(this.state === gameStatesEnum.playing) {
      //hago update de todos los objetos del juego
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].update();
      }
    }
    if(keyboard.p && this.lastStateChange > 30) {
      this.pause();
    }
    //llamo al render global
    this.render();
  },
  render: function() {
    if(this.state === gameStatesEnum.playing) {
      //limpio la pantalla
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(this.x, this.y, this.width, this.height);
      //llamo a render de todos los objetos del juego
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].render();
      }
    } else {
      this.context.fillStyle = 'rgba(50, 50, 50, 0.01)';
      this.context.fillRect(this.x, this.y, this.width, this.height);
      switch(this.state) {
        case gameStatesEnum.pause:
          text.draw('Pausa', '#fff');
          break;
        case gameStatesEnum.win:
          text.draw('Nivel superado: '+player.score+'pts', '#fff');
          break;
        case gameStatesEnum.over:
          text.draw('Game Over', '#fff');
          break;
      }
    }
  }
};

var gameStatesEnum = {
  playing: 'playing',
  pause: 'pause',
  win: 'w',
  over: 'o'
};
