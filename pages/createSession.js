import React from 'react';
import Layout from "../layouts/layout";
import {useRouter} from "next/router";

function CreateSession(props) {
    console.log(props)
    const router = useRouter()
    const data = router.query
    console.log(data)
    return (
        <Layout>
            Hello
        </Layout>
    );
}

export default CreateSession;
