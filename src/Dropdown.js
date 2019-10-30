/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Dropdown({
  options = [],
  onSelect = () => {},
  defaultOption = { value: '', label: 'Please select an option' }
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState(defaultOption);
  const dropdownRef = React.useRef();

  return (
    <div
      ref={dropdownRef}
      className={expanded ? 'dropdown is-active' : 'dropdown'}
    >
      <div className='dropdown-trigger'>
        <button
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu'
          onClick={() => setExpanded(true)}
        >
          <span>{activeOption.label}</span>
          <span className='icon is-small'>
            <i className='fas fa-angle-down' aria-hidden='true'></i>
          </span>
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-menu' role='menu'>
        <div className='dropdown-content'>
          {options.map(({ value, label }) => (
            <a
              href='#'
              key={value}
              className={
                expanded && activeOption.value === value
                  ? 'dropdown-item is-active'
                  : 'dropdown-item'
              }
              onClick={e => {
                e.preventDefault();
                setActiveOption({ value, label });
                setExpanded(false);
                onSelect({ value, label });
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
