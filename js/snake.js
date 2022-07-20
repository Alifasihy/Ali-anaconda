const gardenBoard = 'green';
    const gardenBackground = "black";
    const anaCol = 'Pink';
    const anaBorder = 'darkblue';
    
    let ana = [
      {x: 250, y: 250},
      {x: 240, y: 250},
      {x: 230, y: 250},
     
    ]

    let score = 0;
    // True if changing direction
    let changingDirection = true;
    // Horizontal velocity
    let mashroomx;
    let mashroomy;
    let dx = 10;
    // Vertical velocity
    let dy = 0;
    
    
    // Get the canvas element
    const garden = document.getElementById("garden");
    // Return a two dimensional drawing context
    const ctx = garden.getContext("2d");
    // Start game
    render();

    genMashroom();

    document.addEventListener("keydown", changeDirection);
    
    // render function called repeatedly to keep the game running
    function render() {

        if (hasGameEnded()) return;

        changingDirection = false;
        setTimeout(function onTick() {
        clearBoard();
        drawMashroom();
        moveAna();
        drawAna();
        // Repeat
        render();
      }, 80)
    }
    
    // draw a border around the canvas
    function clearBoard() {
      //  Select the colour to fill the drawing
      ctx.fillStyle = gardenBoard;
      //  Select the colour for the border of the canvas
      ctx.strokestyle = gardenBoard;
      // Draw a "filled" rectangle to cover the entire canvas
     ctx.fillRect(0, 0, garden.width, garden.height);
      // Draw a "border" around the entire canvas
      ctx.strokeRect(0, 0, garden.width, garden.height);
    }
    
    // Draw the ana(snake) on the canvas
    function drawAna() {
      // Draw each part
      ana.forEach(drawAnaPart)
    }

    function drawMashroom() {
      ctx.fillStyle = 'lightgreen';
      ctx.strokestyle = 'darkgreen';
      ctx.fillRect(mashroomx, mashroomy, 10, 10);
      ctx.strokeRect(mashroomx, mashroomy, 10, 10);
    }
    
    // Draw one ana (snake) part
    function drawAnaPart(anaPart) {

      // Set the colour of the ana part
      ctx.fillStyle = anaCol;
      // Set the border colour of the ana part
      ctx.strokestyle = anaBorder;
      // Draw a "filled" rectangle to represent the ana part at the coordinates
      // the part is located
      ctx.fillRect(anaPart.x, anaPart.y, 10, 10);
      // Draw a border around the ana part
      ctx.strokeRect(anaPart.x, anaPart.y, 10, 10);
    }

    function hasGameEnded() {
      for (let i = 4; i < ana.length; i++) {
        if (ana[i].x === ana[0].x && ana[i].y === ana[0].y) return true
      }
      const hitLeftWall = ana[0].x < 0;
      const hitRightWall = ana[0].x > garden.width - 10;
      const hitToptWall = ana[0].y < 0;
      const hitBottomWall = ana[0].y > garden.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }

    function randomMashroom(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    function genMashroom() {
      // Generate a random number the mashroom x-coordinate
      mashroomx = randomMashroom(0, garden.width - 10);
      // Generate a random number for the mashroom y-coordinate
      mashroomy = randomMashroom(0, garden.height - 10);
      // if the new mashroom location is where the ana (snake) currently is, generate a new food location
      ana.forEach(function hasAnaEatenFood(part) {
        const hasEaten = part.x == mashroomx && part.y == mashroomy;
        if (hasEaten) genMashroom();
      });
    }

    function changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      
    // Prevent the ana from reversing
    
      if (changingDirection) return;
      changingDirection = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }

    function moveAna() {
      // Create the new ana's head
      const head = {x: ana[0].x + dx, y: ana[0].y + dy};
      // Add the new head to the beginning of  ana body
      ana.unshift(head);
      const hasEatenFood = ana[0].x === mashroomx && ana[0].y === mashroomy;
      if (hasEatenFood) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new mashroom location
        genMashroom();
      } else {
        // Remove the last part of ana body
        ana.pop();
      }
    }
    
