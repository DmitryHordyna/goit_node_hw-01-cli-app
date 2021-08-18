const operationsContacts = require('./contacts');

const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await operationsContacts.listContacts();
      console.table(contactList);
      break;

    case 'get':
      const contactById = await operationsContacts.getContactById(Number(id));
      console.table(contactById);
      break;

    case 'add':
      const addContact = await operationsContacts.addContact(
        name,
        email,
        phone,
      );
      console.table(addContact);
      break;

    case 'remove':
      const removeContact = await operationsContacts.removeContact(Number(id));
      console.table(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
