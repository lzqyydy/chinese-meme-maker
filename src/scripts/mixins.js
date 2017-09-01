import swipe from './swipe.js'

var swipeMixin = {
	methods: {
    swipeHandler: function(op, text){
      // console.log('op', op, 'text', text);
    },
    moveHandler: function(dx, dy, mods){
      if(window.innerWidth>800){
        this.activePart&&this.$refs[this.activePart.slice(0,-1)][this.activePart.slice(-1)].ondrag(dx, dy, mods);
      }
      else{
        if(this.activePart){
          if(this.activePart.startsWith('line')){
            this.$refs['mText'].ondrag(dx, dy, mods);
          }
          else{
            this.$refs['mImage'].ondrag(dx, dy, mods);
          }
        }
      }
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