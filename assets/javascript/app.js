$(document).ready(function() {
        // -----------------FIREBASE KEY ------------------------
        var config = {
            apiKey: "AIzaSyDBcUj9XDES0jIESlddtCodAWt8pWCfsLA",
            authDomain: "john-57aba.firebaseapp.com",
            databaseURL: "https://john-57aba.firebaseio.com",
            projectId: "john-57aba",
            storageBucket: "john-57aba.appspot.com",
            messagingSenderId: "309633750648"
        };

        firebase.initializeApp(config);
        // -----------------END OF FIREBASE KEY------------------

        // UI modification
        $("#navbarTop").hide();
        $("#searchResultsFirst").hide();
        $("#searchResultsSecond").hide();
        $("#mainBody").hide();
        $("#videos").hide();
        $("#reddit-row").hide();
        $("#youtubes").hide();

        $(document).on('click', "#submit-button2", function() {
            $("#navbarStart").hide();
            $("#navbarTop").show();
            $("#searchResultsFirst").show();
        });

        $(document).on('click', '#searchResultsFirst', function() {
            event.preventDefault();
            $("#searchResultsFirst").hide();
            $("#searchResultsSecond").show();
            $("#mainBody").show();
            $("#videos").show();
        });

        $(document).on('click', '#submit-button1', function() {
            event.preventDefault();
            $("#searchResultsSecond").hide();
            $("#mainBody").hide();
            $("#videos").hide();
            $("#searchResultsFirst").show();
        });
        $(document).on("click", "#productBtn", function() {

            event.preventDefault();
            $("#pictures").show();
            $("#specifications").show();
            $("#reddit-row").hide();
            $("#comments").show();
            $("#youtubes").hide();
        })
        $(document).on("click", "#redditBtn", function() {
            event.preventDefault();
            $("#pictures").hide();
            $("#specifications").hide();
            $("#reddit-row").show();
            $("#comments").hide();
            $("#youtubes").hide();
            $("#productBtn").removeClass("active");
        });
        $(document).on("click", "#youtubeBtn", function() {
            event.preventDefault();
            $("#pictures").hide();
            $("#specifications").hide();
            $("#reddit-row").hide();
            $("#comments").hide();
            $("#youtubes").show();
            $("#productBtn").removeClass("active");
        });
        



    })
    // -----------------END OF DOCUMENT READY ---------------
