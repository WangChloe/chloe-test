$(function() {
    $doc = $(document);
    $win = $(window);
    var $searchTab = $("#J_search_tab");
    var $searchInfo = $(".J_search_info");

    setup();

    function setup(){
        htmlFont();
        $win.bind('resize', htmlFont);
        bindTabClick();
        // bindIframeClick();
        iframeWidth();
    }

    function htmlFont() {
        $('html').css('fontSize', $doc.width() / 750 * 100 + 'px');
    }

    function bindTabClick() {
        $searchTab.on("click", "a", function() {
            var $this = $(this);
            var index = $this.index();
            if (!$this.hasClass("act")) {
                $this.addClass("act").siblings("a").removeClass("act");
                setTimeout(function() {
                    $searchInfo.eq(index).addClass("act").siblings(".search-item").removeClass("act");
                }, 10);
            }
        });
    }

    // function bindIframeClick() {
    //     $searchInfo.on("click", "#index-kw, #search-placeholder", function() {
    //         var $this = $(this);
    //         if($this.hasClass("baidu")) {
    //             $this.addClass("cl");
    //         } else if($this.hasClass("taobao")) {
    //             // $this.addClass("cl");
    //         }
    //     });
    // }

    function iframeWidth() {
        $docW = $doc.width();
        $searchInfo.find('iframe').attr('width', $docW);
    }
});