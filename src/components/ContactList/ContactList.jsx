import PropTypes from 'prop-types';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
    return (
        <ul className={css.contactList}>
            {contacts.map(contact => {
                return (
                    <li key={contact.id} className={css.item}>
                        <p className={css.contact}>{`${contact.name}: ${contact.number}`}</p>
                        <button onClick={() => deleteContact(contact.id)} className={css.delBtn}>
                            <AiOutlineMinusCircle size={30} />
                        </button>
                    </li>
                )
            })}
        </ul>
    )
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            number: PropTypes.string,
        })
    ),
};