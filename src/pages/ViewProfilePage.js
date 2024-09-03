
import { FaUser } from "react-icons/fa";

export default function ViewProfilePage () {
    return(
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <BackButton />
                <FaUserCircle className="text-green-500 text-9xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-2" />
                <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center space-x-4 p-3 ">
                        <FaUser className="text-2" />
                        <h1 className="text-lg ">{firstname} {lastname}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaRegUserCircle className="text-1" />
                        <h1 className="text-lg">{username}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaLocationDot className="text-1" />
                        <h1 className="text-lg">{userAddress}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3 ">
                        <FaPhone className="text-1" />
                        <h1 className="text-lg">{phoneNumber}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaUserTie className="text-1" />
                        <h1 className="text-lg">{profession}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3 ">
                        <FaLock className="text-1" />
                        <h1 className="text-lg">*******</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaRegEnvelope className="text-1" />
                        <h1 className="text-lg">{email}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3 mb-4">
                        <IoRibbonOutline className="text-1" />
                        <h1 className="text-lg">{createdAt}</h1>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-4 pb-6 w-full'>
                        <LongButton buttonName='Edit Profile'
                            onClick={() => alert('Edit Profile')}
                            className='p-2 w-full rounded shadow-lg bg-green-600 text-white font-bold' />
                    </div>
                </div>

                <div className="flex items-center space-x-4 p-2 mb-2">
                    <GrMapLocation className="text-1" />
                    <button className="text-xl font-semibold">I am a landowner</button>
                    <SlArrowRight className="ml-auto text-xl" />
                </div>
                <div className="flex justify-center ">
                    <button className="text-red-500 text-lg font-extrabold" onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>


    );
    


}