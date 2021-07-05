$(document).ready(function () {
//hide type conduite sur autofq12
    $("#auto-type-conduite > div").hide();

    var body = $('body');
    /**
     * -------------------------------------------
     * Overlay
     * -------------------------------------------
     */

    var closeOverlayBTN = $('.close-overlay');
    closeOverlayBTN.on('click', function (event) {
        event.preventDefault();
        $(this).closest('.overlay').stop(true, true).velocity('transition.fadeOut');
    });

    /**
     * -------------------------------------------
     * Call Back Overlay
     * -------------------------------------------
     */
    $('.open-callback').on('click', function (event) {
        event.preventDefault();
        if ($(this).hasClass('active')) {
            $(".close-overlay").trigger("click");
        }
        else {
            $('.open-callback').addClass('active');
            $('.overlay-call-back').stop(true, true).velocity('transition.fadeIn', {duration: 400});
        }
    });
    closeOverlayBTN.on('click', function (event) {
        event.preventDefault();
        $('.open-callback').removeClass('active');
    });

    /**
     * -------------------------------------------
     * Popover
     * -------------------------------------------
     */
    $('[data-toggle="popover"]').popover({
        html     : true,
        viewport : 'body',
        container: 'body',
        template : '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><button class="close" type="button"><i class="icon-Menu_Cross icon-as"></i></button><div class="popover-content"></div></div>'
    }).on('shown.bs.popover', function () {
        var popover = $(this);
        $('div.popover .close').on('click', function () {
            popover.popover('hide');
        });
    });
    body.on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    // hide manufacturers list when error in immat validation
    var byimmat = $('#auto .qveh0-by-immat').is(':checked');
    if (byimmat) {
        $('#form-marque').addClass('no-display');
    }

    /**
     * -------------------------------------------
     * AS Form Choice
     * -------------------------------------------
     */
    $('.group-input').find('input').on('click', function () {

        var datatarget = $(this).data('form');

        $(".form-select").addClass('no-display');
        $('#' + datatarget).removeClass('no-display');

        $('#form-' + datatarget).removeClass('no-display');

        $(".best-fill").each(function () {
            $(this).imageScale('scale');
        });
    });


    /**
     * -------------------------------------------
     * AS Tabs
     * -------------------------------------------
     */
    var asSettings          = $("#intro-as-tabs");
    var asSettingsBtn       = asSettings.find('[data-as-tab]');
    var asSettingsBtnActive = asSettings.find('[data-as-tab].active');
    var asSettingsTabs      = $('.intro-as-tab');
    var datatarget          = asSettingsBtnActive.data('as-tab');

    var heightCurrentTab = $('#' + datatarget).innerHeight();
    $("#ghost-tab").css("height", heightCurrentTab);

    $('#' + datatarget).removeClass('no-display');
    $("[data-as-tab-bg='" + datatarget + "']").removeClass('no-display');
    $("[data-as-tab-info='" + datatarget + "']").removeClass('no-display');

    // AS TABS
    asSettingsBtn.on('click', function () {
        var datatarget = $(this).data('as-tab');
        var dataBg     = $('[data-as-tab-bg]');
        var dataInfo   = $('[data-as-tab-info]');

        if (!dataInfo.hasClass('velocity-animating')) {
            if (!$(this).hasClass('active')) {
                asSettingsBtn.removeClass('active');
                $(this).addClass('active');

                asSettingsTabs.addClass('no-display');

                var heightCurrentTab = $('#' + datatarget).innerHeight();
                $("#ghost-tab").css("height", heightCurrentTab);

                $('#' + datatarget).removeClass('no-display');

                var datatargetBg       = $("[data-as-tab-bg='" + datatarget + "']");
                var datatargetInfo     = $("[data-as-tab-info='" + datatarget + "']");
                var datatargetDuration = 500;

                dataBg.not(datatargetBg).velocity('fadeOut', {
                    duration: datatargetDuration,
                    complete: function () {
                        $(this).addClass('no-display');
                    }
                });
                datatargetBg.velocity('fadeIn', {
                    duration: datatargetDuration,
                    begin   : function () {
                        datatargetBg.imageScale('scale');
                    },
                    complete: function () {
                        $(this).removeClass('no-display');
                    }
                });
                dataInfo.not(datatargetInfo).velocity('fadeOut', {
                    duration: 0,
                    complete: function () {
                        $(this).addClass('no-display');
                    }
                });
                datatargetInfo.velocity('fadeIn', {
                    duration: datatargetDuration,
                    complete: function () {
                        $(this).removeClass('no-display');

                    }
                });
            }
        }
    });


    $("#toggle-search-intro").on("click", function () {
        $(this).toggleClass("active").next().slideToggle();
    });


    /**
     * -------------------------------------------
     * Images Loaded
     * -------------------------------------------
     */
    function LADI() {
        // IMAGES SCALE
        // https://github.com/GestiXi/image-scale/
        if ($("img.best-fill").imagesLoaded) {
            $(".best-fill-top").imageScale({
                scale          : 'best-fill',
                rescaleOnResize: false,
                fadeInDuration : 0,
                align          : 'top'
            });
            $(".best-fill-left-top").imageScale({
                scale          : 'best-fill',
                rescaleOnResize: false,
                fadeInDuration : 0,
                align          : 'top-left'
            });
            $(".best-fill-right-top").imageScale({
                scale          : 'best-fill',
                rescaleOnResize: false,
                fadeInDuration : 0,
                align          : 'top-right'
            });
            $(".best-fill").imageScale({
                scale          : 'best-fill',
                rescaleOnResize: false,
                fadeInDuration : 0
            });
        }

        $(window).resize(function () {
            $(".best-fill").imageScale('scale');
        });

        // IMG FADE LOADING
        if ($("img.fade-img").imagesLoaded) {
            $('.fade-img')
                .one("load", function () {
                    $(this).velocity({opacity: 1}, {duration: 400});
                })
                .each(function () {
                    if (this.complete) $(this).trigger("load");
                });
        }
    }

    /**
     * -------------------------------------------
     * Système pour le menu de navigation
     * -------------------------------------------
     */
    var siteCache          = $('#site-cache');
    var siteBtnMenu        = $('#site-btn-navigation');
    var siteMainHeader     = $('#site-header');
    var siteMainNav        = $('#site-navigation');
    var siteMainWrapper    = $('#site-wrapper');
    var siteMainPreFooter  = $('#site-prefooter');
    var siteMainFooter     = $('#site-footer');
    var animationArray     = [siteMainHeader, siteMainWrapper, siteMainPreFooter, siteMainFooter];
    var navAnimateDuration = 300;

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    siteBtnMenu.on('click', function () {

        var siteMainNavW = siteMainNav.innerWidth();
        if (body.hasClass('menu-show')) {
            siteMainNav.velocity({
                left: -siteMainNavW
            }, {
                duration: navAnimateDuration
            });
            $.each(animationArray, function (index, value) {
                value.velocity({
                    left: 0
                }, {
                    duration: navAnimateDuration
                });
            });
            siteCache.velocity('fadeOut', {
                duration: navAnimateDuration,
                complete: function () {
                    body.removeClass('menu-show');
                }
            });
        } else {
            body.addClass('menu-show');
            siteMainNav.velocity({
                left: 0
            }, {
                duration: navAnimateDuration
            });
            $.each(animationArray, function (index, value) {
                value.velocity({
                    left: siteMainNavW
                }, {
                    duration: navAnimateDuration
                });
            });
            siteCache.velocity('fadeIn', {
                duration: navAnimateDuration
            });
        }
    });
    
    $('.open-callback').on('click', function () {
    	var siteMainNavW = siteMainNav.innerWidth();
    	siteMainNav.velocity({
            left: -siteMainNavW
        }, {
            duration: navAnimateDuration
        });
        $.each(animationArray, function (index, value) {
            value.velocity({
                left: 0
            }, {
                duration: navAnimateDuration
            });
        });
        siteCache.velocity('fadeOut', {
            duration: navAnimateDuration,
            complete: function () {
                body.removeClass('menu-show');
            }
        });
        var docHeight = $(document).height() + 50;
        var docWidth = $(document).width() - 270;
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        if( docHeight < winHeight ) docHeight = winHeight;
        $('#modalBackdrop').css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    });
    
    siteCache.on('click', function () {
        siteBtnMenu.trigger('click');
    });

    $(window).resize(function () {
        var siteMainNavW = siteMainNav.innerWidth();
        waitForFinalEvent(function () {
            if (body.hasClass('menu-show')) {
                siteMainWrapper.velocity({
                    left: siteMainNavW
                }, {
                    duration: navAnimateDuration
                });
                siteMainHeader.velocity({
                    left: siteMainNavW
                }, {
                    duration: navAnimateDuration
                });
            } else {
                siteMainNav.velocity({
                    left: -siteMainNavW
                }, {
                    duration: navAnimateDuration
                });
            }
        }, navAnimateDuration, "some unique string");
    });

    /**
     * -------------------------------------------
     * SubHeader Summary
     * -------------------------------------------
     */
    var subHeader = $(".sub-header");
    if (subHeader.length != 0) {
        new Waypoint.Inview({
            element: subHeader[0],
            enter  : function () {
                $('.recap-prime').removeClass('active');
            },
            exited : function () {
                $('.recap-prime').addClass('active');
            }
        });
    }

    /**
     * -------------------------------------------
     * Scroll To validate button (Step 2)
     * -------------------------------------------
     */
    $('.group-input.simple.scrolltobottom label').click(function () {
        $("html, body").animate({scrollTop: $(document).height() - $(window).height()});
    });

    /**
     * -------------------------------------------
     * Forms Validator
     * Todo: Don't use if the check is on the server side
     * -------------------------------------------
     */
    /**
     * Forms Validator Methods
     */
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg != value;
    }, "Value must not equal arg.");
    $.validator.addMethod('customphone', function (value, element) {
        return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value);
    }, "Please enter a valid phone number");
    $.validator.addMethod(
        "frenchDate",
        function (value) {
            return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
        },
        "Please enter a date in the format dd/mm/yyyy."
    );
    /**
     * Forms Validator Settings
     */
    var $validateSettings = {
        highlight  : function (element) {
            $(element).parent('div').addClass('error').removeClass('success');
        },
        unhighlight: function (element) {
            $(element).parent('div').removeClass('error').addClass('success');
        },
        onfocusin  : function (element) {
            $(element).valid();
        },
        rules      : {
            // IMMATRICULATION
            immatriculation    : {
                required : true,
                minlength: 3
            },
            // SELECT MARQUE
            selectMarque       : {
                required      : true,
                valueNotEquals: "default"
            },
            // SELECT MARQUE
            selectModele       : {
                required      : true,
                valueNotEquals: "default"
            },
            // SELECT PUISSANCE
            selectPuissance    : {
                required      : true,
                valueNotEquals: "default"
            },
            // SELECT VERSION
            selectVersion      : {
                required      : true,
                valueNotEquals: "default"
            },
            // SELECT COEFF
            selectCoeff        : {
                required      : true,
                valueNotEquals: "default"
            },
            // SELECT CIVILITE
            selectCivilite     : {
                required      : true,
                valueNotEquals: "default"
            },
            // SELECT 2011 SINISTRES
            select2011Sinistres: {
                required      : true,
                valueNotEquals: "default"
            },
            // NOM & PRENOM
            lastName           : {
                required : true,
                minlength: 2
            },
            firstName          : {
                required : true,
                minlength: 2
            },
            // TELEPHONE
            phoneNumber        : {
                required: true,
                number  : true
            },
            //DATE
            dateInput          : {
                required  : true,
                frenchDate: true
            },
            // NUMERO DE VOIE
            numero_nom_voie    : {
                required : true,
                minlength: 2
            },
            // CODE POSTAL
            postalCode         : {
                required: true,
                number  : true
            },
            // SELECT CIVILITE
            selectVille        : {
                required      : true,
                valueNotEquals: "default"
            },
            // EMAIL
            email              : {
                required: true,
                email   : true
            }
        },
        messages   : {
            select: {
                valueNotEquals: "Ce champ ne peut pas être vide"
            }
        }
    };

    /**
     * Forms Validator Init
     */
    $(".form-toValidate").each(function () {
        $(this).validate($validateSettings);
    });

    /**
     * -------------------------------------------
     *  DatePicker (Forms)
     * -------------------------------------------
     */
    var d = new Date();
    var n = d.getFullYear() - 18;
    var m = d.getMonth();
    var y = d.getDate();


    /**
     *  Mobiscroll Calendar initialization (n - 18)
     */
    $(function () {
        $(".input-datepicker-birth").each(function () {
            $(this).mobiscroll().calendar({
                lang        : 'fr',
                display     : 'bubble',
                mode        : 'mixed',
                scrollLock  : false,
                readonly    : false,
                defaultValue: new Date(n, m, y),
                onClosed    : function () {
                    $(this).valid();
                }
            });
        });
    });
    
    $("form").on('click', '.field-container.datepicker .input-group-addon', function () {
    	$(this).parent().find('input').mobiscroll().calendar({
            lang      : 'fr',
            display   : 'bubble',
            mode      : 'mixed',
            scrollLock: false,
            readonly  : false,
            onClosed  : function () {
                $(this).valid();
            }
        });
    	$(this).parent().find('input').mobiscroll('show');
    });
    

    /**
     * -------------------------------------------
     * Protection options (Toggle)
     * -------------------------------------------
     */
    var protectionOptionsHeader = $(".protection-options header");
    $(".protection-options .option-label").on('click', function (e) {
        e.preventDefault();
        if ($(this).parent('header').hasClass('active')) {
            protectionOptionsHeader.removeClass('active');
            protectionOptionsHeader.parent().next().slideUp();
            $(this).parent().parent().next().slideUp();
            $(this).parent('header').removeClass('active');
        }
        else {
            protectionOptionsHeader.removeClass('active');
            protectionOptionsHeader.parent().next().slideUp();
            $(this).parent().parent().next().slideDown();
            $(this).parent('header').addClass('active');
        }
    });
    $(".protection-options .option-more").on('click', function (e) {
        e.preventDefault();
        $(this).prev().find('.option-label').trigger('click');
    });


    /**
     * -------------------------------------------
     * Toggle System
     * -------------------------------------------
     */
    var toggleSysHeader = $(".toggle-sys");
    $(".toggle-sys .toggle-sys-header-el").on('click', function (e) {
        e.preventDefault();
        if ($(this).closest('.toggle-sys').hasClass('active')) {
            toggleSysHeader.removeClass('active');
            toggleSysHeader.find('.toggle-sys-content').slideUp();
            $(this).closest('.toggle-sys').removeClass('active');
        }
        else {
            toggleSysHeader.removeClass('active');
            toggleSysHeader.find('.toggle-sys-content').slideUp();
            $(this).closest('.toggle-sys').find('.toggle-sys-content').slideDown();
            $(this).closest('.toggle-sys').addClass('active');
        }
    });

    /**
     * -------------------------------------------
     * Formules Table
     * -------------------------------------------
     */

    var datatargetDefault = $('.default').data('formule');
    $('.default').closest(".formule-head").addClass('active');
    var dataTargetElement = $(".table-formules [data-formules-target]");

    if (dataTargetElement.length != 0) {


        dataTargetElement.removeClass("display");
        $('td[data-formules-target="' + datatargetDefault + '"]').addClass("display");

        var formuleHead = $(".formule-click");
        formuleHead.on('click', function (e) {
            e.preventDefault();

            formuleHead.closest(".formule-head").removeClass('active');
            $(this).closest(".formule-head").addClass('active');
            var datatarget = $(this).data('formule');

            dataTargetElement.removeClass("display");
            $('td[data-formules-target="' + datatarget + '"]').addClass("display");

        });

        $('.formule-title').on('click', function () {
            $(this).toggleClass('active').closest('tr').next().find('.formule-desc').stop(true, true).slideToggle();
        });
    }


    /**
     * -------------------------------------------
     * Formula products on Forms
     * -------------------------------------------
     */
    $(".form-section .box-as.formule").on('click', function () {
        $(".form-section .box-as.formule").removeClass('active');
        $(this).addClass('active');
        $(this).find('input').prop("checked", true).trigger('change');
    });

    $(".form-section.toggle-section .section-title").on('click', function () {
        $(this).next().stop(true, true).slideToggle();
        $(this).toggleClass('active');
    });
    $(".form-section.toggle-section .section-content").on('click', function () {
        $(this).prev().stop(true, true).trigger('click');
    });

    /**
     * -------------------------------------------
     * Confirm Us checkboxes
     * -------------------------------------------
     */
    $(".confirm-us .checkbox").on('click', function () {
        if ($(".required-1").prop('checked') == true && $(".required-2").prop('checked') == true) {
            $(".confirm-us .btn-as.primary").prop("disabled", false);
        }
        else {
            $(".confirm-us .btn-as.primary").prop("disabled", true);
        }
    });

    /**
     * -------------------------------------------
     * IBAN
     * -------------------------------------------
     */
    $(".iban_multipart input").keyup(function () {
        if (this.value.length == this.maxLength) {
            $(this).parent().parent().next().find('input').focus();
        }
    });

    /**
     * -------------------------------------------
     * Sticky Sub Header
     * -------------------------------------------
     */
    var subHeader = $(".sub-header");
    if (subHeader.length != 0) {
        new Waypoint.Inview({
            element: subHeader[0],
            enter  : function () {
                $('.recap-prime').removeClass('active');
            },
            exited : function () {
                $('.recap-prime').addClass('active');
            }
        });
    }

    /**
     * -------------------------------------------
     * Scroll To Bottom (Step2)
     * -------------------------------------------
     */
    $('.group-input.simple.scrolltobottom label').click(function () {
        $("html, body").animate({scrollTop: $(document).height() - $(window).height()});
    });

    /**
     * -------------------------------------------
     * Exe
     * -------------------------------------------
     */
    LADI();

    var matchHeightArray = [$('.box-as.lk-grd .content'), $('.table-wrapper')];
    WebFont.load({
        custom: {
            families: ['Asap']
        },
        active: function () {
            $.each(matchHeightArray, function (index, value) {
                value.matchHeight();
            });
        }
    });

    $('#site-btn-navigation, #site-navigation > ul.site-header-actions > li:nth-child(1) > a').on('click', function() {
        $('#site-btn-navigation > .icon-as').toggleClass('icon-Picto-close_Menu');
        $('#site-btn-navigation > span').toggleClass('on').toggleClass('off');
    });

});

// Prevent multi form submit
(function ($) {
  Drupal.behaviors.prevntmltclick = {
    attach: function (context, settings) {
      var btn = $('form.prevnt-mlt-click .form-submit');
      btn.click(function(){
        btn = $(this);
        window.addEventListener("beforeunload", function (event) {
          btn.attr('disabled','disabled');
        });
      });
    }
  };
}(jQuery));

