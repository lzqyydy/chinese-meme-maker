import '../styles/main.css'

import { drawImage, drawMirrorImage, fillText, fillMirrorText } from './drawMethods.js'

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

    head: [{
      selection: null,
      params: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        mirror: false
      }
    }],
    face: [{
      selection: null,
      params: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        mirror: false
      }
    }],
    bodies: [],
    accessories: [],
    lines: [{
      context: '',
      params: {
        size: 20,
        x: 200,
        y: 0,
        mirror: false
      }
    }]
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
    redraw: function(){
      var canvas = document.querySelector('#canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(this.head[0]&&this.head[0].selection!==null){
        if(!this.head[0].params.mirror){
          drawImage(ctx, document.querySelector('#head').querySelectorAll('.element')[this.head[0].selection],
                        this.head[0].params.x,
                        this.head[0].params.y,
                        this.head[0].params.width,
                        this.head[0].params.height)
        }
        else{
          drawMirrorImage(ctx, document.querySelector('#head').querySelectorAll('.element')[this.head[0].selection],
                        this.head[0].params.x,
                        this.head[0].params.y,
                        this.head[0].params.width,
                        this.head[0].params.height)
        }
      }
      if(this.face[0]&&this.face[0].selection!==null){
        if(!this.face[0].params.mirror){
          drawImage(ctx, document.querySelector('#face').querySelectorAll('.element')[this.face[0].selection],
                        this.face[0].params.x,
                        this.face[0].params.y,
                        this.face[0].params.width,
                        this.face[0].params.height)
        }
        else{
          drawMirrorImage(ctx, document.querySelector('#face').querySelectorAll('.element')[this.face[0].selection],
                        this.face[0].params.x,
                        this.face[0].params.y,
                        this.face[0].params.width,
                        this.face[0].params.height)
        }
      }
      for(var i=0;i<this.bodies.length;i++){
        if(this.bodies[i].selection!==null){
          if(!this.bodies[i].params.mirror){
            drawImage(ctx, document.querySelector('#body'+i).querySelectorAll('.element')[this.bodies[i].selection],
                        this.bodies[i].params.x,
                        this.bodies[i].params.y,
                        this.bodies[i].params.width,
                        this.bodies[i].params.height)
          }
          else{
            drawMirrorImage(ctx, document.querySelector('#body'+i).querySelectorAll('.element')[this.bodies[i].selection],
                        this.bodies[i].params.x,
                        this.bodies[i].params.y,
                        this.bodies[i].params.width,
                        this.bodies[i].params.height)
          }
        }
      }

      for(var i=0;i<this.accessories.length;i++){
        if(this.accessories[i].selection!==null){
          if(!this.accessories[i].params.mirror){
            drawImage(ctx, document.querySelector('#accessory'+i).querySelectorAll('.element')[this.accessories[i].selection],
                        this.accessories[i].params.x,
                        this.accessories[i].params.y,
                        this.accessories[i].params.width,
                        this.accessories[i].params.height)
          }
          else{
            drawMirrorImage(ctx, document.querySelector('#accessory'+i).querySelectorAll('.element')[this.accessories[i].selection],
                        this.accessories[i].params.x,
                        this.accessories[i].params.y,
                        this.accessories[i].params.width,
                        this.accessories[i].params.height)
          }
        }
      }

      for(var i=0;i<this.lines.length;i++){
        if(this.lines[i].context!==''){
          ctx.font=this.lines[i].params.size+"px Georgia";
          ctx.textAlign="center"; 
          ctx.textBaseline="middle"; 
          if(!this.lines[i].params.mirror){
            fillText(ctx, this.lines[i].context,this.lines[i].params.x,parseInt(this.lines[i].params.y)+parseInt(this.lines[i].params.size)); 
          }
          else{
            fillMirrorText(ctx, this.lines[i].context,this.lines[i].params.x,parseInt(this.lines[i].params.y)+parseInt(this.lines[i].params.size)); 
          }
        }
      }
    }
  },
  created: function(){
    this.lines[0].context = '妙！';
    this.lines[0].params.size = 20;
    this.lines[0].params.x = 200;
    this.lines[0].params.y = 200;

    var heads=[{
      src: 'resources/yashi/heads/0000.png',
      width: 150,
      height: 150,
      x: 125,
      y: 70,
      mirror: false
    }];
    var faces=[{
      src: 'resources/yashi/faces/0000.png',
      width: 60,
      height: 70,
      x: 170,
      y: 87,
      mirror: false
    },{
      src: 'resources/yashi/faces/0001.png',
      width: 71,
      height: 64,
      x: 165,
      y: 99,
      mirror: false
    }];
    var bodies=[{
      src: 'resources/yashi/bodies/0000.png',
      width: 210,
      height: 92,
      x: 125,
      y: 105,
      mirror: false
    },{
      src: 'resources/yashi/bodies/0001.png',
      width: 64,
      height: 122,
      x: 269,
      y: 74,
      mirror: false
    }];
    var accessories=[{
      src: 'resources/yashi/accessories/hat.png',
      width: 71,
      height: 64,
      x: 165,
      y: 99,
      mirror: false
    }]
    for(var i=0;i<heads.length;i++){
      this.elements.heads.push(heads[i])
    }
    for(var i=0;i<faces.length;i++){
      this.elements.faces.push(faces[i])
    }
    for(var i=0;i<bodies.length;i++){
      this.elements.bodies.push(bodies[i])
    }
    for(var i=0;i<accessories.length;i++){
      this.elements.accessories.push(accessories[i])
    }
  }
})