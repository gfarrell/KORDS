<div id="Sidebar" class="sidebar">
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
						'options'	=>	array(
										'#'	=>	'All',
										'1'	=>	'Yes',
										'0'	=>	'No'
										)
					),
					'Piano'		=>	array(
						'name'		=>	'data[Filter][piano]',
						'options'	=>	array(
										'#'	=>	'All',
										'1'	=>	'Yes',
										'0'	=>	'No'
										)
					),
					'Smoking'	=>	array(
						'name'		=>	'data[Filter][smoking]',
						'options'	=>	array(
										'#'	=>	'All',
										'1'	=>	'Yes',
										'0'	=>	'No'
										)
					),
					'Location'	=> array(
						'name'		=>	'data[Filter][location]',
						'empty'		=>	'All'
					),
					'RentBand'	=> array(
						'name'		=>	'data[Filter][rent_band]',
						'empty'		=>	'All'
					)
				));
				
				echo $this->Form->input('Sort', array(
					'name'		=>	'data[Sort]',
					'options'	=>	array(
						'Room.number'		=>	'Room Number',
						'Room.location_id'	=>	'Location',
						'Room.rent_band'	=>	'Rent Band'
					)
				));
				
			echo $this->Form->end();
		?>
	</div>
</div>

<div id="Primary" class="content">
	
</div>