<template>
  <div class="part" :id="name" @focus="onPartSelected" tabindex="0" @keydown="onkeydown">
    <div>
      <span class="title">{{name}}:</span>
      <element-list :elements="elements" :selection="data.selection" @select="onselect"></element-list>
    </div>
    <div>
      <span class="desc">width:</span><input type="value" v-model="data.params.width">
      <span class="desc">height:</span><input type="value" v-model="data.params.height">
    </div>
    <div>
      <span class="desc">x:</span><input type="value" v-model="data.params.x">
      <span class="desc">y:</span><input type="value" v-model="data.params.y">
    </div>
    <div>
      <span class="desc">旋转:</span><input type="value" v-model="data.params.rotation">
      <span class="desc">镜像</span><input type="checkbox" v-model="data.params.mirror"> 
    </div>
  </div>
</template>

<script>
// copied from offital Vue examples
import { ImagePart } from '../scripts/model.js'
export default {
  props: ['name','elements'],
  data () {
    return {
      data: new ImagePart()
    }
  },
  watch: {
    'data.params.width': function(n, o){
      if(!isNaN(n)){
        this.$emit('changed', this.name, this.data);
      }
      else{
        this.data.params.width = o;
      }
    },
    'data.params.height': function(n, o){
      if(!isNaN(n)){
        this.$emit('changed', this.name, this.data);
      }
      else{
        this.data.params.height = o;
      }
    },
    'data.params.x': function(n, o){
      if(!isNaN(n)){
        this.$emit('changed', this.name, this.data);
      }
      else{
        this.data.params.x = o;
      }
    },
    'data.params.y': function(n, o){
      if(!isNaN(n)){
        this.$emit('changed', this.name, this.data);
      }
      else{
        this.data.params.y = o;
      }
    },
    'data.params.rotation': function(n, o){
      if(!isNaN(n)){
        this.$emit('changed', this.name, this.data);
      }
      else{
        this.data.params.rotation = o;
      }
    },
    'data.params.mirror': function(n, o){
      this.$emit('changed', this.name, this.data);
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
      this.data.params.width = e.data.width;
      this.data.params.height = e.data.height;
      this.data.params.x = e.data.x;
      this.data.params.y = e.data.y;
      this.data.params.rotation = e.data.rotation;
      this.data.params.mirror = e.data.mirror;
      this.$emit('changed', this.name, this.data);
    },
    onPartSelected: function(e){
      console.log('focused')
      this.$emit('focused', this.name);
    }
  }
}
</script>

<style type="stylus">
.title{
  display: inline-block;
  width: var(--desc-width);
  font-size: var(--desc-size);
}
.desc{
  display: inline-block;
  width: var(--desc-width);
  font-size: var(--desc-size);
  white-space: nowrap;
}
</style>