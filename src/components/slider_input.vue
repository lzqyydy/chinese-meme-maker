<template>
  <div class="slider-wrapper" @touchstart.stop="" @touchmove.stop="" @touchend.stop="" @touchcancel.stop="" @mousedown.stop="" @mousemove.stop="" @mouseup.stop="" @mouseleave.stop="" @keydown.prevent="">
    <span class="slider-desc">{{name}}</span><input class="slider-bar" type="range" :min="min" :max="max" :step="step" :value="value" @input="oninput"><input class="slider-checker" type="value" :value="value" readonly>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ['name', 'min', 'max', 'step', 'value'],
  methods: {
    oninput(e){
      //important
      this.$emit('update:value', e.target.value);
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
.slider-wrapper{
  display: inline-block;
}
.slider-desc{
  width: 25%;
  display: inline-block;
  font-size: var(--desc-size);
}
.slider-bar{
  width: 60%;
  box-sizing: border-box;
}
.slider-checker{
  width: 15%;
  box-sizing: border-box;
}
</style>