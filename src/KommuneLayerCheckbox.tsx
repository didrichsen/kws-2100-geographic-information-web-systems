import React from "react";

interface KommuneLayerCheckboxProps {
    isChecked: boolean,
    setIsChecked: (value:boolean) => void
}

const KommuneLayerCheckbox = ({isChecked, setIsChecked} : KommuneLayerCheckboxProps) => {

    return (
        <label>
            Toggle kommuner on/off
            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}></input>
        </label>
    );

}

export default KommuneLayerCheckbox;