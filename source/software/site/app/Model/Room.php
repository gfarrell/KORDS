<?php
App::uses('AppModel', 'Model');
/**
 * Room Model
 *
 * @property Location $Location
 * @property RentBand $RentBand
 * @property TenantType $TenantType
 * @property Comment $Comment
 */
class Room extends AppModel {
	var $actsAs = array('Containable');
/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'number';

	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * belongsTo associations
 *
 * @var array
 */
	public $belongsTo = array(
		'Location' => array(
			'className' => 'Location',
			'foreignKey' => 'location_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'RentBand' => array(
			'className' => 'RentBand',
			'foreignKey' => 'rent_band_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'TenantType' => array(
			'className' => 'TenantType',
			'foreignKey' => 'tenant_type_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

/**
 * hasMany associations
 *
 * @var array
 */
	public $hasMany = array(
		'Comment' => array(
			'className' => 'Comment',
			'foreignKey' => 'room_id',
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
