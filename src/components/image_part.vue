<template>
  <div class="part" :id="name" @mousedown="onPartSelected" @touchstart="onPartSelected" tabindex="0" @keydown="onkeydown">
    <div>
      <span class="desc">{{name}}:</span>
    </div>
    <div>
      <element-list :elements="elements" :selection="data.selection" @select="onselect"></element-list>
    </div>
    <div>
      <slider-input class="options" name="width" :min="0" :max="canvasWidth" :step="1" :value.sync="data.params.width"></slider-input>
      <slider-input class="options" name="height" :min="0" :max="canvasHeight" :step="1" :value.sync="data.params.height"></slider-input>
    </div>
    <div>
      <slider-input class="options" name="x" :min="-canvasWidth/2" :max="canvasWidth/2" :step="1" :value.sync="data.params.x"></slider-input>
      <slider-input class="options" name="y" :min="-canvasHeight/2" :max="canvasHeight/2" :step="1" :value.sync="data.params.y"></slider-input>
    </div>
    <div>
      <slider-input class="options" name="rotation" :min="-180" :max="180" :step="1" :value.sync="data.params.rotation"></slider-input>
      <span class="desc">镜像</span><input type="checkbox" v-model="data.params.mirror"><span class="desc">保持比例</span><input type="checkbox" v-model="keepAspect"> 
    </div>
  </div>
</template>

<script>
// copied from offital Vue examples
import { canvasWidth, canvasHeight } from '../scripts/constants.js'
import { ImagePart } from '../scripts/model.js'
import s_i from './slider_input.vue'
export default {
  props: ['name','elements'],
  data () {
    return {
      data: new ImagePart(),
      keepAspect: true,
      canvasWidth: canvasWidth, 
      canvasHeight: canvasHeight
    }
  },
  watch: {
    'data.params.width': function(n, o){
      if(!isNaN(n)){
        this.$store.commit('setParam', {
          category: this.name.slice(0,-1), 
          index: this.name.slice(-1), 
          param: 'width', 
          value: n
        });
        this.$emit('changed');
      }
      else{
        this.data.params.width = o;
      }
    },
    'data.params.height': function(n, o){
      if(!isNaN(n)){
        this.$store.commit('setParam', {
          category: this.name.slice(0,-1), 
          index: this.name.slice(-1), 
          param: 'height', 
          value: n
        });
        this.$emit('changed');
      }
      else{
        this.data.params.height = o;
      }
    },
    'data.params.x': function(n, o){
      if(!isNaN(n)){
        this.$store.commit('setParam', {
          category: this.name.slice(0,-1), 
          index: this.name.slice(-1), 
          param: 'x', 
          value: n
        });
        this.$emit('changed');
      }
      else{
        this.data.params.x = o;
      }
    },
    'data.params.y': function(n, o){
      if(!isNaN(n)){
        this.$store.commit('setParam', {
          category: this.name.slice(0,-1), 
          index: this.name.slice(-1), 
          param: 'y', 
          value: n
        });
        this.$emit('changed');
      }
      else{
        this.data.params.y = o;
      }
    },
    'data.params.rotation': function(n, o){
      if(!isNaN(n)){
        this.$store.commit('setParam', {
          category: this.name.slice(0,-1), 
          index: this.name.slice(-1), 
          param: 'rotation', 
          value: n
        });
        this.$emit('changed');
      }
      else{
        this.data.params.rotation = o;
      }
    },
    'data.params.mirror': function(n, o){
      this.$store.commit('setParam', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        param: 'mirror', 
        value: n
      });
      this.$emit('changed');
    }
  },
  methods: {
    onkeydown: function(e){
      if(e.metaKey||e.ctrlKey||e.shiftKey){
        e.preventDefault();
      }
      if(e.key==='ArrowLeft'){
        if(e.metaKey||e.ctrlKey){
          if(e.shiftKey){
            this.data.params.width -= 10;
          }
          else{
            this.data.params.width--;
          }
          if(this.data.params.width < 0){
            this.data.params.width = 0;
          }
        }
        else if(e.altKey){
          if(e.shiftKey){
            this.data.params.rotation -= 10;
          }
          else{
            this.data.params.rotation--;
          }
        }
        else{
          if(e.shiftKey){
            this.data.params.x -= 10;
          }
          else{
            this.data.params.x--;
          }
        }
      }
      if(e.key==='ArrowRight'){
        if(e.metaKey||e.ctrlKey){
          if(e.shiftKey){
            this.data.params.width -= -10;
          }
          else{
            this.data.params.width++;
          }
        }
        else if(e.altKey){
          if(e.shiftKey){
            this.data.params.rotation -= -10;
          }
          else{
            this.data.params.rotation++;
          }
        }
        else{
          if(e.shiftKey){
            this.data.params.x -= -10;
          }
          else{
            this.data.params.x++;
          }
        }
      }
      if(e.key==='ArrowUp'){
        if(e.metaKey||e.ctrlKey){
          if(e.shiftKey){
            this.data.params.height -= 10;
          }
          else{
            this.data.params.height--;
          }
          if(this.data.params.height < 0){
            this.data.params.height = 0;
          }
        }
        else if(e.altKey){
          if(e.shiftKey){
            this.data.params.rotation -= 10;
          }
          else{
            this.data.params.rotation--;
          }
        }
        else{
          if(e.shiftKey){
            this.data.params.y -= 10;
          }
          else{
            this.data.params.y--;
          }
        }
      }
      if(e.key==='ArrowDown'){
        if(e.metaKey||e.ctrlKey){
          if(e.shiftKey){
            this.data.params.height -= -10;
          }
          else{
            this.data.params.height++;
          }
        }
        else if(e.altKey){
          if(e.shiftKey){
            this.data.params.rotation -= -10;
          }
          else{
            this.data.params.rotation++;
          }
        }
        else{
          if(e.shiftKey){
            this.data.params.y += 10;
          }
          else{
            this.data.params.y++;
          }
        }
      }
    },
    ondrag: function(dx, dy, mods){
      if(this.data.selection!==null){
        if(mods.ctrlKey||mods.metaKey){
          this.data.params.width -= -dx;
          this.data.params.height -= -dy;
        }
        else{
          this.data.params.x -= -dx;
          this.data.params.y -= -dy;
        }
      }
    },
    onselect: function(e){
      this.data.selection = e.target;
      this.$store.commit('select', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        value: e.target
      });
      this.data.params.width = e.data.width;
      this.$store.commit('setParam', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        param: 'width', 
        value: e.data.width
      });
      this.data.params.height = e.data.height;
      this.$store.commit('setParam', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        param: 'height', 
        value: e.data.height
      });
      this.data.params.x = e.data.x;
      this.$store.commit('setParam', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        param: 'x', 
        value: e.data.x
      });
      this.data.params.y = e.data.y;
      this.$store.commit('setParam', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        param: 'y', 
        value: e.data.y
      });
      this.data.params.rotation = e.data.rotation;
      this.$store.commit('setParam', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        param: 'rotation', 
        value: e.data.rotation
      });
      this.data.params.mirror = e.data.mirror;
      this.$store.commit('setParam', {
        category: this.name.slice(0,-1), 
        index: this.name.slice(-1), 
        param: 'mirror', 
        value: e.data.mirror
      });
      this.onPartSelected();
    },
    onPartSelected: function(e){
      this.$el.focus();
      this.$emit('focused', this.name);
    }
  },
  components: {
    'slider-input': s_i
  },
  mounted(){
    this.data.selection = this.$store.state[this.name.slice(0,-1)][this.name.slice(-1)].selection;
    this.data.params.width = this.$store.state[this.name.slice(0,-1)][this.name.slice(-1)].params.width;
    this.data.params.height = this.$store.state[this.name.slice(0,-1)][this.name.slice(-1)].params.height;
    this.data.params.x = this.$store.state[this.name.slice(0,-1)][this.name.slice(-1)].params.x;
    this.data.params.y = this.$store.state[this.name.slice(0,-1)][this.name.slice(-1)].params.y;
    this.data.params.rotation = this.$store.state[this.name.slice(0,-1)][this.name.slice(-1)].params.rotation;
    this.data.params.mirror = this.$store.state[this.name.slice(0,-1)][this.name.slice(-1)].params.mirror;
  }
}
</script>

<style type="stylus" scoped>
.options{
  width: 50%;
}
</style>