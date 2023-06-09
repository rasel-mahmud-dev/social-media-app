import React, {useEffect, useReducer} from 'react';
import Story from "src/compoenents/Story/Story.jsx";
import CreateStory from "src/compoenents/Story/CreateStory.jsx";
import blobToBase64 from "src/utils/blobToBase64.js";


import { Splide, SplideSlide } from '@splidejs/react-splide';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// Default theme
import '@splidejs/react-splide/css';


// or only core styles
import '@splidejs/react-splide/css/core';
import {useDispatch} from "react-redux";
import {createStoryAction, getStoriesAction} from "src/store/actions/storyAction.js";
import staticImage from "src/utils/staticImage.js";


const Stories = () => {

    const dispatch = useDispatch()


    const [state, setState] = useReducer((a, aa)=>({...a, ...aa}), {
        image: "",
        stories: [
            // {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
            // {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
            // {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
            // {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
        ]
    })

    useEffect(()=>{
        dispatch(getStoriesAction()).unwrap().then(data=>{
            setState({stories: data.stories})
        })
    }, [])


    async function chooseImage(e){
        let file = e.target.files[0]

        let base64 = await blobToBase64(file)
        // let formData = new FormData()
        // formData.append("avatar", file, "avatar")

        setState({stories: [
                {fullName: "alex karim", avatar: "", image: base64}
            , ...state.stories]})
    }

    function handleSubmitStory({media}){
        let formData = new FormData()
        media.forEach((m)=>{
            formData.append("image", m.blob)
        })
        dispatch(createStoryAction(formData))

    }


    return (
        <div
            className="gap-x-4 pb-4 ">

            <Splide
                options={ {
                    focus    : 'start',
                    gap: 8,
                    pagination: false,
                    arrows: false,
                    autoWidth: true,
                } }
                aria-label="My Favorite Images">
                <SplideSlide className="story-first">
                    <CreateStory onSubmit={handleSubmitStory}  fullName="Rasel mahmud" avatar="https://res.cloudinary.com/rasel/image/upload/v1686216926/social-app/avatar.jpg" storyAsset=""/>
                </SplideSlide>

                {state.stories.map(item=>(
                    <SplideSlide>
                        <Story fullName="Rasel mahmud" avatar={item?.author.fullName} storyAsset={staticImage(item.media[0].url)}/>
                    </SplideSlide>
                   ))}
            </Splide>
        </div>
    );
};

export default Stories;