import { useEffect, useState } from "react";
import NavSideBar from "../components/NavSideBar";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

let authToken='';
let user_id='';

function ExplorePage() {

    const [ recipes, setRecipes ] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/', { replace:true });
        }
        try {
            const decodedToken = jwtDecode(authToken);
            user_id = decodedToken.sub;
            console.log('User ID from JWT:', user_id);
    
            fetch(`http://localhost:3000/api/users/${user_id}/recipesFromFridge`)
            .then((response) => response.json())
            .then((data) => setRecipes(data))
            .catch((error) => console.log('Error fetching ingredients: ', error));
    
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    },[])


    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="flex flex-row overflow-y-auto overflow-x-hidden w-full">
                {recipes.length === 0 ? (
                    <p className='font-bold text-4xl'>No recipes!</p>
                ) : (
                    recipes.map((item) => (
                    <RecipeCard
                        key={item.id}
                        name={item.title}
                        image_path={item.image}
                        ingredients={[]}
                        instructions=''
                    />
                    ))
                )}
            </div>
        </div>
    )
}

export default ExplorePage;