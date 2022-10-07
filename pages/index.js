import Layout from "../layouts/layout";
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import LineChart from "../components/LineChart";

export default function Home() {
    // Sessions useStates
    const [sessions, setSessions] = useState([])
    const [verification, setVerification] = useState(false)
    const [wantToDeleteID, setWantToDeleteID] = useState(0)
    const [scaleValue, setScaleValue] = useState('Week')

    // Get sessions data
    useEffect(()=>{
        fetch('/api/sessions').then(r => r.json()).then(json => {
            setSessions(json.sessions)
        }).catch(e => {
            console.log(e)
        })
    },[])


    const deleteSession = (id) =>{

        if (verification === true) {

            setSessions(sessions.filter((e)=> e.id !== id))
            fetch('/api/deleteSession',{

                method:"POST",

                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({"deleteSessionID":id,"sessions":sessions})
            }).then(res => res.json()).then(json => console.log(json))

            setVerification(false)

        } else {
            setWantToDeleteID(id)
            setVerification(true)
        }

    }

    return (
        <Layout className={styles.container}>
            <div className={"flex flex-row flex-wrap p-3 gap-3"}>

                {/* WEIGHT */}
                <div className={"flex-1 w-1/2 flex-col p-3 rounded-xl justify-center bg-white text-stone-800 "}>
                    <h2 className={"text-stone-800 text-2xl mb-3"}>Ton poids</h2>
                    <div className={"flex justify-between items-center"}>
                        <p className={'text-xl font-bold mb-4'}>76kg</p>
                        <select name="scale" id="scale" onChange={(event)=>setScaleValue(event.target.value)} className={"border-2 rounded border-indigo-400"}>
                            <option value="Week">Week</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                        </select>
                    </div>
                    <div>
                        <LineChart scaleValue={scaleValue} />
                    </div>
                    <Link href={{pathname:"/weight"}} >
                        <a className={"cursor-pointer bg-gradient-to-br from-indigo-300 to-purple-400 hover:from-indigo-400 hover:to-purple-500 text-neutral-100 py-1 px-6 rounded font-bold"}>
                            New
                        </a>
                    </Link>
                </div>
                {/* WEIGHT */}

                {/* WATER */}
                <div className={"flex-1  w-1/2 min-w-[500px] flex-col p-3 rounded-xl justify-center bg-white text-stone-800 "}>
                    <h2 className={'text-stone-800 text-2xl mb-3'}>Quantité d'eau</h2>
                </div>
                {/* WATER */}

            </div>

            <div className={"flex flex-col bg-white rounded-xl mx-3 p-3"}>
                <h2 className={"text-stone-800 text-2xl mb-3"}>Sessions</h2>
                <ul>
                    {sessions ? sessions.map((data)=>{

                        return (
                            <li key={data.id} className={"flex items-center bg-stone-100 mb-3 last:mb-0 hover:bg-stone-200 cursor-pointer duration-150 rounded"}>
                                <Link href={{pathname:"/session", query: "id="+data.id}}>
                                    <a className={"flex justify-between flex-1 p-3"}>
                                        {data.date}

                                    </a>
                                </Link>

                                <button className={'flex items-center p-3'} onClick={(event) => deleteSession(data.id)}>
                                    <Image className={'block fill-amber-50'} src={'/cross.svg'} width={'15'} height={'15'} />
                                </button>
                            </li>
                        )
                    }): <div>Loading...</div>}
                </ul>
            </div>

            {verification === true &&
                <div className={'fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'} onClick={(event)=>event.target === event.currentTarget && setVerification(false)}>
                    <div className={'bg-white p-12 rounded flex gap-6 flex-col justify-center items-center'}>
                        <h2 className={'text-xl'}>Are you sure you want to delete this session?</h2>
                        <div className={'flex gap-3'}>
                            <button className={'uppercase bg-gradient-to-br from-indigo-300 to-purple-400 hover:from-indigo-400 hover:to-purple-500 text-neutral-100 py-1 px-6 rounded font-bold'} onClick={()=>deleteSession(wantToDeleteID)}>Yes</button>
                            <button className={'uppercase bg-rose-400 hover:bg-rose-500 text-neutral-100 py-1 px-6 rounded font-bold'} onClick={()=>setVerification(false)}>No</button>
                        </div>
                    </div>
                </div>
            }

            <div className={"fixed flex justify-center items-center bottom-5 right-5 bg-gradient-to-br from-indigo-300 to-purple-400 hover:from-indigo-400 hover:to-purple-500 cursor-pointer duration-150 rounded-full p-2"}>
                <Link href={'/createSession'}><a className={'flex'}><Image className={'block fill-amber-50'} src={'/add.svg'} width={'25'} height={'25'} /></a></Link>
            </div>
        </Layout>
    )
}
