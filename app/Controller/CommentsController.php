<?php
App::uses('AppController', 'Controller');
/**
 * Comments Controller
 *
 * @property Comment $Comment
 */
class CommentsController extends AppController {
	var $acl = array('pending');

	public function beforeFilter() {
		parent::beforeFilter();

		// This is necessary to prevent SecurityComponent black holing add/edit request from the /rooms/ url.
		$this->Security->validatePost = false;
		$this->Security->csrfCheck = false;
	}

	public function index() {
		$comment_conditions = $this->Session->read('Kords.user_authorised') ? array() : array('conditions'=>array('Comment.public'=>true));

		$comments = array();
		$paginate = true;

		if(isset($this->request->named['room_id'])) {
			$comment_conditions['conditions']['Comment.room_id'] = $this->request->named['room_id'];

			$paginate = false;
		}
		if(isset($this->request->named['author'])) {
			$comment_conditions['conditions']['Comment.author'] = $this->request->named['author'];

			$paginate = false;
		}

		if($paginate) {
			$comments = $this->paginate('Comment', $comment_conditions);
		} else {
			$comments = $this->Comment->find('all', $comment_conditions);
		}

		$this->set(array('comments'=>$comments, '_serialize'=>'comments'));
	}

	public function pending() {
		$comments = $this->Comment->find('all', array(
			'conditions'	=>	array(
				'Comment.public'	=>	false
			),
			'order'			=>	array('Comment.date ASC')
		));

		$this->set(array('comments'=>$comments, '_serialize'=>'comments'));
	}

	public function approve($id = null) {
		if($id === null) $id = $this->params['id'];

		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}

		$this->Comment->id = $id;

		if(!$this->Comment->exists()) {
			throw new NotFoundException(__('Invalid Comment.'));
		}

		$save =  $this->Comment->saveField('public', true);
		$message = ($save) ? 'Comment approved.' : 'Comment could not be approved.';

		if($this->params['json']) {
			$this->viewClass = 'Json.Json';
			$this->set('json', array('message'=>__($message)));
			$this->render(false);
		} else {
			$this->Session->setFlash(__($message));
			$this->redirect(array('action'=>'pending'));
		}
	}

/**
 * add method
 * 
 * @return void
 */
	public function add() {
		if(!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		} else {
			$this->request->data['Comment']['id'] = null;
			$this->edit();
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
		$this->Comment->id = $id;
		
		$edit = $this->Comment->exists();

		if($edit) {
			if(
				!$this->Session->read('Kords.user_authorised')
				&& $this->request->data['Comment']['author'] != $this->Session->read('Raven.user')
			) {
				throw new ForbiddenException('You do not have permission to edit this comment.');
			}
		}

		if ($this->request->is('post') || $this->request->is('put')) {
			if(!($edit && $this->request->data['preserve_date'])) {
				$this->request->data['Comment']['date'] = date('Y-m-d');
			}

			if(!$edit) {
				$user = $this->Session->check('Raven.user') ? $this->Session->read('Raven.user') : 'admin';
				$this->request->data['Comment']['author'] = $user;
			}

			$this->request->data['Comment']['public'] = ($this->Session->read('Kords.user_authorised') ? 1 : 0);
			
			$save = $this->Comment->save($this->request->data);

			$message = ($save) ? 'Comment saved and may be awaiting moderation.' : 'Comment could not be saved.';
			$redirect = array(
				'controller'	=> 'rooms',
				'id'			=> $this->request->data['Comment']['room_id'],
				'action'		=> 'view'
			);

			$this->set(array('message'=>$message, '_serialize'=>'message'));
		} else {
			throw new MethodNotAllowedException();
		}
	}

/**
 * delete method
 *
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		if($id === null) $id = $this->params['id'];
		if (!$this->request->is('delete')) {
			throw new MethodNotAllowedException();
		}
		$this->Comment->id = $id;
		if (!$this->Comment->exists()) {
			throw new NotFoundException(__('Invalid comment'));
		}

		if(
			!$this->Session->read('Kords.user_authorised')
			&& $this->Comment->field('author') != $this->Session->read('Raven.user')
		) {
			throw new ForbiddenException('You do not have permission to delete this comment.');
		}
		$room_id = $this->Comment->field('room_id');
		$del = $this->Comment->delete();

		$message = ($del) ? 'Comment deleted.' : 'Comment could not be deleted.';
		$redirect = array(
			'controller'	=> 'rooms',
			'id'			=> $room_id,
			'action'		=> 'view'
		);

		$this->set(array('message'=>$message, '_serialize'=>'message'));
	}
}
