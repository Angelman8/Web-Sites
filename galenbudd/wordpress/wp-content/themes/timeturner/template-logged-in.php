<?php
/**
 * Template Name: Logged In
 * The template file for displaying the page content only for logged in users.
 * @package TimeTurner
 * @since TimeTurner 1.0.8
*/
get_header(); ?>

<div id="wrapper-content">
<div class="wrapper-bottom-line">
<div class="wrapper-top-line">
  <div class="container">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="headline-wrapper">
      <div class="description-hatching"></div>
      <div class="description-box">
        <h1 class="content-headline"><?php the_title(); ?></h1>
        <div class="top-left-radius dark-radius"></div>
        <div class="top-right-radius dark-radius"></div>
        <div class="bottom-left-radius dark-radius"></div>
        <div class="bottom-right-radius dark-radius"></div>
      </div>
    </div>
    <div id="content">
<?php if ( is_user_logged_in() ) { ?>
<?php timeturner_get_display_image_page(); ?>
<?php the_content( 'Continue reading' ); ?>
<?php } else { ?>
<p class="logged-in-message"><?php _e( 'You must be logged in to view this page.', 'timeturner' ); ?></p>
<?php wp_login_form(); } ?>
<?php endwhile; endif; ?>
<?php if ( is_user_logged_in() ) { ?>
<?php comments_template( '', true ); ?>
<?php } ?>
    </div> <!-- end of content -->
<?php get_sidebar(); ?>
  </div>
</div>
</div>
</div>     <!-- end of wrapper-blog -->
<?php get_footer(); ?>