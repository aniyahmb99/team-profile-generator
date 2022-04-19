const inquirer = require("inquirer");

// these are the team profiles
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teamMembers = [];

function questions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Managers Name?",
        name: "managerName",
        // validate: (nameInput) => {
        //   if (nameInput.managerID) {
        //     return true;
        //   } else {
        //     console.log("Please enter the Managers ID");
        //     return false;
        //   }
        // },
      },
      {
        type: "input",
        message: "What is the Managers ID?",
        name: "managerID",
        // validate: (nameInput) => {
        //   if (nameInput.managerID) {
        //     return true;
        //   } else {
        //     console.log("Please enter the Managers ID");
        //     return false;
        //   }
        // },
      },
      {
        type: "input",
        message: "What is the Managers email?",
        name: "managerEmail",
        // validate: (nameInput) => {
        //   if (nameInput.managerEmail) {
        //     return true;
        //   } else {
        //     console.log("Please enter the Managers email");
        //     return false;
        //   }
        // },
      },
      {
        type: "input",
        message: "Please enter office number",
        name: "officeNum",
        // validate: (nameInput) => {
        //   if (nameInput.officeNum) {
        //     return true;
        //   } else {
        //     console.log("Please enter the office number");
        //     return false;
        //   }
        // },
      },
    ])
    .then((nameInput) => {
      let manager = new Manager(
        nameInput.managerName,
        nameInput.managerID,
        nameInput.managerEmail,
        nameInput.officeNum
      );

      teamMembers.push(manager);
    })
    .catch((error) => {
      console.log(`an error: ${error}`);
    });
}

questions();
