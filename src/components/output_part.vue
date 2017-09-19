<template>
  <div class="outputContainer">
    <img class="output" :src="img">
    <slider-input class="options" name="padding" :min="0" :max="canvasWidth/4" :step="1" :value.sync="padding"></slider-input>
    <slider-input class="options" name="scale" :min="0" :max="2" :step="0.01" :value.sync="scale"></slider-input>
    <slider-input class="options" name="quality" :min="0" :max="100" :step="1" :value.sync="quality"></slider-input>
    <slider-input class="options" name="iteration" :min="0" :max="64" :step="1" :value.sync="iteration"></slider-input>
  </div>
</template>

<script>
import s_i from './slider_input.vue';
export default {
  props: ['img'],
  computed: {
    padding: {
      get () {
        return this.$store.state.output.padding;
      },
      set (value) {
        this.$store.commit('updatePadding', value);
        this.$emit('update');
      }
    },
    scale: {
      get () {
        return this.$store.state.output.scale;
      },
      set (value) {
        this.$store.commit('updateScale', value);
        this.$emit('update');
      }
    },
    quality: {
      get () {
        return this.$store.state.output.quality;
      },
      set (value) {
        this.$store.commit('updateQuality', value);
        this.$emit('update');
      }
    },
    iteration: {
      get () {
        return this.$store.state.output.iteration;
      },
      set (value) {
        this.$store.commit('updateIteration', value);
        this.$emit('update');
      }
    }
  },
  components: {
    'slider-input': s_i
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