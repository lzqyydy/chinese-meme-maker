import { ImagePart as Head, ImagePart as Face, ImagePart as Body, ImagePart as Accessory, TextPart as Line } from './model.js';


const data = new Vuex.Store({
  state: {
    heads: [new Head()],
    faces: [new Face()],
    bodies: [],
    accessories: [],
    lines: [new Line()]
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
    select(state, {category, index, value}){
      Vue.set(state[category][index], 'selection', value);
    },
    contextChange(state, {index, value}){
      Vue.set(state['lines'][index], 'context', value);
    },
    setParam(state, {category, index, param, value}){
      Vue.set(state[category][index].params, param, value);
    }
  }
})

export default data;