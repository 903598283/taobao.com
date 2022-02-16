
    var mima =document.getElementsByClassName('password-login')[0];
    var duanxin =document.getElementsByClassName('sms-login')[0];
    var form1 = document.querySelector('.field1');
    var form2 = document.querySelector('.field2');
    var form3 = document.querySelector('.field3');
    var form4 = document.querySelector('.field4');
    var link1 = document.querySelector('.fm-link1');
    var link2 = document.querySelector('.fm-link2');
   mima.addEventListener('click',function(e){
       form1.style.display='block';
       form2.style.display='block';
       form3.style.display='none';
       form4.style.display='none';
       link1.style.display='inline-block';
       link2.style.display='inline-block';
   });
   duanxin.addEventListener('click',function(e){
    form1.style.display='none';
    form2.style.display='none';
    form3.style.display='block';
    form4.style.display='block';
    link1.style.display='none';
    link2.style.display='none';
});
    

