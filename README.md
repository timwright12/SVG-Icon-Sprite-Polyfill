# SVG Icon Sprite Polyfill

## A polyfill for Internet explorer and the SVG USE element.

Article: http://csskarma.com/blog/svg-fragment-identifiers/

Demo: https://timwright12.github.io/SVG-Icon-Sprite-Polyfill/

This polyfill allows you to use:

	<svg role="img" aria-label="Describe the icon here" class="icon icon-archive">
		<title>Describe the icon here</title>
		<use xlink:href="img/svg-defs.svg#icon-archive"></use>
	</svg>

in Internet Explorer 9+.

Just include the script and it should work.

Your *svg-defs.svg* file should look like this (repeat the symbol element for each icon):

	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
    			<symbol id="icon-archive" viewBox="0 0 1024 1024">
    				<title>Describe the icon here</title>
    				<path class="path1" d="[all the data points that draw the image]"></path>
    			</symbol>
		</defs>
	</svg>
