import React from 'react';

function Dropdown({
  options = [],
  onSelect = () => {},
  defaultOption = { value: '', label: 'Please select an option' }
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState(defaultOption);

  return (
    <div className={expanded ? 'dropdown is-active' : 'dropdown'}>
      <div className='dropdown-trigger'>
        <button
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu'
          onClick={() => setExpanded(true)}
        >
          <span>Content</span>
          <span class='icon is-small'>
            <i class='fas fa-angle-down' aria-hidden='true'></i>
          </span>
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-menu' role='menu'>
        <div className='dropdown-content'>
          {options.map(({ value, label }) => (
            <div
              key={value}
              clspanssName={
                expanded && activeOption.value === value
                  ? 'dropdown-item is-active'
                  : 'dropdown-item'
              }
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
