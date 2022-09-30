import { useState } from 'react';
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import css from './ContactForm.module.css';

const initialState = {
    name: '',
    number: '',
}

export function ContactForm( {onSubmit} ) {
    const [state, setState] = useState(initialState);

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleSubmit = event => {
        event.preventDefault();
        const { name, number } = state;

        onSubmit({ name, number });
        setState(initialState);
    }
    
    const handleChange = event => {
        const { name, value } = event.target;
        setState((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    return (
            <form onSubmit={handleSubmit} className={css.form}>
                <div className={css.wrapper}>
                    <div className={css.nameBlock}>
                    <input
                        value={state.name}
                        onChange={handleChange}
                        id={nameInputId}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        className={css.input}
                    />
                    <label htmlFor="name" className={css.label}>Name</label>
                </div>
                <div className={css.numberBlock}>
                    <input
                        value={state.number}
                        onChange={handleChange}
                        id={numberInputId}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        className={css.input}
                    />
                    <label htmlFor="number" className={css.label}>Number</label>
                </div> 
                </div>

            <button type='submit' className={css.addBtn}> <AiOutlinePlusCircle size={30} /> </button>
            </form>
        )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func,
};