import { useEffect } from "react";

const useCloseOnClickOutside = (elementToCloseRef, closeStateSetter) => {
    const handleClickOutsideDropdown = (e) => {
        if (!elementToCloseRef.current) return;

        if (elementToCloseRef.current.contains(e.target)) {
            return;
        }
        closeStateSetter(false);
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideDropdown);
        return () => {
            document.removeEventListener("click", handleClickOutsideDropdown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useCloseOnClickOutside;
