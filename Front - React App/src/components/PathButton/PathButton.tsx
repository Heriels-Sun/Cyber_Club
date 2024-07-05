import React from 'react'
import './PathButton.css';

interface Props {
    pathName: String,
    selected: boolean
}

export const PathButton = ({ pathName, selected }: Props) => {
  return (
    <div className='path-button-container'>
        <button className={`path-button${!selected ? " path-button--unselected" : " path-button--selected"}`}>
            {pathName}
        </button>
        <div className='button-extra-part' />
    </div>
  )
}
