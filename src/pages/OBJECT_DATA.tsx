import React from 'react'
import { useLocation } from 'react-router-dom';
import TopButtosLayout from './../components/TopButtosLayout';

export function OBJECTDATA() {
  const {state} = useLocation();
  const { workflow_id, object_id } = state;
  const DivStyle = {
    margin: '10px',
  };
  return (
    <>
      <TopButtosLayout />
      <div style={DivStyle}>OBJECTDATA  workflow code - <b>{workflow_id}</b>  object id = <b>{object_id}</b> </div>
    </>
  )
}
