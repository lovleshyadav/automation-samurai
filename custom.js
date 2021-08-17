// This helps avoid conflicts in case we inject
// this script on the same page multiple times
// without reloading.

var injected = injected || (function () {

        // An object that will contain the "methods"
        // we can use from our event script.
        var methods = {};

        methods.changeCompositeBranding = function (p) {

            let languageList = {
                "English":"Sponsored",
                "Hebrew":"ממומן",
                "Spanish":"Patrocinado",
                "French":"Sponsorisé",
                "German":"Gesponsert",
                "Portugese":"Patrocinado",
                "Japanese":"スポンサー",
                "Chinese":"提供",
                "Korean":"추천된",
                "Dutch":"Gesponsord", 
                "Polish":"Sponsorowane",
                "Italian":"Sponsorizzato",
                "Russian":"Спонсируется",
                "Turkish":"Sponsorlu",
                "Thai":"สปอนเซอร์", 
                "Dannish":"annoncørbetalt indhold"
            };

            let mostPopularList = {
                "English":"MOST POPULAR",
                "Hebrew":"הכי פופולארי",
                "Spanish":"MÁS POPULAR",
                "French":"LES PLUS LUS",
                "German":"AM BELIEBTESTEN",
                "Portugese":"MAIS POPULAR",
                "Japanese":"最も人気のある",
                "Chinese":"最受歡迎",
                "Korean":"가장 인기있는",
                "Dutch":"MEEST POPULAIR",
                "Polish":"NAJBARDZIEJ POPULARNY",
                "Italian":"PIÙ POPOLARE",
                "Russian":"САМЫЙ ПОПУЛЯРНЫЙ",
                "Turkish":"EN POPÜLER",
                "Thai":"ที่นิยมมากที่สุด",
                "Dannish":"MEST POPULÆRE"
            };

            let selector = "trc_desktop_disclosure_link trc_attribution_position_after_branding";
            let brandings = document.getElementsByClassName(selector);

            //css
            let cssString = `.organic-thumbs-feed-01-mp div.trc_rbox_outer div.videoCube span.thumbBlock:after {
                content: "${mostPopularList[p.selectedLanguage]}";
            }`;

            let style = document.createElement('style');
            style.type = 'text/css';

            if (style.styleSheet) { // IE
                style.styleSheet.cssText = cssString;
            } else {
                style.appendChild(document.createTextNode(cssString));
            }

            document.getElementsByTagName('head')[0].appendChild(style);
            //css end

            // console.log("content page details : ", brandings);
            for (i=0; i<brandings.length; i++) {
                brandings[i].innerHTML = "<span>"+languageList[p.selectedLanguage]+"</span>";
                // console.log("content page details : ", brandings[i]);
            }

            let mobileSelector = "trc_mobile_disclosure_link trc_attribution_position_after_branding";
            let mobileBrandings = document.getElementsByClassName(mobileSelector);
            // console.log("content page details : ", mobileBrandings);
            for (i=0; i<mobileBrandings.length; i++) {
                mobileBrandings[i].innerHTML = "<span>"+languageList[p.selectedLanguage]+"</span>";
                // console.log("content page details : ", mobileBrandings[i]);
            }

            // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            //     chrome.tabs.insertCSS(tabs[0].id, {code: cssString});
            // });
        }


        function clear() {

        }


// This tells the script to listen for
// messages from our extension.
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

            //console.log("Request is " + request.method);

            if (request.method == "changeCompositeBranding") {
                var params = request.params;
                //console.log(methods.checkSelector(request.params));
                sendResponse(methods.changeCompositeBranding(request.params));
                return (true);
            }

            return true;
        })
    })()
