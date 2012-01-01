<?php
App::uses('AppController', 'Controller', 'JsonResponse', 'Json.Network');

/**
 * Rooms Controller
 *
 * @property Room $Room
 */
class RoomsController extends AppController {


/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Room->recursive = 0;
		$this->set('rooms', $this->paginate());
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
			$this->view = 'Json.Json';
			$this->set('json', $room);
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
