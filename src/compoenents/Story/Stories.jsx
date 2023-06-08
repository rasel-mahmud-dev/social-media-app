import React, {useReducer} from 'react';
import Story from "src/compoenents/Story/Story.jsx";
import CreateStory from "src/compoenents/Story/CreateStory.jsx";
import blobToBase64 from "src/utils/blobToBase64.js";
import {TfiAngleRight} from "react-icons/tfi";
import Slider from "react-slick";

import { Splide, SplideSlide } from '@splidejs/react-splide';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// Default theme
import '@splidejs/react-splide/css';


// or only core styles
import '@splidejs/react-splide/css/core';

var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    // responsive: [
    //     {
    //         // breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 6,
    //             slidesToScroll: 1,
    //             infinite: true,
    //             dots: true
    //         }
    //     },
    //     {
    //         breakpoint: 600,
    //         settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2,
    //             initialSlide: 2
    //         }
    //     },
    //     {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //         }
    //     }
    // ]
};

const Stories = () => {



    const [state, setState] = useReducer((a, aa)=>({...a, ...aa}), {
        image: "",
        stories: [
            {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
            {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
            {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
            {fullName: "alex karim", avatar: "", image: "https://scontent.fdac96-1.fna.fbcdn.net/v/t39.30808-6/352704049_656340369640855_1565872400252349302_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=365331&_nc_eui2=AeF52Ofmn1CSG79Dp5t3LMP86om5XP5EUpzqiblc_kRSnOX3hmFR3UmfRjETnQyuBabfPbSRaiJ4ePeodtEAlssp&_nc_ohc=TL25j20Ij1MAX_5SiWD&_nc_zt=23&_nc_ht=scontent.fdac96-1.fna&oh=00_AfB7MOYTBXjcnZgFeibJ27o2qOpVBe-dIZzBw0Sc9NTt5Q&oe=64863721"},
            ]
    })

    async function chooseImage(e){
        let file = e.target.files[0]

        let base64 = await blobToBase64(file)
        // let formData = new FormData()
        // formData.append("avatar", file, "avatar")

        setState({stories: [
                {fullName: "alex karim", avatar: "", image: base64}
            , ...state.stories]})
    }

    function handleChooseImage(){
        let input = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("accept", "image/*")
        input.addEventListener("change", chooseImage)
        input.click()
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
                <SplideSlide>
                    <CreateStory onChange={handleChooseImage} fullName="Rasel mahmud" avatar="https://res.cloudinary.com/rasel/image/upload/v1686216926/social-app/avatar.jpg" storyAsset=""/>
                </SplideSlide>

                {state.stories.map(item=>(
                    <SplideSlide>
                        <Story fullName="Rasel mahmud" avatar="https://res.cloudinary.com/rasel/image/upload/v1686216926/social-app/avatar.jpg" storyAsset={item.image}/>
                    </SplideSlide>
                   ))}



            </Splide>

            {/*<Slider {...settings}>*/}

            {/*    <CreateStory onChange={handleChooseImage} fullName="Rasel mahmud" avatar="https://res.cloudinary.com/rasel/image/upload/v1686216926/social-app/avatar.jpg" storyAsset=""/>*/}

            {/*    {state.stories.map(item=>(*/}
            {/*        <Story fullName="Rasel mahmud" avatar="https://res.cloudinary.com/rasel/image/upload/v1686216926/social-app/avatar.jpg" storyAsset={item.image}/>*/}
            {/*    ))}*/}
            {/*    /!*<Story fullName="Rasel mahmud" avatar="https://res.cloudinary.com/rasel/image/upload/v1686216926/social-app/avatar.jpg" storyAsset=""/>*!/*/}
            {/*    /!*<Story fullName="Rasel mahmud" avatar="https://res.cloudinary.com/rasel/image/upload/v1686216926/social-app/avatar.jpg" storyAsset=""/>*!/*/}


            {/*/!*<div className="next-btn">*!/*/}
            {/*/!*    <TfiAngleRight className="text-sm" />*!/*/}
            {/*/!*</div>*!/*/}
            {/*</Slider>*/}
        </div>
    );
};

export default Stories;