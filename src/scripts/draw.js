import { drawImage, fillText, drawBorder } from './drawMethods.js';
import { ImagePart, TextPart } from './model.js';

var newDraw = function(drawList){
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<drawList.length;i++){
    if(drawList[i].data&&drawList[i].data instanceof ImagePart){
      if(drawList[i].data.selection!==null){
        drawImage(ctx, document.querySelector('#'+drawList[i].type+drawList[i].index).querySelectorAll('.element')[drawList[i].data.selection],
                      +drawList[i].data.params.x,
                      +drawList[i].data.params.y,
                      +drawList[i].data.params.width,
                      +drawList[i].data.params.height,
                      +drawList[i].data.params.rotation,
                      drawList[i].data.params.mirror)
      }
    }
    if(drawList[i].data&&drawList[i].data instanceof TextPart){
      if(drawList[i].data.context!==null){
        fillText(ctx, drawList[i].data.context,
                  +drawList[i].data.params.x,
                  +drawList[i].data.params.y,
                  +drawList[i].data.params.size,
                  +drawList[i].data.params.rotation,
                  drawList[i].data.params.mirror); 
      }
    }
  }
}

var borderValueCheck = function(rect, item, lineWidth){
  if(item instanceof TextPart){
    if(!rect.top||rect.top > +item.params.y-item.params.size/2){
      rect.top = +item.params.y-item.params.size/2;
    }
    if(!rect.right||rect.right < +item.params.x+lineWidth/2){
      rect.right = +item.params.x+lineWidth/2;
    }
    if(!rect.bottom||rect.bottom < +item.params.y+item.params.size/2){
      rect.bottom = +item.params.y+item.params.size/2;
    }
    if(!rect.left||rect.left > +item.params.x-lineWidth/2){
      rect.left = +item.params.x-lineWidth/2;
    }
  }
  if(item instanceof ImagePart){
    if(!rect.top||rect.top > +item.params.y-item.params.height/2){
      rect.top = +item.params.y-item.params.height/2;
    }
    if(!rect.right||rect.right < +item.params.x+item.params.width/2){
      rect.right = +item.params.x+item.params.width/2;
    }
    if(!rect.bottom||rect.bottom < +item.params.y+item.params.height/2){
      rect.bottom = +item.params.y+item.params.height/2;
    }
    if(!rect.left||rect.left > +item.params.x-item.params.width/2){
      rect.left = +item.params.x-item.params.width/2;
    }
  }
}

var newBorder = function(drawList, padding, isDrawBorder){
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');

  var rect = {top: null, right: null, bottom: null, left: null};
  padding = padding || 0;

  for(var i=0;i<drawList.length;i++){
    if(drawList[i].data&&drawList[i].data instanceof ImagePart){
      if(drawList[i].data.selection!==null){
        borderValueCheck(rect, drawList[i].data);
      }
    }
    if(drawList[i].data&&drawList[i].data instanceof TextPart){
      if(drawList[i].data.context!==null){
        ctx.font = drawList[i].data.params.size+"px Georgia";
        borderValueCheck(rect, drawList[i].data, ctx.measureText(drawList[i].data.context).width);
      }
    }
  }

  if(isDrawBorder&&rect.top!==null){
    drawBorder(ctx, rect.top-padding-1, rect.right+padding+1, rect.bottom+padding+1, rect.left-padding-1);
  }
  if(rect.top!==null){
    return rect;
  }
  else{
    return {top: 0, right: 0, bottom: 0, left: 0};
  }
}

export { newDraw, newBorder };