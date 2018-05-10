 var init = function() {
      var carousel = document.getElementById('carousel'),
          navButtons = document.querySelectorAll('#navigation span'),
          panelCount =  3,//carousel.children.length,
          theta = 0,
          panelWitdh = 210,
          r = (panelWitdh/2)/Math.tan(((360/2)/panelCount)*Math.PI/180);

      var onNavButtonClick = function (event){
            var increment = parseInt(event.currentTarget.getAttribute('data-increment'));
            theta += ( 360 / panelCount ) * increment; 
            carousel.style.transform = 'translateZ(-' + r + 'px) rotateY(' + theta + 'deg)';
            console.log("r: ", r)
			console.log("theta: ", theta)
			console.log("panelCount: ", panelCount)
          };

      //Triggers
      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }
    };

init();

var requestURL = 'json/projects.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var projectsInfo;

request.onload = function() {
  projectsInfo = request.response;
  console.log('projectsInfo ', projectsInfo);

  class Card {
    constructor (header, body, footer, modalNumber){
      this.header = header;
      this.body = body;
      this.footer = footer;
      this.modal = 'modal' + modalNumber;
    }

    render() {
      $('#carousel').append("<figure class='card'><a href='#" + this.modal + "'>" + this.header + this.body + this.footer + "</a></figure>");
    }

    addIconTechnologies (projectN) {
      for (let n = projectsInfo[projectN]['technologies'].length - 1; n >= 0; n--) {
              let tpmlIcons = projectsInfo[projectN]['technologies'][n]['name'];
              console.log(tpmlIcons);

              $('#technicalIcons' + projectsInfo[projectN]['id'])
              .append("<img title='" + projectsInfo[projectN]['technologies'][n]['name'] + 
                        "' src='" + projectsInfo[projectN]['technologies'][n]['icon'] + "'>");     
      }
    }
  }

  for (let i = 0; i <= projectsInfo.length; i++) {
  
    let tpmlHeader = "<header>" +
            "<div>" +
              // "<a href=" + "'" + projectsInfo[i]['github'] + "' " + "target='_blank'>" +
              //         "<span class='gitIcon'>" +
              //           "<i class='fab fa-github-square fa-2x'></i>" +
              //         "</span>" +
              //       "</a>" +
              //         "<a href=" + "'" + projectsInfo[i]['deploy'] + "' " + "target='_blank'>" +
                      "<span class='uptitle'>" +
                        "project name:" + 
                      "</span>" +
                      "<span class='title'>" +
                        "<strong class='stroke'>" + projectsInfo[i]['title'] + "</strong>" +
                      "</span>" +
            "</div>" +
          "</header>";

    let tpmlBody = "<article>" +
              projectsInfo[i]['description'] +
                  "<span class='endArticle'>" +
                    "<i class='fas fa-eye'></i>" +
                  "</span>" +
            "</article>";
              // "</a>"


    let tpmlFooter = "<footer>" +
                /*"<span class='linkedinIcon'>" +
                  "<a href='https://uk.linkedin.com/in/pacotiger' target='_blank' title='LinkedIn'>" +
                    "<i class='fab fa-linkedin fa-2x'></i>" +
                  "</a>" +
                "</span>" +*/
               
                "<span class='technicalIcons' id='technicalIcons" + projectsInfo[i]['id'] + "'>" +        
                "</span>" +
          "</footer>";
          
    //Generate dinamic variable 'card_1', 'card_2' as an object instance....
    eval("var card_" + projectsInfo[i]['id'] + " = new Card(tpmlHeader, tpmlBody, tpmlFooter, i);");

    //card_X.render()
    eval("card_" + projectsInfo[i]['id'] + ".render();");

    //card_X.addIconTechnologies()
    eval("card_" + projectsInfo[i]['id'] + ".addIconTechnologies(i);");

  } 
}