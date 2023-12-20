import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import './currencyDropdown.css';

const CurrencyDropdown = () => {
  const { dispatch } = useContext(AppContext);
  const [selectedCurrency, setSelectedCurrency] = useState({ symbol: '£', name: 'Pound' });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const currencyOptions = {
    'Dollar': '$',
    'Pound': '£',
    'Euro': '€',
    'Rupee': '₹'
  };

  const handleCurrencyChange = (name, symbol) => {
    setSelectedCurrency({ name, symbol });
    dispatch({
      type: 'CHG_CURRENCY',
      payload: symbol,
    });
    setIsOpen(false); 
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="currency-dropdown" ref={dropdownRef}>
      <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
        Currency ({selectedCurrency.symbol} {selectedCurrency.name}) <span className="caret">▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-content">
          {Object.entries(currencyOptions).map(([name, symbol]) => (
            <li key={symbol} onClick={() => handleCurrencyChange(name, symbol)}>
              {symbol} {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencyDropdown;

