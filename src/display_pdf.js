// $(function () {
//     var pdf_exist = false;
//     var strtemp = "<div class='embed-responsive' style='padding-bottom:80%'> <object data='URL.pdf' type='application/pdf' width='80%' height='80%'></object> </div> <P></P>";
//      $("div.content a").filter(function () {
//         if(/.*\.pdf/.test($(this).attr('href')))
//         {
//             $(this).append(strtemp.replace('URL.pdf',$(this).attr('href')));
//             pdf_exist = true;
//         }
//     });
    
//     });
$(window).on('action:topic.loaded',function(){
    var pdf_exist = false;
var strtemp = "<div class='embed-responsive' style='padding-bottom:80%'> <object data='URL.pdf' type='application/pdf' width='80%' height='80%'></object> </div> <P></P>";
$("div.content a").filter(function () {
 if(/.*\.pdf/.test($(this).attr('href')))
 {
     $(this).html(strtemp.replace('URL.pdf',$(this).attr('href')));
     pdf_exist = true;
 }
});
});