import { Application, Assets, Sprite } from 'pixi.js';

// Asynchronous IIFE
(async () =>
{
    const app = new Application();
    globalThis.__PIXI_APP__ = app;
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);

    const countBunnies = 1
    let startX = 20
    let startY = 20

    const bunnies = []
    for (let i = 0; i < countBunnies; i++) {
        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        const bunny = new Sprite(texture);
        app.stage.addChild(bunny); //что это?
    
        bunny.x = (app.screen.width / 2) - (startX);
        bunny.y = (app.screen.width / 4) - startY;

        startY = startY + 20

        if (startY > 200) {
            startY = 5;
            startX += 5
        }
        
        bunny.anchor.set(0.5);

        bunny.velocityX = 0;
        bunny.velocityY = 0;

        bunnies.push(bunny);
    }

    const maxEscapeDistance = 70;
    const acceleration = 0.1;


    function onMouseMove(event) {
        bunnies.forEach(bunny => {
        // Вычисляем вектор направления от курсора мыши к кролику
            const dx = bunny.x - event.clientX;
            const dy = bunny.y - event.clientY;

            // Находим длину вектора
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Если расстояние больше maxEscapeDistance, оставляем кролика на месте
            if (distance > maxEscapeDistance) {
                return;
            }

            // Нормализуем вектор (приводим его к единичной длине)
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;

            // Вычисляем скорость, основанную на расстоянии от курсора мыши
            const speed = distance * acceleration; //0.5

            // Обновляем скорость кролика
            bunny.velocityX = normalizedDx * speed;
            bunny.velocityY = normalizedDy * speed;

            console.log(`
            Distance: ${distance}
            `)
        })
    }

    function updateBunny() {
        bunnies.forEach(bunny => {
        // Обновляем позицию кролика на основе текущей скорости
            bunny.x += bunny.velocityX;
            bunny.y += bunny.velocityY;

            // Затухание скорости
            bunny.velocityX *= 0.8;
            bunny.velocityY *= 0.8;

            // Проверяем, выходит ли кролик за границы экрана
            if (bunny.x < 0) {
                bunny.x = app.screen.width;
            } else if (bunny.x > app.screen.width) {
                bunny.x = 0;
            }
            if (bunny.y < 0) {
                bunny.y = app.screen.height;
            } else if (bunny.y > app.screen.height) {
                bunny.y = 0;
            }
        })
    }

    window.addEventListener('mousemove', onMouseMove);

    app.ticker.add(() => {
        updateBunny();
    });
})();