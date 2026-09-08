import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../components/Loading';
import api from '../services/api';

export const Certificate = () => {
    const {courseId}=useParams();
    const [certificate,setCertificate]=useState(null);
    const [loading ,setLoading]=useState(true)
    
    
    const fetchCertificate=async()=>{
     try {
        const token=localStorage.getItem("token");
        const res=await api.get(`/certificates/${courseId}` , {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        });
        console.log("Certificates : " , res.data);
        setCertificate(res.data.certificate)        
     } catch (error) {
        console.log("Certificate Error : " , error);      
     } finally {
        setLoading(false);
     }
    }

    useEffect(()=>{
    fetchCertificate()
    },[courseId])

    const handlePrint = () => {
    window.print();
 }
    if (loading) return <Loading/>;
    if(!certificate) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Certificate not found !
            </div>
        );
    }
  return (
    <section className='min-h-screen bg-slate-950 flex items-center justify-center p-6'>
        <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl p-10 md:p-16 text-center border-8 border-cyan-500">
    
        <p className="text-cyan-600 font-semibold tracking-widest uppercase">TechNova</p>

        <h1 className="text-5xl font-bold mt-6">Certificate of Completion</h1>
        <p className="text-slate-500 mt-8 text-lg">This certificate is proudly presented to</p>
        <h2 className="text-4xl font-bold text-cyan-600 mt-4">{certificate.student?.name}</h2>

        <p className="text-slate-500 mt-8 text-lg">For successfully completing the course</p>

        <h3 className="text-3xl font-bold mt-4">{certificate.course?.title}</h3>

        <div className="border-t border-slate-300 mt-10 pt-6 grid md:grid-cols-2 gap-6 text-left">
            <div>
                <p className="text-sm text-slate-500">Certificate ID</p>

                <p className="font-bold">{certificate.certificateId}</p>
            </div>

            <div>
                <p className="text-sm text-slate-500">Issue Date</p>

                <p className="font-bold">{new Date (certificate.issuedAt).toLocaleDateString()}</p>
            </div>
             </div>
            <div className="mt-12">
                <p className="text-slate-500">Congratulation on your achievement !</p>
            </div> 
            <button onClick={handlePrint} className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition">  🖨️ Print / Download Certificate
</button>      
        </div>
      </section>
  )
}

