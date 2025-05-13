import NavSideBar from "../components/NavSideBar";

function ProfilePage() {
    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="overflow-y-auto overflow-x-hidden w-full">
                Profile
            </div>
        </div>
    )
}

export default ProfilePage;