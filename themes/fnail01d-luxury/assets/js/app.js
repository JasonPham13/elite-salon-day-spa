(function($) {
    'use strict';

    /**
    * Set date: Init date time picker for booking
    * Note: place here for deny error when load booking email form in first
    */
    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    }
    var today = new Date(currDateT);
    var future = new Date(currDateT);

    if(beforeTime == undefined || beforeTime == '' || beforeTime<0){
        beforeTime = 0;
    }
    var fourHoursLater =new Date().addHours(beforeTime);

    var set_date = parseInt(beforeDay) > 0 ? new Date(future.setDate(today.getDate()+beforeDay)) :  fourHoursLater;
        set_date = moment(set_date).format(dateFormatBooking);
        set_date = moment(set_date, dateFormatBooking).toDate();

    $('#datetimepicker_v1, .booking_date').datetimepicker({
        format: dateFormatBooking,
        minDate: set_date,
    });
    // End set date
    
    /*-------------------------------------------
      01. jQuery MeanMenu
    --------------------------------------------- */

    $('.mobile-menu nav').meanmenu({
        meanMenuContainer: '.menu_mobile_v1',
        meanScreenWidth: "767",
        meanRevealPosition: "right",
    });
    function cartTopBoxConfig() {
        var cartOpner = $('.shopping-cart.cart-top-box-opener');
        var cartCloser = $('.cart-top-box-closer');
        var cartWrap = $('.cart-top-box');
        if (cartWrap.length) {
            cartOpner.on('click', function() {
                cartWrap.css({
                    'right': '0px'
                });
                return false;
            });
            cartCloser.on('click', function() {
                cartWrap.css({
                    'right': '-500px'
                });
                return false;
            });
        };
    }
    /*-------------------------------------------
      02. wow js active
    --------------------------------------------- */
    new WOW().init();
    /*-------------------------------------------
  03. Sticky Header
--------------------------------------------- */
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $("#sticky-header-with-topbar").removeClass("scroll-header");
        } else {
            $("#sticky-header-with-topbar").addClass("scroll-header");
        }
    });
    /*--------------------------------
  04. Slider Area
-----------------------------------*/
    $('.slider-activation').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: true,
        fade: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });
    /*-------------------------------------------
      05. Portfolio  Masonry (width)
    --------------------------------------------- */
    $('.our-portfolio-page').imagesLoaded(function() {
        // filter items on button click
        $('#our-filters').on('click', 'li', function() {
            var filterValue = $(this).attr('data-filter');
            $containerpage.isotope({ filter: filterValue });
        });
        // change is-checked class on buttons
        $('#our-filters li').on('click', function() {
            $('#our-filters li').removeClass('is-checked');
            $(this).addClass('is-checked');
            var selector = $(this).attr('data-filter');
            $containerpage.isotope({ filter: selector });
            return false;
        });
        var $containerpage = $('.our-portfolio-page');
        $containerpage.isotope({
            itemSelector: '.pro-item',
            filter: '*',
            transitionDuration: '0.7s',
            masonry: {
                columnWidth: '.pro-item'
            }
        });
    });
    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        verticalOffset: 0
    });

    $('div.tt-lightbox').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: true,
        gallery: { enabled: true, },
    });

    $(window).load(function() {
        $('.portfolio-grid').magnificPopup({
            delegate: 'a.tt-lightbox',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            closeOnContentClick: true,
            closeBtnInside: true,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
        });
        /* ======= shuffle js ======= */
        var check_grid = $('#portfolio-grid').attr("check");

        if ($('#portfolio-grid').length > 0 && typeof(check_grid) != "undefined") {
            /* initialize shuffle plugin */
            var $grid = $('#portfolio-grid');

            $grid.shuffle({
                itemSelector: '.portfolio-item' // the selector for the items in the grid
            });

            /* reshuffle when user clicks a filter item */
            $('#filter li').on('click', function(e) {
                e.preventDefault();

                // set active class
                $('#filter li').removeClass('active');
                $(this).addClass('active');

                // get group name from clicked item
                var groupName = $(this).attr('data-group');

                // reshuffle grid
                $grid.shuffle('shuffle', groupName);
            });

            // trigger click with event select change
            $('select[name="filter_select"]').on('change', function(e){
                $('#filter li[data-group="'+$(this).val()+'"]').trigger('click');
            });
        }

    });
    /*-------------------------------------------
      06. UI Tab
    --------------------------------------------- */
    $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
    $('[data-toggle="tooltip"]').tooltip();
    
    // SCROLL BUTTON SERVICE PAGE
    $(document).ready(function(){
        $.fn.is_on_screen = function(){
            var win = $(window);
            var viewport = {
                top : win.scrollTop(),
                left : win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();
            var bounds = this.offset();
            if ( typeof bounds == 'undefined' )
            {
                return false;
            }
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();
            //
            if ( viewport.top >=  bounds.top) {
                var t =true;
                $('.btn_service_book').addClass('scroll_btn');
                $('.btn_service_book').css('right',viewport.right-bounds.right);
            }else{
                var t= false;

            }
            return t;
        };
        $(window).scroll(function(){
            if($('.btn_service_defale').is_on_screen()){

            }else{
                $('.btn_service_book').removeClass('scroll_btn');
                $('.btn_service_book').removeAttr('style');
            }


        });
    });
    // END SCROLL BUTTON SERVICE PAGE
    /*-------------------------------------------
       07. button add services
     --------------------------------------------- */
    $(document).ready(function() {
        // The maximum number of options
        var MAX_OPTIONS = 5;

        // $('#surveyForm')

        // // Add button click handler
        // .on('click', '.addButton', function() {
        //     var $template = $('#optionTemplate'),
        //         $clone = $template
        //         .clone()
        //         .removeClass('hide')
        //         .removeAttr('id')
        //         .insertBefore($template.html()),
        //         $option = $clone.find('[name="option[]"]');
        // })

        // // Remove button click handler
        // .on('click', '.removeButton', function() {
        //     var $row = $(this).parents('.item-booking'),
        //         $option = $row.find('[name="option[]"]');

        //     // Remove element containing the option
        //     $row.remove();
        // })

        // // Called after adding new field
        // .on('added.field.fv', function(e, data) {
        //     // data.field   --> The field name
        //     // data.element --> The new field element
        //     // data.options --> The new field options

        //     if (data.field === 'option[]') {
        //         if ($('#surveyForm').find(':visible[name="option[]"]').length >= MAX_OPTIONS) {
        //             $('#surveyForm').find('.addButton').attr('disabled', 'disabled');
        //         }
        //     }
        // })

        // // Called after removing the field
        // .on('removed.field.fv', function(e, data) {
        //     if (data.field === 'option[]') {
        //         if ($('#surveyForm').find(':visible[name="option[]"]').length < MAX_OPTIONS) {
        //             $('#surveyForm').find('.addButton').removeAttr('disabled');
        //         }
        //     }
        // });
    });

    /*-------------------------------------------
       8. Modal login form
     --------------------------------------------- */
    $('.open_popup_login').magnificPopup({
        type: 'inline',
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    /*-------------------------------------
      Carousel slider initiation
      -------------------------------------*/
    $('.gym-carousel').each(function() {
        var carousel = $(this),
            loop = carousel.data('loop'),
            items = carousel.data('items'),
            margin = carousel.data('margin'),
            stagePadding = carousel.data('stage-padding'),
            autoplay = carousel.data('autoplay'),
            autoplayTimeout = carousel.data('autoplay-timeout'),
            smartSpeed = carousel.data('smart-speed'),
            dots = carousel.data('dots'),
            nav = carousel.data('nav'),
            navSpeed = carousel.data('nav-speed'),
            rXsmall = carousel.data('r-x-small'),
            rXsmallNav = carousel.data('r-x-small-nav'),
            rXsmallDots = carousel.data('r-x-small-dots'),
            rXmedium = carousel.data('r-x-medium'),
            rXmediumNav = carousel.data('r-x-medium-nav'),
            rXmediumDots = carousel.data('r-x-medium-dots'),
            rSmall = carousel.data('r-small'),
            rSmallNav = carousel.data('r-small-nav'),
            rSmallDots = carousel.data('r-small-dots'),
            rMedium = carousel.data('r-medium'),
            rMediumNav = carousel.data('r-medium-nav'),
            rMediumDots = carousel.data('r-medium-dots'),
            rLarge = carousel.data('r-large'),
            rLargeNav = carousel.data('r-large-nav'),
            rLargeDots = carousel.data('r-large-dots'),
            center = carousel.data('center');

        carousel.owlCarousel({
            loop: (loop ? true : false),
            items: (items ? items : 4),
            lazyLoad: true,
            margin: (margin ? margin : 0),
            autoplay: (autoplay ? true : false),
            autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
            smartSpeed: (smartSpeed ? smartSpeed : 250),
            dots: (dots ? true : false),
            nav: (nav ? true : false),
            navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
            navSpeed: (navSpeed ? true : false),
            center: (center ? true : false),
            responsiveClass: true,
            responsive: {
                0: {
                    items: (rXsmall ? rXsmall : 1),
                    nav: (rXsmallNav ? true : false),
                    dots: (rXsmallDots ? true : false)
                },
                480: {
                    items: (rXmedium ? rXmedium : 2),
                    nav: (rXmediumNav ? true : false),
                    dots: (rXmediumDots ? true : false)
                },
                768: {
                    items: (rSmall ? rSmall : 3),
                    nav: (rSmallNav ? true : false),
                    dots: (rSmallDots ? true : false)
                },
                992: {
                    items: (rMedium ? rMedium : 5),
                    nav: (rMediumNav ? true : false),
                    dots: (rMediumDots ? true : false)
                },
                1199: {
                    items: (rLarge ? rLarge : 6),
                    nav: (rLargeNav ? true : false),
                    dots: (rLargeDots ? true : false)
                }
            }
        });

    });

    $(".databooktime").on("click",".popup_login", function(){
        $.magnificPopup.open({
            type: 'inline',
            midClick: true,
            items: {
                  src: '#popup_login'
                },
        });
        return false;
    })

    $("#send_contact").validate({
        submit: {
            settings: {
                button: ".btn_contact",
                inputContainer: '.form-group',
                errorListClass: 'form-tooltip-error',

            }
        }
    });

    $("#send_booking").validate({
        submit: {
            settings: {
                button: ".btn_booking",
                inputContainer: '.input-box',
                errorListClass: 'form-tooltip-error',

            }
        }
    });

    $("#send_newsletter").validate({
        submit: {
            settings: {
                button: ".btn_send_newsletter",
                inputContainer: '.form-group',
                errorListClass: 'form-tooltip-error',

            },
            callback: {
                onSubmit: function (node, formdata) 
                {
                    var url_send = $(node).attr("action");
                    var email = $("input[name='newsletter_email']").val();
                    var token = $("input[name='token']").val();
                    // console.log(url_send);
                    $.ajax({
                        type: "post",
                        url: url_send,
                        data: {newsletter_email: email, token: token},
                        success: function(html)
                        {
                            var obj = JSON.parse(html);
                            call_notify("Notification", obj.message, obj.status);
                            $("input[name='newsletter_email']").val("");

                            // An form
                            if(obj.status == "success")
                            {
                                $(".newsletter_v1_inner").html('<h2 class="newsletter_tile" style="text-align:center">Thanks for subscribing!</h2>');
                            }
                        }
                    });
                }// End on before submit
            }
        }
    });

    $("#send_newsletter_single").validate({
        submit: {
            settings: {
                button: ".btn_send_newsletter_single",
                inputContainer: '.form-group',
                errorListClass: 'form-tooltip-error',

            },
            callback: {
                onSubmit: function (node, formdata) 
                {
                    var url_send = $(node).attr("action");
                    var email = $("input[name='newsletter_email']").val();
                    var token = $("input[name='token']").val();
                    // console.log(url_send);
                    $.ajax({
                        type: "post",
                        url: url_send,
                        data: {newsletter_email: email, token: token},
                        success: function(html)
                        {
                            var obj = JSON.parse(html);
                            call_notify("Notification", obj.message, obj.status);
                            $("input[name='newsletter_email']").val("");

                            // An form
                            if(obj.status == "success")
                            {
                                $(".newsletter_single_inner").html('<h2 class="newsletter_tile" style="text-align:center">Thanks for subscribing!</h2>');
                            }
                        }
                    });
                }// End on before submit
            }
        }
    });

    // SERVICE PAGE
    $("ul.listcatser li").mouseover(function(){
        $("ul.listcatser li.ui-state-default.ui-corner-left").removeClass("ui-state-active");
        $("ul.listcatser li.ui-tabs-active").addClass("ui-state-active");
        $(this).addClass("ui-state-active");
    });

    $("ul.listcatser li").mouseout(function(){
        $("ul.listcatser li.ui-state-default.ui-corner-left").removeClass("ui-state-active");
        $("ul.listcatser li.ui-tabs-active").addClass("ui-state-active");
    });

    // Auto select
    $("select.auto_select").each(function(){
      var val_default = $(this).attr("defaultvalue");
      $(this).find("option[value='"+val_default+"']").prop("selected",true);
    });

    var lid = $('input[name="lid"]').val();
        lid = $('ul.listcatser li[lid="'+lid+'"] a');
        if ( lid.length == 0 )
        {
            lid = $("ul.listcatser li:first a");
        }
        lid.trigger("click");
    // END SERVICE PAGE

    // BOOKING PAGE
    $("#surveyForm").on("change",".list_service", function(){
        var service_id = $(this).val();
        var list_staff = $(this).find("option:selected").attr("staff");
        if(service_id)
        {
            $(this).css("border-color","#ccc");
            $(this).parent().find('.form-tooltip-error').remove();
        }else
        {
            $(this).css("border-color","red");
            $(this).parent().append('<div class="form-tooltip-error" data-error-list=""><ul><li>'+$(this).data('validation-message')+'</li></ul></div>');
        }
        var obj = JSON.parse(list_staff);
        var option = '<option value="">Service Provider</option>';
        for(var x in obj)
        {
            option += `<option value="`+obj[x].id+`" urlimg="`+obj[x].image+`">`+obj[x].name+`</option>`;
        }

        $(this).parents(".item-booking").find(".list_staff").html(option);

        // Save form
        saveForm();

    });
    // END BOOKING PAGE

    // BTN SEARCH BOOKING
    $(".btn_action").click(function(){
        
        var num = $(".list_service").length;
        var info_staff = [];
        var info_staff2 = [];
        var temp = {};
        var i = 0;
        var check = true;
        $(".list_service").each(function(){
            var checkval = $(this).val();
            if(checkval) 
            {
                $(this).css("border-color","#ccc");
                $(this).parent().find('.form-tooltip-error').remove();
            }
            else
            {
                check = false; 
                $(this).css("border-color","red");
                $(this).parent().append('<div class="form-tooltip-error" data-error-list=""><ul><li>'+$(this).data('validation-message')+'</li></ul></div>');
            }
            temp.price = $('option:selected', this).attr('price');
            temp.service = $('option:selected', this).text();
            info_staff.push(temp);
            temp = {};
            i++;
        });
        
        var j = 0;
        $(".list_staff").each(function(){
            var checkval = $(this).val();
            temp.image = $('option:selected', this).attr('urlimg');
            temp.name = checkval ? $('option:selected', this).text() : "Any person";
            info_staff2.push(temp);
            temp = {};
            j++;
        });

        if(check == true)
        {   
            $(".box_detail_info").show();
            $("#box_person").html("Loading ...");
            var html_person = "";
            var j = 0;
            for(var x in info_staff)
            {
                var image = typeof(info_staff2[x].image) === "undefined" ? "/public/library/global/no-photo.jpg" : info_staff2[x].image;
                html_person += `
                <div class="staff_service_v1">
                    <div class="info_staff">
                        <a href="#" title="staff avatar">
                            <img src="`+image+`" alt="`+info_staff2[x].name+`">
                        </a>
                    </div>
                    <div class="details_staff">
                        <h2>`+info_staff2[x].name+`</h2>
                        <p>`+info_staff[x].service+`</p>
                        <p>Price: `+info_staff[x].price+`</p>
                    </div>
                </div>`;
            }

            $("#box_person").html(html_person);

            var typehtml = $("#surveyForm .choose_date").attr("typehtml");
            var date_choose = $("#surveyForm .choose_date").val();
            pushHtmlTime(date_choose, typehtml);

            var scroll = $("#book-info").offset().top;
            $('body').animate({ scrollTop:  scroll}, 600,'swing');//.scrollTop( $("#book-info").offset().top );
        }else
        {
            return false;
        }
        
    });
    // END BTN SEARCH BOOKING

    // CHOOSE DATE
    $("#surveyForm").on("dp.change",".choose_date", function(){
        
        var typehtml = $(this).attr("typehtml");
        var date_choose = $(this).val();
        // set Html date
        setHtmldate(date_choose, typehtml);
        // Save form
        saveForm();

        // change time by date choose
        // changeTimeByDate(date_choose,typehtml);
        pushHtmlTime(date_choose,typehtml);
        //data time
        // setTimeout(function(){ pushHtmlTime(date_choose, typehtml); }, 100);
    });
    // $(".choose_date").trigger("dp.change");

    // CHOOSE DATE
    $("#send_booking").on("dp.change",".choose_date", function(){
        
        var typehtml = $(this).attr("typehtml");
        var date_choose = $(this).val();
        // change time by date choose
        // changeTimeByDate(date_choose, typehtml);
        pushHtmlTime(date_choose,typehtml);
        //data time
        // setTimeout(function(){ pushHtmlTime(date_choose, typehtml); }, 100);
    });
    // END CHOOSE DATE

    // Booking provider
    $("#surveyForm").on("change",".list_staff", function(){
        // Save form
        saveForm();
    });
    // End booking provider

    // CONFIRM BOOKING
    $(document).ready(function(){
        $("body").on("click",".open_booking", function(){

            // Check service
            var check = true;
            $(".list_service").each(function(){
                var checkval = $(this).val();
                if(checkval) 
                { 
                    $(this).css("border-color","#ccc");
                    $(this).parent().find('.form-tooltip-error').remove();
                }
                else
                {
                    check = false;
                    $(this).css("border-color","red");
                    $(this).parent().append('<div class="form-tooltip-error" data-error-list=""><ul><li>'+$(this).data('validation-message')+'</li></ul></div>');
                }
            });
            
            if(check == false)
            {
                return false;
            }

            
            var hours = $(this).attr("valhours");
            $.magnificPopup.open({
                type: 'inline',
                midClick: true,
                items: {
                  src: '#open_booking'
                },
                callbacks: {
                    beforeOpen: function() {
                        if($(window).width() < 700) {
                            this.st.focus = false;
                        } else {
                            this.st.focus = '#name';
                        }
                        $("input[name='booking_hours']").val(hours);


                    }
                }
            });

            return false;
        });

        $(".btn_cancel").click(function(){
            $.magnificPopup.close();
            
        });
    });
    // END CONFIRM BOOKING

    // Mask Input
    var plholder = phoneFormat == "(000) 000-0000" ? "Phone (___) ___-____" : "Phone ____ ___ ____";
    $(".inputPhone").mask(phoneFormat, {placeholder: plholder});
    // End mask input

    // Btn next payment
    $(".btn_cart_order").click(function(){
        var obj = $(this);
        // return false;
        $(".list_price").each(function(){
            var check_val = isNaN(parseFloat($(this).val())) ? 0 : parseFloat($(this).val());
            var max_val = parseFloat($(this).attr("max"));
            var min_val = parseFloat($(this).attr("min"));
            if(check_val > max_val || check_val < min_val)
            {
                $(this).css("border-color", "red");
                obj.removeAttr("href");
                return false;
            }
        })
    });

    //Load get gallery
    $("#filter li").click(function(e){
        var id = $(this).attr("itemprop");
        e.preventDefault();

        // set active class
        $('#filter li').removeClass('active');
        $(this).addClass('active');

        getGalleryByCat(id);
    });

    $("#filter li:first").trigger("click");

    $("select[name='filter_select']").change(function(){
        var id = $(this).val();
        getGalleryByCat(id);
    });

    $("select[name='filter_select']").trigger("change");

    /*Anchor link*/
    $('[href^="#"]').on("click", function (event) {
        let _h = $(this).attr('href');
        let _hsplit = _h.substr(1, _h.length);
        if ( _hsplit != 'open_booking' ) {
            event.preventDefault();
            scrollJumpto(_h, window.matchMedia('(min-width: 992px)').matches ? '.fixed-freeze.desktop' : '.fixed-freeze.mobile');
        }
    });

})(jQuery);

    function getGalleryByCat(cat_id=0, page=0)
    {
        // console.log(cat_id);
        if(cat_id != 0)
        {
        $.ajax({
            type: "post",
            url: "/gallery/getlistbycat",
            beforeSend: function() {

            },
            data: {cat_id: cat_id, page:page},
            success: function(html) {
                // console.log(html);
                var obj = JSON.parse(html);
                // console.log(obj);
                var html_gallery="";
                if(obj.data.length > 0)
                {
                    for(var x in obj.data)
                    {
                        html_gallery += `
                        <li class="portfolio-item gallery-bg-cover">
                            <a itemprop="url" class="tt-lightbox" href="`+obj.data[x].image+`" title="`+obj.data[x].name+`">
                            <div class="portfolio gallery-bg-cover">
                                <div class="tt-overlay"></div>
                                <div class="portfolio-image" style="background: url('`+obj.data[x].imageThumb+`') center center no-repeat; background-size: cover;">
                                    <!--<img itemprop="image" src="`+obj.data[x].imageThumb+`">-->
                                </div>
                                <div class="portfolio-info">
                                    <h3 itemprop="name" class="project-title">`+obj.data[x].name+`</h3>
                                    <span class="links">`+obj.data[x].description+`</span>
                                </div>
                                <ul class="portfolio-details">
                                    <li><span><i class="fa fa-search-plus" aria-hidden="true"></i></span></li>
                                </ul>
                            </div>
                            </a>
                        </li>
                        `;
                    }
                }else
                {
                    html_gallery="Not found gallery item in this category.";
                }
// console.log(html_gallery);
                $(".box_list_gallery").html(html_gallery);
                $(".box_paging").html(obj.paging_ajax);

            }
        });
        }
    }

    function call_notify(title_msg, msg, type_notify)
    {
        type_notify = type_notify ? type_notify : "error";

        var icon = "";
        if(type_notify == "error")
        {
            icon = "fa fa-exclamation-circle";
        }else if(type_notify == "success")
        {
            icon = "fa fa-check-circle";
        }
        new PNotify({
            title: title_msg,
            text: msg,
            type: type_notify,
            icon: icon,
            addclass: 'alert-with-icon'
        });
    }

    function loadService(pg_id=0, _page=0)
    {
        var btn_appointment = "";
        if(typeof(enable_booking) != "undefined" && enable_booking==1)
        {
            btn_appointment = "<a class='hs-btn btn_2 btn-light mb-15 btn_make_appointment' href='/book'>Make an appointment</a>";
        }
        $("ul.listcatser li.ui-state-default.ui-corner-left").removeClass("ui-tabs-active ui-state-active");
        $("ul.listcatser li[lid='"+pg_id+"']").addClass("ui-tabs-active ui-state-active");
        $.ajax({
            type: "post",
            url: "/service/loadservice",
            data: {pg_id: pg_id, limit: num_paging, page: _page, paging: 1},
            beforeSend: function() {
                $(".content_service").html("Loading...");
            },
            success: function(html)
            {
                var obj = JSON.parse(html);
                $(".paging_service").html(obj.paging_ajax);
                var group_des = obj.group_des;

                obj = obj.data;
                if(obj.length > 0)
                {
                    var html_row = `
                    <ul id="all-item">
                        <li class="item-botton-1" style="height:0px;width:100%;border:none;">&nbsp;</li>
                        <li class="item-botton services_item_v1 clearfix text-right" style="border:none;">
                            `+btn_appointment+`
                            <a class="hs-btn btn_2 btn-light mb-15" style="margin-left:15px;" href="tel:` + company_phone + `"><span class="icon"><i class="icon-phone"></i></span><span class="title">Call now</span></a>
                        </li>
                    `;

                    if(group_des)
                    {
                        html_row += `<li class="des_service" style="border-top: none; padding: 10px 0;">
                                    `+group_des+`
                                    </li>`;
                    }

                    var pull_right = "pull-right";
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        pull_right = "";
                    }
                    for(x in obj)
                    {
                        var price_show = obj[x].price_sell ? obj[x].price_sell : "";
                        html_row += `
                        <li class="services_item_v1">
                            <div class="line_item_v1">
                                <div class="just_start_line">
                                    <a href="/" data-toggle="tooltip" data-placement="top" title="`+obj[x].description+`">
                                        <span>`+obj[x].name+`</span>
                                        <span class="price_service_v1 `+pull_right+`">`+price_show+obj[x].product_up+`</span>
                                    </a>
                                    <div class="box_des">
                                        `+obj[x].product_description+`
                                    </div>
                                </div>
                                <!--
                                <div class="just_end_line">
                                    <a class="hs-btn btn_2 btn-light" href="`+obj[x].link_book+`">Book</a>
                                </div>
                                -->
                            </div>
                        </li>`;
                    }

                    html_row += `</ul>`;

                    $(".content_service").html(html_row);
                    $('body, html').animate({
                        scrollTop: $(".box_book_price").offset().top
                    }, 1000);
                }else
                {
                    $(".content_service").html("No services found in this category");
                }
            }
        });
        // Load gallery right
        loadGallery(pg_id);
    }

    function loadGallery(pg_id=0)
    {
        if(pg_id)
        {
            $.ajax({
                type: "post",
                url: "/service/loadgallery",
                data: {id:pg_id},
                beforeSend: function()
                {
                    // $(".box_show_gallery").html("Loading...");
                },
                success: function(html)
                {
                    // console.log(html);
                    var obj = JSON.parse(html);
                    var html_img = '';
                    for(var x in obj)
                    {
                        html_img +=`<li>
                                        <a class="tt-lightbox" href="`+obj[x].image+`" data-group="gallery-2">
                                            <img itemprop="image" alt="" src="`+obj[x].image+`" class="img-responsive">
                                        </a>
                                    </li>`;
                    }

                    $(".box_show_gallery").html(html_img);
                }
            });
        }
    }

    function saveForm()
    {
        // Save form
        var formdata = $("#surveyForm").serialize();
        $.ajax({
            type: "post",
            url: "/book/saveform",
            data: formdata,
            success:function(html)
            {
                // console.log(html);
            }
        });
    }

    function loadForm(formdata)
    {
        var obj = JSON.parse(formdata);
        $("input[name='booking_date']").val(obj.booking_date);
        $("input[name='booking_hours']").val(obj.booking_hours);
        var listservice = typeof(obj.service_staff) != "undefined" ? obj.service_staff : [];
        // console.log(listservice);
        if(listservice.length > 0 )
        {
            for(var x in listservice)
            {
                // split info
                var list = listservice[x].split(',');
                // Trigger add row
                if(x>0)
                {
                    $(".addButton").trigger("click");
                }
                var objservice = $(".list_service:last");
                $(".list_service:last option[value='"+list[0]+"']").attr("selected", "selected");
                objservice.trigger("change");
                $(".list_staff:last option[value='"+list[1]+"']").attr("selected", "selected");
                
            }

            // Trigger action
            $(".btn_action").trigger("click");
        }
    }

    function convertDate(input)
    {
        var list_date = input.split("/");
        var splitDate = posFormat.split(",");
        var new_date = list_date[splitDate[2]]+"/"+list_date[splitDate[1]]+"/"+list_date[splitDate[0]];
        return new_date;
    }

    function pushHtmlTime(input_date,type)
    {
        $.ajax({
            type: "post",
            url: "/book/get_hours",
            data: {input_date: input_date, type: type},
            beforeSend: function(){
                $(".box_detail_info").append("<div class='mask_booking'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i></div>");
                $(".box_detail_info").css("position","relative");
                $(".mask_booking").css("position","absolute").css("height","100%").css("width","100%").css("top",0).css("left",0).css("background","rgba(0,0,0,0.5)").css("text-align","right");
                $(".mask_booking i").css("font-size","2em").css("margin","10px");
            },
            success: function(response)
            {
                // console.log(response);
                // Remove mask
                $(".mask_booking").remove();
                var obj = JSON.parse(response);
                if(obj.checkmorning == false)
                {
                    $(".note_am_time").html("(Booking time has expired)");
                }else
                {
                    $(".note_am_time").html("");
                }

                if(obj.checkafternoon == false)
                {
                    $(".note_pm_time").html("(Booking time has expired)");
                }else
                {
                    $(".note_pm_time").html("");
                }

                $(".databooktime .timemorning").html(obj.htmlMorning);
                $(".databooktime .timeafternoon").html(obj.htmlAfternoon);
            }
        });
    }

    function setHtmldate(date_choose)
    {
        // use for booking
        var new_date = convertDate(date_choose);
        var d = new Date(new_date);

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var str_show = days[d.getDay()]+", "+months[d.getMonth()]+"-"+d.getDate()+"-"+d.getFullYear();
        // console.log(str_show);
        $(".time_show").html(str_show);
    }

    function loadEvent()
    {
        $('#surveyForm')

        // Add button click handler
        .on('click', '.addButton', function() {
            var html_close = `<div class="removeButton"><img src="/public/library/global/remove-service-icon-new.png"></div>`;
            var template = `<div class="item-booking">`+html_close+$('#optionTemplate').html()+`</div>`;
            $(this).before($(template));
            $("#surveyForm .item-booking:last .list_service").trigger('change');
            saveForm();
        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row = $(this).parents('.item-booking'),
                $option = $row.find('[name="option[]"]');

            // Remove element containing the option
            $row.remove();
            saveForm();
        })
    }


    function update_cart(onthis)
    {
        var quantity = $(onthis).val();
        var id = $(onthis).attr("cart_id");
        //Ajax
        $.ajax({
            type: "post",
            url: "/cart/update",
            data: {quantity: quantity, id: id},
            success: function(html)
            {
                // console.log(html);
                var obj = JSON.parse(html);
                // set value
                if(obj.total_show && obj.amount)
                {
                    $(onthis).parents("tr").find(".total_change").html(obj.total_show);
                    $(".amount_change").html(obj.amount);
                }

                if(obj.cart_data){
                    $("#cart_tax").text(obj.cart_data[1]);
                    $("#cart_discount_code_value").text(obj.cart_data[5]);
                    $("#cart_subtotal").text(obj.cart_data[2]);
                    $("#cart_payment_total").text(obj.cart_data[3]);
                }
                
            }
        });
    }

    function update_price(onthis)
    {
        var cus_price = isNaN(parseFloat($(onthis).val())) ? 0 : parseFloat($(onthis).val());
        var id = $(onthis).attr("cart_id");
        var max_val = parseFloat($(onthis).attr("max"));
        var min_val = parseFloat($(onthis).attr("min"));
        
        if(cus_price >= min_val && cus_price <= max_val)
        {
            $(onthis).css("border-color", "#ccc");
            $(".btn_cart_order").attr("href","/payment");
            //Ajax
            $.ajax({
                type: "post",
                url: "/cart/updateprice",
                data: {cus_price: cus_price, id: id},
                success: function(html)
                {
                    // console.log(html);
                    var obj = JSON.parse(html);
                    if(obj.status == "error")
                    {
                        call_notify('Notification',obj.msg, "error");
                        $(onthis).val(obj.price);
                        return false;
                    }
                    // set value
                    if(obj.total_show && obj.amount)
                    {
                        $(onthis).parents("tr").find(".total_change").html(obj.total_show);
                        $(".amount_change").html(obj.amount);
                    }

                    if(obj.cart_data){
                        $("#cart_tax").text(obj.cart_data[1]);
                        $("#cart_discount_code_value").text(obj.cart_data[5]);
                        $("#cart_subtotal").text(obj.cart_data[2]);
                        $("#cart_payment_total").text(obj.cart_data[3]);
                    }
                    
                }
            });
        }else
        {
            $(onthis).css("border-color", "red");
            $(".btn_cart_order").removeAttr("href");
        }
    }

    function delItem(onthis)
    {
        var id = $(onthis).attr("cart_id");
        //Ajax
        $.ajax({
            type: "post",
            url: "/cart/delitem",
            data: {id: id},
            success: function(html)
            {
                // console.log(html);
                var obj = JSON.parse(html);
                // set value
                if(obj.amount)
                {
                    // remove row
                    $(onthis).parents("tr").remove();
                    // change stt
                    if($(".list_stt").length > 0)
                    {
                        var i=1;
                        $(".list_stt").each(function(){
                            $(this).html("#"+i);
                            i++;
                        });
                    }else
                    {
                        $("tbody.step1").html('<tr><td colspan="7" style="text-align: center"><b>Cart empty</b></td></tr>');
                    }
                    // set amount
                    $(".amount_change").html(obj.amount);

                    if(obj.cart_data){
                        $("#cart_tax").text(obj.cart_data[1]);
                        $("#cart_discount_code_value").text(obj.cart_data[5]);
                        $("#cart_subtotal").text(obj.cart_data[2]);
                        $("#cart_payment_total").text(obj.cart_data[3]);
                    }
                }
                
            }
        });
    }

    // ADD CLASS ACTIVE MENU
    $(document).ready(function(){
        if ( typeof site == "undefined" || site == "idx" ) {
            site = "";
        }
        $('.menu_custom > ul > li > a[href="/'+site+'"]').addClass('active');
    });
    // END ADD CLASS ACTIVE MENU

    // check form
    $(document).ready(function(){
        $.ajax({
            type: "post",
            url: "/security/create",
            success: function(token)
            {
                $("form").each(function(){
                    $(this).prepend("<input type='hidden' name='token' value='"+token+"' />");
                });
            }
        });
    });

    // HEADER V4 MOBILE
    function setHeightHeader () {
        // check media screen
        if (window.matchMedia('(max-width: 767px)').matches) {
            var m_header_height = $('.header_ver4 .topbar').outerHeight();
            if ( m_header_height < 47 ) {
                m_header_height = 47;
            }
            $('.header_ver4').css('height', (m_header_height) + 'px');
        } else {
            $('.header_ver4').css('height', 'auto');
        }
    }

    setHeightHeader();
    $(window).on('resize', function(){
        // Firing resize event only when resizing is finished
        clearTimeout(window.resizedsetHeightHeader);
        window.resizedsetHeightHeader = setTimeout(function(){
            setHeightHeader();
        }, 250);
    });
    // END HEADER V4 MOBILE
    function setWigthHeaderMenu () {
        // Check exit booking_btn_home
        if ( $('.booking_btn_home').length > 0 ) {

            var _bbhome_width = $('.booking_btn_home').outerWidth();
            if ( _bbhome_width > 0 ) {

                $('.header-nav').css('width', 'calc(100% - '+(_bbhome_width+1)+'px)');
                
                // remove menu book
                $('.header-nav ul').find('li.js-add-link').remove();
                $('.header-nav-mobile ul').find('li.js-add-link').remove();
            } else {
                $('.header-nav').css('width', 'auto');

                // Add menu book
                var html_li = '<li class="js-add-link">'+$('.booking_btn_home').html()+'</li>';
                if ( ! $('.header-nav ul').find('li.js-add-link').length ) {
                    $(html_li).appendTo('.header-nav ul');
                }
                if ( ! $('.header-nav-mobile ul').find('li.js-add-link').length ) {
                    $(html_li).appendTo('.header-nav-mobile ul');
                }
            }
        }
    }

    setWigthHeaderMenu();
    $(window).on('resize', function(){
        // Firing resize event only when resizing is finished
        clearTimeout(window.resizedsetWigthHeaderMenu);
        window.resizedsetWigthHeaderMenu = setTimeout(function(){
            setWigthHeaderMenu();
        }, 250);
    });
    // HEADER MENU

    // END HEADER MENU

    // SLIDER HOME
    $(document).ready(function(){
        $(window).load(function() {
            if ( $('.tp-banner li').length > 0 ) {
                // set Height slide
                var tp_banner_revapi = setEqualSlideHeight('.tp-banner-img', '.tp-banner');

                // $(window).on('resize', function(){
                //     // Firing resize event only when resizing is finished
                //     clearTimeout(window.resizedsetEqualSlideHeight);
                //     window.resizedsetEqualSlideHeight = setTimeout(function(){
                //         // reload Page
                //         // location.reload();
                //     }, 250);
                // });
            }
        });
    });
    // END SLIDER HOME
function setEqualSlideHeight(selector, bannerId) {

    $(selector).show();

    var heights = [];
    var widths = [];

    $(selector).each(function() {
        heights.push($(this).find('img').height());
        widths.push($(this).find('img').width());
    });

    var height = 700;
    if ( heights.length > 0 ) {
        height = Math.min.apply( Math, heights );
    }

    // Check height in mobile and Tablet if css set
    if ( $(selector + ' .tp-banner-height').height() > 0 ) {
        height = $(selector + ' .tp-banner-height').height();
    }

    var width = 1170;
    if ( widths.length > 0 ) {
        width = Math.min.apply( Math, widths );
    }

    var revapi_bannerId = $(bannerId).show().revolution({
        delay: 10000,
        hideThumbs: 10,
        startwidth: width,
        startheight: height,

        // Disable autoplay
        // stopLoop: 'on',
        // stopAfterLoops: 0,
        // stopAtSlide: 1,
    });

    $(selector).hide();

    return revapi_bannerId;
}
    function changeTimeByDate(input_date, typehtml)
    {
        // check date time
        var splitDate = posFormat.split(",");//1,0,2
        // change time
        $.ajax({
            type:"post",
            url: "/book/change_time",
            data: {date: input_date},
            success: function(response)
            {
                // console.log(response);
                if(response)
                {
                    var obj = JSON.parse(response);
                    timeMorning = JSON.stringify(obj.time_morning);
                    // convert time afternoon
                    var afternoon_time = obj.time_afternoon;
                    for(var x in afternoon_time)
                    {
                        var listTime = afternoon_time[x].split(":");

                        if(listTime[0] >=1 && listTime[0] < 12)
                        {
                            var changeTime = parseInt(listTime[0])+12;
                            afternoon_time[x] = changeTime+":"+listTime[1];
                        }
                    }
                    
                    timeAfternoon = JSON.stringify(afternoon_time);
                    pushHtmlTime(input_date, typehtml);
                }
            }
        });

    }

function applyDiscountCode()
{
    $("#loader_discount_code").show();
    $("#enter_discount_code").hide();
    $("#cart_discount_code").prop("disabled", true);

    let code =  $("#cart_discount_code").val();
    $.ajax({
        url: "/payment/discount_code/",
        data: {"code": code},
        dataType: "json",
        success: function(res){

            $("#loader_discount_code").hide();
            $("#enter_discount_code").show();
            $("#cart_discount_code").prop("disabled", false);

            if(res.status == 'ok')
            {
                $("#discount_code_input").hide();
                $("#discount_code_info").show();
                $("#cart_discount_code_text").text(res.code_data.code);
                $("#cart_discount_code_value").text(res.cart_data[5]);
                $("#cart_subtotal").text(res.cart_data[2]);
                $("#cart_payment_total").text(res.cart_data[3]);
                $("#cart_tax").text(res.cart_data[1]);
            }
            else
            {
                call_notify("Alert",res.msg,"error");
            }
        }
    })
}

function removeDiscountCode()
{
    $.ajax({
        url: "/payment/remove_code/",
        dataType: "json",
        success: function(res){
            if(res.status == 'ok')
            {
                $("#discount_code_input").show();
                $("#discount_code_info").hide();
                $("#cart_discount_code_text").text("");
                $("#cart_discount_code_value").text(res.cart_data[5]);
                $("#cart_subtotal").text(res.cart_data[2]);
                $("#cart_payment_total").text(res.cart_data[3]);
                $("#cart_tax").text(res.cart_data[1]);
            }
            else
            {
                call_notify("Alert",res.msg,"error");
            }
        }
    })
}

// Init gallery magic popup
$(document).ready(function(){
    function initImageMagnificPopup(){
        var groups = {};
        $('.image-magnific-popup').each(function() {
            var id = $(this).attr('data-group');
            if( ! groups[id] ) 
            {
                groups[id] = [];
            }       
            groups[id].push(this);
        });
        $.each(groups, function() {
            $(this).magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: true,
                gallery: { enabled:true }
            });
        });
    }
    initImageMagnificPopup();
});
// End init gallery popup

// slider service board
$(document).ready(function (){
    $('.owl_service_board').owlCarousel({
        responsiveClass:true,
        responsive : {
            0 : {
                items: 1,
            },
            768 : {
                items: 2,
            },
            992 : {
                items: 3,
            },
            1200 : {
                items: 3,
            },
        },
        loop: true,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        nav: false,
        dots:true,
    });
});
// End slider service board

function redirectUrl(url, target) {
    /*Check target*/
    if (typeof target == 'undefined') {
        target = '_self';
    }

    /*append element*/
    let redirect_url = 'redirect_url_' + new Date().getTime();
    $('body').append('<div style="display:none;"><a class="' + redirect_url + '" title="redirect" target="' + target + '">&nbsp;</a></div>');

    /*Call event*/
    let redirect = $('.' + redirect_url);
    redirect.attr('href', url);
    redirect.attr('onclick', "document.location.replace('" + url + "'); return false;");
    redirect.trigger('click');
}

function scrollJumpto(jumpto, headerfixed, redirect) {
    /*Check exits element for jumpto*/
    if ($(jumpto).length > 0) {
        /*Calculator position and call jumpto with effect*/
        jumpto = $(jumpto).offset().top;
        headerfixed = ($(headerfixed).length > 0) ? $(headerfixed).height() : 0;

        $('html, body').animate({
            scrollTop: parseInt(jumpto - (headerfixed+15)) + 'px'
        }, 1000, 'swing');
    }
    /*Check redirect if not exits element for jumpto*/
    else if (redirect) {
        redirectUrl(redirect);
        return false;
    } else {
        console.log(jumpto + ' Not found.');
    }
}

function isFreezeHeader ( wrapFreezeHeader , flagFreezeHeader, device) {
    let deviceName = device == 'mobile' ? 'mobile' : 'desktop';
    let wrapFreezeHeaderObj = $(wrapFreezeHeader);
    let flagFreezeHeaderObj = $(flagFreezeHeader);

    if( !flagFreezeHeaderObj.hasClass('initializedFreezeHeader') && wrapFreezeHeaderObj.length > 0 && flagFreezeHeaderObj.length > 0 ){
        flagFreezeHeaderObj.addClass('initializedFreezeHeader');
        wrapFreezeHeaderObj.addClass(`fixed-freeze ${deviceName}`);

        let insteadFreezeHeaderObj = $(`<div class="instead-flag-freeze-header ${deviceName}"></div>`);
        insteadFreezeHeaderObj.insertBefore(flagFreezeHeaderObj);

        $('.btn_service_book').addClass('scroll-fixed');
        $(window).scroll(function(){
            if( wrapFreezeHeaderObj.is_on_scroll1() ){
                flagFreezeHeaderObj.removeClass(`freeze-header with-bg ${deviceName}`);
                insteadFreezeHeaderObj.height('0px');
            } else {
                insteadFreezeHeaderObj.height(flagFreezeHeaderObj.outerHeight()+'px');
                flagFreezeHeaderObj.addClass(`freeze-header with-bg ${deviceName}`);
            }
        });
    }
}
$(document).ready(function () {
    /*
    * TESTIMONIALS
    * */
    $(".testimonials-list").owlCarousel({
        loop: true,
        nav: true,
        margin: 30,
        dots: false,
        items: 1,
        smartSpeed: 1000,
        navText: ['<i class="fa fa-caret-left"></i>','<i class="fa fa-caret-right"></i>'],
    });

    /*FREEZE HEADER*/
    $.fn.is_on_scroll1 = function() {
        /* Not included margin, padding of window */
        let win = $(window);
        let viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        /* Not included margin of this element: same container */
        let bounds = this.offset();
        if ( typeof bounds == 'undefined' ) {return false;}
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        if ( bounds.top >= viewport.top && bounds.bottom <= viewport.bottom ) {
            return true;
        } else {
            return false;
        }
    };
    let activeFreezeHeader = $('[name="activeFreezeHeader"]').val();
    if( activeFreezeHeader == 1 || activeFreezeHeader == 3 ){
        isFreezeHeader ( '.wrap-freeze-header' , '.flag-freeze-header');
    }

    if( activeFreezeHeader == 1 || activeFreezeHeader == 2 ){
        isFreezeHeader ( '.wrap-freeze-header-mobile' , '.flag-freeze-header-mobile', 'mobile');
    }
    /*SCROLL SERVICE*/
    $(window).load(function () {
        scrollJumpto('#service_group_' + $('.service_group_id').val(), window.matchMedia('(min-width: 992px)').matches ? '.fixed-freeze.desktop' : '.fixed-freeze.mobile');
    });
});

function load_social(inputs) {
    if ( !inputs ) {
        console.log('load social missed inputs');
        return false;
    }

    /*calculator width*/
    let social_block_width = $('#social_block_width').width();
    social_block_width = Math.round(social_block_width);

    if (social_block_width > 450) {
        social_block_width = 450;
    }

    if ( social_block_width < 180 ){
        social_block_width = 180;
    }

    /*facebook fanpage*/
    if ( typeof inputs.facebook_embed != 'undefined' && inputs.facebook_embed ) {
        let social_block_height = Math.round(social_block_width * (parseInt(inputs.facebook_embed.height)/parseInt(inputs.facebook_embed.width)));
        let  social_url = '';
        if (!inputs.facebook_embed.likebox_enable) {
            social_url += 'https://www.facebook.com/plugins/page.php?';
            social_url += '&width=' + social_block_width + '&height=' + social_block_height;
            social_url += '&small_header='+(inputs.facebook_embed.small_header ? 'true' : 'false');
            social_url += '&tabs='+inputs.facebook_embed.tabs;
            social_url += '&show_facepile='+(inputs.facebook_embed.show_facepile ? 'true' : 'false');
            social_url += '&hide_cover=false&hide_cta=false&adapt_container_width=true';
        } else {
            social_url += 'https://www.facebook.com/plugins/likebox.php?';
            social_url += '&width=' + social_block_width + '&height=' + social_block_width; // If set height then error with likebox
            social_url += '&show_faces='+(inputs.facebook_embed.likebox_show_faces ? 'true' : 'false');
            social_url += '&stream='+(inputs.facebook_embed.likebox_stream ? 'true' : 'false');
            social_url += '&header=false';
        }
        social_url += '&href=' + encodeURIComponent(inputs.facebook_embed.id_fanpage);
        social_url += '&appId' + inputs.facebook_embed.appId;

        $('#fanpage_fb_container').html('<iframe style="overflow:hidden;max-height:' + social_block_height + 'px" title="Social fanpage" src="'+social_url+'" width="' + social_block_width + '" height="' + social_block_height + '" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');
    }

    /*google fanpage*/
    if (typeof inputs.google_id_fanpage != 'undefined' && inputs.google_id_fanpage) {
        $('#fanpage_google_container').html('<div class="g-page" data-href="' + inputs.google_id_fanpage + '" data-width="' + social_block_width + '"></div><script src="https://apis.google.com/js/platform.js" async defer><\/script>');
    }

    /*twitter fanpage*/
    $('#fanpage_twitter_container').html(''); // clear content
    if (typeof inputs.twitter_id_fanpage != 'undefined' && inputs.twitter_id_fanpage) {
        inputs.twitter_id_fanpage = inputs.twitter_id_fanpage.split('/');
        for (let i = inputs.twitter_id_fanpage.length - 1; i >= 0; i -= 1) {
            if (inputs.twitter_id_fanpage[i] != '') {
                inputs.twitter_id_fanpage = inputs.twitter_id_fanpage[i];
                break;
            }
        }
        if (typeof twttr != 'undefined') {
            twttr.widgets.createTweet(inputs.twitter_id_fanpage, document.getElementById('fanpage_twitter_container'), {width: social_block_width});
        }
    }
}

$(document).ready(function () {
    /*
    * SOCIAL FAN PAGE
    * When resize then reload fanpage
    * Firing resize event only when resizing is finished
    */
    let socialInputs = {
        facebook_embed: facebook_embed,
        google_id_fanpage: google_id_fanpage,
        twitter_id_fanpage: twitter_id_fanpage,
    };
    $(window).load(function() {
        load_social(socialInputs);
        $(window).on('resize', function () {
            clearTimeout(window.resizedFinished);
            window.resizedFinished = setTimeout(function () {
                load_social(socialInputs);
            }, 250);
        });
    });
});