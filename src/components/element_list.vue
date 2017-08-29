<template>
  <!-- <div class="button inline">left</div> -->
  <scroll-view class="container" :vertical="false">
    <img class="element" v-for="(element, i) in elements" :class="{ 'elm-selected': selection==i }" :src="element.src" :data-index="i" @click.stop="onclick">
  </scroll-view>
  <!-- <div class="button inline">right</div> -->
</template>

<script>
import s_v from '../../../lib/scroll_view.vue';

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
  },
  components: {
    'scroll-view': s_v
  }
}
// lol overflow: hidden create block context or smh so those 'inline' elms must get middle aligned
</script>

<style type="stylus" scoped>
/*.flex{
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
}
.inline{
  display: inline-block;
  vertical-align: middle;
}
.button{
  flex-basis: calc(var(--element-size) / 2);
}*/
.container{
  width: calc(var(--element-size) * 6.2);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.element {
  max-width: var(--element-size);
  max-height: var(--element-size);
  border: 1px black;
  box-sizing: border-box;
  vertical-align: middle;
}
.elm-selected {
  box-shadow: 0 0 5px #666;
}
</style>