<div id="Sidebar" class="sidebar">
	<h1><a href="/" title="KORDS 4">KORDS 4</a></h1>
	<?= $this->element('breadcrumbs'); ?>
	<div id="RoomsFilter">
		<?php
			/**
				Room Filter Form
				-> Ensuite: #/yes/no
				-> Piano: #/yes/no
				-> Smoking: #/yes/no
				-> Location: #/[locations/]
				-> Rent Band: #/[rent bands/]
			*/	
			echo $this->Form->create('Filter', array('class'=>'form-stacked'));
				
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
						'name'		=>	'data[Filter][ensuite]',
						'empty'		=>	'All',
						'class'		=>	'filter',
						'options'	=>	array(
										true	=>	'Yes',
										false	=>	'No'
										),
					),
					'Double'	=>	array(
						'name'		=>	'data[Filter][ensuite]',
						'empty'		=>	'All',
						'options'	=>	array(
										true	=>	'Yes',
										false	=>	'No'
						)
					),
					'Piano'		=>	array(
						'name'		=>	'data[Filter][piano]',
						'empty'		=>	'All',
						'class'		=>	'filter',
						'options'	=>	array(
										true	=>	'Yes',
										false	=>	'No'
										)
					),
					'Smoking'	=>	array(
						'name'		=>	'data[Filter][smoking]',
						'empty'		=>	'All',
						'class'		=>	'filter',
						'options'	=>	array(
										true	=>	'Yes',
										false	=>	'No'
										)
					),
					'Location'	=> array(
						'name'		=>	'data[Filter][location]',
						'class'		=>	'filter',
						'empty'		=>	'All'
					),
					'RentBand'	=> array(
						'name'		=>	'data[Filter][rent_band]',
						'class'		=>	'filter',
						'empty'		=>	'All'
					),
					'Available'	=>	array(
						'name'		=>	'data[Filter][available]',
						'empty'		=>	'All',
						'class'		=>	'filter',
						'options'	=>	array(
										true	=>	'Yes',
										false	=>	'No'
						)
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
			}
		?>
	</div>
</div>

<div id="Primary" class="content">
</div>
<script language="javascript" type="text/javascript" defer="defer">
	var RoomControl = new RoomFilterController(
		$('FilterIndexForm'),
		$('Primary'),
		{
			data_url:			'/json/rooms/',
			room_url_format:	'/rooms/view/__id__',
			tenant_types:		<?= json_encode(array_merge(array(0=>'all'), $tenantTypes)); ?>
		}
	);
</script>