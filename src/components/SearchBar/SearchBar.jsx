import propTypes from 'prop-types';
import { TextField } from '@mui/material';

export const SearchBar = ({ onSearch }) => {
  return (
    <div>
      <label>
        <TextField
          variant="standard"
          label="Search by name"
          onChange={evt => {
            onSearch(evt.target.value);
          }}
          type="text"
        />
      </label>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: propTypes.func,
};
