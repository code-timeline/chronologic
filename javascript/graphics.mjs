/*
██████  ██ ██   ██ ██     ███████ ████████ ██    ██ ███████ ███████
██   ██ ██  ██ ██  ██     ██         ██    ██    ██ ██      ██
██████  ██   ███   ██     ███████    ██    ██    ██ █████   █████
██      ██  ██ ██  ██          ██    ██    ██    ██ ██      ██
██      ██ ██   ██ ██     ███████    ██     ██████  ██      ██
*/

export { InitPixi, LoadTextures, Resize, app, view, Graphics };

var app;
var renderer;
var view;
var Graphics = PIXI.Graphics;
var path_images = 'data/img/';
var sprites = {};

//
// Init Pixi
//
function InitPixi() {
  PIXI.utils.sayHello(PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas');

  // create & config pixi app
  let container = $('#timeline');
  app = new PIXI.Application({
    width: $('#timeline').width(),
    height: $('#timeline').height(),
    antialias: true
  });
  view = app.view;
  renderer = app.renderer;
  renderer.backgroundColor = 0xDDEEDD;
  renderer.autoResize = true;
  Resize();

  // add pixi canvas to HTML
  container.append(app.view);
}

//
// Resize
//
function Resize() {
  renderer.resize($('#timeline').width(), $('#timeline').height())
}

//
// Load Textures
//
function LoadTextures(images, on_done) {
  images.forEach((value, i) => { images[i] = path_images + value });
  PIXI.loader.add(images).load(()=>{
    for (let img of images) {
      sprites[img] = new PIXI.Sprite(PIXI.loader.resources[img].texture);

      // set max side width to 400
      let width = sprites[img].width;
      let height = sprites[img].height;
      sprites[img].width = 400 * ( width < height ? width / height : 1 );
      sprites[img].height = 400 * ( height < width ? height / width : 1 );

      // move into screen
      sprites[img].x += sprites[img].width / 2;
      sprites[img].y += sprites[img].height / 2;

      // set anchor to center
      sprites[img].anchor.set(0.5, 0.5);

      app.stage.addChild(sprites[img]);
    }
    on_done();
  });
}
