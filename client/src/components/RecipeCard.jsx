function RecipeCard({ name, author, image_path, ingredients, instructions }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-100 m-4">
      <img src={image_path} alt={`${name}`} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">By {author}</p>
        <h4 className="font-semibold">Ingredients:</h4>
        <ul className="list-disc list-inside text-sm mb-4">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h4 className="font-semibold">Instructions:</h4>
        <p className="text-sm text-gray-700">{instructions}</p>
      </div>
    </div>
  );
}

export default RecipeCard;