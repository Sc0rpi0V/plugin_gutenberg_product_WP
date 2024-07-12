/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
 import { registerBlockType } from '@wordpress/blocks'

 /**
  * Retrieves the translation of text.
  *
  * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
  */
 import { __ } from '@wordpress/i18n'
 
 /**
  * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
  * All files containing `style` keyword are bundled together. The code used
  * gets applied both to the front of your site and to the editor.
  *
  * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
  */
 //import './style.scss'
 
 /**
  * Internal dependencies
  */
 import Edit from './edit'
 
 /**
  * Every block starts by registering a new block type definition.
  *
  * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
  */
 registerBlockType( 'create-block/gutenberg-product', {
   /**
    * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
    */
   apiVersion: 2,
 
   description: __("Permet d'afficher une liste de produits", "gutenberg_admin"),
   title: __("Liste de produits", "gutenberg_admin"),
   /**
    * @see ./edit.js
    */
   edit: Edit,
 } );
 