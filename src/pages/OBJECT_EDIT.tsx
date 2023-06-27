import React from 'react'
import { useLocation } from 'react-router-dom';
import TopButtosLayout from './../components/TopButtosLayout';

export function OBJECTEDIT() {
  const {state} = useLocation();
  const { workflow_id, object_id } = state;
  const DivStyle = {
    margin: '10px',
  };
  return (
    <>
      <TopButtosLayout />
      <div style={DivStyle}>OBJECTEDIT {workflow_id} {object_id} </div>
    </>
  )
}
