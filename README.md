# Ali-anaconda

## 1. Displaying the board and a still snake
First, we need to display the game board and the snake. Start by creating the file index.html. This will contain all of our HTML code. Next, open the file in your preferred browser.

To be able to create our game, we have to make use of the HTML <canvas>, which is used to draw graphics with JavaScript.
	

	<canvas id="gardenCanvas" width "500" height="500"><canvas>
	
>>The id is what identifies the canvas; it should always be specified. The id takes the dimensions width and height as props.
		
Until now, the browser will not display anything since the canvas has no default background. To make our canvas visible, we can give it a border by writing some JavaScript code.
		
## Making the canvas
Now we can make the canvas, or the game board, for our snake( my snak's name in this project is Anaconda) to navigate. First, we get the canvas element using the id garden (specified earlier).

Next, we get the canvas “2d context", which means that it will be drawn into a 2D space.

We will then ​make a 500 x 500 with rectangle with a black border, which will cover the entire canvas starting from the top left corner (0, 0).
		
   
   
		const gardenBoard = document.getElementById("garden");
		const ctx = garden.getContext("2d");
		
## Making the snake
Now, for the snake! We need to specify the initial location of our snake on the canvas by representing the snake as an array of coordinates.

Thus, to create a horizontal snake in the middle of the canvas, at (200, 200), we list the co-ordinate of each body part of the snake.

The number of coordinates in the object will be equal to the length of the snake.
		
		let snake = [  {x: 250, y: 250},  {x: 240, y: 250},  {x: 230, y: 250},  {x: 220, y: 250}, 
		{x: 210, y: 200},];
		
>The 
y
y
-coordinate for all parts is always 250. The 
x
x
-coordinate is at decrements of 10 to represent different parts of the snake’s body. The very first coordinate represents the snake’s head.
		
##### Now, to display the snake on the canvas, we can write a function to draw a rectangle for each pair of coordinates.
		
	function drawAnaPart(anaPart) {
      ctx.fillStyle = anaCol;
      ctx.strokestyle = anaBorder;
      ctx.fillRect(anaPart.x, anaPart.y, 10, 10);
      ctx.strokeRect(anaPart.x, anaPart.y, 10, 10);
    }
		
		
## 2. Making the snake move automatically
We have our canvas and our snake, but we need the snake to move so it can navigate the game space in all directions.

So, let’s learn how to make our snake move automatically on the canvas.

### Horizontal movement
To make the snake move one step (10px) to the right, we can increase the 
x
x
-coordinate of every part of the snake by 10px (dx = +10).

To make the snake move to the left, we can decrease the x-coordinate of every part of the snake by 10px (dx = -10).
>dx is the horizontal velocity of the snake. We need to create a function move_snake that will update the snake.
	

		
		
		
		function moveAna() 
            {  
             const head = {x: Ana[0].x + dx, y: Ana[0].y};
            Ana.unshift(head);
            Ana.pop();
            }	
		
In the function above, we created a new head for the snake. We then added the new head to the beginning of the snake using Ana.unshift and removed the last element of the snake using Ana.pop.

This way, all of the other snake parts shift into place.
		
## Vertical movement
To move our snake vertically, we cannot alter all the 
y
y
-coordinates by 10px as that would shift the whole snake up and down. Only the 
y
y
-coordinate of the head needs to be altered.

Decreasing it by 10px to move the snake up and increasing it by 10px to move the snake down will move the snake correctly.

To implement this, we have to update the move_snake method to also increase the y-coordinate of the head by dy (vertical velocity of the snake).

        const head = {x: Ana[0].x + dx, y: Ana[0].y + dy};
		
## Automatic movement
In order to move the snake, say 50px to the right, we will have to call move_snake(x) 5 times. However, calling the method 5 times will make the snake jump to the +50px position, instead of moving step-by-step towards that point.

To move the snake how we want, we can add a slight delay between each call with setTimeout. We also need to make sure to call drawSnake every time we call moveAna, as shown below. If we don’t, we won’t be able to see the intermediate steps that show the snake moving.

      setTimeout(function onTick() {  clearCanvas();  moveAna();  drawAna();}, 100);
      setTimeout(function onTick() {  clearCanvas();  moveAna();  drawAna();}, 100);

      ...
      drawAna();
		>clearCanvas() is called inside setTimeout to remove all previous positions of the snake.
		
		
Although there is still a problem, nothing tells the program that it has to wait for setTimeout before moving to the next setTimeout. This means that the snake will still jump 50px forward but only after a slight delay.

To fix that, we have to wrap our code inside functions. Instead of creating an infinite number of functions that call each other, we can instead create one function (render) and call it over and over again.

      function render() 
      {  
      setTimeout(function onTick() 
      {    
       clearCanvas();    
       advanceSnake();  
       drawSnake();
        // Call render again
        render();
        }, 100)
      }
		
## 3. Using arrow keys to change the snake’s direction
We have a moving snake, but our next task is to make the snake change direction when one of the arrow keys is pressed.

Changing Direction
Let’s make the function changeDirection. This will check if the pressed key matches one of the arrow keys. If it does, we will change the vertical and horizontal velocity. Look at the function below.
		
		
		function changeDirection(event) 
      {  
        const LEFTKEY = 37;
        const RIGHTKEY = 39;
        const UPKEY = 38;
        const DOWNKEY = 40;
 
        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;  
        const goingLeft = dx === -10;
 
         if (keyPressed === LEFT_KEY && !goingRight)
         {    
            dx = -10;
             dy = 0;  
         } 
 
     		if (keyPressed === UP_KEY && !goingDown)
     		{    
        	  dx = 0;
         	 dy = -10;
   		  }
 
     if (keyPressed === RIGHT_KEY && !goingLeft)
     {    
          dx = 10;
          dy = 0;
     }
 
     if (keyPressed === DOWN_KEY && !goingUp)
     {    
          dx = 0;
          dy = 10;
     }
	}
		We also need to check if the snake is moving in the opposite direction of the new, intended direction. This will prevent our snake from reversing, such as when you press the right arrow key when the snake is moving to the left.

To incorporate the change_direction function, we can use the addEventListener on the document to listen for when a key is pressed; then we can call changeDirection with the keydown event.

         document.addEventListener("keydown", changeDirection)
 ## Adding boundary condition
To prevent our snake from moving infinitely, we need to add boundary conditions. For this, let’s make the function has_game_ended, which returns true when the game has ended and false if otherwise.

There are two cases in which the game can end:

The head of the snake collides with its body.
The head of the snake collides with the canvas boundary.
These two conditions are incorporated in the code below:
		
		function hasGameEnded()
		{  
 		 for (let i = 4; i < Ana.length; i++)
		  {    
   		 const has_collided = Ana[i].x === Ana[0].x && Ana[i].y === Ana[0].y
    		if (hasCollided) 
      		return true
  		}
  		const hitLeftWall = Ana[0].x < 0;  
  		const hitRightWall = Ana[0].x > Anaboard.width - 10;
 		 const hitToptWall = Ana[0].y &lt; 0;
  		const hitBottomWall = Ana[0].y > Anaboard.height - 10;
 
  		return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
		}
		
		First, there is a check which looks​ to see if the head has collided with any of the body parts.

If it has not, there is a further check for all of the boundary walls.
		
		
		##4. Incorporating food and score
Now that we have a fully functional snake, it’s time to incorporate food and score into our game.

####Food (mashroom)
For the food (mashroom) that our snake will eat, we want to generate a random set of coordinates. Let’s make the function randomMashroom to randomly generate an 
x
x
-coordinate and a 
y
y
-coordinate for the food’s positions. We also have to ensure that the food is not located where the snake currently is.

If it is, then we have to generate a new food location. See the functions below:

	function randomMashroom(min, max)
	{  
   		return Math.round((Math.random() * (max-min) + min) / 10) * 10;
	}
 
	function genMashroom() 
{  
   Mashroomx = randomMahroom(0, Anaboard.width - 10);
   Mashroomy = randomMashroom(0, Anaboard.height - 10);
   Ana.forEach(function hasSnakeEatenFood(part) {
         const hasEaten = part.x == Mashroomx &&  Mashroomy ==  Mashroomy;
         if (hasEaten) genMashroom();
        });
			}
 We also need a function to actually draw the food on the canvas and update main to incorporate the drawFood function.

	function drawFood()
		{
   		   ctx.fillStyle = 'lightgreen;
    		  ctx.strokestyle = 'darkgreen';
     	 ctx.fillRect(food_x, food_y, 10, 10);
    	 ctx.strokeRect(food_x, food_y, 10, 10);
		}
		
		## Growing the snake
The snake will grow whenever the head of the snake is at the same position as the food. Instead of adding a body part to the snake’s body every time that happens, we can skip removing a body part in the move_snake function.

See the updated version of move_snake below:

      function moveAna() {
     	 // Create the new Snake's head
     	 const head = {x: Ana[0].x + dx, y: Ana[0].y + dy};
      	// Add the new head to the beginning of snake body
    	  Ana.unshift(head);
      		const hasEatenFood = Ana[0].x === Mashroomx && Ana[0].y === Mashroomy;
     	 if (hasEatenFood) {
      	  // Generate new food location
       	 genMashroom();
     		 } else {
       		 // Remove the last part of snake body
       		 Ana.pop();
     		 }
   		 }
		
		
		
## Score
Incorporating a score is actually quite simple. We need to initialize a score variable and increment it every time the snake eats the food. To display the score, we will need a new div before the canvas.

We need to further update the move_snake method to incorporate the score:

	function moveAna()
 	{
     	 // Create the new Snake's head
      	const head = {x: Ana[0].x + dx, y: Ana[0].y + dy};
     	 // Add the new head to the beginning of snake body
      	Ana.unshift(head);
      const hasEatenFood = Ana[0].x === Mashroomx && Ana[0].y === Mashroomy;
      if (hasEatenFood) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        genMMashroom();
     	 } else {
        // Remove the last part of snake body
      	  Ana.pop();
      		}
		}
		
		
## Play Again
		
		
		<button onClick="window.location.reload();">
               Play again</button>

		
		


		
		
		
