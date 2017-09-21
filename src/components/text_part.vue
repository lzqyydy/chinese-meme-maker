<template>
  <div class="part" :id="name" @mousedown="onPartSelected" @touchstart="onPartSelected">
    <div>
      <text-input class="options" :name="name" :value.sync="context"></text-input>
    </div>
    <div>
      <slider-input class="options" name="size" :min="0" :max="canvasHeight" :step="1" :value.sync="size"></slider-input>
    <div>
    </div>
      <slider-input class="options" name="x" :min="-canvasWidth/2" :max="canvasWidth/2" :step="1" :value.sync="x"></slider-input>
      <slider-input class="options" name="y" :min="-canvasHeight/2" :max="canvasHeight/2" :step="1" :value.sync="y"></slider-input>
    </div>
    <div>
      <slider-input class="options" name="rotation" :min="-180" :max="180" :step="1" :value.sync="rotation"></slider-input>
      <span class="desc">镜像</span><input type="checkbox" v-model="mirror"> 
    </div>
  </div>
</template>

<script>
// copied from offital Vue examples
import { canvasWidth, canvasHeight } from '../scripts/constants.js'
import { TextPart } from '../scripts/model.js'
import t_i from './text_input.vue'
import s_i from './slider_input.vue'
export default {
  props: ['name'],
  data () {
    return {
      category: this.name.slice(0,-1),
      index: this.name.slice(-1),
      canvasWidth: canvasWidth, 
      canvasHeight: canvasHeight
    }
  },
  methods: {
    onPartSelected: function(e){
      this.$el.focus();
      this.$emit('focused', this.name);
    }
  },
  computed: {
    context: {
      get () {
        return this.$store.state[this.category][this.index].context;
      },
      set (value) {
        this.$store.commit('contextChange', {index:this.index, value: value});
        this.$emit('changed');
      }
    },
    size: {
      get () {
        return this.$store.state[this.category][this.index].params.size;
      },
      set (value) {
        this.$store.commit('setParam', {category: this.category, index: this.index, param:'size', value: +value});
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
    'slider-input': s_i,
    'text-input': t_i
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