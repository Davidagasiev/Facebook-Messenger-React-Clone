import React, { useState } from "react";


function useInput(initialState) {
    const [ state, setState ] = useState(initialState);

    function handleChange(e) {
        setState(e.target.value);
    }

    function resetState() {
        setState("");
    }

    return [state, handleChange, resetState];
}

export default useInput;