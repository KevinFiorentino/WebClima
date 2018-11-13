<?php

class Usuarios implements JsonSerializable {

	public $idUsuario;
	public $user;
	public $pass;
	public $ciudad;

	public function __construct($idUsuario = "", $user = "", $pass = "", $ciudad = "") {
		$this->idUsuario = $idUsuario;
		$this->user = $user;
		$this->pass = $pass;
		$this->ciudad = $ciudad;
    }

    public function getIdUsuario() {
        return $this->idUsuario;}
    public function setIdUsuario($id) {
    	$this->idUsuario = $id;}

    public function getCiudad() {
        return $this->ciudad;}
    public function setCiudad($ciudad) {
    	$this->ciudad = $ciudad;}


    public function jsonSerialize() {
        return [
            'idUsuario' => $this->idUsuario,
            'user' => $this->user,
            'pass' => $this->pass,
            'ciudad' => $this->ciudad
        ];
    }

}