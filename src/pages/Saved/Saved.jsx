import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchAllSavedAction} from "src/store/actions/userAction.js";
import HomeLayout from "layout/HomeLayout.jsx";
import {Link} from "react-router-dom";

const Saved = () => {

    const dispatch = useDispatch()
    const [saved, setSaved] = useState([])

    useEffect(()=>{
        dispatch(fetchAllSavedAction()).unwrap().then((data)=>{
            setSaved(data.saved)
        })
    })

    return (
        <HomeLayout>

           <div className="card">

                <div className="card-meta">
                    <div className="flex items-center gap-x-2">
                        <h4>My Saved items</h4>
                    </div>
                </div>

                <div className="mt-6">
                    {saved && saved.map(item=>(
                        <div key={item._id} className="card flex items-center justify-between">
                            <div className="card-meta flex justify-between ">
                                <h4>{item.feed.content.substring(0, 50)}</h4>
                            <span><Link to={`/feed/${item.feedId}`} >See original</Link></span>
                        </div>
                        </div>
                    ))}
                </div>



            </div>
        </HomeLayout>
    );
};

export default Saved;