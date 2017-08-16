import { drawImage, fillText, drawBorder } from './drawMethods.js';
import { ImagePart, TextPart } from './model.js';

var draw = function draw(){
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<this.heads.length;i++){
    if(this.heads[i]&&this.heads[i].selection!==null){
      drawImage(ctx, document.querySelector('#head'+i).querySelectorAll('.element')[this.heads[i].selection],
                    +this.heads[i].params.x,
                    +this.heads[i].params.y,
                    +this.heads[i].params.width,
                    +this.heads[i].params.height,
                    +this.heads[i].params.rotation,
                    this.heads[i].params.mirror)
    }
  }
  for(var i=0;i<this.faces.length;i++){
    if(this.faces[i]&&this.faces[i].selection!==null){
      drawImage(ctx, document.querySelector('#face'+i).querySelectorAll('.element')[this.faces[i].selection],
                    +this.faces[i].params.x,
                    +this.faces[i].params.y,
                    +this.faces[i].params.width,
                    +this.faces[i].params.height,
                    +this.faces[i].params.rotation,
                    this.faces[i].params.mirror)
    }
  }
  for(var i=0;i<this.bodies.length;i++){
    if(this.bodies[i].selection!==null){
      drawImage(ctx, document.querySelector('#body'+i).querySelectorAll('.element')[this.bodies[i].selection],
                    +this.bodies[i].params.x,
                    +this.bodies[i].params.y,
                    +this.bodies[i].params.width,
                    +this.bodies[i].params.height,
                    +this.bodies[i].params.rotation,
                    this.bodies[i].params.mirror)
    }
  }
  for(var i=0;i<this.accessories.length;i++){
    if(this.accessories[i].selection!==null){
      drawImage(ctx, document.querySelector('#accessory'+i).querySelectorAll('.element')[this.accessories[i].selection],
                    +this.accessories[i].params.x,
                    +this.accessories[i].params.y,
                    +this.accessories[i].params.width,
                    +this.accessories[i].params.height,
                    +this.accessories[i].params.rotation,
                    this.accessories[i].params.mirror)
    }
  }

  for(var i=0;i<this.lines.length;i++){
    if(this.lines[i].context!==''){
      fillText(ctx, this.lines[i].context,
                +this.lines[i].params.x,
                +this.lines[i].params.y,
                +this.lines[i].params.size,
                +this.lines[i].params.rotation,
                this.lines[i].params.mirror); 
    }
  }
}

var borderValueCheck = function(rect, item, lineWidth){
  if(item instanceof TextPart){
    if(!rect.top||rect.top>item.params.y-item.params.size/2){
      rect.top = item.params.y-item.params.size/2;
    }
    if(!rect.right||rect.right<item.params.x+lineWidth/2){
      rect.right = item.params.x+lineWidth/2;
    }
    if(!rect.bottom||rect.bottom<item.params.y+item.params.size/2){
      rect.bottom = item.params.y+item.params.size/2;
    }
    if(!rect.left||rect.left>item.params.x-lineWidth/2){
      rect.left = item.params.x-lineWidth/2;
    }
  }
  if(item instanceof ImagePart){
    if(!rect.top||rect.top>item.params.y-item.params.height/2){
      rect.top = item.params.y-item.params.height/2;
    }
    if(!rect.right||rect.right<item.params.x+item.params.width/2){
      rect.right = item.params.x+item.params.width/2;
    }
    if(!rect.bottom||rect.bottom<item.params.y+item.params.height/2){
      rect.bottom = item.params.y+item.params.height/2;
    }
    if(!rect.left||rect.left>item.params.x-item.params.width/2){
      rect.left = item.params.x-item.params.width/2;
    }
  }
}

var border = function(padding, isDrawBorder){
  var canvas = document.querySelector('#result');
  var ctx = canvas.getContext('2d');

  var rect = {top: null, right: null, bottom: null, left: null}
  padding = padding || 0;

  for(var i=0;i<this.heads.length;i++){
    if(this.heads[i].selection!==null){
      borderValueCheck(rect, this.heads[i]);
    }
  }
  for(var i=0;i<this.faces.length;i++){
    if(this.faces[i].selection!==null){
      borderValueCheck(rect, this.faces[i]);
    }
  }
  for(var i=0;i<this.bodies.length;i++){
    if(this.bodies[i].selection!==null){
      borderValueCheck(rect, this.bodies[i]);
    }
  }
  for(var i=0;i<this.accessories.length;i++){
    if(this.accessories[i].selection!==null){
      borderValueCheck(rect, this.accessories[i]);
    }
  }
  for(var i=0;i<this.lines.length;i++){
    if(this.lines[i].context!==''){
      ctx.font = this.lines[i].params.size+"px Georgia";
      borderValueCheck(rect, this.lines[i], ctx.measureText(this.lines[i].context).width);
    }
  }

  if(isDrawBorder&&rect.top!==null){
    drawBorder(ctx, rect.top-padding, rect.right+padding, rect.bottom+padding, rect.left-padding);
  }
}

export { draw, border };