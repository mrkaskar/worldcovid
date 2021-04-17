import { memo, useEffect, useState } from "react";
import ReactGlobe from "react-globe";
import { Color } from "three";
import { Mesh } from "three";
import { MeshBasicMaterial } from "three";
import { SphereGeometry } from "three";
import Loader from "./Loader";

function Globe({
  onClickMarker,
  markers,
  focus,
  setEvent,
  //   onDefocus,
  //   onMouseOutMarker,
  //   onMouseOverMarker,
}) {
  const [show, setShow] = useState(false);
  function onMouseOverMarker(marker, markerObject, event) {
    setEvent({
      type: "MOUSEOVER",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
  }
  function onMouseOutMarker() {
    setEvent(null);
  }
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);
  return (
    <>
      {!show && <Loader status="Loading World!" />}
      <ReactGlobe
        focus={focus}
        onClickMarker={onClickMarker}
        //   onDefocus={onDefocus}
        onMouseOutMarker={onMouseOutMarker}
        onMouseOverMarker={onMouseOverMarker}
        height="100vh"
        width="500"
        initialCameraDistanceRadiusScale={3}
        markers={markers}
        options={{
          focusAnimationDuration: 2000,
          focusDistanceRadiusScale: 1.5,
          focusEasingFunction: ["Linear", "None"],
          ambientLightColor: "lightblue",
          ambientLightIntensity: 1,
          pointLightColor: "white",
          pointLightIntensity: 1,
          pointLightPositionRadiusScales: [1, 2, -1],
          enableCameraAutoRotate: true,
          markerTooltipRenderer: (marker) => ``,
          markerRadiusScaleRange: [0.01, 0.05],
          markerRenderer: (marker) => {
            const { color, value } = marker;
            const scaledSize = value;
            const geometry = new SphereGeometry(scaledSize, 10, 10);
            const material = new MeshBasicMaterial({
              color: new Color(color),
            });
            let objMesh = new Mesh(geometry, material);
            return objMesh;
          },
        }}
      />
    </>
  );
}

export default memo(Globe);
