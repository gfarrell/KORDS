<ul class="rooms records">
<?php foreach($rooms as $room): ?>
	<li>
		<?= $this->Html->link($room['Room']['number'], '/rooms/'.$room['Room']['id']); ?>
	</li>
<?php endforeach; ?>
</ul>