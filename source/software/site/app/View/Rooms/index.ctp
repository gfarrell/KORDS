<div id="Sidebar" class="sidebar">
	<h1>KORDS 4</h1>
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
					
					'Ensuite' 	=> array(
						'name'		=>	'data[Filter][ensuite]',
						'empty'		=>	'All',
						'class'		=>	'filter',
						'options'	=>	array(
										true	=>	'Yes',
										false	=>	'No'
										),
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
					'RoomStatus'=>	array(
						'name'		=>	'data[Filter][room_status]',
						'class'		=>	'filter',
						'empty'		=>	'All'
					)
				));
				
				echo $this->Form->input('Sort', array(
					'name'		=>	'data[Sort]',
					'class'		=>	'sorter',
					'options'	=>	array(
						'Room.number'		=>	'Room Number',
						'Room.location_id'	=>	'Location',
						'Room.rent_band_id'	=>	'Rent Band'
					)
				));
				
			echo $this->Form->end();
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
			data_url:	'/json/rooms/'
		}
	);
</script>