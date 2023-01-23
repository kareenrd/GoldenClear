function getData(){

	$.ajax({
		type:"POST", //aqui puede ser igual get
		url: 'conexion.php',//aqui va tu direccion donde esta tu funcion php
		data: {
			tipo:'1',
		},//aqui tus datos
		success:function(data){
			//lo que devuelve tu archivo mifuncion.php
            var res = JSON.parse(data);

			console.log(res);
			console.log(res['results']);

			var pokemon = res['results'];

			var cardPokemon = '';

			for(var i in pokemon){
				cardPokemon += '<div onclick="getPokemon('+(i)+')">'+pokemon[i].name+'</div>';

			}
			document.getElementById('pokemones').innerHTML += cardPokemon;
	   },
	   error:function(data){
		//lo que devuelve si falla tu archivo mifuncion.php
	   }
	 });
}

function getPokemon(id){
	console.log('id: ', id);

	$.ajax({
		type:"POST", //aqui puede ser igual get
		url: 'conexion.php',//aqui va tu direccion donde esta tu funcion php
		data: {
			tipo:'2',
			id: id,
		},//aqui tus datos
		success:function(data){
			//lo que devuelve tu archivo mifuncion.php
            var res = JSON.parse(data);
			console.log(res);
			document.getElementById('pokemon'+id).style= 'background-color: aqua;';
			document.getElementById('previewPokemon').innerHTML = 
			'<div class="imgPokemon text-center p-2">'+
				'<img src="'+res['sprites']['other']['dream_world'].front_default+'" width=200/>'+
			'</div>';
	   },
	   error:function(data){
		//lo que devuelve si falla tu archivo mifuncion.php
	   }
	 });
}

function getGeneration(){
	
	$.ajax({
		type:"POST", //aqui puede ser igual get
		url: 'conexion.php',//aqui va tu direccion donde esta tu funcion php
		data: {
			tipo:'generation',
			//id: id+1,
		},//aqui tus datos
		success:function(data){
			//lo que devuelve tu archivo mifuncion.php
            var res = JSON.parse(data);
			console.log(res);
			var pokemon = res['pokemon_species'];

			var cardPokemon = '';

			for(var i in pokemon){
				var idSplit = (pokemon[i].url).split('/');
				//console.log(idSplit, idSplit.length, idSplit[idSplit.length-2]);
				cardPokemon +=  `<div id="pokemon${idSplit[idSplit.length-2]}" class="pointer" onclick="getPokemon( ${idSplit[idSplit.length-2]} )"> ${pokemon[i].name} </div>`;

			}
			document.getElementById('generaciones').innerHTML += cardPokemon;
	   },
	   error:function(data){
		//lo que devuelve si falla tu archivo mifuncion.php
	   }
	 });
}

//getData();