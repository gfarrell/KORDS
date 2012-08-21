<?php if(isset($breadcrumbs) && is_array($breadcrumbs) && count($breadcrumbs > 0)): ?>
<div>
	<ul class="breadcrumb">
		<?php
			$how_many_crumbs = count($breadcrumbs);
			
			for($i=0; $i < $how_many_crumbs; $i++) {
				$crumb = $breadcrumbs[$i];
				$last = $i == $how_many_crumbs - 1;
				$class = ($last) ? 'active' : '';
				echo '<li class="'.$class.'">';
				echo $this->Html->link($crumb['name'], $crumb['url']);
				if(!$last) echo '<span class="divider">/</span>';
				echo '</li>';
			}
		?>
	</ul>
</div>
<?php endif; ?>