import axios from "axios"

export const loginUser = (email,password) => async(dispatch) => {
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data} = await axios.post("/api/v1/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async(dispatch) => {
    try {
        dispatch({
            type:"LogoutUserRequest"
        })
        const {data} = await axios.get("/api/v1/logout")
        dispatch({
            type:"LogoutUserSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"LogoutUserFailure",
            payload: error.response.data.message
        })
    }
}

export const loaduser = () => async(dispatch) => {
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const {data} = await axios.get("/api/v1/me")
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"LoadUserFailure",
            payload: error.response.data.message
        })
    }
}

export const getFollowingPosts = () => async(dispatch) => {
    try {
        dispatch({
            type:"postOfFollowingRequest",
        })

        const {data} = await axios.get("/api/v1/posts")

        dispatch({
            type:"postOfFollowingSuccess",
            payload:data.posts
        })
    } catch (error) {
        dispatch({
            type:"postOfFollowingFailure",
            payload:error.response.data.message
        })
    }
}

export const getAllUsers = (name="") => async(dispatch) => {
    try {
        dispatch({
            type:"allUserReducerRequest",
        })

        const {data} = await axios.get(`/api/v1/users?name=${name}`)

        dispatch({
            type:"allUserReducerSuccess",
            payload:data.users
        })
    } catch (error) {
        dispatch({
            type:"allUserReducerFailure",
            payload:error.response.data.message
        })
    }
}


export const getMyPosts = () => async(dispatch) => {
    try {
        dispatch({
            type:"myPostsRequest",
        })

        const {data} = await axios.get("/api/v1/my/posts")

        dispatch({
            type:"myPostsSuccess",
            payload:data.posts
        })
    } catch (error) {
        dispatch({
            type:"myPostsFailure",
            payload:error.response.data.message
        })
    }
}

export const RegisterUser = (name,email,password,avatar) => async(dispatch) => {
    try {
        dispatch({
            type:"RegisterRequest"
        })
        const {data} = await axios.post("/api/v1/register",{name,email,password,avatar},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"RegisterSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"RegisterFailure",
            payload: error.response.data.message
        })
    }
}

export const Updateprofile = (name,email,avatar) => async(dispatch) => {
    try {
        dispatch({
            type:"UpdateProfileRequest"
        })
        const {data} = await axios.put("/api/v1/update/profile",{name,email,avatar},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UpdateProfileSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"UpdateProfileFailure",
            payload: error.response.data.message
        })
    }
}

export const Updatepassword = (oldpassword,newpassword) => async(dispatch) => {
    try {
        dispatch({
            type:"UpdatepasswordRequest"
        })
        const {data} = await axios.put("/api/v1/update/password",{oldpassword,newpassword},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UpdatepasswordSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"UpdatepasswordFailure",
            payload: error.response.data.message
        })
    }
}


export const DeleteAccount = (oldpassword,newpassword) => async(dispatch) => {
    try {
        dispatch({
            type:"DeleteAccountRequest"
        })
        const {data} = await axios.delete("/api/v1/delete/me")
        dispatch({
            type:"DeleteAccountSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"DeleteAccountFailure",
            payload: error.response.data.message
        })
    }
}


export const getUserPosts = (id) => async(dispatch) => {
    try {
        dispatch({
            type:"userPostsRequest",
        })

        const {data} = await axios.get(`/api/v1/userposts/${id}`)

        dispatch({
            type:"userPostsSuccess",
            payload:data.posts
        })
    } catch (error) {
        dispatch({
            type:"userPostsFailure",
            payload:error.response.data.message
        })
    }
}


export const getUserProfile = (id) => async(dispatch) => {
    try {
        dispatch({
            type:"userProfileReducerRequest",
        })

        const {data} = await axios.get(`/api/v1/user/${id}`)

        dispatch({
            type:"userProfileReducerSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"userProfileReducerFailure",
            payload:error.response.data.message
        })
    }
}

export const followAndunfollow = (id) => async(dispatch) => {
    try {
        dispatch({
            type:"FollowerRequest",
        })

        const {data} = await axios.get(`/api/v1/follow/${id}`)

        dispatch({
            type:"FollowerSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"FollowerFailure",
            payload:error.response.data.message
        })
    }
}