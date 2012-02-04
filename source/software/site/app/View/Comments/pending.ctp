<?php
/*

	/comments/pending
	-----------

	@file 		pending.ctp
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2012 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/
?>

<div class="span12">
	<h1>Comments pending approval</h1>

	<?= $this->element('breadcrumbs'); ?>

	<table class="table-zebra">
		<thead>
			<tr>
				<th>Author</th>
				<th>Date</th>
				<th>Room</th>
				<th>Body</th>
			</tr>
		</thead>
		<tbody>
			<?php foreach($comments as $comment): ?>
			<tr>
				<td><?= $comment['Comment']['author']; ?></td>
				<td><?= $comment['Comment']['date']; ?></td>
				<td><?= $comment['Room']['number']; ?></td>
				<td><?= Markdown($comment['Comment']['body']); ?></td>
				<td><?php
					echo $this->Form->create('Approve', array(
						'url'		=>	array(
							'controller'	=>	'comments',
							'id'			=>	$comment['Comment']['id'],
							'action'		=>	'approve'
						),
						'method'	=>	'post',
						'class'		=>	'form-discrete'
					));
					echo $this->Form->hidden('Comment.id', array(
						'value'=>$comment['Comment']['id']
					));
					echo $this->Form->end(array(
						'label'		=>	'approve',
						'value'		=>	'approve',
						'class'		=>	'btn small success',
						'div'		=>	false,
						'escape'	=>	false
					));
				?></td>
				<td><?php
					echo $this->Form->create('Delete', array(
						'url'		=>	array(
							'controller'	=>	'comments',
							'id'			=>	$comment['Comment']['id'],
							'action'		=>	'delete'
						),
						'method'	=>	'post',
						'class'		=>	'form-discrete'
					));
					echo $this->Form->hidden('Comment.id', array(
						'value'=>$comment['Comment']['id']
					));
					echo $this->Form->end(array(
						'label'		=>	'delete',
						'value'		=>	'delete',
						'class'		=>	'btn small danger',
						'div'		=>	false,
						'escape'	=>	false
					));
				?></td>
			</tr>
			<?php endforeach; ?>
		</tbody>
	</table>
</div>