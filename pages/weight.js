import React, {useState} from 'react';
import Layout from "../layouts/layout";
import {format} from "date-fns";

function Weight(props) {
    /**
     * useStates
     */
    const [weight, setWeight] = useState("")

    const addNewWeight = (e) => {
        e.preventDefault()
        fetch('/api/addWeight', {

            method: "POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "id": Date.now(),
                "date": format(new Date(), "dd/MM/yyyy"),
                "weight": e.target['0'].value
            })
        }).then(res => res.json())
    }

    return (
        <Layout>
            <form className={'flex justify-center p-6 flex-col items-center'} action="/"
                  onSubmit={(e) => addNewWeight(e)}>
                <label htmlFor={'weight'}>
                    Ton poids
                </label>
                <input onChange={(e)=>{e.target.style.width = e.target.style.width + (8 * e.target.value).length+"px"}} className={'p-3 text-4xl min-w-[50px] bg-transparent border-b-2 border-indigo-500'} step={"0.01"}
                       id={'weight'} type="number" maxLength="3" contentEditable/>
                <button
                    className={'cursor-pointer uppercase bg-gradient-to-br my-3 text-center from-indigo-300 to-purple-400 hover:from-indigo-400 hover:to-purple-500 text-neutral-100 py-1 px-6 rounded font-bold'}
                    type={'submit'}>Ajouter
                </button>
            </form>

        </Layout>
    );
}

export default Weight;
