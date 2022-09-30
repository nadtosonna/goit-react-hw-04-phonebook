import { nanoid } from "nanoid";
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { SearchFilter } from "./SearchFilter/SearchFilter";
import { Section } from './Section/Section';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({
        contacts,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    if (this.isExisting(contact)) {
      Notify.failure('This contact is already existing in the phonebook!', {
        position: 'center-top',
        width: '380px',
      });
      return;
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...contact,
      }
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  }

  deleteContact = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(contact => contact.id !== id);
      return {
        contacts: newContacts
      };
    });
  }

  isExisting({ name, number }) {
    const { contacts } = this.state;
    const check = contacts
      .find(contact => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number);
    return check;
  }

  filterContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  handleSearchFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
}

  render() {
    return (
      <div className={css.container}>
        <Section title="Phonebook">
           <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <SearchFilter
          filter={this.state.filter}
          handleSearchFilter={this.handleSearchFilter} />
        {this.state.contacts.length > 0 ? (
          <ContactList
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact} />
        ) : <p className={css.emptyList}>Your Contact List is empty.</p>}
        </Section>
      </div>
    );
  }
}