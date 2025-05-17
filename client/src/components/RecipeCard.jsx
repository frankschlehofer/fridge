function RecipeCard({ recipe_id, name, user_id, image_path, usedIngredients, missedIngredients }) {

  const saveRecipe = async (recipe_id, user_id, name) => {
    try {
        console.log(recipe_id, user_id, name);
        const response = await fetch(`http://localhost:3000/api/users/${user_id}/saverecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({recipe_id, name})
        });
  
        if (!response.ok) {
            console.log("something went wrong");
        }
        return;
        
    } catch (err) {
        console.log(err);
        return;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-auto w-64 h-100 m-4">
      <button onClick={() => saveRecipe(recipe_id, user_id, name)}>
        Save Recipe
      </button>
      <img src={image_path} alt={`${name}`} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <h4 className="font-semibold">Ingredients from your Fridge:</h4>
        <ul className="list-disc list-inside text-sm mb-4">
          {usedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
        <h4 className="font-semibold">Additional Ingredients:</h4>
        <ul className="list-disc list-inside text-sm mb-4">
          {missedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeCard;