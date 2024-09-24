// protect.js
const readlineSync = require('readline-sync');

// Define your password
const correctPassword = '123456';

// Prompt for the password
const enteredPassword = readlineSync.question('Enter the password to continue: ', {
  hideEchoBack: true, // The input will be hidden
});

if (enteredPassword === correctPassword) {
  console.log('Password is correct. Proceeding...');
  process.exit(0); // Exit the script with success
} else {
  console.log('Incorrect password. Exiting...');
  process.exit(1); // Exit the script with failure
}




// rl.question('Enter the password to proceed: ', (input) => {
//   if (input === password) {
//     console.log('Password correct. Proceeding...');
//     rl.close();
//     process.exit(0); // Exit with success
//   } else {
//     console.log('Incorrect password. Access denied.');
//     rl.close();
//     process.exit(1); // Exit with failure
//   }
// });
