import Sidebar from "../compoenents/Sidebar/Sidebar.jsx";
import StoryCard from "../compoenents/StoryCard/StoryCard.jsx";
import PendingFriendRequestCard from "../compoenents/FindFriendCard/PendingFriendRequestCard.jsx";

const Homepage = () => {
    return (
        <div className="mt-1.5">


          <div className="flex justify-between ">
              <Sidebar>

              </Sidebar>


              <div className="w-full ">
                  <div className="content">


                     <div className="flex gap-x-4">
                         <div>
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

              <Sidebar>

              </Sidebar>



          </div>



        </div>
    );
};

export default Homepage;