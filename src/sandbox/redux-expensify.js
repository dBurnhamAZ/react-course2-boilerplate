import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// DEFAULT ADD_EXPENSE
const addExpense = ({ description = '', notes = '', amount = 0, createdAt = 0 } = {}) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),   //uuid from npm
            description,
            notes,
            amount,
            createdAt
        }
});

// DEFAULT REMOVE_EXPENSE ACTION-GENERATOR
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE ACTION-GENERATOR
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER ACTION-GENERATOR
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT ACTION-GENERATOR
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// ACTION-GENERATOR
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// ACTION-GENERATOR
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// ACTION - GENERATOR
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expense Default
const expensesReducerDefaultState = [];

// Expense Reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {    
    switch (action.type) {
        case 'ADD_EXPENSE':
            //** Spread Operator [...value, 'addhere'] (...state is similar to a .push)
            return [
                ...state,
                action.expense                
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

// Filter Default State
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

// Filter Reducer
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

 TIMESTAMPs (counts in miliseconds)
 0 = January 1st 1970 (unix epoch)

// Get Visible Expense
const getVisibleExpense = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// Store Creation/Combine Reducer
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpense(state.expenses, state.filters);
    console.log(visibleExpenses);    
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

console.log(expenseOne.expense.id);
store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(0));
store.dispatch(setStartDate());
store.dispatch(setEndDate(999));

Dummy Data
const demoState = {
    expenses: [{
        id: '2343sfsds888',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

const user = {
    name: 'Jean',
    age: 24
};

console.log({ ...user, location: 'Chandler', age: 27 });
//***************** example of Timer ************************************
store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('bill'));
}, 3000)

