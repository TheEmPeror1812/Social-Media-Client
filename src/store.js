import {configureStore} from "@reduxjs/toolkit"
import { likeReducer, myPostsReducer, newPost, userPostsReducer } from "./Reducers/Post";
import {allUserReducer, postOfFollowingReducer, userProfileReducer, userReducer} from "./Reducers/User"

const store = configureStore({
    reducer:{
        user:userReducer,
        postofFollowing:postOfFollowingReducer,
        allUsers:allUserReducer,
        like:likeReducer,
        myPosts: myPostsReducer,
        newPost:newPost,
        userProfile:userProfileReducer,
        userPost:userPostsReducer
    }
})

export default store;