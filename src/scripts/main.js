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

import browser from './browser.js'

// if(browser.isFirefox||browser.isChrome||browser.isSafari){
  document.querySelector('#imcompitableCover').style.display = 'none'
// }
// else{
//   alert(browser.isFirefox);
//   alert(browser.isChrome);
//   alert(browser.isSafari);
// }

const app = new Vue({
  el: '#app',
  mixins: [swipeMixin],
  store,
  data: {
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    elements: {
      heads: [],
      faces: [],
      bodies: [],
      accessories: []
    },
    order: [{type: 'heads', index: 0}, {type: 'faces', index: 0}, {type: 'lines', index: 0}],
    activePart: null,
    controller: {
      padding: 10,
      displayBorder: false,
      rect: {top: 0, right: 0, bottom: 0, left: 0},
      outputImg: '',
      showOutput: false
    }
  },
  methods: {
    updateCanvas: function(name, data){
      this.redraw();
    },
    updateTarget: function(name){
      this.activePart = name;
      this.redraw();
    },
    addBody: function(){
      if(this.$store.state.bodies.length<=3){
        this.$store.commit('addBody');
        this.order.push({type: 'bodies', index: this.$store.state.bodies.length-1});
      }
      else{
        return;
      }
    },
    addAccessory: function(){
      if(this.$store.state.accessories.length<=3){
        this.$store.commit('addAccessory');
        this.order.push({type: 'accessories', index: this.$store.state.accessories.length-1});
      }
      else{
        return;
      }
    },
    addLine: function(){
      if(this.$store.state.lines.length<=3){
        this.$store.commit('addLine');
        this.order.push({type: 'lines', index: this.$store.state.lines.length-1});
      }
      else{
        return;
      }
    },
    clamp: function(x){
      if(x<0){
        return 0;
      }
      if(x>255){
        return 255;
      }
      return x;
    },
    clampuv: function(x){
      if(x<-128){
        return -128;
      }
      if(x>127){
        return 127;
      }
      return x;
    },
    iter: function(canvas){
      return new Promise(resolve =>{
        var img = new Image();
        img.onload = function(){
          canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
          resolve();
        }
        var imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        for(let p = 0; p < data.length/4; ++p) {
            const r = data[p*4  ];
            const g = data[p*4+1];
            const b = data[p*4+2];
            const y = this.clamp  ((  77*r + 150*g +  29*b) >> 8);
            const u = this.clampuv(((-43*r -  85*g + 128*b) >> 8) - 1);
            const v = this.clampuv(((128*r - 107*g -  21*b) >> 8) - 1);
            const r1 = this.clamp((65536*y           + 91881*v) >> 16);
            const g1 = this.clamp((65536*y - 22553*u - 46802*v) >> 16);
            const b1 = this.clamp((65536*y + 116130*u         ) >> 16);
            data[p*4  ] = r1;
            data[p*4+1] = g1;
            data[p*4+2] = b1;
        }
        canvas.getContext('2d').putImageData(imageData, 0, 0);
        img.src = canvas.toDataURL("image/jpeg", 0.5);
          
      });
    },
    output: async function(){
      var canvas = document.querySelector('#canvas');
      var inv = document.querySelector('#invisible');
      // canvas.crossOrigin = "Anonymous";
      // inv.crossOrigin = "Anonymous";
      inv.width = this.controller.rect.right-this.controller.rect.left+this.controller.padding*2;
      inv.height = this.controller.rect.bottom-this.controller.rect.top+this.controller.padding*2;
      inv.getContext('2d').drawImage(canvas, canvas.width/2+this.controller.rect.left-this.controller.padding, canvas.height/2+this.controller.rect.top-this.controller.padding, inv.width, inv.height, 0, 0, inv.width, inv.height);
      

      for(let i = 0; i < 6; i++) {
        await this.iter(inv);
        console.log(Date.now())
      }

      this.controller.outputImg = document.querySelector('#invisible').toDataURL();
      this.controller.showOutput = true;
    },
    redraw: function(){
      var drawList = this.order.map((v)=>{
        return {type: v.type, index: v.index, data: this.$store.state[v.type][v.index]}
      })
      newDraw(drawList);
      this.controller.rect = newBorder(drawList, +this.controller.padding, this.controller.displayBorder);
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
  },
  mounted: function(){
    Promise.all([new Promise(resolve => {
      this.$refs['heads'][0].$el.querySelector('.element').onload = () => {
        resolve();
      }
    }), new Promise(resolve => {
      this.$refs['faces'][0].$el.querySelector('.element').onload = () => {
        resolve();
      }
    })]).then(() => {
      this.redraw();
    })
    Sortable.create(renderList, {
      group: 'renderList',
      animation: 100,
      onChoose: (evt) => {
        this.activePart = (evt.item.innerHTML);
      },
      onRemove: (evt) => {
        this.order.splice(evt.oldIndex, 1);
        this.redraw();
      },
      onUpdate: (evt) => {
        this.order.splice(evt.newIndex, 0, this.order.splice(evt.oldIndex, 1)[0])
        this.redraw();
      }
    });
    Sortable.create(trashBin, {
      group: {name: 'trashBin', put: 'renderList'},
      animation: 100,
      onAdd: (evt) => {
        evt.item.remove();
      }
    });
  }
});
