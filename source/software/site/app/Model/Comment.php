<?php
App::uses('AppModel', 'Model');
/**
 * Comment Model
 *
 * @property Room $Room
 */
class Comment extends AppModel {
/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'body';

	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * belongsTo associations
 *
 * @var array
 */
	public $belongsTo = array(
		'Room' => array(
			'className' => 'Room',
			'foreignKey' => 'room_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
