function	init()
{
	var	canvas = document.getElementById("canvas");
	var	context = canvas.getContext("2d");

	var canvasW = canvas.width;
	var	canvasH = canvas.height;

	var	serpentW = 10;
	var serpentH = 10;

	var	score = 4;
	//direction de base
	var	direction = "droite";

	//clavier
	document.addEventListener("keydown", clavier);

	function	clavier(e)
	{
		if (e.keyCode == 37 && direction != "droite")
			direction = "gauche";
		else if (e.keyCode == 38 && direction != "bas")
			direction = "haut";
		else if (e.keyCode == 39 && direction != "gauche")
			direction = "droite";
		else if (e.keyCode == 40 && direction != "haut")
			direction = "bas";
	}

	function	dessinerSnake(x, y)
	{
		context.fillStyle = "#FFF";
		context.fillRect(x * serpentW, y * serpentH, serpentW, serpentH);

		context.fillStyle = "#000";
		context.strokeRect(x * serpentW, y * serpentH, serpentW, serpentH);
	}

	var	serpent = [];
	var	length = 4;

	for (var i = length - 1; i >= 0; i--)
	{
		serpent.push({x: i, y: 0});
	}

	// objet food, random pour determiner la position x et y des pommes à l'interieur du canvas
	var food =
	{
		x : Math.round(Math.random() * (canvasW / serpentW -1) - 1),
		y : Math.round(Math.random() * (canvasH / serpentH - 1) - 1)
	}

	function	dessinerFood(x, y)
	{
		context.fillStyle = "#00FF00";
		context.fillRect(x * serpentW, y * serpentH, serpentW, serpentH);

		context.fillStyle = "#000";
		context.strokeRect(x * serpentW, y * serpentH, serpentW, serpentH);
	}

	// collisions avec la queue
	function	collisionQueue(x, y, array)
	{
		for (var i = 1; i < array.length; i++)
		{
			if (x == array[i].x && y == array[i].y)
				return true;
		}
		return false;
	}

	function	dessinerScore(x)
	{
		context.font = "20px Verdana";
		// Create gradient
		var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
		gradient.addColorStop("0"," magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		// Fill with gradient
		context.fillStyle = gradient;
		context.fillText("Score : " + x, 5, canvasH - 5);
	}

	function	dessinerVies(x)
	{
		context.font = "20px Verdana";
		// Create gradient
		var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
		gradient.addColorStop("0"," magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		// Fill with gradient
		context.fillStyle = gradient;
		context.fillText("Vies restantes : " + x, canvasW - 200, canvasH - 5);	
	}

	function	gameLoop()
	{
		context.clearRect(0, 0, canvasW, canvasH);
		// création du serpent et remplissage de ses queues
		for (var i = 0; i < serpent.length; i++)
		{
			var x = serpent[i].x;
			var y = serpent[i].y;
			dessinerSnake(x, y);
		}
		// création des pommes
		dessinerFood(food.x, food.y);

		//Tête du serpent
		var	serpentX = serpent[0].x;
		var	serpentY = serpent[0].y;

		//Toucher un mur ou sa queue recharge la page
		if (serpentX < 0 || serpentY < 0 || serpentX >= canvasW / serpentW || serpentY >= canvasH / serpentH)
			location.reload();
		if (collisionQueue(serpentX, serpentY, serpent) == true)
			location.reload();

		// Nvelle tête et direction
		if (direction == "haut")
			serpentY--;
		else if (direction == "bas")
			serpentY++;
		else if (direction == "gauche")
			serpentX--;
		else if (direction == "droite")
			serpentX++;

		// Lorsque le serpent entre en collision avec les pommes
		if (serpentX == food.x && serpentY == food.y)
		{
			food =
			{
				x : Math.round(Math.random() * (canvasW / serpentW) + 1),
				y : Math.round(Math.random() * (canvasH / serpentH) + 1)
			};
			var	newHead = 
			{
				x : serpentX,
				y : serpentY
			};
		score++;
		}
		else
		{
			serpent.pop();
			var	newHead = 
			{
				x : serpentX,
				y : serpentY
			};
		}
		//Supprime le dernier élément du serpent;
		serpent.unshift(newHead);
		dessinerScore(score);
	}
	setInterval(gameLoop, 60);
}