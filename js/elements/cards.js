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
      init: function() {
      },
      checkClick: function () {
        if(this.x < mouse.x
        && mouse.x < (this.x + this.width)
        && this.y < mouse.y
        && mouse.y < (this.y + this.height)) {
          this.selected = true;
          if(cards.lastChoose) {
            if(cards.lastChoose.group === this.group && cards.lastChoose != this) {
              this.flip()
              setTimeout(this.destroy.bind(this), 200)
            }
            else{
              //this.flip()
              setTimeout(this.unflip.bind(this), 200)

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
        cards.list[cards.lastChoose.id].backgroundColor = '#fa0'
        cards.list[cards.lastChoose.id].selected = false;
        this.selected = false;
        cards.lastChoose = undefined

      },
      flip: function(){
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
        game.context.fillRect(this.x, this.y, this.width, this.height);
        if(this.selected) {
          text.draw(this.group, '#fff', null, null, null, null, this.x + 25, this.y + 25)
        }

      }
    };
  }
};
