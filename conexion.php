<?php

$info = $_POST;
//var_dump($info);

if(sizeof($info) > 0){
    $res = false;
    switch ($info['tipo']) {
        case 'allGenerations':
            $res = getAll();
            break;

        case 'infoPokemon':
            $res = getInfo($info['id']);
            break;

        case 'generation':
            $res = getGenertion($info['id']);
            break;
        
        default:
            
            break;
        
    }
    print_r($res);
}

function getInfo($id){
    //echo $id;
	$data_individual = file_get_contents('https://pokeapi.co/api/v2/pokemon/'.$id);

	return $data_individual;

}

function getAll(){
$data = file_get_contents('https://pokeapi.co/api/v2/generation');
	return $data;
}

function getGenertion($id){
     return file_get_contents('https://pokeapi.co/api/v2/generation/'.$id);
    
}


