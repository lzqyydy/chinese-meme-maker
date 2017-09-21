<template>
  <div class="part" :id="name" @mousedown="onPartSelected" @touchstart="onPartSelected">
    <div>
      <span class="desc">{{name}}:</span>
    </div>
    <div>
      <element-list :elements="elements" :selection="selection" @select="onselect"></element-list>
    </div>
    <div>
      <slider-input class="options" name="width" :min="0" :max="canvasWidth" :step="1" :value.sync="width"></slider-input>
      <slider-input class="options" name="height" :min="0" :max="canvasHeight" :step="1" :value.sync="height"></slider-input>
    </div>
    <div>
      <slider-input class="options" name="x" :min="-canvasWidth/2" :max="canvasWidth/2" :step="1" :value.sync="x"></slider-input>
      <slider-input class="options" name="y" :min="-canvasHeight/2" :max="canvasHeight/2" :step="1" :value.sync="y"></slider-input>
    </div>
    <div>
      <slider-input class="options" name="rotation" :min="-180" :max="180" :step="1" :value.sync="rotation"></slider-input>
      <span class="desc">镜像</span><input type="checkbox" v-model="mirror"><span class="desc">保持比例</span><input type="checkbox" v-model="keepAspect" @change="aspectRatio=width/height"> 
    </div>
  </div>
</template>

<script>
// copied from offital Vue examples
import { canvasWidth, canvasHeight } from '../scripts/constants.js'
import s_i from './slider_input.vue'
export default {
  props: ['name','elements'],
  data () {
    return {
      category: this.name.slice(0,-1),
      index: this.name.slice(-1),
      keepAspect: true,
      aspectRatio: 1,
      canvasWidth: canvasWidth, 
      canvasHeight: canvasHeight
    }
  },
  methods: {
    onselect: function(e){
      this.selection = e.target;
      this.width = e.data.width;
      this.height = e.data.height;
      this.x = e.data.x;
      this.y = e.data.y;
      this.rotation = e.data.rotation;
      this.mirror = e.data.mirror;
      this.onPartSelected();
      this.aspectRatio = e.data.width/e.data.height;
    },
    onPartSelected: function(e){
      this.$el.focus();
      this.$emit('focused', this.name);
    }
  },
  computed: {
    selection: {
      get () {
        return this.$store.state[this.category][this.index].selection;
      },
      set (value) {
        this.$store.commit('select', {category: this.category, index:this.index, value: +value});
        this.$emit('changed');
      }
    },
    width: {
      get () {
        return this.$store.state[this.category][this.index].params.width;
      },
      set (value) {
        this.$store.commit('setParam', {category: this.category, index: this.index, param:'width', value: +value});
        if(this.keepAspect){
          this.$store.commit('setParam', {category: this.category, index: this.index, param:'height', value: value/this.aspectRatio});
        }
        this.$emit('changed');
      }
    },
    height: {
      get () {
        return this.$store.state[this.category][this.index].params.height;
      },
      set (value) {
        this.$store.commit('setParam', {category: this.category, index: this.index, param:'height', value: +value});
        if(this.keepAspect){
          this.$store.commit('setParam', {category: this.category, index: this.index, param:'width', value: value*this.aspectRatio});
        }
        this.$emit('changed');
      }
    },
    x: {
      get () {
        return this.$store.state[this.category][this.index].params.x;
      },
      set (value) {
        this.$store.commit('setParam', {category: this.category, index: this.index, param:'x', value: +value});
        this.$emit('changed');
      }
    },
    y: {
      get () {
        return this.$store.state[this.category][this.index].params.y;
      },
      set (value) {
        this.$store.commit('setParam', {category: this.category, index: this.index, param:'y', value: +value});
        this.$emit('changed');
      }
    },
    rotation: {
      get () {
        return this.$store.state[this.category][this.index].params.rotation;
      },
      set (value) {
        this.$store.commit('setParam', {category: this.category, index: this.index, param:'rotation', value: +value});
        this.$emit('changed');
      }
    },
    mirror: {
      get () {
        return this.$store.state[this.category][this.index].params.mirror;
      },
      set (value) {
        this.$store.commit('setParam', {category: this.category, index: this.index, param:'mirror', value: +value});
        this.$emit('changed');
      }
    }
  },
  components: {
    'slider-input': s_i
  },
  mounted(){
    this.aspectRatio = (this.selection!==null)&&this.width/this.height;
  }
}
</script>

<style type="stylus" scoped>
.part{
  max-width: 40vw;
}
.options{
  width: 50%;
}
</style>