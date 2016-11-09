var point = 0;

$(document).ready(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
});

$(window).bind('mousewheel DOMMouseScroll', function(event){

    window.onresize = function(){
        getBreakpoints(scanBlocks());
        // console.log(scanBlocks());
    };
    var blocks = scanBlocks();
    getBreakpoints(blocks);

    point = spaceScroll(event.originalEvent.wheelDelta, point);

});

function spaceScroll(delta, point){

    var breakpoints = getBreakpoints(scanBlocks());
    console.log(delta);

    if((point > $("body .slide").length)&&(point < $("body .slide").length)){
        console.log("Error");
    } else {

        if (delta > 0) {
            point--;
        } else {
            point++;
        }

        $("body .slide").each(function() {
            if($(this).attr('n') == point){
                zoomOut($(this));
            } else {
                zoomIn($(this));
            }
        });

        $('html, body').animate({
            scrollTop: breakpoints[point]
        }, 500);
    }

    console.log(point);
    return point;
}



function scanBlocks() {
    var blocks = [];

    $( "body .slide" ).each(function() {
        var height = $(this).height();
        blocks.push(height);
    });

    return blocks;
}

function getBreakpoints(blocks){

    var breakpoints = [];
    var spaceY = 0;
    breakpoints.push(spaceY);

    for (i = 0; i < blocks.length; i++) {
        spaceY+=blocks[i];
        breakpoints.push(spaceY);
        // console.log(blocks[i]);
    }
    return breakpoints;

}

function zoomIn(element) {
    $(element).removeClass('animated zoomOut').addClass('animated zoomIn');
}

function zoomOut(element) {
    $(element).removeClass('animated zoomIn').addClass('animated zoomOut');
}