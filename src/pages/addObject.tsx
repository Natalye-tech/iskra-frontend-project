import React from 'react'

export function AddObject(workflow_id: string = 'workflow_id') {
  const DivStyle = {
    margin: '10px',
  };
  return (
    <div style={DivStyle}>addObject workflow_id = {workflow_id}</div>
  )
}
