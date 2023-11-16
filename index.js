const inquirer = require("inquirer");
const fs = require("fs");
const {Triangle, Circle, Square} = require("./assets/shapes")

function writetofile(fileName, answers) {
    let svgString="";
    svgString='<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>"
    svgString += `${answers.shape}`;


    let chooseShape;
    if (answers.shape === "Triangle") {
      chooseShape = new Triangle();
      svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === "Square") {
      chooseShape = new Square();
      svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
    } else {
      chooseShape = new Circle();
      svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
    }
  
    // <text> tag gives rise to text alignment, text-content/text-color taken in from user prompt and gives default font size of "40"
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // Closing </g> tag
    svgString += "</g>";
    // Closing </svg> tag
    svgString += "</svg>";
  
    // Using file system module to generate svg file, takes in file name given in the promptUser function, the svg string, and a ternary operator which handles logging any errors, or a "Generated logo.svg" message to the console  
    fs.writeFile(fileName, svgString, (err) => {
      err ? console.log(err) : console.log("Generated logo.svg");
    });
  }
  
  // This function utilizes inquirer .prompt to prompt the user to answer questions in the command line and save user input
  function promptUser() {
    inquirer
      .prompt([
        // Text prompt
        {
          type: "input",
          message:
            "What text woudl you like to display?",
          name: "text",
        },
        // Text color prompt
        {
          type: "input",
          message:
            "Choose text color (Enter color keyword OR a hex number)",
          name: "textColor",
        },
        // Shape choice prompt
        {
          type: "list",
          message: "What shape would you like the logo to be?",
          choices: ["Triangle", "Square", "Circle"],
          name: "shape",
        },
        // Shape color prompt
        {
          type: "input",
          message:
            "Choose shapes color (Enter color keyword OR a hex number)",
          name: "shapeColor",
        },
      ])
      .then((answers) => {
        // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
        if (answers.text.length > 3) {
          console.log("Must enter a value of no more than 3 characters");
          promptUser();
        } else {
          writetofile("logo.svg", answers);
        }
      });
  }
  
  // Calling promptUser function so inquirer prompts fire off when application is ran
  promptUser();