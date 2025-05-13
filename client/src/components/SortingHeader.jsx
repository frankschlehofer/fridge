import { useState } from 'react';

function SortingHeader({ ingredients, onSort }) {
    const [sortKey, setSortKey] = useState(null);

    const handleSort = (key) => {
        setSortKey(key);
        const sortedIngredients = [...ingredients].sort((a, b) => {
            if (key === 'name') {
                return a.name.localeCompare(b.name);
            } else if (key === 'expirationDate') {
                const dateA = new Date(a.expiration_date);
                const dateB = new Date(b.expiration_date);
                return dateA - dateB;
            }
            return 0;
        });
        onSort(sortedIngredients);
    };

    return (
        <div className="sorting-header">
            <h3>Sort by:</h3>
            <div className="sorting-options">
                <button 
                    className="sort-button" 
                    onClick={() => handleSort('name')}
                >
                    Name
                </button>
                <button 
                    className="sort-button" 
                    onClick={() => handleSort('expirationDate')}
                >
                    Expiration Date
                </button>
            </div>
        </div>
    );
}

export default SortingHeader;