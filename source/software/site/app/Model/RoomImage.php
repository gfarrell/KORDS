<?php
App::uses('AppModel', 'Model');
/**
 * RoomImage Model
 *
 * @property Room $Room
 */
class RoomImage extends AppModel {
/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'id';

	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * hasMany associations
 *
 * @var array
 */
	public $belongsTo = array('Room');

}
