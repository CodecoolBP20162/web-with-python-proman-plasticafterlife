var str = "<div id='block1'> <img src='../static/img/left_part.png' alt='logo_left'> </div> <div id='block2'> <p>plastic_afterlife</p></div> <div id='block3'> <img src='../static/img/right_part.png' alt='logo_right'> </div>",
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

