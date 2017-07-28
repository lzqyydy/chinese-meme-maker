var ImagePart = class ImagePart{
  constructor(data){
    if(data!==undefined){
      this.selection = data.selection;
      this.params = {
        width: data.width,
        height: data.height,
        x: data.x,
        y: data.y,
        mirror: data.mirror
      }
    }
    else{
      this.selection = null;
      this.params = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        mirror: false
      }
    }
  }
  setParam(w, h, x, y, mir){
    this.params.width = w;
    this.params.height = h;
    this.params.x = x;
    this.params.y = y;
    this.params.mir = mir;
  }
}

var TextPart = class TextPart{
  constructor(data){
    if(data!==undefined){
      this.context = data.context;
      this.params = {
        size: data.size,
        x: data.x,
        y: data.y,
        mirror: data.mirror
      }
    }
    else{
      this.context = '';
      this.params = {
        size: 16,
        x: 0,
        y: 0,
        mirror: false
      }
    }
  }
  setParam(con, s, x, y, mir){
    this.context = con;
    this.params.size = s;
    this.params.x = x;
    this.params.y = y;
    this.params.mir = mir;
  }
}

var Head = ImagePart;
var Fase = ImagePart;
var Body = ImagePart;
var Accessory = ImagePart;
var Line = TextPart;

export { ImagePart, TextPart };