function drawImage(ctx, img, x, y, w, h, r, m){
  ctx.save();
  if(m){
    ctx.scale(-1,1);
    ctx.translate(-ctx.canvas.width/2-x+w/2, ctx.canvas.height/2+y+h/2);
    ctx.rotate(r * Math.PI / 180);
  }
  else{
    ctx.translate(ctx.canvas.width/2+x+w/2, ctx.canvas.height/2+y+h/2);
    ctx.rotate(r * Math.PI / 180);
  }
  ctx.drawImage(img, -w, -h, w, h);
  ctx.restore();
};

function fillText(ctx, text, x, y, s, r, m){
  ctx.font = s+"px Georgia";
  ctx.textBaseline="middle"; 
  ctx.textAlign="center"; 
  ctx.save();
  if(m){
    ctx.scale(-1,1);
    ctx.translate(-ctx.canvas.width/2-x, ctx.canvas.height/2+y);
    ctx.rotate(r * Math.PI / 180);
  }
  else{
    ctx.translate(ctx.canvas.width/2+x, ctx.canvas.height/2+y);
    ctx.rotate(r * Math.PI / 180);
  }
  ctx.fillText(text, 0, 0); 
  ctx.restore();
};

function drawBorder(ctx, t, r, b, l){
  ctx.save();
  ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
  ctx.strokeRect(l, t, r-l, b-t); 
  ctx.restore();
}

export { drawImage, fillText, drawBorder }