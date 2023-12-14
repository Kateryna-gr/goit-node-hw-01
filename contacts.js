const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

const contactsFunction = {
  async listContacts() {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  },

  updateList(list) {
    fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  },

  async getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contactsList = await this.listContacts();
    return contactsList.find((item) => item.id === contactId) || null;
  },

  async removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contactsList = await this.listContacts();
    const index = contactsList.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const result = contactsList.splice(index, 1);
    this.updateList(contactsList);
    return result;
  },

  async addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту.
    const contactsList = await this.listContacts();
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contactsList.push(newContact);
    this.updateList(contactsList);
    return newContact;
  },
};

module.exports = { contactsFunction };
