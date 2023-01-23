<?php

$info = $_POST;
//var_dump($info);

if(sizeof($info) > 0){
    $res = false;
    switch ($info['tipo']) {
        case '1':
            $res = getAll();
            break;

        case '2':
            $res = getInfo($info['id']);
            break;

        case 'generation':
            $res = getGenertion();
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
$data = file_get_contents('https://pokeapi.co/api/v2/pokemon');
	return $data;
}

function getGenertion(){
     return file_get_contents('https://pokeapi.co/api/v2/generation/1/');
    
}


