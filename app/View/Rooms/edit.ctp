<?php
/*

	/rooms/edit
	-----------

	@file 		edit.ctp
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/
$edit = (is_array($this->data) && isset($this->data['Room']));
?>
<div class="span12">
	<h1><?= (!$edit ? 'New Room' : 'Editing '.$this->data['Room']['number']); ?></h1>
	
	<?php
	echo $this->element('breadcrumbs');
	echo $this->Form->create('Room');
	echo $this->Form->hidden('Room.id')
	?>
	
	<!-- Basic Room details -->
	<?= $this->Form->inputs(array(
		'legend'				=>	'Basic Details',
		'Room.number'			=>	array(
									'div'	=>	'clearfix',
									'error'	=>	array(
										'attributes'	=>	array(
											'class'			=>	'error help-inline'
										)
									)
								),
		'Room.tenant_type_id'	=>	array(
									'div'	=>	'clearfix',
									'error'	=>	array(
										'attributes'	=>	array(
											'class'			=>	'error help-inline'
										)
									)
								),
		'Room.location_id'		=>	array(
									'div'	=>	'clearfix',
									'error'	=>	array(
										'attributes'	=>	array(
											'class'			=>	'error help-inline'
										)
									)
								),
		'Room.rent_band_id'		=>	array(
									'div'	=>	'clearfix',
									'error'	=>	array(
										'attributes'	=>	array(
											'class'			=>	'error help-inline'
										)
									)
								),
		'Room.short_contract'	=>	array('div'=>'clearfix')
	)); ?>
	
	<!-- More Details -->
	<?= $this->Form->inputs(array(
		'legend'		=>	'Other Details',
		'Room.ensuite'	=>	array('div'=>'clearfix'),
		'Room.double'	=>	array('div'=>'clearfix'),
		'Room.set'		=>	array('div'=>'clearfix'),
		'Room.piano'	=>	array('div'=>'clearfix'),
		'Room.smoking'	=>	array('div'=>'clearfix'),
		'Room.floor'	=>	array(
								'div'	=>	'clearfix',
								'error'	=>	array(
									'attributes'	=>	array(
										'class'			=>	'error help-inline'
									)
								)
							),
	)); ?>
	
	<!-- Notes -->
	<?= $this->Form->inputs(array(
		'legend'				=>	'Notes',
		'Room.location_notes'	=>	array('type'=>'textarea', 'div'=>'clearfix'),
		'Room.use_notes'		=>	array('type'=>'textarea', 'div'=>'clearfix'),
		'Room.catering'				=>	array('div'=>'clearfix'),
	)); ?>
	
	<!-- Metadata/Settings -->
	<?= $this->Form->inputs(array(
		'legend'				=>	'Metadata',
		'Room.available'	=>	array('div'=>'clearfix'),
		'Room.public'		=>	array('div'=>'clearfix')
	)); ?>
	
	<div class="controls centre">
		<?= $this->Form->end(array('label'=>'Save', 'value'=>'Save', 'class'=>'btn btn-primary', 'div'=>false)); ?>
		
		<?php
			$cancel_link = ( !$edit
								? ($this->referer == '' ? '/' : $this->referer)
								: array(
									'controller'	=> 'rooms',
									'id'			=> $this->data['Room']['id'],
									'action'		=> 'view'
								  )
							);
		?>
		
		<?= $this->Html->link('Cancel', $cancel_link, array('class'=>'btn')); ?>
		
		<?php
			if($edit) {
				echo $this->element('delete_button', array(
					'url'	=>	array(
						'controller'	=>	'rooms',
						'id'			=>	$this->data['Room']['id'],
						'action'		=>	'delete'
					),
					'model'	=>	'Room',
					'id'	=>	$this->data['Room']['id']
				));
			}
		?>
	</div>
</div>