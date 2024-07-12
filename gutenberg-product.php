<?php
/**
 * Plugin Name:      Gutenberg Product
 * Description:     Block Gutenberg permettant l'affichage d'un produit Woocommerce avec la description et le prix
 * Version:         0.1.0
 * Author:          
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     gutenberg-product
 *
 * @package         create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
class GutenbergProduct {

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct() {
		/* register activation function */
		register_block_type_from_metadata(__DIR__, [
			'render_callback' => [
				__CLASS__,
				'block_dynamic_render',
			],
		]);
		add_filter('block_categories_all', [__CLASS__, 'gutenberg_category'], 10, 2);
	}

	/**
	 * init
	 *
	 * @return void
	 */
	public static function init() {
		new self;
	}

	/**
	 * Add category if not exist
	 *
	 * @param $categories
	 *
	 * @return array
	 */
	public static function gutenberg_category($categories) {
		if (!in_array([
			'slug' => 'gutenberg',
			'title' => __('Gutenberg Blocks', 'mario-blocks'),
		], $categories)) {
			$news = [
				'slug' => 'gutenberg',
				'title' => __('Gutenberg Blocks', 'mario-blocks'),
			];
			if (!in_array($news, $categories)) {
				return array_merge(
					[
						$news,
					],
					$categories
				);
			}
		}
		return $categories;
	}

	/**
	 * CALLBACK
	 *
	 * Render callback for the dynamic block.
	 *
	 * Instead of rendering from the block's save(), this callback will render
	 * the front-end
	 *
	 * @param $att Attributes from the JS block
	 *
	 * @return string Rendered HTML
	 * @since    1.0.0
	 */
	public static function block_dynamic_render($att) {
		global $product;
		$title = "";
		extract($att);
		$html = '<div class="wp-block-create-block-gutenberg-produit">';
		$html .= '<div class="style-' . $style . '">';
		$html .= '<div class="wrapper-content">';
		$html .= '<div class="list-article-heading">';
		$html .= '<div class="list-article-title title title-category"><h2><span>' . $category . '</span>' . $title . '</h2></div>';
		
		/*} */
		/*  No need for subtitle now
		if(isset($subtitle) && $subtitle){
			$html .= '<div class="list-article-subtitle subtitle"><p>'.$subtitle.'</p></div>';
		}*/
		$html .= '</div>';
		$html .= '<div class="list-article">';
		if (isset($btnRandom) && $btnRandom) {
			shuffle($listArticle);
		}
		foreach ($listArticle as $key => $article) {
			$post_id = has_filter('wpml_object_id') ? apply_filters( 'wpml_object_id', $article['id'], get_post_type($article['id']) ) : $article['id'];
			if ($post_id && $post = get_post($post_id)) {
				$product = wc_get_product($post->ID);
				switch ($style) {
					case '1':  /* Style Produits Alignés */
						$html .= '
                            <div class="list-article-item">
                                <a class="article-link" href="' . get_permalink($post) . '">
                                    <img width="530" height="340" class="article-image" src="' . get_the_post_thumbnail_url($post, "custom_medium") . '" />
                                </a>
                                <div class="article-info">
                                    <p class="article-title is-limited">' . $post->post_title . '</p>';
									if ($product->get_price()) {
										ob_start();
										woocommerce_template_single_price();
										$price = ob_get_contents();
										ob_end_clean();
										$html .= ''.$price.'';
									} else {
										$html .= '';
									}
									$html .= '' . nl2br($post->post_excerpt) . '
                                    <a href="' . get_permalink($post) . '" class="link article-btn">' . __('Découvrir', 'gutenberg') . '</a>
                                </div>
                            </div>';

						break;
					case '2':  /* Style Produits Quiconce */
						$html .= '
                            <div class="list-article-item">
                                <a class="article-link" href="' . get_permalink($post) . '">
                                    <img width="530" height="340" class="article-image" src="' . get_the_post_thumbnail_url($post, "custom_medium") . '" />
                                </a>
                                <div class="article-info">
                                    <p class="article-title is-limited">' . $post->post_title . '</p>';
									if ($product->get_price()) {
										ob_start();
										woocommerce_template_single_price();
										$price = ob_get_contents();
										ob_end_clean();
										$html .= ''.$price.'';
									} else {
										$html .= '';
									}
									$html .= '' . nl2br($post->post_excerpt) . '
									<a href="' . get_permalink($post) . '" class="link article-btn">' . __('Découvrir', 'gutenberg') . '</a>
                                </div>
                            </div>';
						break;
					case '3': /* Sytle Produits Complémentaires */
						$html .= '
						<div class="list-article-item">
							<a class="article-link" href="' . get_permalink($post) . '">
								<figure>
									<img width="100%" height="100%" class="article-image" src="' . get_the_post_thumbnail_url($post, "custom_medium") . '" />
								</figure>

								<div class="article-info">
									<p class="article-title is-limited">' . $post->post_title . '</p>
								</div>
							</a>
						</div>';
						break;
					default: /* Style 4 colonnes avec dates */
						$html .= '
							<div class="list-article-item">
								<a class="article-link" href="' . get_permalink($post) . '">
									<img width="500" height="500" class="article-image" src="' . get_the_post_thumbnail_url($post, "custom_medium") . '" />
								</a>
								<div class="article-info">
									<p class="article-date mentions">' . get_the_date('F Y', $post) . '</p>
									<p class="article-title title title-small is-limited">' . $post->post_title . '</p>
									<a href="' . get_permalink($post) . '" class="link article-btn">' . __('Lire la suite', 'gutenberg') . '</a>
								</div>
							</div>';
				}
			}
		}
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';
		return $html;

	}

}

add_action('init', ['GutenbergProduct', 'init']);
