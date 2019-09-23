# Investr
This project uses `Angular 7/8` and `Typescript` for Frontend and `json-server` to mock the data.
Please note that this project has been created as a showcase POC and is NOT currently bootstrapped/deployed.
The project is ONLY avaliable for the purpose of evaluation of my coding and development skills

# How to RUN
  1. Download the project from https://github.com/TheRungtaLibrary/investr
  2. Unzip and Open a Command Line/Terminal and traverse at ROOT directory.
      For example, my ROOT of the project is `C:\Users\t.rungta\Downloads\investr`
  3. RUN `npm install` to install all dependencies specified in PACKAGE.JSON. This step is VERY IMPORTANT
  4. Run `json-server --watch server/projects.json` in the same terminal. The `Projects data` mocked service starts at `http://localhost:3000/projects`
  5. Open another Command Line/Terminal at ROOT directory and run `npm install`
  6. The INVESTR application will open in a browser tab at `http://localhost:4200/`

# The Application consists of -
## Views
  - Registration View for user registration
  - Login View for user login
  - Home module to display all projects which CAN BE bid by the user
  - MyProfile view to display user details and projects invested
  - Amounts are displayed in German Locale
  
## Authentication and Validations -
  - All fields in Login and Registration Views validate user input
  - User Login is authenticated by `JWT TOKEN`
  - ALERTS are displayed on successful/failed login and investment
  - User CAN ONLY invest an amount between 100€-10.000€ which is including validated
  - ALL Validations display appropriate messages for the user
  
## Server -
  - The USER registration and login data uses `LocalStorage` of the browser
  - The Projects data is mocked by `json-server` utility
  
## Resonsiveness and Styling
The Applcation is responsive and is styled using `Bootstrap` utility
