import '../styles/main.css'


import { ImagePart as Head, ImagePart as Face, ImagePart as Body, ImagePart as Accessory, TextPart as Line } from './model.js'
import draw from './draw.js'
import { el_heads, el_faces, el_bodies, el_accessories } from './data.js';
import './components.js'

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
        this.bodies.push(new Body());
      }
      else{
        return;
      }
    },
    addAccessories: function(){
      if(this.accessories.length<=3){
        this.accessories.push(new Accessory());
      }
      else{
        return;
      }
    },
    addLine: function(){
      if(this.lines.length<=3){
        this.lines.push(new Line());
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