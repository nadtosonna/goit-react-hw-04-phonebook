import PropTypes from 'prop-types';
import { AiOutlineFileSearch } from 'react-icons/ai';
import css from './SearchFilter.module.css';

export const SearchFilter = ({ filter, handleSearchFilter }) => {
    return (
        <div className={css.filter}>
            <input
                className={css.input}
                type="text"
                name="search"
                value={filter}
                onChange={handleSearchFilter}
                required
            />
            <label htmlFor="search" className={css.label}>Search contacts</label>
            <AiOutlineFileSearch size={36} />
        </div>
    )
}

SearchFilter.propTypes = {
    filter: PropTypes.string,
    handleSearchFilter: PropTypes.func,
}