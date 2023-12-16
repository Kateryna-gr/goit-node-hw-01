const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

getContactById = async (contactId) => {
  const contactsList = await listContacts();
  return contactsList.find((item) => item.id === contactId) || null;
};

removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
};

addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contactsList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
