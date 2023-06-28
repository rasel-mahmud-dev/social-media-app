import React, {useEffect, useState} from 'react';
import RenderProfile from "pages/Profile/RenderProfile.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import useCustomReducer from "src/hooks/useReducer.jsx";
import apis from "src/apis/index.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import WithPageSidebar from "components/Pages/WithPageSidebar.jsx";
import DiscoverPages from "pages/Page/DiscoverPages.jsx";

const Page = () => {

    const dispatch = useDispatch()

    const {pageSlug} = useParams()


    const [getSearchParams] = useSearchParams()

    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        profile: {},
    })

    const [path, setPath] = useState( "")

    function fetchFollowerInfo(userId) {
        apis.get("/follow/status/?userId=" + userId).then(({status, data}) => {
            if (status === 200) {
                setState({
                    currentUserFollowing: data.following
                })
            }
        }).catch(() => {
        })
    }

    function fetchProfile(userId) {
        apis.get("/users/profile/" + userId).then(({status, data}) => {

            if (status === 200) {
                setState({profile: data})

                // if view current logged user profile
                if (auth._id === data.user._id) return;

                // check the following status with current logged user.
                fetchFollowerInfo(data.user._id)
            }
        }).catch(() => {
        })
    }


    const navigate = useNavigate()

    useEffect(() => {
        fetchProfile(pageSlug)
    }, [pageSlug]);

    const type = getSearchParams.get("type") || ""

    useEffect(() => {
        setPath(type)
    }, [type]);

    console.log(path)


    return (
        <div>

            <WithPageSidebar>

                <div className=" w-full">

                    {
                        path === "discover"
                            ? <DiscoverPages />
                            : ""
                    }


                </div>

            </WithPageSidebar>


        </div>
    );
};

export default Page;