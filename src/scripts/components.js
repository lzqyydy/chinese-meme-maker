import { ImagePart, TextPart } from './model.js'

Vue.component('image-part', {
  template: '<div class="part" :id="name" @mousedown="onPartSelected">\
              <div>\
                <span class="title">{{name}}:</span>\
                <div>\
                  <img class="element" v-for="(element, i) in elements" :class="{ selected: data.selection==i }" :src="element.src" :data-index="i" @click="onclick">\
                </div>\
              </div>\
              <div>\
                <span class="desc">width:</span><input type="text" v-model="data.params.width">\
                <span class="desc">height:</span><input type="text" v-model="data.params.height">\
              </div>\
              <div>\
                <span class="desc">x:</span><input type="text" v-model="data.params.x">\
                <span class="desc">y:</span><input type="text" v-model="data.params.y">\
              </div>\
              <div>\
                <input type="checkbox" v-model="data.params.mirror">镜像 \
              </div>\
             </div>',
  props: ['name','elements'],
  data: function () {
    return {
      data: new ImagePart()
    }
  },
  watch: {
    data: {
      handler: function(newValue, oldValue){
        this.$emit('changed', this.name, newValue);
      },
      deep: true
    }
  },
  methods: {
    onclick: function(e){
      this.data.selection = e.target.dataset.index;
      this.data.params.width = this.elements[e.target.dataset.index].width;
      this.data.params.height = this.elements[e.target.dataset.index].height;
      this.data.params.x = this.elements[e.target.dataset.index].x;
      this.data.params.y = this.elements[e.target.dataset.index].y;
      this.data.params.mirror = false;
      this.$emit('changed', this.name, this.data);
      // console.log(JSON.parse(JSON.stringify(this.data)));
    },
    onPartSelected: function(e){
      // console.log(JSON.parse(JSON.stringify(this.data)));
    }
  },
  created: function(){
    // console.log(JSON.parse(JSON.stringify(this.data)));
  }
});
Vue.component('text-part', {
  template: '<div class="part" :id="name" @mousedown="onPartSelected">\
              <div>\
                <span class="title">{{name}}:</span><input type="text" v-model="data.context">\
              </div>\
              <div>\
                <span class="desc">size:</span><input type="text" v-model="data.params.size">\
              <div>\
              </div>\
                <span class="desc">x:</span><input type="text" v-model="data.params.x">\
                <span class="desc">y:</span><input type="text" v-model="data.params.y">\
              </div>\
              <div>\
                <input type="checkbox" v-model="data.params.mirror">镜像 \
              </div>\
            </div>',
  props: ['name'],
  data: function () {
    return {
      data: new TextPart()
    }
  },
  watch: {
    data: {
      handler: function(newValue, oldValue){
        this.$emit('changed', this.name, newValue);
      },
      deep: true
    }
  },
  methods: {
    onPartSelected: function(e){
      // console.log(JSON.parse(JSON.stringify(this.data)));
    }
  }
});
