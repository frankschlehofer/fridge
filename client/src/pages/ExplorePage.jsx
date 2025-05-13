import NavSideBar from "../components/NavSideBar";

function ExplorePage() {
    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="overflow-y-auto overflow-x-hidden w-full">
                Explore Page
            </div>
        </div>
    )
}

export default ExplorePage;