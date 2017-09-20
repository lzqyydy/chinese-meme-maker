<template>
  <div class="outputContainer">
    <img class="output" :src="rendered">
    <slider-input class="options" name="padding" :min="0" :max="50" :step="1" :value.sync="padding"></slider-input>
    <slider-input class="options" name="scale" :min="0" :max="2" :step="0.01" :value.sync="scale"></slider-input>
    <slider-input class="options" name="quality" :min="0" :max="100" :step="1" :value.sync="quality"></slider-input>
    <slider-input class="options" name="iteration" :min="0" :max="64" :step="1" :value.sync="iteration"></slider-input>
    <canvas id="invisible" style="display: none"></canvas>
  </div>
</template>

<script>
import { canvasWidth, canvasHeight } from '../scripts/constants.js'
import s_i from './slider_input.vue';
export default {
  data(){
    return{
      rendered: '',
      currentIteration: 0,
      finished: true
    }
  },
  methods: {
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
        img.src = canvas.toDataURL("image/jpeg", this.$store.state.output.quality/100);
          
      });
    },
    output: async function(){
      console.log(this.currentIteration, this.$store.state.output.iteration)
      if(this.currentIteration < this.$store.state.output.iteration){
        this.currentIteration++;

        var inv = this.$el.querySelector('#invisible');
        
        await this.iter(inv);

        this.rendered = inv.toDataURL();

        requestAnimationFrame(this.output);
      }
      else{
        this.finished = true;
      }
    },
    reset: function(){
      var canvas = document.querySelector('#canvas');
      var inv = this.$el.querySelector('#invisible');

      inv.width = this.$store.state.output.scale*(this.$store.state.output.region.right-this.$store.state.output.region.left)+this.$store.state.output.padding*2;
      inv.height = this.$store.state.output.scale*(this.$store.state.output.region.bottom-this.$store.state.output.region.top)+this.$store.state.output.padding*2;
      inv.getContext('2d').drawImage(canvas, canvas.width/2+this.$store.state.output.region.left-this.$store.state.output.padding, canvas.height/2+this.$store.state.output.region.top-this.$store.state.output.padding, this.$store.state.output.region.right-this.$store.state.output.region.left+this.$store.state.output.padding*2, this.$store.state.output.region.bottom-this.$store.state.output.region.top+this.$store.state.output.padding*2, 0, 0, inv.width, inv.height);

      this.currentIteration = 0;
      if(this.finished){
        this.finished = false;
        this.output();
      }
    }
  },
  computed: {
    padding: {
      get () {
        return this.$store.state.output.padding;
      },
      set (value) {
        this.$store.commit('updatePadding', +value);
        this.reset();
      }
    },
    scale: {
      get () {
        return this.$store.state.output.scale;
      },
      set (value) {
        this.$store.commit('updateScale', +value);
        this.reset();
      }
    },
    quality: {
      get () {
        return this.$store.state.output.quality;
      },
      set (value) {
        this.$store.commit('updateQuality', +value);
        this.reset();
      }
    },
    iteration: {
      get () {
        return this.$store.state.output.iteration;
      },
      set (value) {
        this.$store.commit('updateIteration', +value);
        this.reset();
      }
    }
  },
  components: {
    'slider-input': s_i
  },
  mounted(){
    this.reset();
  }
}
</script>

<style scoped>
.outputContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>