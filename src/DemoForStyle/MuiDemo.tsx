import React from "react"
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider';
import './MuiDemo.css'

export default function MuiDemo(){
  return <>
    <Button variant="outlined" className="CustomButton">outlined</Button>
    <Slider className="CustomSlider"/>
  </>
}