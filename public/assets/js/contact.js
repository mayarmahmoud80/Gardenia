"use strict";
jQuery(document).ready(function ($) {
    var button =document.querySelector("#submit_btn") ;
    if(button ==null )
    return false ;

   button.addEventListener("click", () => SendContactUsMessage())
    function SendContactUsMessage (){


        console.log('inside function')  ; 
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
        $("#contactForm input[required], #contactForm textarea[required]").each(function () {
            $(this).css('background-color', '');
            if (!$.trim($(this).val())) { //if this field is empty 
                $(this).css('background-color', 'rgb(255 222 222 / 21%)'); //change border color to rgb(255 222 222 / 21%)   
                proceed = false; //set do not proceed flag
                document.getElementById('error-message').innerHTML = '<div class="alert alert-danger mb-4">Please fill all the required fields</div>';
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($(this).attr("type") === "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('background-color', 'rgb(255 222 222 / 21%)'); //change border color to rgb(255 222 222 / 21%)   
                proceed = false; //set do not proceed flag	
                document.getElementById('error-message').innerHTML = '<div class="alert alert-danger mb-4">Please enter a valid email</div>';
    
            }
        });
        console.log(proceed)  ; 
        if (proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            var post_data = {
                'user_name': $('input[name=name]').val(),
                'user_email': $('input[name=email]').val(),
                'phone': $('input[name=phone]').val(),
              //  'subject': $('input[name=subject]').val(),
                'msg': $('textarea[name=message]').val()
            };
            console.log(post_data)  ; 
       
            var template =
                `
        <div>
        <h4><strong>Full Name</strong> : ${post_data.user_name}</h4> 
        <h4><strong>Phone</strong> : ${post_data.phone}</h4> 
        <br>
    
        <h4><strong>Message</strong> </h4>
        <p>
        ${post_data.msg}
        </p>
    
    </div>
        `
    
    
            Email.send({
                SecureToken: "97f67d32-9e27-429f-935d-be429fcde231",
                To: 'info@gardeniamedical.net',
                From: "info@gardeniamedical.net",
                Subject: `Gardenia Medical Reserve ${post_data.user_name}`,
                Body: template
            }).then(
                message => {
                    console.log(message) ;
                    showModal("Confirmation","Thank you for your enquiry. We will be in touch shortly.");
                }
            );
    
    
        }
    }


    //reset previously set border colors and hide all message on .keyup()
$("#contactForm  input[required=true], #contactForm textarea[required=true]").keyup(function () {
    $(this).css('background-color', '');
    $("#result").slideUp();
});



 
});