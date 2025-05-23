import { useEffect, useState } from "react";
import NavSideBar from "../components/NavSideBar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import RecipeCard from "../components/RecipeCard";

function SavedRecipesPage() {


    const [ savedRecipes, setSavedRecipes ] = useState([]);
    const navigate = useNavigate();

    let user_id = -1;

    useEffect(() => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                navigate('/', { replace:true });
            }
            
            const decodedToken = jwtDecode(authToken);
            user_id = decodedToken.sub;
            console.log('User ID from JWT:', user_id);
    
            fetch(`http://localhost:3000/api/users/${user_id}/savedrecipes`)
            .then((response) => response.json())
            .then((data) => setSavedRecipes(data))
            .catch((error) => console.log('Error fetching saved recipes: ', error));
                
        } catch (error) {
            console.log('Error: ', error);
        }
    }, []);

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="overflow-y-auto w-4/5 overflow-x-hidden">
                <div className="flex flex-row flex-wrap overflow-y-auto overflow-x-hidden w-full">
                    {savedRecipes.length === 0 ? (
                        <p className='font-bold text-4xl'>No saved recipes!</p>
                    ) : (
                        savedRecipes.map((item) => (
                        <RecipeCard
                            key={item.id}
                            recipe_id={item.id}
                            name={item.name}
                            user_id={user_id}
                            usedIngredients={[]}
                            missedIngredients={[]}
                        />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default SavedRecipesPage;