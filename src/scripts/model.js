var ImagePart = class ImagePart{
  constructor(data){
    if(data!==undefined){
      this.selection = data.selection;
      this.params = {
        width: data.params.width,
        height: data.params.height,
        x: data.params.x,
        y: data.params.y,
        rotation: data.params.rotation,
        mirror: data.params.mirror
      }
    }
    else{
      this.selection = null;
      this.params = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        rotation: 0,
        mirror: false
      }
    }
  }
  set(s, w, h, x, y, r, m, k){
    this.selection = s;
    this.params.width = w;
    this.params.height = h;
    this.params.x = x;
    this.params.y = y;
    this.params.rotation = r;
    this.params.mirror = m;
  }
}

var TextPart = class TextPart{
  constructor(data){
    if(data!==undefined){
      this.context = data.context;
      this.params = {
        size: data.params.size,
        x: data.params.x,
        y: data.params.y,
        rotation: data.params.rotation,
        mirror: data.params.mirror
      }
    }
    else{
      this.context = '';
      this.params = {
        size: 16,
        x: 0,
        y: 0,
        rotation: 0,
        mirror: false
      }
    }
  }
  setParam(c, s, x, y, r, m){
    this.context = c;
    this.params.size = s;
    this.params.x = x;
    this.params.y = y;
    this.params.rotation = r;
    this.params.mir = mir;
  }
}

export { ImagePart, TextPart };