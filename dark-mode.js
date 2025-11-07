let stylesheet = document.querySelector('link[rel="stylesheet"]')
stylesheet.setAttribute('href', 'light.css')
let savedTheme = localStorage.getItem('theme')
if (savedTheme)
	stylesheet.setAttribute('href', savedTheme)

document.querySelector('nav').addEventListener('click', function() {
	if (stylesheet.getAttribute('href') === 'light.css')
		stylesheet.setAttribute('href', 'dark.css')
	else
		stylesheet.setAttribute('href', 'light.css')
	localStorage.setItem('theme', stylesheet.getAttribute('href'))

})
