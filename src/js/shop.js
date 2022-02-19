$(function () {
    let shop = cookie.get('shop');
  
    shop = JSON.parse(shop);
  
    let idList = shop.map(el => el.id).join();
  
    $.ajax({
      url: '../interface/shop.php',
      data: { idList },
      type: 'get',
      dataType: 'json'
    }).then(res => {
      let template = '';
      res.forEach(el => {
        let picture = JSON.parse(el.picture);
  
        let current = shop.filter(elm => elm.id == el.id);
  
        template += `<div class="list1">
        <div class="shop-info">
            <input type="checkbox" name="" id="" checked>&nbsp;&nbsp;店铺：
            <a href="">小小木苗</a>
            <span>
                <a href=""></a>
            </span>
        </div>
        <div class="shop-content">
            <ul>
                <li class="td-chk">
                    <input type="checkbox" name="" id="" class="check" checked>
                </li>
                <li class="td-item">
                    <div class="td-inner">
                        <div class="item-pic ">
                            <a href="" target="_blank">
                                <img src="./${picture[0].src}" class="">
                            </a>
                        </div>
                        <div class="item-info">
                            <div class="item-basic-info">
                                <a href="" target="_blank" class="item-title">${el.title}</a>
                            </div>
                            <div class="item-other-info">
                                <div class="promo-logos"></div>
                                <div class="item-icon-list clearfix">
                                    <div class="item-icons">
                                        <a href="" target="_blank" class="item-icon">
                                            <img src="./img/shop4.png" alt="">
                                        </a>
                                        <a href="" target="_blank" class="item-icon" title="不支持7天无理由">
                                            <img src="./img/shop6.png" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="item-tips"></div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="td-info">
                    <div class="item-props">
                        <p class="sku-line" tabindex="0">颜色分类：随机一盒</p>
                    </div>
                </li>
                <li class="td-price">
                    <div class="td-inner">
                        <em class="price-now" tabindex="0">￥${parseFloat(el.price).toFixed(2)}</em>
                    </div>
                </li>
                <li class="td-amount">
                    <div class="td-inner">
                        <a href="javascript:void(0)" data-id="${el.id}" class="a1">-</a>
                        <input type="text"   id="num" value="${current[0].num}">
                        <a href="javascript:void(0)" data-id="${el.id}" class="a2">+</a>
                    </div>
                </li>
                <li class="td td-price td-sum">
                    <div class="td-inner">
                        <em class="price-now sum-now" tabindex="0">￥${(el.price * current[0].num).toFixed(2)}</em>
                    </div>
                </li>
                <li class="td td-op">
                    <div class="td-inner">
                        <a title="移入收藏夹" class="btn-fav=" href="#">移入收藏夹</a>
                        <a href="javascript:;" class="btn-del" data-id="${el.id}">删除</a>
                    </div>
        </div>
        </li>
        </ul>
    </div>`
      });
  
      $('.main-list').html(template);
  
      $('.btn-del').on('click', function () {
        let result = shop.filter(el => el.id != $(this).attr('data-id'));
        cookie.set('shop', JSON.stringify(result));
        location.reload();
      });
      

      $('.td-inner .a1').on('click', function(){
        let index = shop.findIndex(elm => elm.id == $(this).attr('data-id'));
        let count = parseInt(shop[index].num);
        shop[index].num = parseInt(shop[index].num) - 1;
        cookie.set('shop', JSON.stringify(shop));
        location.reload();
      })
      $('.td-inner .a2').on('click', function(){
        let index = shop.findIndex(elm => elm.id == $(this).attr('data-id'));
        let count = parseInt(shop[index].num);
        shop[index].num = parseInt(shop[index].num) + 1;
        cookie.set('shop', JSON.stringify(shop));
        location.reload();
      })


      console.log(shop);
      console.log(res);
      let allsum = 0;
      res.map(function(el,i){
          let price = parseFloat(el.price);
          let num = parseFloat(shop[i].num);
          let sum = price*num ;
          allsum += sum;
          
      })
      console.log(allsum.toFixed(2));
      $('.total-symbol').html('￥' + allsum.toFixed(2));

    }).catch(xhr => {
      console.log(xhr.status);
    });

  });


 