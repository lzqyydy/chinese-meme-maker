<template>
  <div class="text-wrapper" @touchstart.stop="" @touchmove.stop="" @mousedown.stop="" @mousemove.stop="">
    <span class="text-desc">{{name}}</span><input class="text-input" type="text" :min="min" :max="max" :step="step" :value="value" @input="oninput">
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ['name', 'value'],
  methods: {
    oninput(e){
      //important
      this.$emit('update:value', e.target.value);
    }
  }
}
</script>

<style scoped>
.text-wrapper{
  display: inline-block;
}
.text-desc{
  width: 25%;
  display: inline-block;
  font-size: var(--desc-size);
}
.text-input{
  width: 75%;
  box-sizing: border-box;
}
</style>