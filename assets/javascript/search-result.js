var productQuery;
$(document).ready(function() {

    // calling this json object from data.js
    //console.log(response);

    $(document).on("click", ".search-button", function() {
        event.preventDefault();
        //empty out the product-input
        $("#product-input").empty();
        $("#search-result-2").empty();
        $("#search-result-1").empty();
        //Submit btn click, searches goes to Ajax to search

        var APIKey = "b7zex42y8vhz2wr56d8jwq5y";
        productQuery = $("#product-input").val().trim()
            // .replace(/ /g, "+");
        var sort = "relevance";
        var categoryId;
        console.log("You submitted: " + productQuery);

        $.getJSON("https://api.walmartlabs.com/v1/search?apiKey=b7zex42y8vhz2wr56d8jwq5y&query=" + productQuery + "&responseGroup=full&callback=?",
                function(response) {

                    //check I receive a return
                    // console.log("Calling response:");
                    // console.log(response);

                    for (var i = 0; i < response.items.length; i++) {
                        //need to grab UPC, image, title
                        //searchItem div have Title link,
                        var searchItem = $("<div class='search-item col-lg-3' id='item'>");

                        //create div with Class titleItem, with title,upc, ean, and value attributes,value is used for indexing
                        var title = $("<div class='title-item canClick'>").html("<h4>" + response.items[i].name + "&nbsp;&nbsp;- $" + response.items[i].salePrice + "</h4>");
                        title.attr("title", response.items[i].name);
                        title.attr("itemId", response.items[i].itemId);
                        title.attr("value", i);
                        $('.title-item').css('cursor', 'pointer');

                        //create div with Class imageItem and canClick, with title, upc, ean, and value attributes, value is used for indexing
                        var image = $("<img class='image-item canClick'>").attr("src", response.items[i].largeImage);
                        image.attr("title", response.items[i].name);
                        image.attr("itemId", response.items[i].itemId);
                        image.attr("value", i);
                        $('.image-item').css('cursor', 'pointer');

                        //add image and title into searchItem
                        searchItem.append(image).append(title);

                        searchItem.appendTo("#search-result-1, #search-result-2");
                        $("#search-result-2").children().removeClass("col-lg-3");
                        // $("#search-result-1").append(searchItem);
                        // $("#search-result-2").append(searchItem2);
                    }

                    //when click any of the image or title... 
                    $(document).on("click", ".canClick", function() {

                        //gets value for index when "this" item is clicked
                        var index = $(this).attr("value");
                        console.log("you choose index " + index);

                        $("#top-title").html(response.items[index].name +"&nbsp;&nbsp;- $" +response.items[index].salePrice);
                        // Empty the thumbnails
                        $(".hide-bullets").empty();
                        //empty the images in the result box
                        $(".carousel-inner").empty();

                        //dynamically creates PRIMARY IMAGES - Here
                        //create a new row and adds thumbnail to view
                        var createRow = $("<li class='col-sm-5'>");
                        var thumbnail = $("<a class='thumbnail' id='carousel-selector-0'>");
                        var image1 = $("<img class='imageBox' id='primary-image' style='height:125px'>").attr("src", response.items[index].largeImage);
                       
                       //These RATING STARS WORK
                        //set the ratings
                        $(".ratings").empty();
                         $('.ratings').rating({size:'xs', displayOnly:true, hoverEnabled:false});
                         $('.ratings').rating('update', response.items[index].customerRating);


                        //<img> class imageBox tag inserted to <a> class thumbnail tag
                        thumbnail.append(image1);
                        createRow.append(thumbnail);
                        $(".hide-bullets").prepend(createRow);

                        //Create an active item for the first slide image
                        var activeItem = $("<div class='active item' data-slide-number='0'>");
                        var imageSlide1 = $("<img>").attr("src", response.items[index].largeImage);
                        activeItem.append(imageSlide1);
                        $(".carousel-inner").prepend(activeItem);

                        //dynamically creates SECONDARY IMAGES - Here
                        var addItemNum = 1;
                        for (var i = 0; i < response.items[index].imageEntities.length; i++) {
                            console.log(response.items[index].imageEntities.length);
                            if (response.items[index].imageEntities[i].entityType == "SECONDARY") {
                                //creates thumbnails and append to the boxes 
                                var createRow = $("<li class='col-sm-3'>");
                                var thumbnail = $("<a class='thumbnail' id='carousel-selector-" + addItemNum + "'>");
                                var image = $("<img class='imageBox' id='secondary-image'>").attr("src", response.items[index].imageEntities[i].largeImage);
                                thumbnail.append(image);
                                createRow.append(thumbnail);
                                $(".hide-bullets").append(createRow);

                                //creates slide images and append to the carousel
                                var item = $("<div class='item' data-slide-number='" + addItemNum + "'>");
                                var imageSlide = $("<img>").attr("src", response.items[index].imageEntities[i].largeImage);
                                item.append(imageSlide);
                                $(".carousel-inner").append(item);
                                addItemNum++;
                            }
                        }
                        addItemNum = 1;

                        //first empties and return new description, if not empty object
                        $("#description").empty();
                        if (response.items[index].longDescription == null || response.items[index].longDescription == "") {

                            $("#description").html("Womp Womp..no descriptions here.. :'(");
                        } else {
                            // var formattedHTML = response.items[index].longDescription;
                            // var stringHTML = JSON.stringify(formattedHTML);
                            var decodedHTMLlong = decodeHtml(response.items[index].longDescription);
                            var decodedHTMLshort = decodeHtml(response.items[index].shortDescription);

                            $("#description").append("<br>"+decodedHTMLlong);
                            $("#description").prepend(decodedHTMLshort);
                        }

                        // INSERT REVIEWS
                        var getItemId = $(this).attr("itemId");
                        console.log("itemId is" + getItemId);
                        $.getJSON("https://api.walmartlabs.com/v1/reviews/" + getItemId + "?apiKey=" + APIKey + "&format=json&responseGroup=full&callback=?",
                            function(responseReview) {
                                $("#input-reviews").empty();
                                console.log("I'm here");

                                for (var j = 0; j < responseReview.reviews.length; j++) {
                                    var reviewTitle = responseReview.reviews[j].title;
                                    var reviewTitleDiv = $("<div class='review-title'>");
                                    var submitDate = moment(new Date(responseReview.reviews[j].submissionTime));
                                    reviewTitleDiv.append(reviewTitle);
                                    $("#input-reviews").append("<h4><strong>" + reviewTitle + "</strong></h4>" + "&nbsp;&nbsp;&nbsp; <i>" + moment(submitDate).format("MMM DD,YYYY") + "</i>");

                                    var reviewText = responseReview.reviews[j].reviewText;
                                    var reviewTextDiv = $("<div class='review-text'>");
                                    reviewTextDiv.append("<p>" + reviewText + "</p>");
                                    $("#input-reviews").append(reviewTextDiv);
                                    $("#input-reviews").append("<br>");
                                }



                            });

                    });
                })
            .fail(function() {
                //say something like search is invalid here

                console.log("Submit error")

            });
    });

});

//------------Carousel Scroller - start
$(document).on("click", "[id^=carousel-selector-]", function() {
    $('#myCarousel').carousel('pause');
    //Handles the carousel thumbnails
    var id_selector = $(this).attr("id");
    console.log("clicked a thumnail");
    try {
        var id = /-(\d+)$/.exec(id_selector)[1];
        console.log(id_selector, id);
        $('#myCarousel').carousel(parseInt(id));
    } catch (e) {
        console.log('Regex failed!', e);
    }

    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function(e) {
        var id = $('.item.active').data('slide-number');
        $('#carousel-text').html($('#slide-content-' + id).html());
    });
});
//------------Carousel Scroller - end
