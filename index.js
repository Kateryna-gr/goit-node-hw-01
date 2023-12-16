const contactsFunction = require("./contacts.js");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsFunction.listContacts();
      console.log(allContacts);
      break;
    case "get":
      const oneContact = await contactsFunction.getContactById(id);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contactsFunction.addContact(name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const removedContact = await contactsFunction.removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.log("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
