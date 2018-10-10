var game = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColor: '#00f',
  context: null,
  state: null,
  lastStateChange: 30,
  dynamicList:  [],
  elements: [],
  start: function(canvas) {
    this.x = canvas.x;
    this.y = canvas.y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.context;
    this.state = gameStatesEnum.playing;
  /*wall.create('top', 0, -980, game.width, 1000);
    wall.create('bottom', 0, game.height-20, game.width, 1000);
    wall.create('left', -980, 0, 1000, game.height);
    wall.create('right', game.width-20, 0, 1000, game.height);
    this.elements.push(wall.list.top);
    this.elements.push(wall.list.bottom);
    this.elements.push(wall.list.left);
    this.elements.push(wall.list.right);
    this.elements.push(player);*/

    var i, j, id, cardsWidth, cardsHeight
    cardsWidth = (game.width / 4)
    cardsHeight = (game.height / 3)

    var groups = {
      0: {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D'
      },
      1: {
        0: 'E',
        1: 'F',
        2: 'A',
        3: 'B'
      },
      2: {
        0: 'C',
        1: 'D',
        2: 'E',
        3: 'F'
      },
    }
    for(i = 0; i < 3; i++){
      for(j = 0; j < 4; j++){
        id = 'cards'+j+i
        cards.create(id, j * cardsWidth + 5, i * cardsHeight + 5, cardsWidth - 10, cardsHeight - 10 , groups[i][j])
        game.dynamicList.push(cards.list[id])
      }
    }
    for (var i = 0; i < game.elements.length; i++) {
      game.elements[i].init();
    }
    for (var i = 0; i < game.dynamicList.length; i++) {
      game.dynamicList[i].init();
    }
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
      for (var i = 0; i < this.dynamicList.length; i++) {
        this.dynamicList[i].update();

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
      for (var i = 0; i < this.dynamicList.length; i++) {
        this.dynamicList[i].render();
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
