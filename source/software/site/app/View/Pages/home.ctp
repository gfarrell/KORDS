<div class="alert-message warning centre">KORDS4 is still very much in its beta stages, please be aware of this and visit <?= $this->Html->link('http://github.com/gfarrell/KORDS'); ?> to report any issues.</div>
<div class="row">
	<div id="LandingWelcome" class="span10 offset3 voffset25">
		<div class="row">
			<div class="span5">
				<h1>KORDS 4<br/><small>which one are you?</small></h1>
			</div>
			<div class="span5">
				<ul class="unstyled item_list">
					<?php foreach($tenant_types as $t) { 
						$name = $t['TenantType']['name'];
						echo '<li>';
						echo $this->Html->link($name, '/rooms/#/for='.$name, array('class'=>'btn primary', 'title'=>$name));
						echo '</li>';
					} ?>
				</ul>
			</div>
		</div>
	</div>
</div>