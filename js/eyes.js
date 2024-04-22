import { Application, Assets, Sprite, Ellipse } from 'pixi.js';

(async () =>
{
  const app = new Application();
  await app.init({ background: '#1099bb', resizeTo: window });
  document.body.appendChild(app.canvas);

  const ellipseTexture = await Assets.load('./img/eyes_ellipse.png');

  // Eyes Ellipse
  const left_ellipse = new Sprite(ellipseTexture);
  const right_ellipse = new Sprite(ellipseTexture);

  left_ellipse.isRight = true

  app.stage.addChild(left_ellipse, right_ellipse);


  function normalize (ellipse, scale, isRight) {
    ellipse.anchor.set(0.5)

    ellipse.scale.x = scale; 
    ellipse.scale.y = scale; 

    let difference = ellipse.isRight ? 200 : -200

    ellipse.y = app.screen.height / 2 
    ellipse.x = app.screen.width / 2 + difference
    
    ellipse.rotation = Math.PI * 2; // 90 градусов в радианах
  };

  normalize(right_ellipse, 0.3)
  normalize(left_ellipse, 0.3)


  const eyeTexture = await Assets.load('./img/eye.png');

  const leftEye = new Sprite(eyeTexture);
  const rightEye = new Sprite(eyeTexture);
  rightEye.isRight = true
  app.stage.addChild(leftEye, rightEye);


  normalize(rightEye, 0.7)
  normalize(leftEye, 0.7)


  let angle = 0;
  function onMouseMove(event) {
    [leftEye, rightEye].forEach(eye => {

      let mousePosition = {
        x: event.clientX,
        y: event.clientY
      };

      let difference = eye.isRight ? 200 : -200


      let dx = mousePosition.x - app.screen.width / 2 + difference;
      let dy = mousePosition.y - app.screen.height / 2;
      let distance = Math.sqrt(dx * dx + dy * dy);
      

      if (distance > 50) {
        let normalizedDx = dx / distance;
        let normalizedDy = dy / distance;
        eye.x = app.screen.width / 2 + normalizedDx * 50 + difference;
        eye.y = app.screen.height / 2 + normalizedDy * 50;
    } else {
        // Иначе, позиция мыши находится в пределах радиуса
        eye.x = mousePosition.x;
        eye.y = mousePosition.y;
    }
  })
}

  // function updateEyesPosition() {
  //   undefined;
  // }


  // app.ticker.add(() => {
  //   updateEyesPosition()
  // });

  window.addEventListener('mousemove', onMouseMove);


})();
