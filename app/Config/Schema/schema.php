<?php 
/* App schema generated on: 2012-08-10 09:43:19 : 1344606199*/
class AppSchema extends CakeSchema {
	function before($event = array()) {
		return true;
	}

	function after($event = array()) {
	}

	var $comments = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'room_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'author' => array('type' => 'string', 'null' => false, 'length' => 10, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'date' => array('type' => 'date', 'null' => false, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'body' => array('type' => 'text', 'null' => false, 'default' => NULL, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'public' => array('type' => 'boolean', 'null' => false, 'default' => '1', 'collate' => NULL, 'comment' => ''),
		'indexes' => array('PRIMARY' => array('column' => array('id', 'room_id'), 'unique' => 1), 'fk_comments_rooms' => array('column' => 'room_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);
	var $locations = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'name' => array('type' => 'string', 'null' => false, 'default' => NULL, 'length' => 150, 'key' => 'unique', 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'name_UNIQUE' => array('column' => 'name', 'unique' => 1)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);
	var $rent_bands = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 1, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'cost_short' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 6, 'collate' => NULL, 'comment' => ''),
		'cost_long' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 6, 'collate' => NULL, 'comment' => ''),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);
	var $room_images = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'room_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index', 'collate' => NULL, 'comment' => ''),
		'image' => array('type' => 'string', 'null' => false, 'length' => 25, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'room_id' => array('column' => 'room_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);
	var $rooms = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'number' => array('type' => 'string', 'null' => false, 'length' => 12, 'key' => 'unique', 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'short_contract' => array('type' => 'boolean', 'null' => false, 'default' => '0', 'collate' => NULL, 'comment' => ''),
		'location_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'rent_band_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 1, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'tenant_type_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'floor' => array('type' => 'integer', 'null' => true, 'default' => '0', 'length' => 1, 'collate' => NULL, 'comment' => ''),
		'ensuite' => array('type' => 'boolean', 'null' => false, 'default' => '0', 'collate' => NULL, 'comment' => ''),
		'set' => array('type' => 'boolean', 'null' => false, 'default' => '0', 'collate' => NULL, 'comment' => ''),
		'double' => array('type' => 'boolean', 'null' => false, 'default' => '0', 'collate' => NULL, 'comment' => ''),
		'smoking' => array('type' => 'boolean', 'null' => false, 'default' => '0', 'collate' => NULL, 'comment' => ''),
		'catering' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 45, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'piano' => array('type' => 'boolean', 'null' => false, 'default' => '0', 'collate' => NULL, 'comment' => ''),
		'location_notes' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 1000, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'use_notes' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 1000, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'available' => array('type' => 'boolean', 'null' => false, 'default' => '1', 'collate' => NULL, 'comment' => ''),
		'public' => array('type' => 'boolean', 'null' => false, 'default' => '1', 'collate' => NULL, 'comment' => ''),
		'indexes' => array('PRIMARY' => array('column' => array('id', 'location_id', 'rent_band_id', 'tenant_type_id'), 'unique' => 1), 'number' => array('column' => 'number', 'unique' => 1), 'fk_rooms_locations1' => array('column' => 'location_id', 'unique' => 0), 'fk_rooms_rent_bands1' => array('column' => 'rent_band_id', 'unique' => 0), 'fk_rooms_tenant_types1' => array('column' => 'tenant_type_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);
	var $tenant_types = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'name' => array('type' => 'string', 'null' => false, 'default' => NULL, 'length' => 50, 'key' => 'unique', 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'name_UNIQUE' => array('column' => 'name', 'unique' => 1)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);
	var $users = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'crsid' => array('type' => 'string', 'null' => false, 'length' => 10, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'charset' => 'latin1'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);
}
?>