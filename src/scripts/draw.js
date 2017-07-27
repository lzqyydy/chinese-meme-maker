import { drawImage, drawMirrorImage, fillText, fillMirrorText } from './drawMethods.js'

export default function draw(){
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(this.head[0]&&this.head[0].selection!==null){
    if(!this.head[0].params.mirror){
      drawImage(ctx, document.querySelector('#head').querySelectorAll('.element')[this.head[0].selection],
                    this.head[0].params.x,
                    this.head[0].params.y,
                    this.head[0].params.width,
                    this.head[0].params.height)
    }
    else{
      drawMirrorImage(ctx, document.querySelector('#head').querySelectorAll('.element')[this.head[0].selection],
                    this.head[0].params.x,
                    this.head[0].params.y,
                    this.head[0].params.width,
                    this.head[0].params.height)
    }
  }
  if(this.face[0]&&this.face[0].selection!==null){
    if(!this.face[0].params.mirror){
      drawImage(ctx, document.querySelector('#face').querySelectorAll('.element')[this.face[0].selection],
                    this.face[0].params.x,
                    this.face[0].params.y,
                    this.face[0].params.width,
                    this.face[0].params.height)
    }
    else{
      drawMirrorImage(ctx, document.querySelector('#face').querySelectorAll('.element')[this.face[0].selection],
                    this.face[0].params.x,
                    this.face[0].params.y,
                    this.face[0].params.width,
                    this.face[0].params.height)
    }
  }
  for(var i=0;i<this.bodies.length;i++){
    if(this.bodies[i].selection!==null){
      if(!this.bodies[i].params.mirror){
        drawImage(ctx, document.querySelector('#body'+i).querySelectorAll('.element')[this.bodies[i].selection],
                    this.bodies[i].params.x,
                    this.bodies[i].params.y,
                    this.bodies[i].params.width,
                    this.bodies[i].params.height)
      }
      else{
        drawMirrorImage(ctx, document.querySelector('#body'+i).querySelectorAll('.element')[this.bodies[i].selection],
                    this.bodies[i].params.x,
                    this.bodies[i].params.y,
                    this.bodies[i].params.width,
                    this.bodies[i].params.height)
      }
    }
  }

  for(var i=0;i<this.accessories.length;i++){
    if(this.accessories[i].selection!==null){
      if(!this.accessories[i].params.mirror){
        drawImage(ctx, document.querySelector('#accessory'+i).querySelectorAll('.element')[this.accessories[i].selection],
                    this.accessories[i].params.x,
                    this.accessories[i].params.y,
                    this.accessories[i].params.width,
                    this.accessories[i].params.height)
      }
      else{
        drawMirrorImage(ctx, document.querySelector('#accessory'+i).querySelectorAll('.element')[this.accessories[i].selection],
                    this.accessories[i].params.x,
                    this.accessories[i].params.y,
                    this.accessories[i].params.width,
                    this.accessories[i].params.height)
      }
    }
  }

  for(var i=0;i<this.lines.length;i++){
    if(this.lines[i].context!==''){
      ctx.font=this.lines[i].params.size+"px Georgia";
      ctx.textAlign="center"; 
      ctx.textBaseline="middle"; 
      if(!this.lines[i].params.mirror){
        fillText(ctx, this.lines[i].context,this.lines[i].params.x,parseInt(this.lines[i].params.y)+parseInt(this.lines[i].params.size)); 
      }
      else{
        fillMirrorText(ctx, this.lines[i].context,this.lines[i].params.x,parseInt(this.lines[i].params.y)+parseInt(this.lines[i].params.size)); 
      }
    }
  }
}