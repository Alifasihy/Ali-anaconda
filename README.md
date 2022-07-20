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
		
		
		
		
		
		
		
