import propTypes from 'prop-types';
import { List, Button } from '@mui/material';
import { ContactListItem } from './ContactList.styled';

export const ContactsList = ({ onDelete, contacts }) => {
  return (
    <div>
      <List>
        {contacts.map(contact => {
          return (
            <ContactListItem key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Number: {contact.number}</p>
              <Button
                variant="contained"
                value={contact.id}
                onClick={evt => {
                  onDelete(evt.target.value);
                }}
              >
                Delete
              </Button>
            </ContactListItem>
          );
        })}
      </List>
    </div>
  );
};

ContactsList.propTypes = {
  onDelete: propTypes.func,
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
      number: propTypes.string,
    })
  ),
};
