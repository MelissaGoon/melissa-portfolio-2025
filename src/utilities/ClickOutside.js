// Source - https://stackoverflow.com/a/63359693
// Posted by M. G., modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-11, License - CC BY-SA 4.0

import { useEffect } from "react";
/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 */
export const useClickOutside = (ref, onClickOutside) => {
    useEffect(() => {
        /**
         * Invoke Function onClick outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        }
        // Bind
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // dispose
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClickOutside]);
}