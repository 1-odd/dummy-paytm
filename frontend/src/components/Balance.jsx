export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance :
        </div>
        <div className="font-semibold ml-4 text-lg">
             {value} 
        </div>
    </div>
}