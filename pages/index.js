import Layout from "../layouts/layout";
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import LineChart from "../components/LineChart";

export default function Home() {
    const [sessions, setSessions] = useState([])
    const [verification, setVerification] = useState(false)

    useEffect(()=>{
        fetch('/api/sessions').then(r => r.json()).then(json => {
            setSessions(json.sessions)
        }).catch(e => {
            console.log(e)
        })
    },[])


    const deleteSession = (id) =>{
        setSessions(sessions.filter((e)=> e.id !== id))
        fetch('/api/deleteSession',{

            method:"POST",

            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({"deleteSessionID":id,"sessions":sessions})
        }).then(res => res.json()).then(json => console.log(json))

        setVerification(true)
    }

    const wantToDelete = (id) => {
        setVerification(true)
    }

    return (
        <Layout className={styles.container}>
            <div className={"flex flex-row"}>

                {/* WEIGHT */}
                <div className={"flex-1 flex-col p-3  m-3 mr-1.5 rounded justify-center bg-neutral-100 text-stone-800 "}>
                    <h2 className={"text-stone-800 text-2xl mb-3"}>Ton poids</h2>
                    <p className={'text-xl font-bold mb-4'}>76kg</p>
                    <LineChart/>
                    <Link href={{pathname:"/weight",query:1}} >
                        <a className={"cursor-pointer bg-gradient-to-br from-indigo-300 to-purple-400 hover:from-indigo-400 hover:to-purple-500 text-neutral-100 py-1 px-6 rounded font-bold"}>
                            New
                        </a>
                    </Link>
                </div>
                {/* WEIGHT */}

                {/* WATER */}
                <div className={"flex-1 flex-col p-3  m-3 ml-1.5 rounded justify-center bg-neutral-100 text-stone-800 "}>
                    <h2 className={'text-stone-800 text-2xl mb-3'}>Quantité d'eau</h2>
                </div>
                {/* WATER */}

            </div>

            <div className={"flex flex-col bg-stone-100 rounded mx-3 p-3"}>
                <h2 className={"text-stone-800 text-2xl mb-3"}>Sessions</h2>
                <ul>
                    {sessions ? sessions.map((data)=>{
                        return (
                            <li key={data.id} className={"flex items-center bg-stone-200 mb-3 last:mb-0 hover:bg-stone-300 cursor-pointer duration-150 rounded"}>
                                <Link href={{pathname:"/session", query: "id="+data.id}}>
                                    <a className={"flex justify-between flex-1 p-3"}>
                                        {data.date}

                                    </a>
                                </Link>

                                <button className={'flex items-center p-3'} onClick={() => wantToDelete(data.id)}>
                                    <Image className={'block fill-amber-50'} src={'/cross.svg'} width={'15'} height={'15'} />
                                </button>
                            </li>
                        )
                    }): ""}
                </ul>
            </div>

            <div className={"absolute flex justify-center items-center bottom-5 right-5 bg-gradient-to-br from-indigo-300 to-purple-400 hover:from-indigo-400 hover:to-purple-500 cursor-pointer duration-150 rounded-full p-2"}>
                <Link href={'/createSession'}><a className={'flex'}><Image className={'block fill-amber-50'} src={'/add.svg'} width={'25'} height={'25'} /></a></Link>
            </div>
        </Layout>
    )
}

