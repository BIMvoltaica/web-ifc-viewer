import { getLineColor } from "./materials.js";
import {
  namedProps as n,
  structuredData as s,
} from "../../utils/global-constants.js";
import { scene } from "./three-scene.js";

function drawEdges(structured) {
  const products = structured[s.products];

  products.forEach((product) => {
    product[n.geometry].forEach((item) => {
      const ifcClass = product[n.ifcClass];
      if (item.type === "Mesh" && ifcClass) {
        const lineColor = getLineColor(ifcClass);
        var geo = new THREE.EdgesGeometry(item.geometry);
        var mat = new THREE.LineBasicMaterial({ color: lineColor });
        var wireframe = new THREE.LineSegments(geo, mat);
        item.add(wireframe);
        scene.attach(wireframe);

        if (product[n.hasOpenings])
          product[n.hasOpenings].forEach((opening) => {
            opening[n.geometry].forEach((item) => {
              var geo2 = new THREE.EdgesGeometry(item.geometry);
              const openingLineColor = getLineColor(opening[n.ifcClass]);
              var openingMat = new THREE.LineBasicMaterial({ color: openingLineColor });
              var wireframe2 = new THREE.LineSegments(geo2, openingMat);
              item.add(wireframe2);
              scene.attach(wireframe2);
            });
          });
      }
    });
  });
}

export { drawEdges };