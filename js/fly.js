import { Application, Assets, Sprite } from 'pixi.js';

(async () =>
{
  const app = new Application();
  await app.init({ background: '#1099bb', resizeTo: window });
  document.body.appendChild(app.canvas);

  const texture = await Assets.load('./img/fly.png');
  const bee = new Sprite(texture);

  app.stage.addChild(bee);
  bee.anchor.set(0.5)

  bee.scale.x = 0.15; 
  bee.scale.y = 0.15;

  bee.x = app.screen.width / 2
  bee.y = app.screen.height / 2

  const pixelDensity = 200;
  const speed = 2 

  let startNum = 0

  function updateFly() {
    bee.y = (app.screen.width / 2) - pixelDensity + (Math.sin(startNum) * pixelDensity)
    startNum += 0.01 * speed
  }

  app.ticker.add(() => {
    updateFly();
  });
})();
