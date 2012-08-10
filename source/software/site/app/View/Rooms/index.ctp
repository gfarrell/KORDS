<div class="row-fluid">
	<div id="Sidebar" class="span3">
		<h1><a href="/" title="KORDS 4">KORDS 4</a></h1>
		<?= $this->element('breadcrumbs'); ?>
		<div id="RoomsFilter">
			<?php
				/**
				 *	Room Filter Form
				 *	-> Ensuite: #/yes/no
				 *	-> Piano: #/yes/no
				 *	-> Smoking: #/yes/no
				 *	-> Location: #/[locations/]
				 *	-> Rent Band: #/[rent bands/]
				 */	
				echo $this->Form->create('Filter', array(
					'inputDefaults'	=>	array(
						'empty'			=>	'All',
						'class'			=>	'filter',
						'options'		=>	array(
							true	=>	'Yes',
							false	=>	'No'
						)
					)
				));
					
					echo $this->Form->inputs(array(
						'legend'	=> 'Filter Rooms',
						
						'Contract'	=>	array(
							'name'		=>	'data[Filter][short_contract]',
							'empty'		=>	'All',
							'class'		=>	'filter',
							'options'	=>	array(
											false	=>	'Either',
											true	=>	'Short Only'
							)
						),
						'Ensuite' 	=>	array(
							'name'		=>	'data[Filter][ensuite]'
						),
						'Set'		=>	array(
							'name'		=>	'data[Filter][set]'
						),
						'Double'	=>	array(
							'name'		=>	'data[Filter][double]'
						),
						'Piano'		=>	array(
							'name'		=>	'data[Filter][piano]'
						),
						'Smoking'	=>	array(
							'name'		=>	'data[Filter][smoking]'
						),
						'Location'	=> array(
							'name'		=>	'data[Filter][location]',
							'options'	=>	$locations
						),
						'RentBand'	=> array(
							'name'		=>	'data[Filter][rent_band]',
							'options'	=>	$rentBands
						),
						'Available'	=>	array(
							'name'		=>	'data[Filter][available]'
						)
					));
					
					echo $this->Form->input('Sort', array(
						'name'		=>	'data[Sort]',
						'class'		=>	'sorter',
						'options'	=>	array(
							'Room.number'			=>	'Room Number',
							'Location.name'			=>	'Location',
							'Room.rent_band_id'		=>	'Rent Band',
							'Room.available DESC'	=>	'Room Availability'
						)
					));
					
					echo $this->Form->input('AutoRefresh', array(
						'name'		=>	'auto_refresh',
						'class'		=>	'control',
						'options'	=>	array(
							false		=>	'Off',
							true		=>	'On'
						)
					));
					
				echo $this->Form->end();
				
				if($this->Session->check('Kords.user_authorised')) {
					echo $this->Html->tag('br');
					echo $this->Html->link('Add a Room', array('action'=>'add'), array('class'=>'btn'));
					echo $this->Html->link('View Comments', array('controller'=>'comments', 'action'=>'pending'), array('class'=>'btn'));
				}
			?>
		</div>
	</div>

	<div id="Primary" class="span9">
	</div>
	<script language="javascript" type="text/javascript" defer="defer">
		var RoomControl = new RoomFilterController(
			$('FilterIndexForm'),
			$('Primary'),
			{
				data_url:			'/rooms/index.json',
				room_url_format:	'/rooms/view/__id__',
				tenant_types:		<?= json_encode(array_merge(array(0=>'all'), $tenantTypes)); ?>
			}
		);
	</script>
</div>