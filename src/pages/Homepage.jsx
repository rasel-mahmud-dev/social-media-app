import Sidebar from "../compoenents/Sidebar/Sidebar.jsx";
import StoryCard from "../compoenents/StoryCard/StoryCard.jsx";
import PendingFriendRequestCard from "../compoenents/FindFriendCard/PendingFriendRequestCard.jsx";
import Avatar from "../compoenents/Avatar/Avatar.jsx";
import React, {useState} from "react";
import AddPost from "../compoenents/AddPost/AddPost.jsx";
import ModalWithBackdrop from "../compoenents/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {BiCamera, BiImage, BiPen, BiVideo} from "react-icons/bi";
import {FaEllipsisH} from "react-icons/fa";

const Homepage = () => {

    const [friends] = useState([
        {avatar: "2343", fullName: "Masdf SD"},
        {avatar: "2343", fullName: "Masdf SD"},
        {avatar: "2343", fullName: "Masdf SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
    ])

    const [isOpenAddPostModal, setOpenAddPostModal] = useState(false)


    return (
        <div className="mt-1.5">

            <ModalWithBackdrop  modalClass="!max-w-lg" isOpen={isOpenAddPostModal} onClose={()=>setOpenAddPostModal(false)}>
                <div>
                    <div className="flex items-center"> <div className="icon-box">
                        <BiPen />
                    </div>
                        <label htmlFor="">Create Post</label>

                    </div>

                    <div className="h-20 mt-3 ">
                        <div className=" flex items-center gap-x-2">
                            <Avatar username="Ava"></Avatar>
                            <h2>What on you mind</h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-x-4">
                            <li className="list-none flex items-center gap-x-1">
                                <BiVideo/>
                                Live Video
                            </li>
                            <li className="list-none flex items-center gap-x-1">
                                <BiImage/>
                                Photos/Videos
                            </li>
                            <li className="list-none flex items-center gap-x-1">
                                <BiCamera/>
                                Feallings
                            </li>
                        </div>
                        <FaEllipsisH className="text-xs text-neutral-500" />
                    </div>

                </div>
            </ModalWithBackdrop>


          <div className="flex justify-between ">
              <Sidebar className="white">


                 <div className="card">

                     <div className="card-meta">
                         <h4>Home</h4>
                     </div>

                     {friends.map((friend)=>(
                         <div key={friend.id} className="flex items-center gap-x-2 mb-3">
                             <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                             <label htmlFor="" className="text-sm">Setting</label>
                         </div>
                     ))}
                 </div>


                  <div className="card mt-3">

                      <div className="card-meta">
                          <h4>Account</h4>
                      </div>

                      <div className="flex items-center gap-x-2 ">
                          <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                          <label htmlFor="" className="text-sm">Setting</label>
                      </div>

                      <div className="flex items-center gap-x-2 ">
                          <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                          <label htmlFor="" className="text-sm">Setting</label>
                      </div>

                      <div className="flex items-center gap-x-2 ">
                          <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                          <label htmlFor="" className="text-sm">Setting</label>
                      </div>

                  </div>


              </Sidebar>


              <div className="w-full ">
                  <div className="content">



                     <div className="flex gap-x-4">



                         <div>


                             <div className="card">
                                 <div>
                                     <div className="flex items-center"> <div className="icon-box">
                                         <BiPen />
                                     </div>
                                         <label htmlFor="">Create Post</label>

                                     </div>

                                     <div className="h-20 mt-3 ">
                                         <div className=" flex items-center gap-x-2">
                                             <Avatar username="Ava"></Avatar>
                                             <h2 onClick={()=>setOpenAddPostModal(true)}>What on you mind</h2>
                                         </div>
                                     </div>

                                     <div className="flex justify-between items-center">
                                         <div className="flex items-center gap-x-4">
                                             <li className="list-none flex items-center gap-x-1">
                                                 <BiVideo/>
                                                 Live Video
                                             </li>
                                             <li className="list-none flex items-center gap-x-1">
                                                 <BiImage/>
                                                 Photos/Videos
                                             </li>
                                             <li className="list-none flex items-center gap-x-1">
                                                 <BiCamera/>
                                                 Feallings
                                             </li>
                                         </div>
                                         <FaEllipsisH className="text-xs text-neutral-500" />
                                     </div>

                                 </div>

                             </div>

                             <StoryCard />
                             <StoryCard />
                             <StoryCard />
                         </div>

                         <div>
                             <PendingFriendRequestCard/>
                         </div>
                     </div>

                  </div>
              </div>

              <Sidebar className="white">
                  <div className="card">

                      <div className="card-meta">
                          <h4>Friends</h4>
                      </div>

                    {friends.map((friend)=>(
                           <div key={friend.id} className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-x-2 ">
                               <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                               <label htmlFor="" className="text-sm">{friend.fullName}</label>
                           </div>
                               <span className="online">
                               </span>
                       </div>
                    ))}
                </div>



              </Sidebar>



          </div>



        </div>
    );
};

export default Homepage;