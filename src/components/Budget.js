/*
In Budget.js you will be adding text and value for your budget. You will be importing app context and the useContext hook, 
and pass your AppContext to it - this is how a component connects to the context in order to get values from global state */
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch } = useContext(AppContext); // Destructure dispatch from context
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const updatedBudget = parseInt(event.target.value, 10);
        setNewBudget(updatedBudget); // Update local state
        dispatch({ // Update global state
            type: 'SET_BUDGET',
            payload: updatedBudget,
        });
    };
    return (
        <div className='alert alert-secondary'>
            <span>Budget: £</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
            />

        </div>
    );
};

export default Budget;
