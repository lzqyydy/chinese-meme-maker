import { ImagePart as Head, ImagePart as Face, ImagePart as Body, ImagePart as Accessory, TextPart as Line } from './model.js';


const data = new Vuex.Store({
  state: {
    heads: [new Head({selection: 0, params:{width: 130, height: 115, x: 0, y: 0, rotation: 0, mirror: false}})],
    faces: [new Face({selection: 0, params:{width: 60, height: 70, x: 0, y: 0, rotation: 0, mirror: false}})],
    bodies: [],
    accessories: [],
    lines: [new Line({context: '吔屎啦你', params:{size: 18, x: 0, y: 75, rotation: 0, mirror: false}})],
    output: {
      padding: 10,
      region: {left:0, right:0, top:0, bottom:0},
      scale: 1,
      quality: 50,
      iteration: 6
    }
  },
  mutations: {
    addHead(state){
      state.heads = [ ...state.heads, new Head() ]
    },
    addFace(state){
      state.faces = [ ...state.faces, new Face() ]
    },
    addBody(state){
      state.bodies = [ ...state.bodies, new Body() ]
    },
    addAccessory(state){
      state.accessories = [ ...state.accessories, new Accessory() ]
    },
    addLine(state){
      state.lines = [ ...state.lines, new Line() ]
    },
    delete(state, {category, index}){
      state[category].splice(index, 1);
    },
    select(state, {category, index, value}){
      Vue.set(state[category][index], 'selection', value);
    },
    contextChange(state, {index, value}){
      Vue.set(state['lines'][index], 'context', value);
    },
    setParam(state, {category, index, param, value}){
      Vue.set(state[category][index].params, param, value);
    },
    updatePadding(state, padding){
      state.output.padding = padding;
    },
    updateRegion(state, region){
      state.output.region = region;
    },
    updateScale(state, scale){
      state.output.scale = scale;
    },
    updateQuality(state, quality){
      state.output.quality = quality;
    },
    updateIteration(state, iteration){
      state.output.iteration = iteration;
    },
  }
})

export default data;