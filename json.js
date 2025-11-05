const fs = require('fs');
const regex = /(<div class="projects">.+<!--end-->)/

let projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'))
let index = fs.readFileSync('index.html', 'utf8')

let project_div = '<div class="projects">'
for (let project of projects) {
    project_div += `<div><span>${project.name}</span><span>${project.description}</span>`
}
project_div += '<!--end-->'
index = regex.replace(index, project_div)

fs.writeFileSync('index.html', index, 'utf8')
