function drawImage(ctx, img, x, y, w, h, r, m){
  ctx.save();
  if(m){
    ctx.scale(-1,1);
    ctx.translate(-x-w/2, y+h/2);
    ctx.rotate(r * Math.PI / 180);
  }
  else{
    ctx.translate(x+w/2, y+h/2);
    ctx.rotate(r * Math.PI / 180);
  }
  ctx.drawImage(img, -w/2, -h/2, w, h);
  ctx.restore();
};

function fillText(ctx, text, x, y, s, r, m){
  ctx.font = s+"px Georgia";
  ctx.save();
  if(m){
    ctx.scale(-1,1);
    ctx.translate(-x, y);
    ctx.rotate(r * Math.PI / 180);
  }
  else{
    ctx.translate(x, y);
    ctx.rotate(r * Math.PI / 180);
  }
  ctx.fillText(text, 0, 0); 
  ctx.restore();
};


export { drawImage, drawMirrorImage, fillText, fillMirrorText }