import { useState } from 'react';
import { useEffect } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { toastWarnNotify, toastSuccessNotify, toastErrorNotify } from "../helpers/toastNotify";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export const createUser = async (email, password, username, navigate) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        await updateProfile(auth.currentUser, {
            displayName: username,
        });
        navigate("/");
        toastSuccessNotify("Registered successfully!")
    } catch (error) {
        const errorCode = error.code;
        // const errorMessage = error.message;
        toastErrorNotify(errorCode)
    }
}

export const login = async (email, password, navigate) => {
    try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        setTimeout(() => {
            toastSuccessNotify("Logged in successfully!");
        }, 2000)
        navigate("/");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toastErrorNotify(errorMessage)
    }
};

export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setCurrentUser(currentUser);
        } else {
            // User is signed out
            setCurrentUser(false);
        }
    })
};

export const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully!")
};

export const signUpProvider = (navigate) => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            navigate("/");
            toastSuccessNotify("Login successfully!");
        })
        .catch((error) => {
            // Handle Errors here.
            console.log(error);
        });
};


export const addNewBlog = (info) => {
    const db = getDatabase();
    const blogDatas = ref(db, "blog");
    const newBlogRef = push(blogDatas);
    if (info) {
        set((newBlogRef), {
            title: info.title,
            imgUrl: info.imgUrl,
            content: info.content,
            date: info.date,
            email: info.email,
            userId: info.userId,
            id: newBlogRef._path.pieces_[1]
        })
        console.log(newBlogRef._path.pieces_[1])
    }
}

export const getData = (setDataArray) => {
    const db = getDatabase();
    const userRef = ref(db, "blog");
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        const blogArray = [];
        for (let id in data) {
            blogArray.push({ id, ...data[id] })
        }
        setDataArray(blogArray);
    });
}

//Bu kısmı customhook a taşı
export const GetDetailsData = (id) => {
    const [details, setDetails] = useState();
    useEffect(() => {
        const db = getDatabase();
        const detailsRef = ref(db, "blog/" + id);
        onValue(detailsRef, (snapshot) => {
            const details = snapshot.val();
            setDetails(details)
        })
    }, [id])

    return { details }
}

export const DeleteUser = (id, navigate) => {
    const db = getDatabase();
    const userRef = ref(db, "blog");
    remove(ref(db, "blog/" + id));
    navigate("/");
    toastWarnNotify("Blog is deleted")
}

export const EditUser = (info, currentUserId) => {
    if (info) {
        const db = getDatabase();
        const updates = {};
        updates["blog/" + info.id] = info;
        return update(ref(db), updates);
    }
}