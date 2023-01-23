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

/**
 * Función para traer la información especifica de cada pokemon
 * @param mixed $id
 * @return bool|string
 */
function getInfo($id){
    //echo $id;
	$data_individual = file_get_contents('https://pokeapi.co/api/v2/pokemon/'.$id);

	return $data_individual;

}

/**
 * Función para obtener todas las generaciones existentes en Pokemon
 * @return bool|string
 */
function getAll(){
$data = file_get_contents('https://pokeapi.co/api/v2/generation');
	return $data;
}

/**
 * Función para obtener la información especifica de cada generación
 * @param mixed $id
 * @return bool|string
 */
function getGenertion($id){
     return file_get_contents('https://pokeapi.co/api/v2/generation/'.$id);
    
}


