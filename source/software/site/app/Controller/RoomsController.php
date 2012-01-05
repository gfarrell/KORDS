<?php
App::uses('AppController', 'Controller', 'JsonResponse', 'Json.Network');

/**
 * Rooms Controller
 *
 * @property Room $Room
 */
class RoomsController extends AppController {
	var $paginate = array(
		'Room'	=>	array(
			'contain'	=>	array('Location', 'RentBand')
		)
	);
	var $filters = array(
			'contract'	=>	array(
				'type'		=>	'string',
				'allowed'	=>	array('', 'long', 'short')
			),
			'ensuite'	=>	array(
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
			'rent_band'	=>	array(
				'type'		=>	'id'
			),
			'tenant_type'	=>	array(
				'type'		=>	'id'
			),
			'room_status'	=>	array(
				'type'		=>	'id'
			),
			'location'	=>	array(
				'type'		=>	'id'	
			)
	);
	
	public function beforeFilter() {
		parent::beforeFilter();
		if(in_array($this->params['action'], array('index', 'view'))) {
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
		// Let's check for any filters
		$filter_conds = array();
		if(isset($this->data['Filter']) && is_array($this->data['Filter'])) {	
			foreach($this->data['Filter'] as $f => $c) {
				if(array_key_exists($f, $this->filters)) {
					$filter = $this->filters[$f];
					switch($filter['type']) {
						case 'id':
							$model = Inflector::camelize($f);
							$key = $f.'_id';
							$this->loadModel($model);
							$this->$model->id = (int)$c;
							if($this->$model->exists()) {
								$filter_conds[$key] = $c;
							}
							break;
						default:
							settype($c, $filter['type']);
							if(isset($filter['allowed'])) {
								$allow = (is_array($filter['allowed'])) ? $filter['allowed'] : array($filter['allowed']);
								if(in_array($c, $filter['allowed'])) {
									$filter_conds[$f] = $c;
								}
							} else {
								$filter_conds[$f] = $c;
							}
							break;
					}
				}				
			}
		}
		
		// Let's deal with sorting
		$sort = (isset($this->data['Sort'])) ? $this->data['Sort'] : array('Room.location_id'=>'ASC');
		
		$rooms = $this->Room->find('all', array(
			'conditions'	=>	$filter_conds,
			'order'			=>	$sort,
			'contain'		=>	array()
		));
		
		if($this->params['json']) {
			$this->viewClass = 'Json.Json';
			$this->set('json', $rooms);
			$this->render(false);
		} else {
			$this->set('rooms', $rooms);
			$this->set('locations', $this->Room->Location->find('list'));
			$this->set('rentBands', $this->Room->RentBand->find('list'));
		}
	}

/**
 * view method
 *
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Room->id = $id;
		if (!$this->Room->exists()) {
			throw new NotFoundException(__('Invalid room'));
		}
		
		$this->Room->contain(array(
			'RentBand',
			'Location',
			'TenantType'
		));
		$room = $this->Room->findById($id);
		
		if($this->params['json']) {
			$this->viewClass = 'Json.Json';
			$this->set('json', $room);
			$this->render(false);
		} else {
			$this->_title('Room '.$room['Room']['number']);
			$this->set('room', $room);
		}
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Room->create();
			if ($this->Room->save($this->request->data)) {
				$this->Session->setFlash(__('The room has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The room could not be saved. Please, try again.'));
			}
		}
		$locations = $this->Room->Location->find('list');
		$rentBands = $this->Room->RentBand->find('list');
		$tenantTypes = $this->Room->TenantType->find('list');
		$this->set(compact('locations', 'rentBands', 'tenantTypes'));
	}

/**
 * edit method
 *
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->Room->id = $id;
		if (!$this->Room->exists()) {
			throw new NotFoundException(__('Invalid room'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Room->save($this->request->data)) {
				$this->Session->setFlash(__('The room has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The room could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Room->read(null, $id);
		}
		$locations = $this->Room->Location->find('list');
		$rentBands = $this->Room->RentBand->find('list');
		$tenantTypes = $this->Room->TenantType->find('list');
		$this->set(compact('locations', 'rentBands', 'tenantTypes'));
	}

/**
 * delete method
 *
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
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
		$this->redirect(array('action' => 'index'));
	}
}
