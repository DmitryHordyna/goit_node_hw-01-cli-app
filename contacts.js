const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPatch = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPatch);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const selectContacts = contacts.find(contact => contact.id === contactId);
    if (!selectContacts) {
      throw new Error(`Contact with id = ${contactId} not found.`);
    }
    return selectContacts;
  } catch (error) {
    throw error;
  }
}

async function updateContact(id, updateInfo) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === id);
    if (idx === -1) {
      throw new Error(`Contact with id = ${id} not found. `);
    }
    contacts[idx] = { ...contacts[idx], ...updateInfo };
    await update(contacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
      throw new Error(`Contact with id = ${contactId} not found. `);
    }
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    await update(newContacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      name,
      phone,
      email,
      id: v4(),
    };
    contacts.push(newContact);

    await update(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}

const update = async contacts => {
  const contactsString = JSON.stringify(contacts);
  await fs.writeFile(contactsPatch, contactsString);
};

module.exports = {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
};
