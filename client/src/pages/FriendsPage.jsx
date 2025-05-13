import NavSideBar from "../components/NavSideBar";

function FriendsPage() {
    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="overflow-y-auto overflow-x-hidden w-full">
                Friends
            </div>
        </div>   
    )
}

export default FriendsPage