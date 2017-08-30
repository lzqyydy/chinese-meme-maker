<template>
  <div class="wrapper" @touchstart.stop="" @touchmove.stop="" @touchend.stop="" @touchcancel.stop="" @mousedown.stop="" @mousemove.stop="" @mouseup.stop="" @mouseleave.stop="" @keydown.prevent="">
    <span class="desc">{{name}}</span><input type="range" :min="min" :max="max" :step="step" :value="value" @input="oninput"><input class="checker" type="value" :value="value" readonly>
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
.wrapper{
  display: inline-block;
}
.desc{
  display: inline-block;
  width: var(--desc-width);
  font-size: var(--desc-size);
  white-space: nowrap;
}
.checker{
  width: 35px;
}
</style>