import swipe from './swipe.js'

var swipeMixin = {
	methods: {
    swipeHandler: function(op, text){
      // console.log('op', op, 'text', text);
    },
    moveHandler: function(dx, dy, vx, vy, mods){
      this.$store.state[this.activePart.slice(0,-1)][this.activePart.slice(-1)]
      if(this.$store.state[this.activePart.slice(0,-1)][this.activePart.slice(-1)].selection!==null){
        if(mods.ctrlKey||mods.metaKey){
          this.$store.state[this.activePart.slice(0,-1)][this.activePart.slice(-1)].params.width -= -dx;
          this.$store.state[this.activePart.slice(0,-1)][this.activePart.slice(-1)].params.height -= -dy;
        }
        else{
          this.$store.state[this.activePart.slice(0,-1)][this.activePart.slice(-1)].params.x -= -dx;
          this.$store.state[this.activePart.slice(0,-1)][this.activePart.slice(-1)].params.y -= -dy;
        }
      }
      this.redraw();
    },
    touchHandler: function(){
      // console.log('touched');
    },
    endHandler: function(){
      // console.log('ended');
    },
    tapHandler: function(){
      // console.log('tapped');
    }
  },
  mounted: function(){
    swipe.init(document.querySelector('#canvas'), this.touchHandler, this.moveHandler, this.endHandler, this.swipeHandler, this.tapHandler, 10);
  }
}

export { swipeMixin };