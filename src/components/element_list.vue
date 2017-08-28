<template>
  <div>
    <div class="inline">
      
    </div>
    <div class="inline">
      <img class="element" v-for="(element, i) in elements" :class="{ 'elm-selected': selection==i }" :src="element.src" :data-index="i" @click="onclick">
    </div>
    <div class="inline">
      
    </div>
  </div>
</template>

<script>
// copied from offital Vue examples
export default {
  props: ['elements', 'selection'],
  methods: {
    onclick(e) {
      var target = e.target.dataset.index;
      this.$emit('select', {
        target: target, 
        data: this.elements[target]
      });
    }
  }
}
</script>

<style type="stylus">
.inline{
  display: inline-block;
}
.element {
  max-width: var(--element-size);
  max-height: var(--element-size);
  border: 1px black;
  box-sizing: border-box;
}
.elm-selected {
  box-shadow: 0 0 5px #666;
}
</style>