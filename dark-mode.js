let stylesheet = document.querySelector('link[rel="stylesheet"]')
stylesheet.setAttribute('href', 'light.css')
let savedTheme = localStorage.getItem('theme')
if (savedTheme)
	stylesheet.setAttribute('href', savedTheme)

document.querySelector('nav').addEventListener('click', function() {
	// GOAL 1: toggle between light and dark mode on click
	if (stylesheet.getAttribute('href') === 'light.css')
		stylesheet.setAttribute('href', 'dark.css')
	else
		stylesheet.setAttribute('href', 'light.css')
	// GOAL 2: save this setting in the browser. start the webpage with the user-prefered theme, instead of always light by default
	localStorage.setItem('theme', stylesheet.getAttribute('href'))

})
