// function that decodes ASCII to HTML:
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

$(document).ready(function() {
        // ------------------REDDIT API--------------------------

        $(document).on("click", ".btn", function() {
            event.preventDefault();
            // Example query:
            // https://www.reddit.com/search.json?q=title:computer+wrist+pad+title:review&limit=10&sort=hot
            $("#reddit-results").empty();
            $("#reddit-results").html("<img id='loading-gif' src='assets/images/loading.gif'>")
            var searchQuery = $("#product-input").val().trim().replace(/ /g, "+");
            var limit = 10;
            var queryURL = "https://www.reddit.com/search.json?q=title:" + searchQuery + "+title:review&limit=" + limit + "&sort=hot"

            getFunction();

            function getFunction() {
                $.get(queryURL).done(function(response) {
                    $("#reddit-results").empty();
                    var children = response.data.children;
                    // if(children[i].data.is_self === true)
                    for (var i = 0; i < children.length; i++) {
                        // splices off the comments
                        var formattedHTML = children[i].data.selftext_html ? children[i].data.selftext_html.slice(21, children[i].data.selftext_html.length - 20) : '';
                        // Changes the formatted HTML to a string, because the replace function only works on strings
                        var stringHTML = JSON.stringify(formattedHTML);
                        // Replaces ugly-assci headers to to smaller header tags, also with class tags so we can manipulate with CSS
                        var replaceHTML = stringHTML.replace(/&lt;h1&gt/g, "&lt;h4 class='reddit-headers'&gt").replace(/&lt;\/h1&gt/g, "&lt;/h4&gt").replace(/&lt;h2&gt/g, "&lt;h4 class='reddit-headers'&gt").replace(/&lt;\/h2&gt/g, "&lt;/h4&gt").replace(/&lt;h3&gt/g, "&lt;h4 class='reddit-headers'&gt").replace(/&lt;\/h3&gt/g, "&lt;/h4&gt")
                            //  Runs the decodeHtml function from above on our html with replaced elements
                        var decodedHTML = decodeHtml(JSON.parse(replaceHTML));
                        // console.log(decodedHTML)
                        // Assigns a variable to give each result a unique ID
                        var result = "result" + i;
                        // Appends results (title/link to original thread, and formatted body) to page
                        $("#reddit-results").append(`<div class='reddit-results-div' id='${result}'><h4 class='reddit-result-title'><strong>Original Reddit Thread: <a href='https://www.reddit.com/${children[i].data.permalink}' target='_blank' class='reddit-results-link'>${children[i].data.title}</a></strong></h4><br><div class='reddit-result-body'>${decodedHTML}</div></div><br>`);
                        // ----------------Collapser Function ----------------------
                        $(".reddit-result-body").collapser({

                                // target: 'next',
                                // mode: 'lines',
                                // speed: 'slow',
                                // truncate: 3,
                                // ellipsis: '...',
                                // effect: 'fade',
                                // controlBtn: 'dsfdsf',
                                // showText: 'Show more',
                                // hideText: 'Hide text',
                                // showClass: 'show-class',
                                // hideClass: 'hide-class',
                                // atStart: 'hide',
                                // lockHide: true,
                                // dynamic: true,
                                // changeText: true,
                                // beforeShow: null,
                                // afterShow: null,
                                // beforeHide: null,
                                // afterHide: null
                                mode: 'lines',
                                ellipsis: '...',
                                effect: 'fade',
                                showText: '<strong class="reddit-results-link">Show Entire Thread (Some threads may be very long)</strong>',
                                hideText: '<strong class="reddit-results-link">Hide Thread</strong>',
                                truncate: 3,
                                lockHide: false,
                                dynamic: true,
                                changeText: true,
                            })
                            // -----------------END OF COLLAPSER FUNCTION---------------
                    }
                }).fail(getFunction);
            }
        });
        // -----------------END OF REDDIT API -------------------
    })
    // -----------------END OF DOCUMENT READY ---------------
