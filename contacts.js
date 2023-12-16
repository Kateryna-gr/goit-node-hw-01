import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  return contactsList.find((item) => item.id === contactId) || null;
};

export const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return result;
};

export const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contactsList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
};
