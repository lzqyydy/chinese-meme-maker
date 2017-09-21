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
      displayBorder: false,
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
    output: function(){
      this.controller.showOutput = true;
    },
    redraw: function(){
      var drawList = this.order.map((v)=>{
        return {type: v.type, index: v.index, data: this.$store.state[v.type][v.index]}
      })
      newDraw(drawList);
      this.$store.commit('updateRegion', newBorder(drawList, +this.$store.state.padding, this.controller.displayBorder));
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
      document.querySelector('#heads0').querySelector('.element').onload = () => {
        resolve();
      }
    }), new Promise(resolve => {
      document.querySelector('#faces0').querySelector('.element').onload = () => {
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
        this.$store.commit('delete', {category:evt.item.innerText.slice(0,-1), index:evt.item.innerText.slice(-1)});
      }
    });
  }
});
