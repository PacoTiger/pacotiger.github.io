//REQUEST
var requestURL = 'json/projects.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  projectsInfo = request.response;
  console.log('projectsInfo ', projectsInfo.length);
  var cards    = [];

  class Card {
    constructor (header, body, footer, modalNumber, modalWindow){
      this.header = header;
      this.body = body;
      this.footer = footer;
      this.modal = modalNumber;
      this.modalWindow = modalWindow;
    }

    render() {
      $('#carousel').append("<figure id='" + this.modal + "'class='card' data-increment='1'>" + this.header + this.body + this.footer + "</figure>");
    }

    showModal() {
      $('#modal .modalbox').empty().append(this.modalWindow);
      setTimeout(jCarouselJS, 600);
    }

    addIconTechnologies (projectN) {
      for (let n = projectsInfo[projectN]['technologies'].length - 1; n >= 0; n--) {
              let tpmlIcons = projectsInfo[projectN]['technologies'][n]['name'];
  
              $('#technicalIcons' + projectsInfo[projectN]['id'])
              .append("<img title='" + projectsInfo[projectN]['technologies'][n]['name'] + 
                      "' src='" + projectsInfo[projectN]['technologies'][n]['icon'] + "'>");     
      }
    }

    hiddeGithubBttn () {
        var re = /class='gitIcon'/gi;
        var addHidde = "class='gitIcon hidde'";
        this.modalWindow = $(this)[0].modalWindow.replace(re, addHidde);
      }
    hiddeDeployBttn () {
        var re = /class='btnDeploy'/gi;
        var addHidde = "class='btnDeploy hidde'";
        this.modalWindow = $(this)[0].modalWindow.replace(re, addHidde);
      }
  }


  for (let i = 0; i <= projectsInfo.length -1; i++) {
  
    let tpmlHeader = "<header>" +
        // "<a href=" + "'" + projectsInfo[i]['github'] + "' " + "target='_blank'>" +
        //         "<span class='gitIcon'>" +
        //           "<i class='fab fa-github-square fa-2x'></i>" +
        //         "</span>" +
        //       "</a>" +
        //         "<a href=" + "'" + projectsInfo[i]['deploy'] + "' " + "target='_blank'>" +
                "<div class='uptitle'>" +
                  "project name:" + 
                "</div>" +
                "<div class='title'>" +
                  projectsInfo[i]['title'] +
                "</div>" +
      "</header>";

    let tpmlBody = "<article>" +
          "<div class='description'>" +
      projectsInfo[i]['description'] +
          "</div>" +
          "<div class='bttnFalse'>" +
              "<div class='border'>" +
                "<div class='left-plane'></div>" +
                "<div class='right-plane'></div>" +
              "</div>" +  
              "<div class='text'><a href='#modal'>Open</a></div>" +
          "</div>" +
      "</article>";
      // "</a>"

    let tpmlFooter = "<footer>" +
      /*"<span class='linkedinIcon'>" +
        "<a href='https://uk.linkedin.com/in/pacotiger' target='_blank' title='LinkedIn'>" +
          "<i class='fab fa-linkedin fa-2x'></i>" +
        "</a>" +
      "</span>" +*/
     
      "<div class='technicalIcons' id='technicalIcons" + projectsInfo[i]['id'] + "'>" +        
      "</div>" +
      "</footer>";

    let modalWindow = 
      "<header>" +
        "<div class='x-mark'>" +
          "<a href='#'>" + 
          "<div class='container-mark'>" +
            "<div class='left'></div>" +
            "<div class='right'></div>" +
          "</div>" +
          "</a>" +
        "</div>" +
        "<h1 class='strokeM'>" + projectsInfo[i].title + "</h1>" +
      "</header>" +
      "<section>" +
        "<div class='jcarousel-wrapper'>" +
          "<div class='jcarousel'>" +
              "<ul>" +
                  "<li><img src='img/" + projectsInfo[i].img[0] + "'  alt=''></li>" +
                  "<li><img src='img/" + projectsInfo[i].img[1] + "'  alt=''></li>" +
                  "<li><img src='img/" + projectsInfo[i].img[2] + "'  alt=''></li>" +
              "</ul>" +
          "</div>" +
          "<a href='#' class='jcarousel-control-prev'>&lsaquo;</a>" +
          "<a href='#' class='jcarousel-control-next'>&rsaquo;</a>" +
        "</div>" +
        "<div class='rowM'>" + 
          "<p class='labelM'>" + projectsInfo[i].category + "</p>" +
          "<a href='" + projectsInfo[i].github + "' target='_blank'>" + 
            "<span class='gitIcon'><i class='fab fa-github-square fa-2x'></i></span>" +
          "</a>" +
        "</div>" +
      "</section>" +
        "<p class='descriptionM'>" + projectsInfo[i].description + "</p>" +
      "<footer>" + 
        "<a href='" + projectsInfo[i].deploy + "' class='btnDeploy' target='_blank'>Deploy</a>" +
      "</footer>";

      
    
     //Generate dinamic variable 'card_1', 'card_2' as an object instance....
    eval("var card_" + projectsInfo[i]['id'] + " = new Card(tpmlHeader, tpmlBody, tpmlFooter, i, modalWindow);");
    cards.push(eval("card_" + i));
    //card_X.render()
    eval("card_" + projectsInfo[i]['id'] + ".render();");

    //card_X.addIconTechnologies()
    eval("card_" + projectsInfo[i]['id'] + ".addIconTechnologies(i);");

    //Hidde the Github bttn if there isn't github link.
    if (projectsInfo[i].github == "") {
      eval("card_" + projectsInfo[i].id + ".hiddeGithubBttn();");
    }
    //Hidde the Deploy bttn if there isn't deploy link.
    if (projectsInfo[i].deploy == "") {
      eval("card_" + projectsInfo[i].id + ".hiddeDeployBttn();");
    }
  } //close for
  init(projectsInfo.length, cards);
}; //close request.onload

var init = function(projectsN, cards){
  var carousel = document.getElementById('carousel'),
  navButtons   = document.querySelectorAll('figure'),
  panelCount   = projectsN,//carousel.children.length,
  theta        = 0,
  panelWitdh   = 222,
  r            = (panelWitdh/2)/Math.tan(((360/2)/panelCount)*Math.PI/180);

  var onNavButtonClick = function (event){
    var increment = parseInt(event.currentTarget.getAttribute('data-increment'));
    theta += ( 360 / panelCount ) * increment; 
    carousel.style.transform = 'translateZ(-' + r + 'px) rotateY(' + theta + 'deg)';
    console.log("r: ", r);
    console.log("theta: ", theta);
    console.log("panelCount: ", panelCount);
  };

  //Triggers
  for (var i=0; i < projectsN; i++) {
    navButtons[i].addEventListener( 'click', onNavButtonClick, false);
  }

  $("#carousel").on('click','figure.card', function() {
    var id = parseInt($(this)[0].id);
    cards[id].showModal();
  });


}; //close init


var jCarouselJS = function () {
  var jcarousel = $('.jcarousel');

  jcarousel
    .on('jcarousel:reload jcarousel:create', function () {
      var carousel = $(this),
      width = carousel.innerWidth();
      console.log("width... ", width);
      if (width >= 600) {
          width = width / 2;
      } else if (width >= 380) {
          width = width / 1;
      } else {
          width = 380;
      }
      console.log("width... after ", width);
      carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
    })
    .jcarousel({
      wrap: 'circular'
    });

  $('.jcarousel-control-prev')
    .jcarouselControl({
        target: '-=1'
    });

  $('.jcarousel-control-next')
    .jcarouselControl({
        target: '+=1'
    });
};