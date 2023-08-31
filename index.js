const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes'); // Corrected relative path

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (color keyword or hex):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (color keyword or hex):',
    },
    // New prompts for SVG dimensions
    {
      type: 'input',
      name: 'svgWidth',
      message: 'Enter the width of the SVG (in pixels):',
      default: '300',
    },
    {
      type: 'input',
      name: 'svgHeight',
      message: 'Enter the height of the SVG (in pixels):',
      default: '300',
    },
  ]);

  const shape = getUserSelectedShape(userInput.shape);
  shape.setColor(userInput.shapeColor);

  const svg = generateSVG(
    userInput.text,
    userInput.textColor,
    shape.render(),
    userInput.svgWidth,
    userInput.svgHeight
  );
  saveSVGToFile(svg);
}

function getUserSelectedShape(shapeName) {
  switch (shapeName) {
    case 'circle':
      return new Circle();
    case 'triangle':
      return new Triangle();
    case 'square':
      return new Square();
  }
}

function generateSVG(text, textColor, shapeContent, svgWidth, svgHeight) {
  const fontSize = 48; // Adjust the font size as needed

  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    ${shapeContent}
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="${textColor}" font-family="Arial, sans-serif" font-size="${fontSize}">${text}</text>
  </svg>`;
}

function saveSVGToFile(svgContent) {
  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
}

getUserInput();
