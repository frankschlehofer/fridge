import NavSideBar from "../components/NavSideBar";

function SavedRecipesPage() {
    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="overflow-y-auto overflow-x-hidden w-full">
                Saved Recipes
            </div>
        </div>
    )
}

export default SavedRecipesPage;