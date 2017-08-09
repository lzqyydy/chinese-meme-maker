import { drawImage, drawMirrorImage, fillText, fillMirrorText } from './drawMethods.js'

export default function draw(){
  var canvas = document.querySelector('#result');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<this.heads.length;i++){
    if(this.heads[0]&&this.heads[0].selection!==null){
      if(!this.heads[0].params.mirror){
        drawImage(ctx, document.querySelector('#head'+i).querySelectorAll('.element')[this.heads[0].selection],
                      this.heads[0].params.x,
                      this.heads[0].params.y,
                      this.heads[0].params.width,
                      this.heads[0].params.height)
      }
      else{
        drawMirrorImage(ctx, document.querySelector('#head'+i).querySelectorAll('.element')[this.heads[0].selection],
                      this.heads[0].params.x,
                      this.heads[0].params.y,
                      this.heads[0].params.width,
                      this.heads[0].params.height)
      }
    }
  }
  for(var i=0;i<this.faces.length;i++){
    if(this.faces[0]&&this.faces[0].selection!==null){
      if(!this.faces[0].params.mirror){
        drawImage(ctx, document.querySelector('#face'+i).querySelectorAll('.element')[this.faces[0].selection],
                      this.faces[0].params.x,
                      this.faces[0].params.y,
                      this.faces[0].params.width,
                      this.faces[0].params.height)
      }
      else{
        drawMirrorImage(ctx, document.querySelector('#face'+i).querySelectorAll('.element')[this.faces[0].selection],
                      this.faces[0].params.x,
                      this.faces[0].params.y,
                      this.faces[0].params.width,
                      this.faces[0].params.height)
      }
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