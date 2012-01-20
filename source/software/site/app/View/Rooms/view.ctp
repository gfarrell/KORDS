<div id="Room" class="span16">
	<h1><?= $room['Location']['name'] . ' - ' . $room['Room']['number']; ?></h1>
	
	<section id="RoomInfo" class="row">
		<table id="InfoTable" class="zebra-striped condensed-table span8">
			<tr>
				<td>Location</td>
				<td><?= $room['Location']['name']; ?></td>
			</tr>
			<tr>
				<td>Contract</td>
				<td><?= ($room['Room']['short_contract'] ? 'short only' : 'long or short'); ?></td>
			</tr>
			<tr>
				<td>Rent</td>
				<td><?= $room['RentBand']['humanised']; ?></td>
			</tr>
			<tr>
				<td>Ensuite</td>
				<td class="<?= ($room['Room']['ensuite'] ? 'green' : 'red'); ?>"><?= ($room['Room']['ensuite']) ? 'yes' : 'no'; ?></td>
			</tr>
			<tr>
				<td>Double</td>
				<td class="<?= ($room['Room']['double'] ? 'green' : 'red'); ?>"><?= ($room['Room']['double']) ? 'yes' : 'no'; ?></td>
			</tr>
			<tr>
				<td>Piano</td>
				<td class="<?= ($room['Room']['piano'] ? 'green' : 'red'); ?>"><?= ($room['Room']['piano']) ? 'yes' : 'no'; ?></td>
			</tr>
			<tr>
				<td>Smoking</td>
				<td class="<?= ($room['Room']['smoking'] ? 'green' : 'red'); ?>"><?= ($room['Room']['smoking']) ? 'yes' : 'no'; ?></td>
			</tr>
			<tr>
				<td>Floor</td>
				<td><?= $room['Room']['floor']; ?></td>
			</tr>
			<tr>
				<td>Available to</td>
				<td><?= Inflector::humanize($room['TenantType']['name']); ?></td>
			</tr>
			<tr>
				<td>Ballot Status</td>
				<td class="<?= ($room['Room']['smoking'] ? 'green' : 'red'); ?>"><?= ($room['Room']['smoking']) ? 'available' : 'taken'; ?></td>
			</tr>
		</table>
		
		<div id="MainImage" class="span8 centre">
			<?php
				if(count($room['RoomImage']) > 0) {
					echo $this->Html->image('/rooms/'.$room['RoomImage'][0]['id'].'.jpg');
				} else {
					echo $this->Html->tag('span', 'No Images', array('class'=>'label important'));
				}
			?>
		</div>
	</section>
</div>