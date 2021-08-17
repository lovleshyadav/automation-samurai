document.addEventListener('DOMContentLoaded', function () {


    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log(tabs);
        // chrome.tabs.insertCSS(tabs[0].id, {file: "preview.css"});
        chrome.tabs.executeScript(tabs[0].id, {file: 'jquery-2.0.2.min.js'}, function () {
            // console.log('loaded jquery')
        });
        chrome.tabs.executeScript(tabs[0].id, {file: 'custom.js'}, function () {
            // console.log('loaded custom.js')
        });
    });

    function updateLabel() {
        let blockLoader = chrome.extension.getBackgroundPage().blockLoader;
        document.getElementById('btnBlockPublisher').value = blockLoader ? "Unblock Loader" : "Block Loader";
        //console.log("Value stored in pubName", chrome.extension.getBackgroundPage().pubName);
        document.getElementById('blockPublisher').value = chrome.extension.getBackgroundPage().pubName;

        //Updating style labels
        let backgroundVariables = chrome.extension.getBackgroundPage();
        document.getElementById('fontFamily').value = backgroundVariables.cssStylings.fontFamily?backgroundVariables.cssStylings.fontFamily:"";
        document.getElementById('titleFontWeight').value = backgroundVariables.cssStylings.titleFontWeight?backgroundVariables.cssStylings.titleFontWeight:"";
        document.getElementById('titleFontColor').value = backgroundVariables.cssStylings.titleFontColor?backgroundVariables.cssStylings.titleFontColor:"";
        document.getElementById('descFontWeight').value = backgroundVariables.cssStylings.descFontWeight?backgroundVariables.cssStylings.descFontWeight:"";
        document.getElementById('descFontColor').value = backgroundVariables.cssStylings.descFontColor?backgroundVariables.cssStylings.descFontColor:"";
        document.getElementById('brandingFontWeight').value = backgroundVariables.cssStylings.brandingFontWeight?backgroundVariables.cssStylings.brandingFontWeight:"";
        document.getElementById('brandingFontColor').value = backgroundVariables.cssStylings.brandingFontColor?backgroundVariables.cssStylings.brandingFontColor:"";
        document.getElementById('additionalCssStyles').value = backgroundVariables.cssStylings.additionalCssStyles?backgroundVariables.cssStylings.additionalCssStyles:"";
    }

    $("#error").hide();
    updateLabel();
    
    $("#btnBlockPublisher").click(function (e) {
            var background = chrome.extension.getBackgroundPage();
            let publisherName = document.getElementById('blockPublisher').value;
            //Updating blocking flag
            background.blockLoader = !background.blockLoader;

            //Updating blocked url
            background.pubName = publisherName;

            chrome.runtime.sendMessage({method:"updateBlockerList",params: {publisherName: publisherName}},function(response){
              //here response will be the word you want
              console.log(response);
            });

            updateLabel();
        }
    )

    $("#updateLanguage").click(function (e) {
        e.preventDefault();
        let proceed = true;

        let languageDropdown = document.getElementById("sponsoredLanguage");
        let languageSelected = languageDropdown.value;

        // if (languageSelected !== "English") {
        $("#console").html("sending");
        //chrome.extension.sendMessage(

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

            chrome.tabs.sendMessage(tabs[0].id, {
                method: 'changeCompositeBranding',
                params: {selectedLanguage: languageSelected}
            })
            // chrome.tabs.insertCSS(tabs[0].id, {code: cssString});
        });
        // }   
    })

    $("#btnUpdateStyles").click(function (e) {
            e.preventDefault();
            let proceed = true;

            $("#console, #error").html("").hide();


            let fontFamily = $("#fontFamily").val().trim();
            let titleFontWeight = $("#titleFontWeight").val().trim();
            let titleFontColor = $("#titleFontColor").val().trim();
            let descFontWeight = $("#descFontWeight").val().trim();
            let descFontColor = $("#descFontColor").val().trim();
            let brandingFontWeight = $("#brandingFontWeight").val().trim();
            let brandingFontColor = $("#brandingFontColor").val().trim();
            let additionalCssStyles = $("#additionalCssStyles").val().trim();


            fontFamily = fontFamily.length == 0?"Arial, Helvetica":fontFamily;
            titleFontWeight = titleFontWeight.length == 0?"bold":titleFontWeight;
            titleFontColor = titleFontColor.length == 0?"#000000":titleFontColor;
            descFontWeight = descFontWeight.length == 0?"normal":descFontWeight;
            descFontColor = descFontColor.length == 0?"#222222":descFontColor;
            brandingFontWeight = brandingFontWeight.length == 0?"bold":brandingFontWeight;
            brandingFontColor = brandingFontColor.length == 0?"#999999":brandingFontColor;

            //${widget.publisher}
            let cssString = `div.videoCube span.video-label-box span.video-label.video-title.trc_ellipsis {
              font-family: ${fontFamily} !important;
              color: ${titleFontColor} !important;
              font-weight: ${titleFontWeight} !important;
            }

            .videoCube span.video-label-box span.branding {
              text-decoration: none;
              color: ${brandingFontColor} !important;
              font-weight: ${brandingFontWeight} !important;
            }

            div.videoCube span.video-label-box span.video-label.video-description {
              font-weight: ${descFontWeight} !important;
              color: ${descFontColor} !important;
            }

            .videoCube span.video-label-box span.branding.composite-branding {
              font-family: ${fontFamily} !important;
              color: ${brandingFontColor} !important;
              font-weight: ${brandingFontWeight} !important;
              text-decoration: none;
            }

            ${additionalCssStyles}`;

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.insertCSS(tabs[0].id, {code: cssString});
            });

            console.log("This css is injected : ", cssString);

            // Update CSS properties in background
            let backgroundVariables = chrome.extension.getBackgroundPage();
            backgroundVariables.cssStylings.fontFamily = fontFamily;
            backgroundVariables.cssStylings.titleFontWeight = titleFontWeight;
            backgroundVariables.cssStylings.titleFontColor = titleFontColor;
            backgroundVariables.cssStylings.descFontWeight = descFontWeight;
            backgroundVariables.cssStylings.descFontColor = descFontColor;
            backgroundVariables.cssStylings.brandingFontWeight = brandingFontWeight;
            backgroundVariables.cssStylings.brandingFontColor = brandingFontColor;
            backgroundVariables.cssStylings.additionalCssStyles = additionalCssStyles;
        }
    )
})
;
