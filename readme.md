<div class="markdown-body">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"></link>
<style>
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}
	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>

# Rehype wrap

</br>

## Options

* Wrap [ required ]
	* Wrap should be a `selector` string or hast `node` object. 		
		*  If wrap is a string, it should be a css style `selector` that can be parsed into a hast node using  [hast-util-parse-selector](https://github.com/syntax-tree/hast-util-parse-selector) . 
		* If wrap is an object, then it should be a hast `node` that passes [hast-util-is-element](https://github.com/syntax-tree/hast-util-is-element). 


* Select
	* Select should be a `selector` string or hast `node` object. 
		* If select is a string, it should be a css style `selector` that can be parsed into a hast node using [hast-util-parse-selector](https://github.com/syntax-tree/hast-util-parse-selector). 
		* If select is an object, then it should be a hast `node` that passes  [hast-util-is-element](https://github.com/syntax-tree/hast-util-is-element) . 

<br>

## Steps

</div>