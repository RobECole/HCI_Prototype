var maxCount = 10;
var currCount = 0;
var classes = ["Ethics, Law and Professionalisim", "Embedded Systems", "Capstone Design II", "Special Topics in Software Engineering", "Software and Computer Security"];
var panels = ["danger", "warning", "primary", "success", "info"];
var activeFall = [];
var activeWinter = [];

$(document).ready(function() {

  $("#add").click(function() {
    if (currCount < maxCount) {
      $("blockquote").hide();
      var $tab = $('#myTabContent'),
        $activeTab = $tab.find('.tab-pane.active');
      var code = $('#courses option:selected').text();
      var name = $('#courses').val();

      if ($activeTab.attr('id') == 'fall') {
        if (activeFall.indexOf(name) == -1 && activeWinter.indexOf(name) == -1 ) {
          $activeTab.append("<div class=\"panel panel-" + panels[name] +
            "\" id=" + name +
            ">\
            <div class=\"panel-heading clearfix\" style=\"padding-bottom: 5px;\">\
              <span class=\"glyphicon glyphicon-remove-circle pull-right\" id=\"rmv\" ></span>\
              <h3 class=\"panel-title pull-left\" style=\"padding-top: 7.5px\">" +
            code + "</h3>\
            </div>\
            <div class=\"panel-body\">\
              " + classes[name] + "  <div class=\"checkbox\"><label><input type=\"checkbox\" checked=\"checked\"  id=" + name +
            "show\"> Show</label></div>\
            </div>\
          </div>");
          currCount++;
          if ($activeTab.attr('id') == 'fall') {
            activeFall.push(name);
          }
          console.log(activeFall);
          showClasses(name);


        } else {
          $('#alert').append(
            "<div class=\"alert alert-dismissible alert-danger\">\
              <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"glyphicon glyphicon-remove-circle pull-right\"></span></button>\
              <p  style=\"text-align: center\"><strong>You already have this course in your tray!</strong></p></div>"
          );
        }
      }
      if ($activeTab.attr('id') == 'winter') {
        if (activeWinter.indexOf(name) == -1 && activeFall.indexOf(name) == -1 ) {
          $activeTab.append("<div class=\"panel panel-" + panels[name] +
            "\" id=" + name +
            ">\
            <div class=\"panel-heading clearfix\" style=\"padding-bottom: 5px;\">\
              <span class=\"glyphicon glyphicon-remove-circle pull-right\" id=\"rmv\" ></span>\
              <h3 class=\"panel-title pull-left\" style=\"padding-top: 7.5px\">" +
            code + "</h3>\
            </div>\
            <div class=\"panel-body\">\
              " + classes[name] + "  <div class=\"checkbox\"><label><input type=\"checkbox\" checked=\"checked\"  id=" + name +
            "show\"> Show</label></div>\
            </div>\
          </div>");
          currCount++;
          activeWinter.push(name);
          console.log(activeWinter);
          showClasses(name);


        } else {
          $('#alert').append(
            "<div class=\"alert alert-dismissible alert-danger\">\
              <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"glyphicon glyphicon-remove-circle pull-right\"></span></button>\
              <p  style=\"text-align: center\"><strong>You already have this course in your tray!</strong></p></div>"
          );
        }
      }

    }
  });

  $(document).on('click', '.glyphicon-remove-circle', function() {
    var $tab = $('#myTabContent'),
      $activeTab = $tab.find('.tab-pane.active');
      pop = $(this).closest("div.panel").attr('id');
    if($activeTab.attr('id')=='fall'){
      index = activeFall.indexOf(pop);
      if (index > -1) {
        activeFall.splice(index, 1);
        hideClasses(pop);
        $(this).closest("div.panel").remove();
      }
    }
    if($activeTab.attr('id')=='winter'){
      if (index > -1) {
        activeWinter.splice(index, 1);
        hideClasses(pop);
        $(this).closest("div.panel").remove();
      }
    }




    currCount--;
    if (currCount == 0) {
      $("blockquote").show();
    }
  });

  $(document).on('change', '.checkbox', function() {
    pop = $(this).closest("div.panel").attr('id');
    box = $(this).find('input');
    console.log(box.is(":checked"));
    if (box.is(":checked")) {
      showClasses(pop);
    } else {
      hideClasses(pop);
    }

  });


});

$("#save").click(function() {
  $('#alert').append(
    "<div class=\"alert alert-dismissible alert-success\">\
      <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"glyphicon glyphicon-remove-circle pull-right\"></span></button>\
      <p  style=\"text-align: center\"><strong>Your progress has been saved!</strong></p></div>"
  );
});

$("#yes").click(function() {
  $('#alert').append(
    "<div class=\"alert alert-dismissible alert-success\">\
      <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"glyphicon glyphicon-remove-circle pull-right\"></span></button>\
      <p  style=\"text-align: center\"><strong>Your schedule has been submitted</strong></p></div>"
  );
});

$("#recommend").click(function() {
  var $tab = $('#myTabContent'),
    $activeTab = $tab.find('.tab-pane.active');
  if ($activeTab.attr('id') == 'fall') {
    showPathFall();
    $('#alert').append("<div class=\"alert alert-dismissible alert-success clearfix\">\
          <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"glyphicon glyphicon-remove-circle pull-right\"></span></button>\
          <p  style=\"text-align: center\"><strong>This is your recommended schedule. Would you like to keep it?</strong></p>\
          <a href=\"#\" class=\"btn btn-default btn-sm pull-right\" style=\"margin-left:10px; margin-right:15px;\" onclick=\"hidePathFall();\" data-dismiss=\"alert\">No thanks!</a>\
          <a href=\"#\" class=\"btn btn-primary btn-sm pull-right\" style=\"margin-left:15px; margin-right:10px;\" data-dismiss=\"alert\">Yes</a>\
           </div>");
  }
  if ($activeTab.attr('id') == 'winter') {
    showPathWinter();
    $('#alert').append("<div class=\"alert alert-dismissible alert-success clearfix\">\
          <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"glyphicon glyphicon-remove-circle pull-right\"></span></button>\
          <p  style=\"text-align: center\"><strong>This is your recommended schedule. Would you like to keep it?</strong></p>\
          <a href=\"#\" class=\"btn btn-default btn-sm pull-right\" style=\"margin-left:10px; margin-right:15px;\" onclick=\"hidePathWinter();\" data-dismiss=\"alert\">No thanks!</a>\
          <a href=\"#\" class=\"btn btn-primary btn-sm pull-right\" style=\"margin-left:15px; margin-right:10px;\" data-dismiss=\"alert\">Yes</a>\
           </div>");
  }


});

$("#winterTab").click(function() {
  var $tab = $('#myTabContent'),
    $activeTab = $tab.find('.tab-pane.active');
  if ($activeTab.attr('id') == 'fall') {
    for (i = 0; i < activeFall.length; i++) {
      hideClasses(activeFall[i]);
    }
    for (i = 0; i < activeWinter.length; i++) {
      showClasses(activeWinter[i]);
    }
  }
});

$("#fallTab").click(function() {
  var $tab = $('#myTabContent'),
    $activeTab = $tab.find('.tab-pane.active');
  if ($activeTab.attr('id') == 'winter') {
    for (i = 0; i < activeFall.length; i++) {
      showClasses(activeFall[i]);
    }
    for (i = 0; i < activeWinter.length; i++) {
      hideClasses(activeWinter[i]);
    }
  }
});

function showClasses(name) {
  switch (name) {
    case '0':
      $("#0classA1").css("visibility", "visible");
      $("#0classB1").css("visibility", "visible");
      $("#0class2A").css("visibility", "visible");
      $("#0class2B").css("visibility", "visible");
      $("#0tut").css("visibility", "visible");
      break;
    case '1':
      $("#1class1").css("visibility", "visible");
      $("#1class2").css("visibility", "visible");
      $("#1tut").css("visibility", "visible");
      break;
    case '2':
      $("#2class1").css("visibility", "visible");
      $("#2class2").css("visibility", "visible");
      $("#2tut").css("visibility", "visible");
      break;
    case '3':
      $("#3class1").css("visibility", "visible");
      $("#3class2").css("visibility", "visible");
      $("#3tut").css("visibility", "visible");
      break;
    case '4':
      $("#4class1").css("visibility", "visible");
      $("#4class2").css("visibility", "visible");
      $("#4labA").css("visibility", "visible");
      $("#4labB").css("visibility", "visible");
      break;
  }
};

function hideClasses(name) {
  switch (name) {
    case '0':
      $("#0classA1").css("visibility", "hidden");
      $("#0classB1").css("visibility", "hidden");
      $("#0class2A").css("visibility", "hidden");
      $("#0class2B").css("visibility", "hidden");
      $("#0tut").css("visibility", "hidden");
      break;
    case '1':
      $("#1class1").css("visibility", "hidden");
      $("#1class2").css("visibility", "hidden");
      $("#1tut").css("visibility", "hidden");
      break;
    case '2':
      $("#2class1").css("visibility", "hidden");
      $("#2class2").css("visibility", "hidden");
      $("#2tut").css("visibility", "hidden");
      break;
    case '3':
      $("#3class1").css("visibility", "hidden");
      $("#3class2").css("visibility", "hidden");
      $("#3tut").css("visibility", "hidden");
      break;
    case '4':
      $("#4class1").css("visibility", "hidden");
      $("#4class2").css("visibility", "hidden");
      $("#4labA").css("visibility", "hidden");
      $("#4labB").css("visibility", "hidden");
      break;
  }
};

function showPathFall() {
  if (activeFall.indexOf('0') > -1) {
    $("#0classB1C").prop("checked", 'checked');
    $("#0tutC").prop("checked", 'checked');
    $("#0class2BC").prop("checked", 'checked');
    $("#0classA1").css("visibility", "hidden");
    $("#0class2A").css("visibility", "hidden");
  }
  if (activeFall.indexOf('1') > -1) {
    $("#1class1C").prop("checked", 'checked');
    $("#1tutC").prop("checked", 'checked');
    $("#1class2C").prop("checked", 'checked');
  }
  if (activeFall.indexOf('2') > -1) {
    $("#2class1C").prop("checked", 'checked');
    $("#2tutC").prop("checked", 'checked');
    $("#2class2C").prop("checked", 'checked');
  }
  if (activeFall.indexOf('3') > -1) {
    $("#3class1C").prop("checked", 'checked');
    $("#3tutC").prop("checked", 'checked');
    $("#3class2C").prop("checked", 'checked');
  }
  if (activeFall.indexOf('4') > -1) {
    $("#4class1C").prop("checked", 'checked');
    $("#4labBC").prop("checked", 'checked');
    $("#4class2C").prop("checked", 'checked');
    $("#4labA").css("visibility", "hidden");
  }
};

function showPathWinter() {
  if (activeWinter.indexOf('0') > -1) {
    $("#0classB1C").prop("checked", 'checked');
    $("#0tutC").prop("checked", 'checked');
    $("#0class2BC").prop("checked", 'checked');
    $("#0classA1").css("visibility", "hidden");
    $("#0class2A").css("visibility", "hidden");
  }
  if (activeWinter.indexOf('1') > -1) {
    $("#1class1C").prop("checked", 'checked');
    $("#1tutC").prop("checked", 'checked');
    $("#1class2C").prop("checked", 'checked');
  }
  if (activeWinter.indexOf('2') > -1) {
    $("#2class1C").prop("checked", 'checked');
    $("#2tutC").prop("checked", 'checked');
    $("#2class2C").prop("checked", 'checked');
  }
  if (activeWinter.indexOf('3') > -1) {
    $("#3class1C").prop("checked", 'checked');
    $("#3tutC").prop("checked", 'checked');
    $("#3class2C").prop("checked", 'checked');
  }
  if (activeWinter.indexOf('4') > -1) {
    $("#4class1C").prop("checked", 'checked');
    $("#4labBC").prop("checked", 'checked');
    $("#4class2C").prop("checked", 'checked');
    $("#4labA").css("visibility", "hidden");
  }
};

function hidePathFall() {
  if (activeFall.indexOf('0') > -1) {
    $("#0classB1C").prop("checked", false);
    $("#0tutC").prop("checked", false);
    $("#0class2BC").prop("checked", false);
    $("#0classA1").css("visibility", "visible");
    $("#0class2A").css("visibility", "visible");
  }
  if (activeFall.indexOf('1') > -1) {
    $("#1class1C").prop("checked", false);
    $("#1tutC").prop("checked", false);
    $("#1class2C").prop("checked", false);
  }
  if (activeFall.indexOf('2') > -1) {
    $("#2class1C").prop("checked", false);
    $("#2tutC").prop("checked", false);
    $("#2class2C").prop("checked", false);
  }
  if (activeFall.indexOf('3') > -1) {
    $("#3class1C").prop("checked", false);
    $("#3tutC").prop("checked", false);
    $("#3class2C").prop("checked", false);
  }
  if (activeFall.indexOf('4') > -1) {
    $("#4class1C").prop("checked", false);
    $("#4labBC").prop("checked", false);
    $("#4class2C").prop("checked", false);
    $("#4labA").css("visibility", "visible");
  }
};

function hidePathWinter() {
  if (activeWinter.indexOf('0') > -1) {
    $("#0classB1C").prop("checked", false);
    $("#0tutC").prop("checked", false);
    $("#0class2BC").prop("checked", false);
    $("#0classA1").css("visibility", "visible");
    $("#0class2A").css("visibility", "visible");
  }
  if (activeWinter.indexOf('1') > -1) {
    $("#1class1C").prop("checked", false);
    $("#1tutC").prop("checked", false);
    $("#1class2C").prop("checked", false);
  }
  if (activeWinter.indexOf('2') > -1) {
    $("#2class1C").prop("checked", false);
    $("#2tutC").prop("checked", false);
    $("#2class2C").prop("checked", false);
  }
  if (activeWinter.indexOf('3') > -1) {
    $("#3class1C").prop("checked", false);
    $("#3tutC").prop("checked", false);
    $("#3class2C").prop("checked", false);
  }
  if (activeWinter.indexOf('4') > -1) {
    $("#4class1C").prop("checked", false);
    $("#4labBC").prop("checked", false);
    $("#4class2C").prop("checked", false);
    $("#4labA").css("visibility", "visible");
  }
};
function undo() {

}
