const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

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
  ]);

  const shape = getUserSelectedShape(userInput.shape);
  shape.setColor(userInput.shapeColor);

  const svg = generateSVG(userInput.text, userInput.textColor, shape.render());
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

function generateSVG(text, textColor, shapeContent) {
  return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <style>
      text { fill: ${textColor}; font-family: Arial, sans-serif; font-size: 24px; }
    </style>
    <text x="50" y="50">${text}</text>
    ${shapeContent}
  </svg>`;
}

function saveSVGToFile(svgContent) {
  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
}

getUserInput();
