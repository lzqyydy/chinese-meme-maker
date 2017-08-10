import { drawImage, drawMirrorImage, fillText, fillMirrorText } from './drawMethods.js'

export default function draw(){
  var canvas = document.querySelector('#result');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<this.heads.length;i++){
    if(this.heads[i]&&this.heads[i].selection!==null){
      drawImage(ctx, document.querySelector('#head'+i).querySelectorAll('.element')[this.heads[i].selection],
                    this.heads[i].params.x,
                    this.heads[i].params.y,
                    this.heads[i].params.width,
                    this.heads[i].params.height,
                    this.heads[i].params.rotation,
                    this.heads[i].params.mirror)
    }
  }
  for(var i=0;i<this.faces.length;i++){
    if(this.faces[i]&&this.faces[i].selection!==null){
      drawImage(ctx, document.querySelector('#face'+i).querySelectorAll('.element')[this.faces[i].selection],
                    this.faces[i].params.x,
                    this.faces[i].params.y,
                    this.faces[i].params.width,
                    this.faces[i].params.height,
                    this.faces[i].params.rotation,
                    this.faces[i].params.mirror)
    }
  }
  for(var i=0;i<this.bodies.length;i++){
    if(this.bodies[i].selection!==null){
      drawImage(ctx, document.querySelector('#body'+i).querySelectorAll('.element')[this.bodies[i].selection],
                    this.bodies[i].params.x,
                    this.bodies[i].params.y,
                    this.bodies[i].params.width,
                    this.bodies[i].params.height,
                    this.bodies[i].params.rotation,
                    this.bodies[i].params.mirror)
    }
  }
  for(var i=0;i<this.accessories.length;i++){
    if(this.accessories[i].selection!==null){
      drawImage(ctx, document.querySelector('#accessory'+i).querySelectorAll('.element')[this.accessories[i].selection],
                    this.accessories[i].params.x,
                    this.accessories[i].params.y,
                    this.accessories[i].params.width,
                    this.accessories[i].params.height,
                    this.accessories[i].params.rotation,
                    this.accessories[i].params.mirror)
    }
  }

  for(var i=0;i<this.lines.length;i++){
    if(this.lines[i].context!==''){
      ctx.textAlign="center"; 
      ctx.textBaseline="middle"; 
      fillText(ctx, this.lines[i].context,
                this.lines[i].params.x,
                this.lines[i].params.y-(-this.lines[i].params.size),
                this.lines[i].params.size,
                this.lines[i].params.rotation,
                this.lines[i].params.mirror); 
    }
  }
}