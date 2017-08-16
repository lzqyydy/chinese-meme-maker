import '../styles/main.css';

import { ImagePart as Head, ImagePart as Face, ImagePart as Body, ImagePart as Accessory, TextPart as Line } from './model.js';
import {draw, border} from './draw.js';
import { el_heads, el_faces, el_bodies, el_accessories } from './data.js';
import './components.js';

import { swipeMixin } from './mixins.js';

import * as C from './constants.js'

var app = new Vue({
  el: '#app',
  mixins: [swipeMixin],
  data: {
    canvasWidth: 360,
    canvasHeight: 270,
    elements: {
      heads: [],
      faces: [],
      bodies: [],
      accessories: []
    },
    heads: [new Head()],
    faces: [new Face()],
    bodies: [],
    accessories: [],
    lines: [new Line()],
    activePart: null,
    controller: {
      padding: 25,
      outputImg: '',
      showOutput: false
    }
  },
  methods: {
    updateData: function(name, data){
      if(name.startsWith('head')){
        Vue.set(this.heads, 0, data)
      }
      if(name.startsWith('face')){
        Vue.set(this.faces, 0, data)
      }
      if(name.startsWith('bod')){
        var target = parseInt(name.slice('body'.length));
        Vue.set(this.bodies, target, data)
      }
      if(name.startsWith('acc')){
        var target = parseInt(name.slice('accessory'.length));
        Vue.set(this.accessories, target, data)
      }
      if(name.startsWith('line')){
        var target = parseInt(name.slice(4));
        Vue.set(this.lines, target, data)
      }
      this.redraw();
    },
    updateTarget: function(name){
      this.activePart = name;
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
    output: function(){
      this.controller.outputImg = document.querySelector('#canvas').toDataURL();
      this.controller.showOutput = true;
    },
    redraw: function(){
      draw.call(this);
      border.call(this, +this.controller.padding, false);
    }
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