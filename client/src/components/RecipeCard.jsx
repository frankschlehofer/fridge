const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function RecipeCard({ recipe_id, name, user_id, image_path, usedIngredients, missedIngredients }) {
  // Function to save a recipe to the database
  const saveRecipe = async (recipe_id, user_id, name) => {
    try {
        console.log(recipe_id, user_id, name); // Log the recipe details for debugging
        const response = await fetch(`${BACKEND_URL}/api/users/${user_id}/saverecipe`, {
            method: 'POST', // Use POST method to send data to the server
            headers: {
                'Content-Type': 'application/json' // Specify JSON format for the request body
            },
            body: JSON.stringify({recipe_id, name}) // Send recipe_id and name in the request body
        });
  
        if (!response.ok) {
            console.log("something went wrong"); // Log an error if the request fails
        }
        return;
        
    } catch (err) {
        console.log(err); // Log any exceptions that occur during the request
        return;
    }
  };

  return (
    <div className="bg-white shadow-2xl shadow-stone-950 rounded-lg text-[#333333]">
      <div className="flex flex-col min-w-100 min-h-150 p-5">
        <div className="h-3/4">
          {/* Display the recipe image */}
          <img src={image_path} alt={`${name}`} className="w-full min-h-50 object-cover" />
          {/* Display the recipe name */}
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          {/* List ingredients from the user's fridge */}
          <h4 className="font-semibold">Ingredients from your Fridge:</h4>
          <ul className="list-disc list-inside text-sm mb-4">
            {usedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
          {/* List additional ingredients required for the recipe */}
          <h4 className="font-semibold">Additional Ingredients:</h4>
          <ul className="list-disc list-inside text-sm mb-4">
            {missedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          {/* Button to save the recipe */}
          <button onClick={() => saveRecipe(recipe_id, user_id, name)}>
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;