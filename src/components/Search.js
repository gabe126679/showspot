import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>

));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <Form
        ref={ref}
        style={style}
        className="search-click"
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="search-input mx-3 my-2 w-auto"
          placeholder="Search Shows"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="search-results list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </Form>
    );
  },
);

const handleSubmit = (e) => {
  e.preventDefault();

}

const handleChange = (e) => {
  e.preventDefault();
  
}

export const Search = () => {
  return(
    <Dropdown className="search-shows">
      <Form className="artist-search-form" onSubmit={handleSubmit}>
          <Form.Group className="text-center artist-search-field mb-3" controlId="second" onChange={handleChange}>
            <Dropdown.Toggle as={CustomToggle} id="color-warning dropdown-custom-components">
              Search Shows
            </Dropdown.Toggle>
            <Form.Control className="dropdown-hidden" type="text" placeholder="Search Shows"
                  
            />

          </Form.Group>
      </Form>


  
      <Dropdown.Menu className="search-results" as={CustomMenu}>
        <Dropdown.Item eventKey="1" className="search-items">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2" className="search-items">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" className="search-items">
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="4" className="search-items">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}


