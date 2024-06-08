        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d'); //fornece os métodos e propriedades necessários para desenhar e manipular graficos 2D

        //Variaveis do jogo
        const size = 20; //tamano do tile
        let snake = [{x: 10, y: 10}]; // Inicializa a cobrinha com uma posição (é um array de objetos, onde cada objeto é um quadradinho da cobrinha)
        let dx = 0; //Direção horizontal da cobrinha
        let dy = 0; //Direção vertical da cobrinha
        let food = {x: 15, y:  15}; //posição da comida
        let gameOver = false; // Indica o fim do jogo
        let pause = false; // Indica se o jogo está pausado ou não
function drawSnake() {
    //define a cor da cobra
    ctx.fillStyle = '#db0202';
    //altera cada segmento da cobra
    snake.forEach(segment => {
        //desenha um retangulo (um segmento da cobrinha) no canvas
        // o Retangulo é preenchido com a cor definida acima
        // As coordenadas do retângulo são baseadas nas coordenadas do segmento da cobrinha
        // Cada coordenada é multiplacada pelo tamanho do tile para posicionamento correto
        //tileSize  representa o tamanho de cada "bloco" na grade do jogo
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize)
    })
}

//desenhar a comida
    function drawFood() {
        //Define a cor de preenchimento para a comida (vermelho)
        ctx.fillStyle = '#f00'
        //desenha um retangulo(comida) no canvas
        //O retangulo tem a cor acima
        //As coordenadas do retangulo se baseam no da comida
        // Cada coordenada é multiplicada pelo tile
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize)
    }


    function moveSnake() {
        if(!paused) {
            const head = {x: snake[0].x + dx, y: snake[0].y + dy}; //calcula a nova posição da cabeça
            snake.unshift(head); //Adiciona a nova posição da cabeça no inicio  do array
            if (head.x === food.x && head.y === food.y) {
                generateFood();
            } else {
                snake.pop();
            }
            if (checkCollision()) {// Verifica colisão da cobrinha consigo mesma ou com as bordas do canvas
                gameOver = true; //Difine o fim do jogo
                setTimeout(() => { //Após 5 segundos, recarrega a página
                    location.reload();
                }, 5000);
            }
        }
    }

    //Função para gerar comida em posição aleatória
    function generateFood() {
        food.x = Math.floor(Math.random() * canvas.width / tileSize)
        food.y = Math.floor(Math.random() * canvas.height / tileSize)
    }

    //Função para limpar o canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }

    // Função para atualizar o jogo
    function update() {
        clearCanvas();
        drawFood();
        moveSnake();
        if (!gameOver) {
            setTimeout(update, 100); //chama a função update após 100ms
        } else {
            ctx.fillStyle = '#fff'
            ctx.font = '30px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
        }
    }

    //Função para verificar colisão
    function checkCollision() {
        const head = snake[0];
        for (let i = 1; i < snake.length; i++){
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true; //caso ouver com o próprio corpo
            }
        }
        return head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize;
        // Retorna true se a cabeça da cobrinha atingir as bordas do canvas
    }

    // Função principal
    function main() {
        update(); //inicia o jogo
    }

    // Eventos de teclado
    document.addEventListener('keydown', e => {
        if (!game0ver && !paused) { //Verifica se o jogo não está pausado ou finalizado
            switch (e.key) {
                case 'ArrowUp':
                    if (dy === 0){
                        dx = 0;
                        dy = -1
                    }
                    break;
                case 'ArrowDown':
                    if (dy === 0) {
                        dx = 0;
                        dy = -1
                    }
                    break;
                case 'ArrowLeft':
                    if (dx === 0) {
                        dx = -1;
                        dy = 0
                    }
                    break;
                case 'ArrowRight':
                    if (dx === 0) {
                        dx = 1;
                        dy = 0;
                    }
                    break;
            }
            
        }
    });
    // Adiciona evento
    const pauseButton = document.getElementById('pauseBtn');
    pauseButton.addEventListener('click', () => {
        paused = !paused; //inverte o estado de pause
        pauseButton.textContent = paused ? 'Resume' : 'Pause' //Altera o texto do botão
    });

main()