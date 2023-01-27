const Contact = require("../Components/Contact")

const ContactList = ({ contacts }) => {
    console.log("contactList", contacts);
    const contactFormat = [];
    contacts.forEach((contact) => {
      contactFormat.push(<Contact contact={contact}></Contact>);
    });
  
    return contactFormat;
  };
  export default ContactList;