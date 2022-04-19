// node modules
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

// these are the team profiles
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// generate html
const generateSite = require("./src/generateHTML");

const dist_dir = path.resolve(__dirname, "dist");
const dist_path = path.join(dist_dir, "team.html");

const teamMembers = [];

const T = true;
const F = false;

function questions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Managers ID?",
        name: "managerID",
      },
      {
        type: "input",
        message: "What is the Managers email?",
        name: "managerEmail",
      },
      {
        type: "input",
        message: "Please enter office number",
        name: "officeNum",
      },
    ])
    .then((nameInput) => {
      console.log("nameInput:", nameInput);
    })
    .catch((error) => {
      console.log(`an error: ${error}`);
    });
}

const setupEngineer = function () {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the Engineers ID?",
      name: "engineerID",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter the Engineers ID");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "What is the Engineers email?",
      name: "engineerEmail",
      validate: (nameInput) => {
        if (nameInput.engineerEmail) {
          return true;
        } else {
          console.log("Please enter the Engineers email");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "Please type the Engineers github username",
      name: "engineerGithub",
      validate: (nameInput) => {
        if (nameInput.engineerGithub) {
          return true;
        } else {
          console.log("Please enter the Engineerss Github username");
          return false;
        }
      },
    },
  ]);
};

const setupIntern = function () {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the Interns ID?",
      name: "internID",
      validate: (nameInput) => {
        if (nameInput.internID) {
          return true;
        } else {
          console.log("Please enter the Interns ID");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "What is the Interns email?",
      name: "internEmail",
      validate: (nameInput) => {
        if (nameInput.internEmail) {
          return true;
        } else {
          console.log("Please enter the Interns email");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "Please enter the name of the school the Intern is attending",
      name: "internSchool",
      validate: (nameInput) => {
        if (nameInput.internSchool) {
          return true;
        } else {
          console.log("Please enter the Interns school");
          return false;
        }
      },
    },
  ]);
};

// function to write/generate HTML
function generateHTML() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <title>Team Profile</title>
  </head>
  <body>
      <nav class="navbar navbar-dark bg-dark mb-5">
          <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
      </nav>
      <div class="container">
          <div class="row">`;
  return fs.writeFile("./dist/generate.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("start");
}

function addHtml(member) {
  return new Promise(function (resolve, reject) {
    let name = member.getName();
    let role = member.getRole();
    let id = member.getId();
    let email = member.getEmail();
    let data = "";
    if (role === "Engineer") {
      let gitHub = member.getGithub();
      data = `<div class="col-6">
          <div class="card mx-auto mb-3" style="width: 18rem">
          <h5 class="card-header">${name}<br /><br />Engineer</h5>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email Address: ${email}</li>
              <li class="list-group-item">GitHub: ${gitHub}</li>
          </ul>
          </div>
      </div>`;
    } else if (role === "Intern") {
      let school = member.getSchool();
      data = `<div class="col-6">
          <div class="card mx-auto mb-3" style="width: 18rem">
          <h5 class="card-header">${name}<br /><br />Intern</h5>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email Address: ${email}</li>
              <li class="list-group-item">School: ${school}</li>
          </ul>
          </div>
      </div>`;
    } else {
      let officePhone = member.getOfficeNumber();
      data = `<div class="col-6">
          <div class="card mx-auto mb-3" style="width: 18rem">
          <h5 class="card-header">${name}<br /><br />Manager</h5>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email Address: ${email}</li>
              <li class="list-group-item">Office Phone: ${officePhone}</li>
          </ul>
          </div>
      </div>`;
    }
    console.log("adding team member");
    fs.appendFile("./dist/team.html", data, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

// const pattern = new RegExp("${ " + placeholder + " }", "gm");
// function to intialize the app
function init() {
  questions();
  generateHTML();
  setupEngineer();
  setupIntern();
}

init();
