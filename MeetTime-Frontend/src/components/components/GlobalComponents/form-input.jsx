export function InputBox({ variant = "bold", type = "text", placeholder, value, onChange, judul, id, name, className = "", ...props }) {
    
    const styles = {
        bold: "w-full py-2.5 px-4 rounded-xl border-2 border-neutral/30 bg-netral-putih text-custom-text placeholder:text-neutral/40 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300",
        soft: "w-full py-3 px-4 rounded-xl bg-base-200/50 border border-transparent text-custom-text placeholder:text-neutral/40 hover:bg-base-200 focus:bg-netral-putih focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300"
    };

    const baseClass = styles[variant] || styles.soft;

    return (
        <div className="flex flex-col w-full group">
            {judul && (
                <label 
                    htmlFor={id || name} 
                    className="text-sm font-bold text-neutral uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors duration-300"
                >
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
        bold: "w-full py-2.5 px-4 pr-10 rounded-xl border-2 border-neutral/30 bg-netral-putih text-custom-text font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none appearance-none transition-all duration-300",
        
        soft: "w-full py-3 px-4 pr-10 rounded-xl bg-base-200/50 border border-transparent text-custom-text hover:bg-base-200 focus:bg-netral-putih focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none appearance-none cursor-pointer transition-all duration-300"
    };

    const baseClass = styles[variant] || styles.soft;

    return (
        <div className="flex flex-col w-full group">
            {judul && (
                <label className="text-sm font-bold text-neutral uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors duration-300">
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
                        <option key={opt} value={opt} className="text-custom-text bg-netral-putih">
                            {opt}
                        </option>
                    ))}
                </select>
                
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral group-focus-within:text-primary transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export function TextAreaBox({ variant = "soft", judul, value, onChange, placeholder, id, name, className = "", rows = 5, ...props }) {
    
    const styles = {
        bold: "w-full py-2.5 px-4 rounded-xl border-2 border-neutral/30 bg-netral-putih text-custom-text placeholder:text-neutral/40 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300 resize-none",
        
        soft: "w-full py-3 px-4 rounded-xl bg-base-200/50 border border-transparent text-custom-text placeholder:text-neutral/40 hover:bg-base-200 focus:bg-netral-putih focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300 resize-none"
    };

    const baseClass = styles[variant] || styles.soft;

    return (
        <div className="flex flex-col w-full group">
            {judul && (
                <label 
                    htmlFor={id || name} 
                    className="text-sm font-bold text-neutral uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors duration-300"
                >
                    {judul}
                </label>
            )}
            <textarea
                id={id || name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required
                className={`${baseClass} ${className}`}
                {...props}
            />
        </div>
    );
}