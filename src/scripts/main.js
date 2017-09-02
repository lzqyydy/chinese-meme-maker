import '../styles/main.css';

import { canvasWidth, canvasHeight } from './constants.js'

import { ImagePart as Head, ImagePart as Face, ImagePart as Body, ImagePart as Accessory, TextPart as Line } from './model.js';
import { newDraw, newBorder } from './draw.js';
import { el_heads, el_faces, el_bodies, el_accessories } from './data.js';
import './components.js';

import { swipeMixin } from './mixins.js';

import * as C from './constants.js'

import Sortable from './sortable.esm.js'

import store from './store.js'


const app = new Vue({
  el: '#app',
  mixins: [swipeMixin],
  data: {
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
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
    order: [{type: 'heads', index: 0}, {type: 'faces', index: 0}, {type: 'lines', index: 0}],
    activePart: null,
    controller: {
      padding: 25,
      displayBorder: false,
      rect: {top: 0, right: 0, bottom: 0, left: 0},
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
        var target = parseInt(name.slice('bodies'.length));
        Vue.set(this.bodies, target, data)
      }
      if(name.startsWith('acc')){
        var target = parseInt(name.slice('accessories'.length));
        Vue.set(this.accessories, target, data)
      }
      if(name.startsWith('line')){
        var target = parseInt(name.slice('lines'.length));
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
        this.order.push({type: 'bodies', index: this.bodies.length-1});
      }
      else{
        return;
      }
    },
    addAccessories: function(){
      if(this.accessories.length<=3){
        this.accessories.push(new Accessory());
        this.order.push({type: 'accessories', index: this.accessories.length-1});
      }
      else{
        return;
      }
    },
    addLine: function(){
      if(this.lines.length<=3){
        this.lines.push(new Line());
        this.order.push({type: 'lines', index: this.lines.length-1});
      }
      else{
        return;
      }
    },
    output: function(){
      var canvas = document.querySelector('#canvas');
      var inv = document.querySelector('#invisible');
      inv.width = this.controller.rect.right-this.controller.rect.left+this.controller.padding*2;
      inv.height = this.controller.rect.bottom-this.controller.rect.top+this.controller.padding*2;
      inv.getContext('2d').drawImage(canvas, canvas.width/2+this.controller.rect.left-this.controller.padding, canvas.height/2+this.controller.rect.top-this.controller.padding, inv.width, inv.height, 0, 0, inv.width, inv.height);
      this.controller.outputImg = document.querySelector('#invisible').toDataURL();
      this.controller.showOutput = true;
    },
    redraw: function(){
      var drawList = this.order.map((v)=>{
        return {type: v.type, index: v.index, data: this[v.type][v.index]}
      })
      newDraw(drawList);
      this.controller.rect = newBorder(drawList, +this.controller.padding, this.controller.displayBorder);
    }
  },
  mounted: function(){
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
    Sortable.create(renderList, {
      group: 'renderList',
      animation: 100,
      onChoose: (evt) => {
        this.activePart = (evt.item.innerHTML);
      },
      onEnd: (evt) => {
        this.order.swap(evt.oldIndex, evt.newIndex);
        this.redraw();
      }
    });
  }
});

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}