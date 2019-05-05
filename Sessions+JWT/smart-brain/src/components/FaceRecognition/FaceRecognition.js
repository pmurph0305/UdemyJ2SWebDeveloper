import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
                {boxes && boxes.length
                    ? boxes.map((box, index) => {
                          return (
                              <div
                                  className="bounding-box"
                                  key={"kBox_" + index}
                                  style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
                              />
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default FaceRecognition;
