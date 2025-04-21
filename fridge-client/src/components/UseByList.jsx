function UseByList({ ingredients, useBy }) {
    const useByDate = new Date(useBy);
    useByDate.setHours(0, 0, 0, 0); // Normalize to midnight

    const parseLocalDate = (dateString) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
    };

    const filteredIngredients = ingredients.filter((ingredient) => {
        const expirationDate = parseLocalDate(ingredient.expiration); // Parse as local date
        expirationDate.setHours(0, 0, 0, 0); // Normalize to midnight

        // Compare dates numerically
        if (useByDate.getTime() === new Date().setHours(0, 0, 0, 0)) {
            return expirationDate.getTime() === useByDate.getTime(); // Expiring today
        } else if (useByDate.getTime() < new Date().setHours(0, 0, 0, 0)) {
            return expirationDate.getTime() <= useByDate.getTime(); // Already expired
        } else {
            return expirationDate.getTime() > new Date().setHours(0, 0, 0, 0) &&
                   expirationDate.getTime() <= useByDate.getTime(); // Expiring within range
        }
    });

    return (
        <div className="use-by-section">
            {
                filteredIngredients.map((ingredient) => (
                    <div key={ingredient.id} className="ingredient-card-expired">
                        <p1>{ingredient.name} - {ingredient.expiration}</p1>
                    </div>
                ))
            }
        </div>
    );
}

export default UseByList;