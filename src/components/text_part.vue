<template>
  <div class="part" :id="name" @focus="onPartSelected" tabindex="0" @keydown="onkeydown">
    <div>
      <span class="title">{{name}}:</span><input type="text" v-model="data.context">
    </div>
    <div>
      <span class="desc">size:</span><input type="value" v-model="data.params.size">
    <div>
    </div>
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
import { TextPart } from '../scripts/model.js'
export default {
  props: ['name'],
  data () {
    return {
      data: new TextPart()
    }
  },
  watch: {
    'data.context': function(n, o){
      this.$emit('changed', this.name, this.data);
    },
    'data.params.size': function(n, o){
      if(!isNaN(n)){
        this.$emit('changed', this.name, this.data);
      }
      else{
        this.data.params.width = o;
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
            this.data.params.size -= 10;
          }
          else{
            this.data.params.size--;
          }
          if(this.data.params.size < 0){
            this.data.params.size = 0;
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
            this.data.params.size += 10;
          }
          else{
            this.data.params.size++;
          }
        }
        else{
          if(e.shiftKey){
            this.data.params.x += 10;
          }
          else{
            this.data.params.x++;
          }
        }
      }
      if(e.key==='ArrowUp'){
        if(e.metaKey||e.ctrlKey){
          if(e.shiftKey){
            this.data.params.size -= 10;
          }
          else{
            this.data.params.size--;
          }
          if(this.data.params.size < 0){
            this.data.params.size = 0;
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
            this.data.params.size += 10;
          }
          else{
            this.data.params.size++;
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
      if(this.data.context!==null){
        if(mods.ctrlKey||mods.metaKey){
          this.data.params.size -= -dx;
          this.data.params.size -= -dy;
        }
        else{
          this.data.params.x -= -dx;
          this.data.params.y -= -dy;
        }
      }
    },
    onPartSelected: function(e){
      console.log('focused');
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