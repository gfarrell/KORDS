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
			'short_contract'=>	array(
				'type'		=>	'boolean'
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
			'available'	=>	array(
				'type'		=>	'boolean'
			),
			'rent_band'	=>	array(
				'type'		=>	'id'
			),
			'tenant_type'	=>	array(
				'type'		=>	'id',
				'ignore'	=>	'0'
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
					if(array_key_exists('ignore', $filter) && $filter['ignore'] == $c) continue;
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
			'contain'		=>	array('Location')
		));
		
		if($this->params['json']) {
			$this->viewClass = 'Json.Json';
			$this->set('json', $rooms);
			$this->render(false);
		} else {
			$locations = $this->Room->Location->find('list');
			$rentBands = $this->Room->RentBand->find('list');
			
			$tenantTypes = $this->Room->TenantType->find('list');
			
			$this->set(compact('rooms', 'locations', 'rentBands', 'tenantTypes'));
			
			$this->_title('Room Index');
			
			$this->set('breadcrumbs', array(
				array('name'=>'KORDS', 'url'=>'/'),
				array('name'=>'Index', 'url'=>$this->request['url'])
			));
		}
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
		
		$this->Room->contain(array(
			'RentBand',
			'Location',
			'TenantType',
			'RoomImage'
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
