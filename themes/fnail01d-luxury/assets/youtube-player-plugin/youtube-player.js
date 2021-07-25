/* Light YouTube Embeds by @labnol */
/* Web: http://labnol.org/?p=27941 */
/* Web: https://noembed.com */
/* Edited T8d5y2017 by ThamLV*/

$(document).ready(function(){

    function loadThumbYoutube ( _obj ) {

        var htmlThumb = `
        <img src="https://i.ytimg.com/vi/`+$(_obj).attr('data-id')+`/hqdefault.jpg" alt="hqdefault.jpg">
        <div class="play"></div>
        `;

        $(_obj).html(htmlThumb);
    }

    function loadThumbWithTitleYoutube ( _obj ) {

        // load thumb
       loadThumbYoutube ( _obj );

        // load title
        $.getJSON('https://noembed.com/embed', {format: 'json', url: 'https://www.youtube.com/watch?v=' + $(_obj).attr('data-id')}, function (data) {
            if ( data && typeof data.title != "undefined" ) {
                $(_obj).append(`<h3>`+data.title+`</h3>`);
            }
        });

        // data json return
        //  my_embed_function({
        //     "width" : 425,
        //     "author_name" : "schmoyoho",
        //     "author_url" : "http://www.youtube.com/user/schmoyoho",
        //     "version" : "1.0",
        //     "provider_url" : "http://www.youtube.com/",
        //     "provider_name" : "YouTube",
        //     "thumbnail_width" : 480,
        //     "thumbnail_url" : "http://i3.ytimg.com/vi/bDOYN-6gdRE/hqdefault.jpg",
        //     "height" : 344,
        //     "thumbnail_height" : 360,
        //     "html" : "<iframe type='text/html' width='425' height='344' src='http://www.youtube.com/embed/bDOYN-6gdRE' frameborder=0></iframe>",
        //     "url" : "http://www.youtube.com/watch?v=bDOYN-6gdRE",
        //     "type" : "rich",
        //     "title" : "Auto-Tune the News #8: dragons. geese. Michael Vick. (ft. T-Pain)"
        // });
    }

    function loadIframeYoutube ( _obj ) {
        var htmlIframe = `
            <iframe title="Youtube" src="https://www.youtube.com/embed/`+$(_obj).attr('data-id')+`?autoplay=1" frameborder="0" allowfullscreen="1"></iframe>
        `;
        $(_obj).html(htmlIframe);
    }

    // Load Thumb and title
    $('.youtube-player').each(function(){
        
        loadThumbWithTitleYoutube(this); // loadThumbYoutube(this);
    });

    // Add event main
    $('.youtube-player.main').on('click', function(e) {
        e.preventDefault();

        // Load Iframe
        loadIframeYoutube(this);
    });

    // Add event item
    $('.youtube-player.item').on('click', function(e) {
        e.preventDefault();

        // check media screen
        if ( window.matchMedia('(min-width: 768px)').matches ) {
            
            // get main id
            var main_id = $('.youtube-player.main').attr('data-id');

            // Change id main and play
            $('.youtube-player.main').attr('data-id', $(this).attr('data-id'));
            $('.youtube-player.main').trigger('click');

            // change id item and reload thumb and title
            $(this).attr('data-id', main_id);
            loadThumbWithTitleYoutube(this); // loadThumbYoutube(this);

            // Scroll if width from 768px to 991px
            if ( window.matchMedia('(max-width: 991px)').matches ) {

                var scrolltop = $(".youtube-player.main").offset().top;
                $('html, body').animate({
                    scrollTop: scrolltop - 15
                }, 1000);
            }
        } else if ( window.matchMedia('(max-width: 767px)').matches ) {

            // Load Iframe
            loadIframeYoutube(this);
        }
    });
});