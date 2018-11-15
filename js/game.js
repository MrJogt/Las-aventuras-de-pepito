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
  time: 40,
  intentos: 0,
  image: new Image(),
  imageWin: new Image(),
  imageLost: new Image(),
  imagePause: new Image(),
  timeIntervalId: undefined,
  updateInterval: undefined,
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
    var i, j, id, cardsWidth, cardsHeight
    cardsHeight = 150 // (game.height / 5)
    cardsWidth = 150 // (game.width / 4)
    let groups = {
      0: { 0: '', 1: '', 2: '', 3: ''},
      1: { 0: '', 1: '', 2: '', 3: ''},
      2: { 0: '', 1: '', 2: '', 3: ''},
      3: { 0: '', 1: '', 2: '', 3: ''},
    };
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const count = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0}
    function getRandomArbitrary(min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
    function getLetter (index, i) {
      var letter
      var num = getRandomArbitrary(0, 8)
      letter = letters[num]
      if (count[letter] >= 2) return getLetter(index, i)
      else {
        count[letter]++
        return letter
      }
    }
    Object.keys(groups).forEach(function(a, index){
      Object.keys(groups[index]).forEach(function (b, i) {
        groups[index][i] = getLetter(index, i)
      })
    })
    console.log(groups)
    for(i = 0; i < 4; i++){
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
    for (var i = 0; i < game.elements.length; i++) {
      game.elements[i].init();
    }
    for (var i = 0; i < game.dynamicList.length; i++) {
      game.dynamicList[i].init();
    }
    this.timeIntervalId = setInterval(this.timer.bind(this), 1000)
    this.updateInterval = setInterval(this.update.bind(this), 1000/60);
  },
  startLevelMid: function(canvas){
    this.time = 50;
    this.state = gameStatesEnum.playing;
    this.level = gamelevelEnum.mid;
    var i, j, id, cardsWidth, cardsHeight
    cardsHeight = 150 // (game.height / 5)
    cardsWidth = 150 // (game.width / 4)
    let groups = {
      0: { 0: '', 1: '', 2: '', 3: '', 4: ''},
      1: { 0: '', 1: '', 2: '', 3: '', 4: ''},
      2: { 0: '', 1: '', 2: '', 3: '', 4: ''},
      3: { 0: '', 1: '', 2: '', 3: '', 4: ''},
    };
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const count = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0 }
    function getRandomArbitrary(min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
    function getLetter (index, i) {
      var letter
      var num = getRandomArbitrary(0, 10)
      letter = letters[num]
      if (count[letter] >= 2) return getLetter(index, i)
      else {
        count[letter]++
        return letter
      }
    }
    Object.keys(groups).forEach(function(a, index){
      Object.keys(groups[index]).forEach(function (b, i) {
        groups[index][i] = getLetter(index, i)
      })
    })
    for(i = 0; i < 4; i++){
      for(j = 0; j < 5; j++){
        id = 'cards'+j+i
        cards.create(id, j * cardsWidth + 5,
                      i * cardsHeight + 5,
                      cardsWidth - 10,
                      cardsHeight - 10 ,
                      groups[i][j])
        game.dynamicList.push(cards.list[id])
      }
    }
    for (var i = 0; i < game.elements.length; i++) {
      game.elements[i].init();
    }
    for (var i = 0; i < game.dynamicList.length; i++) {
      game.dynamicList[i].init();
    }
    this.timeIntervalId = setInterval(this.timer.bind(this), 1000)
    this.updateInterval = setInterval(this.update.bind(this), 1000/60);
  },
  startLevelBig: function(canvas){
    this.time = 80;
    this.state = gameStatesEnum.playing;
    this.level = gamelevelEnum.big;
    var i, j, id, cardsWidth, cardsHeight
    cardsHeight = 110 // (game.height / 5)
    cardsWidth = 110 // (game.width / 4)
    let groups = {
      0: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      1: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      2: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      3: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      4: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
    };
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L','M', 'N', 'O']
    const count = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0,
    'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, }
    function getRandomArbitrary(min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
    function getLetter (index, i) {
      var letter
      var num = getRandomArbitrary(0, 15)
      letter = letters[num]
      if (count[letter] >= 2) return getLetter(index, i)
      else {
        count[letter]++
        return letter
      }
    }
    Object.keys(groups).forEach(function(a, index){
      Object.keys(groups[index]).forEach(function (b, i) {
        groups[index][i] = getLetter(index, i)
      })
    })
    for(i = 0; i < 5; i++){
      for(j = 0; j < 6; j++){
        id = 'cards'+j+i
        cards.create(id, j * cardsWidth + 5,
                      i * cardsHeight + 5,
                      cardsWidth - 10,
                      cardsHeight - 10 ,
                      groups[i][j])
        game.dynamicList.push(cards.list[id])
      }
    }
    for (var i = 0; i < game.elements.length; i++) {
      game.elements[i].init();
    }
    for (var i = 0; i < game.dynamicList.length; i++) {
      game.dynamicList[i].init();
    }
    this.timeIntervalId = setInterval(this.timer.bind(this), 1000)
    this.updateInterval = setInterval(this.update.bind(this), 1000/60);
  },
  startLevelLast: function(){
    this.time = 80;
    this.state = gameStatesEnum.playing;
    this.level = gamelevelEnum.last;
    var i, j, id, cardsWidth, cardsHeight
    cardsHeight = 100 // (game.height / 5)
    cardsWidth = 100 // (game.width / 4)
    let groups = {
      0: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      1: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      2: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      3: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      4: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
      5: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: ''},
    };
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L','M', 'N', 'O', 'P', 'Q', 'R']
    const count = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0,
    'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0 }
    function getRandomArbitrary(min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
    function getLetter (index, i) {
      var letter
      var num = getRandomArbitrary(0, 18)
      letter = letters[num]
      if (count[letter] >= 2) return getLetter(index, i)
      else {
        count[letter]++
        return letter
      }
    }
    Object.keys(groups).forEach(function(a, index){
      Object.keys(groups[index]).forEach(function (b, i) {
        groups[index][i] = getLetter(index, i)
      })
    })
    for(i = 0; i < 6; i++){
      for(j = 0; j < 6; j++){
        id = 'cards'+j+i
        cards.create(id, j * cardsWidth + 5,
                      i * cardsHeight + 5,
                      cardsWidth - 10,
                      cardsHeight - 10 ,
                      groups[i][j])
        game.dynamicList.push(cards.list[id])
      }
    }
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
    clearInterval(this.timeIntervalId)
    clearInterval(this.updateInterval)
    this.intentos = 0
    switch (this.level) {
      case gamelevelEnum.initial:
        this.startLevelMid()
        break;
      case gamelevelEnum.mid:
        this.startLevelBig()
        break;
      case gamelevelEnum.big:
        this.startLevelLast()
        break;
      case gamelevelEnum.last:
        this.state = gameStatesEnum.win;
        break;
      default:
    }
  },
  over: function() {
    clearInterval(this.timeIntervalId)
    this.state = gameStatesEnum.over;
  },



  // reset: function(){
  //   this.state = gameStatesEnum.reset;
  // },




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
    if(keyboard.r && this.lastStateChange > 30) {
      this.reset();
    }
    if(this.time == 0){
      this.over()
    }
    if(Object.keys(cards.list).length === 0) {
      this.win()
    }
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
          text.draw('Modo de juego:', '#FF99FF', null, null, null, null, game.width/2, game.height/2 + 130);
          text.draw('Cada carta tiene su par identico, debes', '#FF99FF',
                    null, null, null, null, game.width/2, game.height/2 + 155);
          text.draw('encontrar todos los pares para superar el nivel', '#FF99FF',
                    null, null, null, null, game.width/2, game.height/2 + 180);
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
    this.context.fillRect(this.width - 100, 10, 80, 80);
    text.draw(game.time, '#000', null, null, null, null, 49, 45);
    text.draw('Intentos', '#000', 15, null, null, null, this.width - 60, 80);
    text.draw(Math.floor(game.intentos/2), '#000', null, null, null, null, this.width - 50, 45);
  }
};
var gameStatesEnum = {
  playing: 'playing',
  pause: 'pause',
  win: 'w',
  over: 'o',
  reset: 'r'
}
var gamelevelEnum = {
  initial: '1',
  mid: '2',
  big: '3',
  last: '4',
};
