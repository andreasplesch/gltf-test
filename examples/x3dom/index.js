var modelInfo = ModelIndex.getCurrentModel();
if (!modelInfo) {
    modelInfo = TutorialModelIndex.getCurrentModel();
}
if (!modelInfo) {
    document.getElementById('container').innerHTML = 'Please specify a model to load';
    throw new Error('Model not specified or not found in list.');
}


document.onload = function () {
    var shape = $("#gltf");
    if (!modelInfo.path.includes("glTF-Binary")) {
        var notSupportedShape = "<shape>\n";
        notSupportedShape += "<appearance>\n";
        notSupportedShape += "  <material ambientIntensity='0.0933' diffuseColor='0.32 0.54 0.26' shininess='0.51' specularColor='0.46 0.46 0.46'></material>";
        notSupportedShape += "</appearance>\n"
        notSupportedShape += "<text string='"+'"Apologies" "only binary supported" " "'+"' solid='false'>\n";
        notSupportedShape += "    <fontstyle family='"+'"SANS"'+"' size='0.7' justify='middle'></fontstyle>\n";
        notSupportedShape += "</text>\n";
        notSupportedShape += "</shape>\n";
        shape.append(notSupportedShape);
        return;
    }
    
    var scale = modelInfo.scale;
    shape.attr({scale: scale + " " + scale + " " + scale});
    if (modelInfo.name == 'GearboxAssy') { // fix gtltf vp
        document.querySelector('timesensor').remove();
        //shape.attr({translation: "-159.20 -17.02 -3.21"});
        var vp = $("#vp");
        vp.attr({fieldofview: "0.263245"});
        vp.attr({position: "207.615 53.3281 51.6212"});
        //from decomposition of camera node transform matrix
        vp.attr({orientation: "-0.5035214059784457 0.8384312102757996 0.20856485647622058 0.9177268588403985"});
        vp.attr({centerofrotation: "159.20 17.02 3.21"});
    }
    var modelUrl = "../../" + modelInfo.category + "/" + modelInfo.path;
    //shape.append("<externalshape id='exshape' url='" + modelUrl + "' ></externalshape>");
    shape.append("<externalshape shading='WIREFRAME' id='exshape' url='" + modelUrl + "' ></externalshape>");
    
    //look for wireframe mesh
    //find model
//     var model = ModelIndex.List.find(function(model){return model.name == modelInfo.name;});
//     if (model.mesh.length > 0) { //has mesh locations
//         var wireframeShape = "<shape shading='WIREFRAME'>\n";
//         wireframeShape += "<appearance>\n";
//         wireframeShape += "  <material diffuseColor='0 0 0'></material>\n";
//         wireframeShape += "  <LineProperties linetype='1' linewidthScaleFactor='2' ></LineProperties>\n"
//         wireframeShape += "</appearance>\n";
//         wireframeShape += "<externalgeometry url='" + modelUrl + "#" + model.mesh[0] + "' ></externalgeometry>\n";
//         wireframeShape += "</shape>\n";
//         shape.append(wireframeShape);
//     }
}
