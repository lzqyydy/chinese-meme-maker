import { ImagePart, TextPart } from './model.js'

import m from '../../../lib/modal.vue';

Vue.component('modal', m);

Vue.component('image-part', {
  template: '<div class="part" :id="name" @focus="onPartSelected" tabindex="0" @keydown="onkeydown">\
              <div>\
                <span class="title">{{name}}:</span>\
                <div>\
                  <img class="element" v-for="(element, i) in elements" :class="{ selected: data.selection==i }" :src="element.src" :data-index="i" @click="onclick">\
                </div>\
              </div>\
              <div>\
                <span class="desc">width:</span><input type="value" v-model="data.params.width">\
                <span class="desc">height:</span><input type="value" v-model="data.params.height">\
              </div>\
              <div>\
                <span class="desc">x:</span><input type="value" v-model="data.params.x">\
                <span class="desc">y:</span><input type="value" v-model="data.params.y">\
              </div>\
              <div>\
                <span class="desc">旋转:</span><input type="value" v-model="data.params.rotation">\
                <span class="desc">镜像</span><input type="checkbox" v-model="data.params.mirror"> \
              </div>\
             </div>',
  props: ['name','elements'],
  data: function () {
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
    onclick: function(e){
      this.data.selection = e.target.dataset.index;
      this.data.params.width = this.elements[e.target.dataset.index].width;
      this.data.params.height = this.elements[e.target.dataset.index].height;
      this.data.params.x = this.elements[e.target.dataset.index].x;
      this.data.params.y = this.elements[e.target.dataset.index].y;
      this.data.params.mirror = false;
      this.$emit('changed', this.name, this.data);
      // console.log(JSON.parse(JSON.stringify(this.data)));
    },
    onPartSelected: function(e){
      // console.log('focused')
      this.$emit('focused', this.name);
    }
  },
  created: function(){
  }
});
Vue.component('text-part', {
  template: '<div class="part" :id="name" @focus="onPartSelected" tabindex="0" @keydown="onkeydown">\
              <div>\
                <span class="title">{{name}}:</span><input type="text" v-model="data.context">\
              </div>\
              <div>\
                <span class="desc">size:</span><input type="value" v-model="data.params.size">\
              <div>\
              </div>\
                <span class="desc">x:</span><input type="value" v-model="data.params.x">\
                <span class="desc">y:</span><input type="value" v-model="data.params.y">\
              </div>\
              <div>\
                <span class="desc">旋转:</span><input type="value" v-model="data.params.rotation">\
                <span class="desc">镜像</span><input type="checkbox" v-model="data.params.mirror"> \
              </div>\
            </div>',
  props: ['name'],
  data: function () {
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
      // console.log(JSON.parse(JSON.stringify(this.data)));
      this.$emit('focused', this.name);
    }
  }
});
