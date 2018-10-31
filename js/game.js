var game = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColor: '#0f0',
  context: null,
  state: null,
  lastStateChange: 30,
  dynamicList:  [],
  elements: [],
  level: null,
  time: 80,
  image: new Image(),
  imageWin: new Image(),
  imageLost: new Image(),
  imagePause: new Image(),
  timeIntervalId: undefined,
  startLevel1: function(){},
  startLevel2: function(){},
  startLevel3: function(){},
  start: function(canvas) {
    this.x = canvas.x;
    this.y = canvas.y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.context;
    this.state = gameStatesEnum.playing;
    this.level = gamelevelEnum.initial;
    this.image.src = 'img/Pared_ladrillos.jpg';
    this.imageWin.src = 'img/Has_Ganado.png';
    this.imageLost.src = 'img/Game_Over.png';
    this.imagePause.src = 'img/Pause.jpg';
    /*wall.create('top', 0, -980, game.width, 1000);
    wall.create('bottom', 0, game.height-20, game.width, 1000);
    wall.create('left', -980, 0, 1000, game.height);
    wall.create('right', game.width-20, 0, 1000, game.height);
    this.elements.push(wall.list.top);
    this.elements.push(wall.list.bottom);
    this.elements.push(wall.list.left);
    this.elements.push(wall.list.right);
    this.elements.push(player);*/
      //startLevel1: function(canvas) {
        // var i, j, id, cardsWidth, cardsHeight
        //   cardsWidth = (game.width / 4)
        //   cardsHeight = (game.height / 3)
        //
        //   var groups = {
        //     0: {
        //       0: 'A',
        //       1: 'B',
        //       2: 'C',
        //       3: 'D'
        //     },
        //     1: {
        //       0: 'E',
        //       1: 'F',
        //       2: 'A',
        //       3: 'B'
        //     },
        //     2: {
        //       0: 'C',
        //       1: 'D',
        //       2: 'E',
        //       3: 'F'
        //     },
        //   }
        //
        //   for(i = 0; i < 3; i++){
        //     for(j = 0; j < 4; j++){
        //       id = 'cards'+j+i
        //       cards.create(id, j * cardsWidth + 5,
        //                     i * cardsHeight + 5,
        //                     cardsWidth - 10,
        //                     cardsHeight - 10 ,
        //                     groups[i][j])
        //       game.dynamicList.push(cards.list[id])
        //     }
        //   }
        // //}
      // startLevel2: function(canvas){
      //   var i, j, id, cardsWidth, cardsHeight
      //   cardsWidth = (game.width / 4)
      //   cardsHeight = (game.height / 4)
      //   var groups = {
      //     0: {
      //       0: 'A',
      //       1: 'B',
      //       2: 'C',
      //       3: 'D'
      //     },
      //     1: {
      //       0: 'E',
      //       1: 'F',
      //       2: 'G',
      //       3: 'H'
      //     },
      //     2: {
      //       0: 'A',
      //       1: 'B',
      //       2: 'C',
      //       3: 'D'
      //     },
      //     3: {
      //       0: 'E',
      //       1: 'F',
      //       2: 'G',
      //       3: 'H'
      //     },
      //   }
      //
      //   for(i = 0; i < 4; i++){
      //     for(j = 0; j < 4; j++){
      //       id = 'cards'+j+i
      //       cards.create(id, j * cardsWidth + 5,
      //                     i * cardsHeight + 5,
      //                     cardsWidth - 10,
      //                     cardsHeight - 10,
      //                     groups[i][j])
      //       game.dynamicList.push(cards.list[id])
      //     }
      //   }
      // }
      // startLevel3: function(canvas){
        var i, j, id, cardsWidth, cardsHeight
        cardsHeight = (game.height / 5)
        cardsWidth = (game.width / 4)
        var groups = {
          0: {
            0: 'J',
            1: 'A',
            2: 'A',
            3: 'D'
          },
          1: {
            0: 'H',
            1: 'G',
            2: 'B',
            3: 'E'
          },
          2: {
            0: 'F',
            1: 'I',
            2: 'C',
            3: 'B'
          },
          3:{
            0: 'J',
            1: 'D',
            2: 'E',
            3: 'F'
          },
          4:{
            0: 'C',
            1: 'H',
            2: 'I',
            3: 'G'
          },
        };
        for(i = 0; i < 5; i++){
          for(j = 0; j < 4; j++){
            id = 'cards'+j+i
            cards.create(id, j * cardsWidth + 5,
                          i * cardsHeight + 5,
                          cardsWidth - 10,
                          cardsHeight - 10 ,
                          groups[i][j])
            game.dynamicList.push(cards.list[id])
          }
        }
      // }
    for (var i = 0; i < game.elements.length; i++) {
      game.elements[i].init();
    }
    for (var i = 0; i < game.dynamicList.length; i++) {
      game.dynamicList[i].init();
    }
    this.timeIntervalId = setInterval(this.timer.bind(this), 1000)
    setInterval(this.update.bind(this), 1000/60);
  },
  timer: function () {
    this.time--
    },
  pause: function() {
    if(this.state === gameStatesEnum.pause) {
      this.state = gameStatesEnum.playing;
      this.timeIntervalId = setInterval(this.timer.bind(this), 1000)
    } else if(this.state === gameStatesEnum.playing) {
      this.state = gameStatesEnum.pause;
      clearInterval(this.timeIntervalId)
    }
    this.lastStateChange = 0;
  },
  win: function() {
    this.state = gameStatesEnum.win;
    clearInterval(this.timeIntervalId)
  },
  over: function() {
    console.log(this.timeIntervalId)
    clearInterval(this.timeIntervalId)
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
    if(this.time == 0){
      this.over()
    }
    if(Object.keys(cards.list).length === 0 /*&& this.state === gamelevelEnum.last */) {
      this.win()
    }
    // else if (Object.keys(cards.list).length === 10 && this.state === gamelevelEnum.initial) {
    //   gamelevelEnum++;
    // }
    this.render();
  },
  render: function() {
    if(this.state === gameStatesEnum.playing) {
      //limpio la pantalla
      this.context.fillStyle = this.backgroundColor;
      this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        this.context.drawImage(this.imagePause, this.x, this.y, this.width, this.height);
          text.draw('Modo de juego:', '#FF99FF', null, null, null, null, game.width/2, game.height/2 + 110);
          text.draw('Cada carta tiene su par identico, debes', '#FF99FF',
                    null, null, null, null, game.width/2, game.height/2 + 135);
          text.draw('encontrar todos los pares para superar el nivel', '#FF99FF',
                    null, null, null, null, game.width/2, game.height/2 + 160);
          break;
        case gameStatesEnum.win:
            this.context.drawImage(this.imageWin, this.x, this.y, this.width, this.height);
          break;
        case gameStatesEnum.over:
        this.context.drawImage(this.imageLost, this.x, this.y, this.width, this.height);
          break;
      }
    }
    this.context.fillRect(10, 10, 80, 50);
    text.draw(game.time, '#000', null, null, null, null, 49, 45);
  }
};
var gameStatesEnum = {
  playing: 'playing',
  pause: 'pause',
  win: 'w',
  over: 'o'
}
var gamelevelEnum = {
  initial: '1',
  mid: '2',
  last: '3'
};
