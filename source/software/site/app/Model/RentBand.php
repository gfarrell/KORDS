<?php
App::uses('AppModel', 'Model');
/**
 * RentBand Model
 *
 * @property Room $Room
 */
class RentBand extends AppModel {
/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'cost';

	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * hasMany associations
 *
 * @var array
 */
	public $hasMany = array(
		'Room' => array(
			'className' => 'Room',
			'foreignKey' => 'rent_band_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);

}
