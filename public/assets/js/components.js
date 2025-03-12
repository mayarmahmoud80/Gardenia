// Load head content first
$.get("components/head.html", function(data) {
    $('head').prepend(data);     
});

$.get("components/footer.html", function(data) {
    $('footer').prepend(data);   
});

$.get("components/headers.html", function(data) {
 
    $('header').html(data); 
   
});
