function getData(){

	$.ajax({
		type:"POST", //aqui puede ser igual get
		url: 'conexion.php',//aqui va tu direccion donde esta tu funcion php
		data: {
			tipo:'allGenerations',
		},//aqui tus datos
		success:function(data){
			//lo que devuelve tu archivo mifuncion.php
            var res = JSON.parse(data);

			//console.log(res);
			//console.log(res['results']);

			var generations = res['results'];

			var listGeneration = '';
			var camposGeneraciones = '';
			

			for(var i in generations){
				var idSplit = (generations[i].url).split('/');
				var id = idSplit[idSplit.length-2];

				var active = (i == 0) ? 'active' : '';
				var show = (i == 0) ? 'show' : '';
				listGeneration += `<li class="nav-item" role="presentation">
				<button class="nav-link ${active}" id="${generations[i].name}-tab" data-bs-toggle="tab" data-bs-target="#${generations[i].name}" type="button" role="tab" aria-controls="${generations[i].name}" aria-selected="true" onclick="getGeneration(${id})">${generations[i].name}</button>
			  </li>`;

				camposGeneraciones += 
				`<div class="tab-pane fade ${show} ${active}" id="${generations[i].name}" role="tabpanel" aria-labelledby="${generations[i].name}-tab">
				<div class="row">
					<h2 class="text-uppercase">Listado pokemones ${generations[i].name}</h2>
					<div class="col-md-5 col-4 mt-3">
						<div id="generaciones${id}" class="pokemones"></div>
					</div>
					<div class="col-md-7 col-7 mt-3">
					<div id="previewPokemon${id}" class="previewPokemon text-center">
						<div id="namePokemon${id}"></div>
						<hr>
						<div id="imgPokemon${id}"> <div class="fakeimg"></div></div>
						<hr>
						<h3>Información</h3>
						<div id="stats${id}" class=" stats row">

						</div>
					</div>
					</div>
					</div>
				
				</div>`;
			}
			document.getElementById('nav').innerHTML += listGeneration;
			//document.getElementById('ex1').innerHTML += listGeneration;
			document.getElementById('listaGeneraciones').innerHTML += camposGeneraciones;
			getGeneration(1);
	   },
	   error:function(data){
		//lo que devuelve si falla tu archivo mifuncion.php
	   }
	 });
}

function getPokemon(idpokemon, idgeneration){

	$.ajax({
		type:"POST", //aqui puede ser igual get
		url: 'conexion.php',//aqui va tu direccion donde esta tu funcion php
		data: {
			tipo:'infoPokemon',
			id: idpokemon,
		},//aqui tus datos
		success:function(data){
			//lo que devuelve tu archivo mifuncion.php
            var res = JSON.parse(data);
			//console.log('getPokemon ', res, res.name);
			document.getElementById('pokemon'+idpokemon).style= 'background-color: aqua;';
			document.getElementById('namePokemon'+idgeneration).innerHTML = `<h2 class="display-4"> ${res.name} </h2>`;
			var img = validImg(res);
			document.getElementById('imgPokemon'+idgeneration).innerHTML = (img != null) ? `<img class="imgPokemon" src=" ${img}" width=150 />` : `<div><p class="text-danger">Lo sentimos, no hay imagen disponible.</p></div>`;

			var stats = res['stats'];
			var htmlStats = '';
			for(var i in stats){
				htmlStats += 
				`<div class="col-6"> ${stats[i]['stat'].name} </div>`+
				`<div class="col-6" > ${stats[i].base_stat} </div>`;
			}
			document.getElementById('stats'+idgeneration).innerHTML = htmlStats;

	   },
	   error:function(data){
		//lo que devuelve si falla tu archivo mifuncion.php
	   }
	 });
}

function validImg(img){
	//console.log('validImg ', img['sprites']['other']['dream_world'].front_default);
	var front = img['sprites']['other']['dream_world'].front_default;
	return (front == null) ? img['sprites'].front_default : front;

	//back_default
}

function getGeneration(id){
	//console.log('getGeneration ', id);
	
	$.ajax({
		type:"POST", //aqui puede ser igual get
		url: 'conexion.php',//aqui va tu direccion donde esta tu funcion php
		data: {
			tipo:'generation',
			id: id,
		},//aqui tus datos
		success:function(data){
			//lo que devuelve tu archivo mifuncion.php
            var res = JSON.parse(data);
			//console.log(res);
			var pokemon = res['pokemon_species'];

			var cardPokemon = '';

			for(var i in pokemon){
				var idSplit = (pokemon[i].url).split('/');
				////console.log(idSplit, idSplit.length, idSplit[idSplit.length-2]);
				cardPokemon +=  `<div id="pokemon${idSplit[idSplit.length-2]}" class="pointer text-capitalize" onclick="getPokemon( ${idSplit[idSplit.length-2]}, ${id} )"> ${pokemon[i].name} </div>`;

			}
			document.getElementById('generaciones'+id).innerHTML += cardPokemon;
	   },
	   error:function(data){
		//lo que devuelve si falla tu archivo mifuncion.php
	   }
	 });
}

//getData();