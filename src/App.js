/*
TODO:
1. Install dependencies DONE
2. Import dependencies DONE
3. Setup webcam and canvas DONE
4. Define references to those
5. Load facemesh
6. Detect function
7. Drawing utilities
8. Load triangulation
9. Setup triangle path
10. Setup point drawing
11. Add drawMesh to detect function
*/

// importing dependencies needed
import React, {useRef} from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

function App() {
  // references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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
