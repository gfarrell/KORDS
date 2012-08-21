<?php
	$m_id = 'Delete_' . $model . $id;
	$f_id = $m_id . '_Form';

	echo $this->Html->link('Delete', '#', array(
		'class'	=>	'btn btn-danger',
		'data-trigger'	=>	'BS.showPopup',
		'data-bs-showpopup-target'	=>	'!body #'.$m_id
	));
?>
 
<div data-behavior="BS.Popup" class="modal fade" id="<?= $m_id; ?>" >
  <div class="modal-header">
    <a href="#" class="close">×</a>
    <h3>Delete <?= $model; ?>?</h3>
  </div>
  <div class="modal-body">
    <p>Are you sure you wish to delete this <?= Inflector::humanize($model); ?>?</p>

    <?php
    	echo $this->Form->create('Delete', array(
			'url'		=>	$url,
			'method'	=>	'post',
			'class'		=>	'form-discrete',
			'id'		=>	$f_id
		));
		echo $this->Form->hidden('Room.id');
		echo $this->Form->end();
    ?>
  </div>
  <div class="modal-footer centre">
    <a href="#" data-behavior="modaldelete" data-modaldelete-form="<?= $f_id; ?>" class="btn btn-danger dismiss stopEvent">Yes, I am sure</a>
    <a href="#" class="btn secondary dismiss stopEvent">Hang on, maybe not</a>
  </div>
</div>