/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n'

 /**
	* React hook that is used to mark the block wrapper element.
	* It provides all the necessary props like the class name.
	*
	* @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
	*/
 import {InspectorControls, RichText, useBlockProps,} from '@wordpress/block-editor'
 import {Panel, PanelBody, RadioControl, CheckboxControl, TextControl} from '@wordpress/components';
 
 
 /**
	* Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
	* Those files can contain any CSS code that gets applied to the editor.
	*
	* @see https://www.npmjs.com/package/@wordpress/scripts#using-css
	*/
 //import './editor.scss'
 import PostSelector from './post-selector'
 
 
 import { useState, useEffect } from '@wordpress/element';
 
 /**
	* The edit function describes the structure of your block in the context of the
	* editor. This represents what the editor will render when the block is used.
	*
	* @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
	*
	* @return {WPElement} Element to render.
	*/
 export default function Edit(props) {
	 // Get parameter and function we need for the module
	 const { attributes: { title, category, listArticle, style, limit, btnRandom, btnTxtAllArticles, btnTxtAllCustom, btnUrlAllCustom, btnAll }, setAttributes } = props
	 // Generate the front
	 const listArticleDisplay = listArticle.map((article) => {
		 const date = new Date(article.date)
		 let month = new Intl.DateTimeFormat('fr', { month: 'long' }).format(date)
		 let year = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date)
 
		 let renderArticles
 
		 if(style === '1') {   // Style Temoignage
			 renderArticles = <div className={`list-article-item list-article-item-${ article.id }`}>
				 <a className="article-link" href={ article.url }>
					 <img className="article-image" src={ article.image.source_url } />
				 </a>
				 <div className="article-info">
					 <p className="article-title">{ article.title }</p>
										 <div className="article-summary" dangerouslySetInnerHTML={{__html: article.excerpt }}></div>
										 <a href={ article.url } className="link article-btn">{__('Découvrir', 'gutenberg') }</a>
								 </div>
			 </div>
		 } else if(style === '2') {   // Style article simple
			renderArticles = <div className={`list-article-item list-article-item-${ article.id }`}>
				<a className="article-link" href={ article.url }>
					<img className="article-image" src={ article.image.source_url } />
				</a>
				<div className="article-info">
					<p className="article-title">{ article.title }</p>
										<div className="article-summary" dangerouslySetInnerHTML={{__html: article.excerpt }}></div>
										<a href={ article.url } className="link article-btn">{__('Découvrir', 'gutenberg') }</a>
								</div>
			</div>
		 }else if(style === '3') {   // Style produit complementaire - max 2 articles
			renderArticles = <div className={`list-article-item list-article-item-${ article.id }`}>
				<a className="article-link" href={ article.url }>
					<figure><img className="article-image" src={ article.image.source_url } /></figure>
					<div className="article-info">
						<p className="article-title title">{ article.title }</p>
					</div>
				</a>
			</div>
		}else {
			 renderArticles = <div className={`list-article-item list-article-item-${ article.id }`}>
				 <a className="article-link" href={ article.url }>
					 <img className="article-image" src={ article.image.source_url } />
				 </a>
				 <div className="article-info">
					 <p className="article-date mentions">{`${month} ${year}`}</p>
										 <p className="article-title title title-small">{ article.title }</p>
										 <a href={ article.url } className="link article-btn">{__('Lire la suite', 'gutenberg') }</a>
								 </div>
			 </div>
		 }
		 return (renderArticles)
	 } )
 
	 const [h2, setH3] = useState(null);
	 const [eventAdded, setEventAdded] = useState(false);
	 const [length, setLength] = useState(0);
 
	 useEffect(() => {
		 setH3(document.querySelector('#block-' + props.clientId).querySelector('h2'))
	 }, [])
 
	 useEffect(() => {
		 if (h2 && !eventAdded) {
			 h2.addEventListener("input", () => {
				 setLength(h2.innerText.length)
			 })
			 setEventAdded(true)
		 }
	 }, [h2, eventAdded])
 
			 // 
	 // Generate the render for attributes field
	 const listArticleFields =
		 <>
			 <div className="list-article-heading">
				 <RichText
					 tagName="span"
					 className="list-article-category"
					 disabled={true}
					 placeholder={__('Entrer une catégorie','gutenberg')}
					 value={ category }
					 onChange={ (category) => setAttributes({ category }) }
				 />
				 <RichText
					 tagName="h2"
					 className="list-article-title"
					 placeholder={__('Entrer un titre','gutenberg')}
					 value={ title }
					 style={{backgroundColor: `${length > 50 ? 'red': 'white'}`}}
					 onChange={ (title) =>  setAttributes({ title }) }
 
				 />
			 </div>
			 <div className="list-article">
				 { (listArticleDisplay ) }
			 </div>
			 { (btnAll) =='1' ? <a className="btn btn-all-articles" href=""><span><span>{ btnTxtAllArticles }</span></span></a> :  ""}
			 { (btnAll) =='0' ? <a className="btn btn-all-articles" href=""><span><span>{ btnTxtAllCustom }</span></span></a> : ""}
 
 
		 </>
 
	 const structBtnAllArticles =
		 <>
			 <TextControl
			 label={__('Intitulé bouton "Voir tous les articles"','gutenberg')}
			 value={ btnTxtAllArticles }
			 onChange={ (btnTxtAllArticles) => setAttributes({ btnTxtAllArticles }) }
			 />
		 </>
 
	 const structBtnAllCustom =
		 <>
			 <TextControl
			 label={__('Intitulé bouton "Voir tous les ..."','gutenberg')}
			 value={ btnTxtAllCustom }
			 onChange={ (btnTxtAllCustom) => setAttributes({ btnTxtAllCustom }) }
			 />
			 <TextControl
			 label={__('Lien bouton "Voir tous les ..."','gutenberg')}
			 value={ btnUrlAllCustom }
			 onChange={ (btnUrlAllCustom) => setAttributes({ btnUrlAllCustom }) }
			 />
		 </>
 
 
	 return [
		 <InspectorControls>
			 <PanelBody
				 title={  __('Liste Produit','gutenberg') }
				 initialOpen={ true }
				 className="form-list-article list-article"
			 >
				 <PostSelector
					 onPostSelect={post => {
						 console.log('on vient d ajouter ', listArticle.length, style);
						 if(  style == '3' && listArticle.length >= 1){
							setAttributes({ limit: 2 });
						}
						 const updatedPosts = [...listArticle, post]
						 setAttributes({ listArticle: updatedPosts })
					 }}
					 posts={listArticle}
					 onChange={newValue => {
						 setAttributes({ listArticle: [...newValue] })
					 }}
					 postType={''}
					 style={style}
					 limit={limit}
				 />
				 <CheckboxControl
					 label={ __('Affichage aléatoire', 'gutenberg') }
					 checked={ btnRandom }
					 onChange={ (btnRandom) => setAttributes({ btnRandom }) }
				 />
			 </PanelBody>
			 <PanelBody title={ __('Sélection du style d\'affichage','gutenberg') }>
				 <Panel>
					 <RadioControl
						 label={ __('Style','gutenberg') }
						 selected={ style }
						 options={ [
							 { label: __('Style Produits Quinconce', 'gutenberg'), value: '2' },
							 { label: __('Style Produits Alignés', 'gutenberg'), value: '1' },
							 { label: __('Style Produits Complémentaires', 'gutenberg'), value: '3' },
						 ] }
						 onChange={ (style) => setAttributes({ style }) }
					 />
					 <RadioControl
						 label={ __('Bouton "Voir tous les ..."','gutenberg') }
						 selected={ btnAll }
						 options={ [
							 { label: __('Désactiver', 'gutenberg'), value: "2" },
							 { label: __('Pointer vers les articles', 'gutenberg'), value: "1" },
							 { label: __('Personnaliser le lien', 'gutenberg'), value: "0" },
						 ] }
						 onChange={ (btnAll) => setAttributes({ btnAll }) }
					 />
					 { (btnAll == "0") ? structBtnAllCustom : "" }
					 { (btnAll == "1") ? structBtnAllArticles : "" }
				 </Panel>
			 </PanelBody>
		 </InspectorControls>
		 ,
		 <div { ...useBlockProps() }>
			 <div className={`style-${ style }`}>
				 <div className="wrapper-content">
					 {listArticleFields }
				 </div>
			 </div>
		 </div>
	 ]
 }
 