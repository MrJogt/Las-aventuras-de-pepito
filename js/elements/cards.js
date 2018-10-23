var cards = {
  list: {},
  lastChoose: undefined,
  create: function(id, x, y, width, height, group) {
    cards.list[id] = {
      id: id,
      x: x,
      y: y,
      group: group,
      width: width,
      height: height,
      selected: false,
      backgroundColor: '#fa0',
      image: new Image(),
      init: function() {
        this.image.src = 'img/DorsoCartas.jpg';
      },
      checkClick: function () {
        if(this.x < mouse.x
        && mouse.x < (this.x + this.width)
        && this.y < mouse.y
        && mouse.y < (this.y + this.height)) {
          this.selected = true;
          if(cards.lastChoose) {
            if(cards.lastChoose.group === this.group
              && cards.lastChoose != this) {
              this.flip()
              setTimeout(this.destroy.bind(this), 500)
            }
            else{
              this.flip()
              setTimeout(this.unflip.bind(this), 500)
            }
          }
          else {
            cards.lastChoose = this
            this.flip()
          }
          mouse.reset()
        }
      },
      unflip: function(){
        console.log(cards.lastChoose)
        cards.list[cards.lastChoose.id].image.src = 'img/DorsoCartas.jpg'
        cards.list[cards.lastChoose.id].selected = false;
        this.selected = false;
        cards.lastChoose = undefined
        this.image.src = 'img/DorsoCartas.jpg';
      },
      flip: function(){
        switch (this.group) {
          case 'A':
          this.image.src = 'img/Circulo.png';
            break;
          case 'B':
          this.image.src = 'img/Triangulo.png';
            break;
          case 'C':
          this.image.src = 'img/Cuadrado.jpg';
            break;
          case 'D':
          this.image.src = 'img/Pentagono.png';
              break;
          case 'E':
          this.image.src = 'img/Hexagono.png';
              break;
          case 'F':
          this.image.src = 'img/Heptagono.jpg';
              break;
          case 'G':
          this.image.src = 'img/Octogono.png';
              break;
          case 'H':
          this.image.src = 'img/Eneagono.jpg';
              break;
          case 'I':
          this.image.src = 'img/Decagono.jpg';
              break;
          case 'J':
          this.image.src = 'img/Endecagono.png';
              break;
          // default:
          // console.log("Mal");
        }
        this.backgroundColor = '#CCCCFF'
      },
      destroy: function(){
        console.log(cards);
        var i = game.dynamicList.indexOf(cards.list[cards.lastChoose.id])
           game.dynamicList.splice(i, 1)
        delete cards.list[cards.lastChoose.id]
        var i = game.dynamicList.indexOf(cards.list[this.id])
          game.dynamicList.splice(i, 1)
        delete cards.list[this.id]
        cards.lastChoose = undefined
      },
      update: function() {
        this.checkClick()
       },
      render: function() {
        game.context.fillStyle = this.backgroundColor;
        game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    };
  }
};
