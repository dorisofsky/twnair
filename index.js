$(document).ready(function() {
  var density = {
    "  雲林縣 ":  0.952 ,
    " 臺東縣 ":  0.238 ,
    " 澎湖縣 ":  1 ,
    " 金門縣 ":  0.761 ,
    " 連江縣 ":  0.904 ,
    " 南投縣 ":  0.19  ,
    " 高雄市 ":  0.857 ,
    " 新北市 ":  0.619 ,
    " 桃園市 ":  0.571 ,
    " 宜蘭縣 ":  0.095 ,
    " 臺北市 ":  0.523 ,
    " 花蓮縣 ":  0.047 ,
    " 屏東縣 ":  0 ,
    " 臺南市 ":  0.285 ,
    " 嘉義市 ":  0.38  ,
    " 嘉義縣 ":  0.476 ,
    " 彰化縣 ":  0.428 ,
    " 臺中市 ":  0.333 ,
    " 苗栗縣 ":  0.095 ,
    " 新竹市 ":  0.714 ,
    " 新竹縣 ":  0.666 ,
    " 基隆市 ":  0.809 ,
  };
  d3.json("http://dorisofsky.github.io/taiwan_realtime2/county.json", function(topodata) {
    var features = topojson.feature(topodata, topodata.objects.county).features;
    var color = d3.scale.linear().domain([0,1]).range(["red","green"]);
    // var fisheye = d3.fisheye.circular().radius(100).distortion(2);
    var prj = function(v) {
      var ret = d3.geo.mercator().center([122,23.25]).scale(6000)(v);
      var ret = {x:ret[0],y:ret[1]};
      //var ret = fisheye({x:ret[0],y:ret[1]});
      return [ret.x, ret.y];
    };
    var path = d3.geo.path().projection(prj);
    for(idx=features.length - 1;idx>=0;idx--) features[idx].density = density[features[idx].properties.C_Name];
    d3.select("svg").selectAll("path").data(features).enter().append("path");
    function update() {
      d3.select("svg").selectAll("path").attr({
        "d": path,
        "fill": function (d) { return color(d.density); }
      }).on("mouseover", function(d) {
        $("#name").text(d.properties.C_Name);
        $("#density").text(d.density);

      });
    }
    d3.select("svg").on("mousemove", function() {
      // fisheye.focus(d3.mouse(this));
      update();
    });
    update();
  });
});
