import { ContactsList } from './ContactsList/ContactsList';
import { NewContactForm } from './NewContactForm/NewContactForm';
import { nanoid } from 'nanoid';
import { SearchBar } from './SearchBar/SearchBar';
import { Container } from '@mui/material';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useLayoutEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
      console.log(JSON.parse(savedContacts));
    }
  }, []);

  const addNewContact = newContact => {
    const isInContacts = contacts.filter(contact => {
      return newContact.number === contact.number;
    }).length;

    if (isInContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    localStorage.setItem(
      'contacts',
      JSON.stringify([...contacts, { id: nanoid(), ...newContact }])
    );
    setContacts([...contacts, { id: nanoid(), ...newContact }]);
  };

  const onSearch = value => {
    setFilter(value);
  };

  const onDeleteContact = contactId => {
    const newContacts = contacts.filter(contacts => contacts.id !== contactId);
    localStorage.setItem('contacts', JSON.stringify([...newContacts]));
    setContacts(newContacts);
  };

  const visibleContacts = useMemo(() => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter?.toLowerCase());
    });
  }, [contacts, filter]);

  return (
    <Container>
      <h1>PhoneBook</h1>
      <NewContactForm addNew={addNewContact}></NewContactForm>
      <h2>Contacts</h2>
      <SearchBar onSearch={onSearch}></SearchBar>
      <ContactsList
        onDelete={onDeleteContact}
        contacts={visibleContacts}
      ></ContactsList>
      {!visibleContacts.length && <p>There is no contacts</p>}
    </Container>
  );
};
