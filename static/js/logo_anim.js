$("#scroll").delay( 3000 ).fadeIn( 400 );
$("#logo_container").delay( 6000 ).fadeOut( 400 );
$("#fadein").delay( 7000 ).fadeIn( 400 );

var str =
        "<div id='block1'><img id = 'logo' src='../static/img/left_part.png' alt='logo_left'></div>" +
        "<div id='block2'><p>plastic_afterlife</p></div>" +
        "<div id='block3'><img id = 'logo' src='../static/img/right_part.png' alt='logo_right'> </div>",
    i = 0,
    isTag,
    text;

(function type() {
    text = str.slice(0, ++i);
    if (text === str) return;

    document.getElementById('logo_block').innerHTML = text;

    var char = text.slice(-1);
    if( char === '<' ) isTag = true;
    if( char === '>' ) isTag = false;

    if (isTag) return type();
    setTimeout(type, 100);

}());

var el = document.getElementById("logo_logo");

function fadeIn(el) {
  el.style.opacity = 0;


  var tick = function() {
    el.style.opacity = +el.style.opacity + 0.01;


    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 15000)
    }
  };

  tick();
}

fadeIn(el);



