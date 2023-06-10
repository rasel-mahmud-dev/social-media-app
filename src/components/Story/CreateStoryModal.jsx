import "./story.scss"
import ModalWithBackdrop from "src/components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {TiTimes} from "react-icons/ti";
import Avatar from "src/components/Shared/Avatar/Avatar.jsx";


import CreateStory from "components/Story/CreateStory.jsx";

const CreateStoryModal = ({fullName, avatar, onClose, isOpenCreateStoryModal}) => {

    return (
        <div>
            <ModalWithBackdrop root="modal-root" className="add-story-modal"  isOpen={isOpenCreateStoryModal}>
                <div className="create-story-content">
                    <div className="close-button" onClick={onClose}>
                        <TiTimes/>
                    </div>
                    <div className="flex">
                        <div className="my-stories-sidebar p-4">
                            <h3 className="text-2xl font-bold color_h1">Your story</h3>
                            <div className="flex items-center gap-x-2 mt-3 border-b pb-4">
                                <Avatar imgClass="!w-10 !h-10" className="!w-10 !h-10" username={fullName}
                                        src={avatar}/>
                                <h4 className="font-medium color_h2">{fullName}</h4>
                            </div>

                            {/*<div className="action-Button">*/}
                            {/*    <div className="flex w-full items-center">*/}
                            {/*        <Button onClick={() => setState({isCreateStoryModalOpen: false})}*/}
                            {/*                className="w-full btn btn-primary">Discard*/}
                            {/*        </Button>*/}
                            {/*        <Button onClick={handleShareStory}*/}
                            {/*                className={`whitespace-nowrap w-full btn  ${isShareable() ? "btn-primary" : "btn-disable"}`}>Share*/}
                            {/*            to story*/}
                            {/*        </Button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </div>

                       <CreateStory />

                    </div>

                </div>
            </ModalWithBackdrop>


        </div>
    );
};

export default CreateStoryModal;