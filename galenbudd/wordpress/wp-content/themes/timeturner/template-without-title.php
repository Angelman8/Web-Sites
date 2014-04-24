<?php
/**
 * Template Name: Page without Title
 * The template file for pages without the page title.
 * @package TimeTurner
 * @since TimeTurner 1.0.10
*/
get_header(); ?>

<div id="wrapper-content">
<div class="wrapper-bottom-line">
<div class="wrapper-top-line">
  <div class="container">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div id="content">
<?php timeturner_get_display_image_page(); ?>
<?php the_content(); ?>
<?php endwhile; endif; ?>
<?php comments_template( '', true ); ?>
    </div> <!-- end of content -->
<?php get_sidebar(); ?>
  </div>
</div>
</div>
</div>     <!-- end of wrapper-blog -->
<?php get_footer(); ?>