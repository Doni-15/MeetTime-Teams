export function InputBox({type, placeholder, judul, className = "py-1 text-xl px-2 input input-bordered border-2 border-gray-600 rounded-lg w-full bg-white tracking-wider"}){
    return (
        <>
            <div>
                <span className="text-xl font-semibold flex mb-1">{judul}</span>
                <input type={type} placeholder={placeholder} className={className} required/>
            </div>
        </>
    );
}