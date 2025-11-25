import { useNavigate } from 'react-router-dom';

export function KembaliDashboard({judul, keterangan}) {
    const navigate = useNavigate();

    return(
        <>
            <div onClick={() => navigate('/pages/dashboard')} className="mb-5"> 
                <button className="flex text-gray-700 items-center gap-2 hover:text-blue-800 transition-colors font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <p className='text-lg'>Kembali ke Dashboard</p>
                </button>
            </div>
            <div className='mb-3'>
                <h1 className="text-3xl font-bold mb-1">{judul}</h1>
                <p>{keterangan}</p>
            </div>
        </>
    );
}