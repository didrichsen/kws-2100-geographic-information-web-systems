import React, {createContext, SetStateAction} from "react";

export const KommuneContext = createContext({
    checked: false,
    setChecked: (value: SetStateAction<boolean>) => {}
});
