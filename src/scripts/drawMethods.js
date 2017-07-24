function drawImage(ctx, img, x, y, width, height){
  ctx.drawImage(img,x-width/2,y-height/2,width,height);
};
function drawMirrorImage(ctx, img, x, y, width, height){
  ctx.save();
  ctx.scale(-1,1);
  ctx.drawImage(img,-x-width/2,y-height/2,width,height);
  ctx.restore();
};
function fillText(ctx, text, x, y){
  ctx.fillText(text,x,y); 
};
function fillMirrorText(ctx, text, x, y){
  ctx.save();
  ctx.scale(-1,1);
  ctx.fillText(text,x,y); 
  ctx.restore();
};

export { drawImage, drawMirrorImage, fillText, fillMirrorText }