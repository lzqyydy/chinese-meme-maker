import swipe from './swipe.js'

var swipeMixin = {
	methods: {
    swipeHandler: function(op, text){
      // console.log('op', op, 'text', text);
    },
    moveHandler: function(dx, dy, mods){
      this.activePart&&this.$refs[this.activePart.slice(0,-1)][this.activePart.slice(-1)].ondrag(dx, dy, mods);
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
    swipe.init(document.querySelector('#result'), this.swipeHandler, this.moveHandler, this.touchHandler, this.endHandler, this.tapHandler, 10);
  }
}

export { swipeMixin };