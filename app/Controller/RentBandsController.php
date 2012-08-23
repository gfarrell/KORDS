<?php
App::uses('AppController', 'Controller');
/**
 * RentBands Controller
 *
 * @property RentBand $RentBand
 */
class RentBandsController extends AppController {


/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->RentBand->recursive = 0;
		$this->set(array(
			'rent_bands'	=> $this->paginate(),
			'_serialize'	=> 'rent_bands'
		));
	}

/**
 * view method
 *
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->RentBand->id = $id;
		if (!$this->RentBand->exists()) {
			throw new NotFoundException(__('Invalid rent band'));
		}
		$this->set('rentBand', $this->RentBand->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->RentBand->create();
			if ($this->RentBand->save($this->request->data)) {
				$this->Session->setFlash(__('The rent band has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The rent band could not be saved. Please, try again.'));
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
		$this->RentBand->id = $id;
		if (!$this->RentBand->exists()) {
			throw new NotFoundException(__('Invalid rent band'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->RentBand->save($this->request->data)) {
				$this->Session->setFlash(__('The rent band has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The rent band could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->RentBand->read(null, $id);
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
		$this->RentBand->id = $id;
		if (!$this->RentBand->exists()) {
			throw new NotFoundException(__('Invalid rent band'));
		}
		if ($this->RentBand->delete()) {
			$this->Session->setFlash(__('Rent band deleted'));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Rent band was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
