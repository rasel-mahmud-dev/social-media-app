import React, {useEffect} from 'react';
import RenderProfile from "pages/Profile/RenderProfile.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import useCustomReducer from "src/hooks/useReducer.jsx";
import apis from "src/apis/index.js";
import {useNavigate, useParams} from "react-router-dom";
import WithPageSidebar from "pages/Page/WithPageSidebar.jsx";

const Page = () => {

    const dispatch = useDispatch()

    const {pageSlug} = useParams()

    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        profile: {},

    })

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



    return (
        <div>

            <WithPageSidebar>

                <div className="group-content">
                    <div className="card">
                        sdasd
                        <div className="card-meta">
                            <h4>My Page</h4>
                        </div>

                        <div className="mt-6">
                            <p>This features will be implemented soon</p>


                            Groups you've joined
                            Recent activity

                        </div>

                    </div>
                </div>

            </WithPageSidebar>


        </div>
    );
};

export default Page;