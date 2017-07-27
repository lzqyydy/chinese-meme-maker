import '../styles/main.css'


import { ImagePart as Head, ImagePart as Face, ImagePart as Body, ImagePart as Accessory, TextPart as Line } from './model.js'
import draw from './draw.js'
import { el_heads, el_faces, el_bodies, el_accessories } from './data.js';

Vue.component('image-part', {
  template: '<div class="part" :id="name" @mousedown="onPartSelected">\
              <div>\
                <span class="title">{{name}}:</span>\
                <div>\
                  <img class="element" v-for="(element, i) in elements" :class="{ selected: data.selection==i }" :src="element.src" :data-index="i" @click="onclick">\
                </div>\
              </div>\
              <div>\
                <span class="desc">width:</span><input type="text" v-model="data.params.width">\
                <span class="desc">height:</span><input type="text" v-model="data.params.height">\
              </div>\
              <div>\
                <span class="desc">x:</span><input type="text" v-model="data.params.x">\
                <span class="desc">y:</span><input type="text" v-model="data.params.y">\
              </div>\
              <div>\
                <input type="checkbox" v-model="data.params.mirror">镜像 \
              </div>\
             </div>',
  props: ['name','data','elements'],
  watch: {
    data: {
      handler: function(newValue, oldValue){
        this.$emit('changed', this.name, newValue);
      },
      deep: true
    }
  },
  methods: {
    onclick: function(e){
      var el = {
        selection: e.target.dataset.index,
        params:{
          width: this.elements[e.target.dataset.index].width,
          height: this.elements[e.target.dataset.index].height,
          x: this.elements[e.target.dataset.index].x,
          y: this.elements[e.target.dataset.index].y,
          mirror: false
        }
      }
      this.$emit('changed', this.name, el);
    },
    onPartSelected: function(e){
      console.log(1)
    }
  },
  created: function(){
    console.log(this.elements);
  }
});
Vue.component('text-line', {
  template: '<div class="part" :id="name" @mousedown="onPartSelected">\
              <div>\
                <span class="title">{{name}}:</span><input type="text" v-model="data.context">\
              </div>\
              <div>\
                <span class="desc">size:</span><input type="text" v-model="data.params.size">\
              <div>\
              </div>\
                <span class="desc">x:</span><input type="text" v-model="data.params.x">\
                <span class="desc">y:</span><input type="text" v-model="data.params.y">\
              </div>\
              <div>\
                <input type="checkbox" v-model="data.params.mirror">镜像 \
              </div>\
            </div>',
  props: ['name','data'],
  watch: {
    data: {
      handler: function(newValue, oldValue){
        this.$emit('changed', this.name, newValue);
      },
      deep: true
    }
  },
  methods: {
    onPartSelected: function(e){
    }
  }
});
var app = new Vue({
  el: '#app',
  data: {
    canvasWidth: 400,
    canvasHeight: 300,
    elements: {
      heads: [],
      faces: [],
      bodies: [],
      accessories: []
    },
    head: [new Head()],
    face: [new Face()],
    bodies: [],
    accessories: [],
    lines: [new Line()]
  },
  methods: {
    update: function(type, data){
      if(type.startsWith('head')){
        Vue.set(this.head, 0, data)
      }
      if(type.startsWith('face')){
        Vue.set(this.face, 0, data)
      }
      if(type.startsWith('bod')){
        var target = parseInt(type.slice('body'.length));
        Vue.set(this.bodies, target, data)
      }
      if(type.startsWith('acc')){
        var target = parseInt(type.slice('accessory'.length));
        Vue.set(this.accessories, target, data)
      }
      if(type.startsWith('line')){
        var target = parseInt(type.slice(4));
        Vue.set(this.lines, target, data)
      }
      this.redraw();
    },
    addBody: function(){
      if(this.bodies.length<=3){
        this.bodies.push({
          selection: null,
          params: {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          }
        });
      }
      else{
        return;
      }
    },
    addAccessories: function(){
      if(this.accessories.length<=3){
        this.accessories.push({
          selection: null,
          params: {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            mirror: false
          }
        });
      }
      else{
        return;
      }
    },
    addLine: function(){
      if(this.lines.length<=3){
        this.lines.push({
          context: '',
          params: {
            size: 20,
            x: 200,
            y: 0,
            mirror: false
          }
        });
      }
      else{
        return;
      }
    },
    redraw: draw
  },
  created: function(){
    for(var i=0;i<el_heads.length;i++){
      this.elements.heads.push(el_heads[i])
    }
    for(var i=0;i<el_faces.length;i++){
      this.elements.faces.push(el_faces[i])
    }
    for(var i=0;i<el_bodies.length;i++){
      this.elements.bodies.push(el_bodies[i])
    }
    for(var i=0;i<el_accessories.length;i++){
      this.elements.accessories.push(el_accessories[i])
    }
  }
})