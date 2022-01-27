/*
TODO:
1. Install dependencies DONE
2. Import dependencies DONE
3. Setup webcam and canvas DONE
4. Define references to those DONE
5. Load facemesh DONE
6. Detect function DONE
7. Drawing utilities DONE
8. Load triangulation DONE
9. Setup triangle path DONE
10. Setup point drawing DONE
11. Add drawMesh to detect function DONE
*/

// importing dependencies needed
import React, {useEffect, useRef} from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";

import { drawMesh } from './utils';

function App() {
  // references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // load facemesh
  const runFacemesh = async () =>{
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(()=>{
      detect(net)
    },10) // running every 100ms
  };
  const detect = async(net)=> {
    // detect if camera is running
    if(typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
    ){
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video properties (width & height)
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas properties
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // perform detection
      const face = await net.estimateFaces({input:video})
      console.log(face)


      // get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d")
      requestAnimationFrame(()=>{drawMesh(face,ctx)})
    }
  }

  useEffect(()=>{runFacemesh()}, [])

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} style={
          {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex:10,
            width:640,
            height:480
          }
        }
        />
        <canvas ref={canvasRef} style={
          {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex:10,
            width:640,
            height:480
          }
        }/>
      </header>
    </div>
  );
}

export default App;
