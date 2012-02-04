<div class="alert-message warning centre">KORDS4 is still very much in its beta stages, please be aware of this and visit <?= $this->Html->link('http://github.com/gfarrell/KORDS'); ?> to report any issues.</div>
<div id="LandingWelcome" class="centre">
	<h1>KORDS 4<br/><small>what are you looking for?</small></h1>
	<ul data-behavior="SelectNavigation" class="unstyled item_list">
		<li><?= $this->Html->link('All rooms', '/rooms/#/for=all/', array('class'=>'btn-primary', 'title'=>'All')); ?></li>
		<?php foreach($tenant_types as $t) { 
			$name = $t['TenantType']['name'];
			echo '<li>';
			echo $this->Html->link(
				Inflector::humanize($name) . ' rooms',
				'/rooms/#/for='.$name,
				array(
					'class'	=>	'btn-primary',
					'title'	=>	$name
				)
			);
			echo '</li>';
		} ?>
	</ul>
</div>

<script language="javascript" defer="defer" type="text/javascript">
	var GlobalBehaviour = new Behavior();
	GlobalBehaviour.apply(document.body);
</script>