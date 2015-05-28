$(document).ready(function () {

    //declare all the variables to be used in the script
    var photos = gallery_json.photos;
    var album = gallery_json.album;
    var childrenOfSlider = '';
    var numberOfPhotos = 0;
    var description = '';
    var newImage = '';
    var oldImage = '';
    var output = '';
    var lastId = 0;

    //load galery function: Append all the thumbnail photos to the correspondent div
    var loadGallery = function () {

        $.each(photos, function (i, obj) {

            output += '<a href="' + obj.image +
                '"><img src="' + obj.thumb_url +
                '" alt="' + obj.title +
                '" class="black-white" ' +
                'id="' + obj.id + '"></a>';
        });

        $('.slider-thumbnail').append(output);
    }

    //load page function: Initialize the html document, by populating it with the info provided in the Json file
    var loadPage = function () {

        description = 'Taken at the intel conference in ' +
            photos[0].location + ' on ' +
            photos[0].date;

        $('.title-slider').append(album.name);
        $('.conference-title').append(photos[0].title);
        $('.conference-description').append(description);
        $('.image-slider').append('<img class="img-responsive" src="' +
            photos[0].image + '">');
        $('#' + photos[0].id).removeClass('black-white');
        lastId = 1;
    }


    //execute both functions once the page has loaded all the graphical content
    loadGallery();
    loadPage();


    //load all the children elements inside the below html tag, and store them into a variable
    childrenOfSlider = $('.slider-thumbnail a').children();
    numberOfPhotos = childrenOfSlider.length;

    //bind an "on click" function to allow each thumnbnail photo react to the user's click. 
    //I've delegated the action to the <a></a> element, because they weren't in the original html doc.
    $('.slider-thumbnail').on('click', 'a', function (e) {

        e.preventDefault();

        var id = $(this).children().attr('id');

        oldImage = $('.image-slider img');
        newImage = '';

        for (var i = 0; i < numberOfPhotos; i++) {

            if ($(childrenOfSlider[i]).attr('id') == id) {

                newImage = $('<img class="img-responsive text-center" src="' + photos[i].image + '">');
                description = 'Taken at the intel conference in ' +
                    photos[i].location + ' on ' +
                    photos[i].date;

                $('#slider-description-title').empty().append(photos[i].title);
                $('#slider-description-content').empty().append(description);
                $('#' + lastId).addClass('black-white');
                $(this).children().removeClass('black-white');

                newImage.hide();
                $('#slider-image').append(newImage);
                oldImage.remove();
                newImage.show();
                lastId = id;
            }
        }
    });

    //bind an "on click" function to allow the right arrow icon react to the user's click
    $('#right-icon').on('click', function () {

        if (lastId < numberOfPhotos) {

            console.log(lastId);
            oldImage = $('#slider-image img');
            newImage = $('<img class="img-responsive text-center" src="' + photos[lastId].image + '">');
            description = 'Taken at the intel conference in ' +
                photos[lastId].location + ' on ' +
                photos[lastId].date;

            $('#slider-description-title').empty().append(photos[lastId].title);
            $('#slider-description-content').empty().append(description);
            $('#' + (parseInt(lastId) + 1)).removeClass('black-white');
            $('#' + lastId).addClass('black-white');

            newImage.hide();
            $('#slider-image').append(newImage);
            oldImage.remove();
            newImage.show();
            lastId++;
        }
    });

    //bind an "on click" function to allow the left arrow icon react to the user's click
    $('#left-icon').on('click', function () {

        if (lastId > 1) {

            console.log(lastId);
            oldImage = $('#slider-image img');
            newImage = $('<img class="img-responsive text-center" src="' + photos[parseInt(lastId) - 2].image + '">');
            description = 'Taken at the intel conference in ' +
                photos[parseInt(lastId) - 2].location + ' on ' +
                photos[parseInt(lastId) - 2].date;

            $('#slider-description-title').empty().append(photos[parseInt(lastId) - 2].title);
            $('#slider-description-content').empty().append(description);
            $('#' + (parseInt(lastId) - 1)).removeClass('black-white');
            $('#' + lastId).addClass('black-white');

            newImage.hide();
            $('#slider-image').append(newImage);
            oldImage.remove();
            newImage.show();
            lastId--;
        }
    }); * /
});