import { useState } from "react";
import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
const Context = createContext()

export function UseContextValue() {
    return useContext(Context)

}

export default function ContextProvider({ children }) {
    const [userLogIn, setUserLogIn] = useState('NoneUserLoggedIn')
    const [phase, setPhase] = useState('signUpPhase')
    const [favourite, setFavourite] = useState({
        favouriteShowTitle: '',
        favouriteSeasonTitle: '',
    })
    const [phaseState, setPhaseState] = useState({
        Preview: [],
        DefaultPreview: [],
        Season: '',
        Episode: ''
    });
    const [showDescription, setShowDescription] = useState();
    const [showImage, setShowImage] = useState();
    const [search, setSearch] = useState('');

    return (
        <Context.Provider value={{ phase, setPhase, favourite, setFavourite, phaseState, setPhaseState, showDescription, setShowDescription, showImage, setShowImage, userLogIn, setUserLogIn, search, setSearch }}>
            {children}
        </Context.Provider>
    )
}