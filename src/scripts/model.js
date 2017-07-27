var ImagePart = class ImagePart{
  constructor(){
    this.selection = null;
    this.params = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      mirror: false
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
  constructor(){
    this.context = '';
    this.params = {
      size: 16,
      x: 0,
      y: 0,
      mirror: false
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