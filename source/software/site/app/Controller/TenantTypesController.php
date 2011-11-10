<?php
App::uses('AppController', 'Controller');
/**
 * TenantTypes Controller
 *
 * @property TenantType $TenantType
 */
class TenantTypesController extends AppController {


/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->TenantType->recursive = 0;
		$this->set('tenantTypes', $this->paginate());
	}

/**
 * view method
 *
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->TenantType->id = $id;
		if (!$this->TenantType->exists()) {
			throw new NotFoundException(__('Invalid tenant type'));
		}
		$this->set('tenantType', $this->TenantType->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->TenantType->create();
			if ($this->TenantType->save($this->request->data)) {
				$this->Session->setFlash(__('The tenant type has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The tenant type could not be saved. Please, try again.'));
			}
		}
	}

/**
 * edit method
 *
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->TenantType->id = $id;
		if (!$this->TenantType->exists()) {
			throw new NotFoundException(__('Invalid tenant type'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->TenantType->save($this->request->data)) {
				$this->Session->setFlash(__('The tenant type has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The tenant type could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->TenantType->read(null, $id);
		}
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
		$this->TenantType->id = $id;
		if (!$this->TenantType->exists()) {
			throw new NotFoundException(__('Invalid tenant type'));
		}
		if ($this->TenantType->delete()) {
			$this->Session->setFlash(__('Tenant type deleted'));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Tenant type was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
