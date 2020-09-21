import {useState} from "react";

function useToggle(initialValue = false) {
    const [state, setState] = useState(initialValue);

    function toggleValue() {
        setState(!state);
    }
    return [state, toggleValue];
}

export default useToggle;