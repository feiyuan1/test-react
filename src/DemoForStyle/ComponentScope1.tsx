import React from "react";
import {Helmet} from 'react-helmet'
import './ComponentScope1.css'

export default function ComponentScope1(){
  return <div className="ComponentScope">
    <Helmet>
      <style type="text/css">{`
          body {
              background-color: #eee;
          }
      `}</style>
    </Helmet>
    color red
  </div>
}