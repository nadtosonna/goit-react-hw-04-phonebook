import { nanoid } from "nanoid";
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { SearchFilter } from "./SearchFilter/SearchFilter";
import { Section } from './Section/Section';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
    return value ?? [];
  })
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    if (isExisting(contact)) {
        Notify.failure('This contact is already existing in the phonebook!', {
        position: 'center-top',
        width: '380px',
      });
      return;
    }
    setContacts((prev) => {
      const newContact = {
        id: nanoid(),
        ...contact,
      }
      return [...prev, newContact];
    })
  }

  const deleteContact = (id) => {
    setContacts((prev) => {
      const newContacts = prev.filter(contact => contact.id !== id);
      return newContacts;
    })
  }

  const isExisting = ({ name, number }) => {
    const check = contacts
      .find(contact => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number);
    return check;
  }

  const filterContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  const handleSearchFilter = (event) => {
    const { value } = event.target;
    setFilter(value);
  }

  return (
      <div className={css.container}>
        <Section title="Phonebook">
           <ContactForm onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <SearchFilter
          filter={filter}
          handleSearchFilter={handleSearchFilter} />
        {contacts.length > 0 ? (
          <ContactList
          contacts={filterContacts()}
          deleteContact={deleteContact} />
        ) : <p className={css.emptyList}>Your Contact List is empty.</p>}
        </Section>
      </div>
    );
}