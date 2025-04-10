import "./PostStatus.css";
import { useState } from "react";
import useUserInfoHook from "../userInfo/userInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import {
    PostStatusPresenter,
    PostStatusView
} from "../../presenters/PostStatusPresenter";



const PostStatus = () => {
    const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
        useToastListener();

    const { currentUser, authToken } = useUserInfoHook();
    const [post, setPost] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const listener: PostStatusView = {
        displayErrorMessage: displayErrorMessage,
        displayInfoMessage: displayInfoMessage,
        clearLastInfoMessage: clearLastInfoMessage,
        setIsLoading: setIsLoading,
        setPost: setPost,
        post: post,
        currentUser: currentUser
    };

    const presenterGenerator = (view: PostStatusView) => new PostStatusPresenter (view)

    const [presenter] = useState(presenterGenerator(listener));

    const clearPost = (event: React.MouseEvent) => { 
        event.preventDefault();
        setPost("");
    };

    const checkButtonStatus: () => boolean = () => { 
        return !post.trim() || !authToken || !currentUser;
    };

    return (
        <div className={isLoading ? "loading" : ""}>
            <form>
                <div className="form-group mb-3">
                    <textarea
                        className="form-control"
                        id="postStatusTextArea"
                        rows={10}
                        placeholder="What's on your mind?"
                        value={post}
                        onChange={(event) => {
                            setPost(event.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <button
                        id="postStatusButton"
                        className="btn btn-md btn-primary me-1"
                        type="button"
                        disabled={checkButtonStatus()}
                        style={{ width: "8em" }}
                        onClick={(event) => presenter.submitPost(authToken, post)}
                    >
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <div>Post Status</div>
                        )}
                    </button>
                    <button
                        id="clearStatusButton"
                        className="btn btn-md btn-secondary"
                        type="button"
                        disabled={checkButtonStatus()}
                        onClick={(event) => clearPost(event)}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostStatus;
