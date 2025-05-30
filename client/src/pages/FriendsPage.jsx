import NavSideBar from "../components/NavSideBar";

function FriendsPage() {
    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="flex flex-col overflow-y-auto overflow-x-hidden w-full items-center justify-center page-title font-bold text-4xl">
                Social Features Coming Soon...
            </div>
        </div>   
    )
}

export default FriendsPage