export function InputBox({ variant = "bold", type = "text", placeholder, value, onChange, judul, id, name, className = "", ...props }) {
    const styles = {
        // untuk login pages
        bold: "py-2 text-base px-3 input input-bordered border-2 border-gray-600 rounded-lg w-full bg-white tracking-wider font-semibold text-gray-600",
        
        // style lain
        soft: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-sm hover:bg-white"
    };
    const baseClass = styles[variant] || styles.soft;

    return (
        <div className="flex flex-col w-full">
            {judul && (
                <label htmlFor={id || name} className="text-base font-bold text-gray-600 uppercase tracking-wide mb-2">
                    {judul}
                </label>
            )}
            <input
                id={id || name}
                name={name}
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

export function SelectBox({ variant = "soft", judul, value, onChange, name, options }) {
    const styles = {
        bold: "py-2 text-base px-3 input input-bordered border-2 border-gray-600 rounded-lg w-full bg-white tracking-wider font-semibold text-gray-700",
        soft: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-sm text-gray-700 cursor-pointer hover:bg-white transition-all"
    };

    const baseClass = styles[variant] || styles.soft;

    return (
        <div className="flex flex-col w-full">
            {judul && (
                <label className="text-base font-bold text-gray-600 uppercase tracking-wide mb-2">
                    {judul}
                </label>
            )}
            <div className="relative">
                <select 
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    className={`${baseClass}`}
                >
                    <option value="" disabled>Pilih {judul}...</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 ${variant === 'bold' ? 'text-gray-800' : 'text-gray-500'}`}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        </div>
    );
}