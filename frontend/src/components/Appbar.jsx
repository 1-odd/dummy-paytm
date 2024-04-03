import { Button } from "./Button"
import { useNavigate } from "react-router-dom";

export const Appbar = () => {

    const navigate = useNavigate()

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/signin")

    }

    

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="p-2">
            <Button onClick={handleLogout} label={"logout"} />
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}