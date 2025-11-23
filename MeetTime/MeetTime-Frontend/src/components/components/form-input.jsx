export function InputBox({ type, placeholder, value, onChange, judul, id, error, className = "", ...props }) {
    const baseClass =
        "py-1 text-base px-2 input input-bordered border-2 border-gray-600 rounded-lg w-full bg-white tracking-wider";

    return (
        <div className="flex flex-col w-full">
            {judul && (
                <label htmlFor={id} className="text-xl font-semibold mb-1 tracking-wider" >
                    {judul}
                </label>
            )}

            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={`${baseClass} ${className}`}
                value={value}
                onChange={onChange}
                required
                {...props}
            />
        </div>
    );
}