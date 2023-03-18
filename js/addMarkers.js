AFRAME.registerComponent("create-markers", {
  
  init: async function() {

    var mainScene = document.querySelector("#main-scene");

    //get the dishes collection from firestore database
    var toys = await this.getAllToys();
   
    toys.map(toy => {
      var marker = document.createElement("a-marker");   
      marker.setAttribute("id", toy.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", toy.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });

      //set the markerhandler component
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);

      // Adding 3D model to scene
      var model = document.createElement("a-entity");    
     
      model.setAttribute("id", `model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
      model.setAttribute("gltf-model", `url(${toy.model_url})`);
      model.setAttribute("gesture-handler", {});
      model.setAttribute('animation-mixer',{})
      marker.appendChild(model);
    
    var mainPlane = document.createElement("a-plane");
    mainPlane.setAttribute("id", `main-plane-${toy.id}`);
    mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
    mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
    mainPlane.setAttribute("width", 2);
    mainPlane.setAttribute("height", 1.5);
    marker.appendChild(mainPlane);

    // Dish title background plane
    var titlePlane = document.createElement("a-plane");
    titlePlane.setAttribute("id", `title-plane-${dish.id}`);
    titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
    titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
    titlePlane.setAttribute("width", 1.49);
    titlePlane.setAttribute("height", 0.3);
    titlePlane.setAttribute("material", { color: "#F0C30F" });
    mainPlane.appendChild(titlePlane);

    // Dish title
    var toyTitle = document.createElement("a-entity");
    toyTitle.setAttribute("id", `toy-title-${toy.id}`);
    toyTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
    toyTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
    toyTitle.setAttribute("text", {
      font: "monoid",
      color: "black",
      width: 1.8,
      height: 1,
      align: "center",
      value: toy.toy_name.toUpperCase()
    });
    titlePlane.appendChild(toyTitle);
  })
  },
  //function to get the dishes collection from firestore database
  getAllToys: async function() {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
