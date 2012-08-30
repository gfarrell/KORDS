<?php
App::uses('AppController', 'Controller');

/**
 * Rooms Controller
 *
 * @property Room $Room
 */
class RoomsController extends AppController {
	var $paginate = array(
		'Room'	=>	array(
			'contain'	=>	array('Location', 'RentBand'),
			'limit'		=>	50,
			'order'		=>	array(
				'Room.location_id' => 'ASC'
			)
		)
	);

	var $filters = array(
			'short_contract'=>	array(
				'type'		=>	'boolean'
			),
			'ensuite'	=>	array(
				'type'		=>	'boolean'
			),
			'set'	=>	array(
				'type'		=>	'boolean'
			),
			'double'	=>	array(
				'type'		=>	'boolean'
			),
			'piano'		=>	array(
				'type'		=>	'boolean'
			),
			'smoking'	=>	array(
				'type'		=>	'boolean'
			),
			'available'	=>	array(
				'type'		=>	'boolean'
			),
			'rent_band'	=>	array(
				'type'		=>	'id'
			),
			'tenant_type'	=>	array(
				'type'		=>	'id',
				'ignore'	=>	null
			),
			'location'	=>	array(
				'type'		=>	'id'	
			)
	);
	
	public function beforeFilter() {
		parent::beforeFilter();
		if(in_array($this->params['action'], array('index', 'view', 'delete'))) {
			$this->Security->validatePost = false;
			$this->Security->csrfCheck = false;
		}
	}

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$filter_conds = array();	// Contains the find conditions
		$filters      = array();	// Will contain the filters specified in the request
		
		// The filters can either be in named parameters filter_* or in POST data data[Filter][*]
		// Let's deal with POST data first
		if(isset($this->data['Filter']) && is_array($this->data['Filter'])) {	
			foreach($this->data['Filter'] as $f => $c) {
				if(array_key_exists($f, $this->filters)) {
					$filters[$f] = $this->filters[$f];
					$filters[$f]['value'] = $c;
				}
			}
		} else { // Now let's see what we find in the named parameters		
			$named = $this->request->named;
			foreach($named as $parameter=>$value) {
				if(strpos($parameter, 'filter_') == 0) {		// if it starts with filter_
					$f = str_replace('filter_', '', $parameter);
					if(array_key_exists($f, $this->filters)) {	// if we have defined this filter
						$filters[$f] = $this->filters[$f];
						$filters[$f]['value'] = $value;
					}
				}
			}
		}

		// Now that we have extracted the filters from the request, let's go through them
		foreach($filters as $f=>$filter) {
			$c = $filter['value'] or null;					// convenience variable
			
			if(array_key_exists('ignore', $filter)			// if we are supposed to ignore this value
				&& $filter['ignore'] == $c) continue;		// then continue
			
			switch($filter['type']) {
				case 'id':
					$model = Inflector::camelize($f);			// type 'id' requires another model, so get the name of it
					$key = $f.'_id';							// the key is model_id (non-camelised)
					$this->loadModel($model);					// Load the relevant model
					$this->$model->id = (int)$c;				// and get its ID from the request value
					if($this->$model->exists()) {				// if the record exists
						$filter_conds[$key] = $c;				// then set it as a condition
					}
					break;
				case 'boolean':									// Booleans require special parsing
					$filter_conds[$f] = filter_var($c, FILTER_VALIDATE_BOOLEAN);
					break;
				case 'int':										// For ints we use intval, more reliable than settype
					$c = intval($c);
				default:
					if(isset($filter['allowed'])) {				// check if there are a set of allowed values
						$allow = (								// Basic safety check on the var type
							is_array($filter['allowed'])
							? $filter['allowed']
							: array($filter['allowed'])
						);
						if(in_array($c, $filter['allowed'])) {	// if the value is allowed, use it
							$filter_conds[$f] = $c;			
						}
					} else {
						$filter_conds[$f] = $c;					// otherwise just set the filter condition as the value from the request
					}
			}

		}

		// Let's deal with sorting
		// This can also be contained in either post data or named parameters
		if(isset($this->data['Sort'])) {
			$sort = $this->data['Sort'];
		} else if(array_key_exists('sort', $this->request->named)) {
			$sort = $this->request->named['sort'];
		} else {
			$sort = array('Room.location_id'=>'ASC');
		}
		
		// Now perform the find
		// We're going to do this via pagination...
		$this->paginate['Room'] = array(
			'conditions'	=>	$filter_conds,
			'order'			=>	$sort,
			'limit'			=>	50,
			'contain'		=> 	array('Location', 'RentBand')
		);
		$rooms = $this->paginate('Room');

		$this->set(array(
			'rooms'			=> $rooms,
			'_serialize'	=> 'rooms'
		));
	}

/**
 * view method
 *
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		if($id === null) $id = $this->params['id'];
		$this->Room->id = $id;
		if (!$this->Room->exists()) {
			throw new NotFoundException(__('Invalid room'));
		}

		$comment_conditions = $this->Session->read('Kords.user_authorised') ? array() : array('conditions'=>array('Comment.public'=>true));

		$comment_conditions['order'] = array('Comment.date ASC');
		
		$this->Room->contain(array(
			'RentBand',
			'Location',
			'TenantType',
			'RoomImage',
			'Comment'	=>	$comment_conditions
		));
		$room = $this->Room->findById($id);
		
		if($this->params['json']) {
			$this->viewClass = 'Json.Json';
			$this->set('json', $room);
			$this->render(false);
		} else {
			$this->_title('Room '.$room['Room']['number']);
			$this->set('room', $room);
			$this->set('breadcrumbs', array(
				array('name'=>'KORDS', 'url'=>'/'),
				array('name'=>'Rooms', 'url'=>'/rooms/'),
				array('name'=>$room['Room']['number'], 'url'=>$this->request['url'])
			));

			App::import('Vendor', 'Markdown/markdown');
		}
	}

/**
 * edit method
 *
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		if($id === null) $id = $this->params['id'];
		$this->Room->id = $id;
		if (!$this->Room->exists()) {
			$this->_title('New Room');
			$this->set('breadcrumbs', array(
				array('name'=>'KORDS', 'url'=>'/'),
				array('name'=>'Rooms', 'url'=>'/rooms/'),
				array('name'=>'New Room', 'url'=>$this->request['url'])
			));
		} else {
			$this->_title('Editing '.$this->Room->field('number'));
			
			$this->set('breadcrumbs', array(
				array('name'=>'KORDS', 'url'=>'/'),
				array('name'=>'Rooms', 'url'=>'/rooms/'),
				array('name'=>$this->Room->field('number'), 'url'=>'/rooms/'.$id),
				array('name'=>'Edit', 'url'=>$this->request['url'])
			));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Room->save($this->request->data)) {
				$this->Session->setFlash(__('The room has been saved'));
				$this->redirect(array('id'=>$this->Room->id, 'action' => 'view'));
			} else {
				$this->Session->setFlash(__('The room could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Room->read(null, $id);
		}
		$locations = $this->Room->Location->find('list');
		$rentBands = $this->Room->RentBand->find('list');
		$tenantTypes = $this->Room->TenantType->find('list');
			$tenantTypes = array_map(function($val) { return Inflector::humanize($val); }, $tenantTypes);
		$this->set(compact('locations', 'rentBands', 'tenantTypes'));
	}

/**
 * delete method
 *
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		if($id === null) $id = $this->params['id'];
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}
		$this->Room->id = $id;
		if (!$this->Room->exists()) {
			throw new NotFoundException(__('Invalid room'));
		}
		if ($this->Room->delete()) {
			$this->Session->setFlash(__('Room deleted'));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Room was not deleted'));
		$this->redirect(array('id'=>$id, 'action' => 'view'));
	}
}
