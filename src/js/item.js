window.onload = function () {

}

$(function () {
    // 获得商品id
    // 商品id在url的search部分

    let id = location.search.split('=')[1];

    $.ajax({
        url: '../interface/getitem.php',
        type: 'get',
        data: {
            id
        },
        dataType: 'json'
    }).then(res => {
        var biger = document.getElementById('biger');
        var main = document.getElementById('main');
        var smaller = document.getElementById('smaller');
        var mask = document.getElementById('mask');
        var wrap = biger.parentNode;
        let pic = JSON.parse(res.picture);
        var imgArr = [{
                "path": `./${pic[0].src}`
            },
            {
                "path": `./${pic[1].src}`
            },
            {
                "path": `./${pic[2].src}`
            },
            {
                "path": `./${pic[3].src}`
            },
        ];
        var imgSum = imgArr.length;
        if (imgSum > 4) {
            imgSum = 4;
        }
        for (var i = 0; i < imgSum; i++) {
            var lis = document.createElement('li');
            var imgs = document.createElement('img');
            imgs.src = imgArr[i].path;
            lis.appendChild(imgs);
            smaller.appendChild(lis);
        }
        var mainImg = document.createElement('img');
        var bigImg = document.createElement('img');
        var liArr = smaller.children;
        bigImg.src = mainImg.src = liArr[0].children[0].src;
        main.insertBefore(mainImg, mask);
        biger.appendChild(bigImg);
        var bigPic = biger.children[0];
        liArr[0].className = 'current';
        for (var i = 0; i < liArr.length; i++) {
            liArr[i].index = i;
            liArr[i].onmouseenter = function () {
                this.className = 'current';
                bigPic.src = main.children[0].src = this.children[0].src;
                for (var j = 0; j < liArr.length; j++) {
                    if (this != liArr[j]) {
                        liArr[j].removeAttribute('class');
                        liArr[j].removeAttribute('className');
                    }
                }
            }
        }
        main.onmouseenter = function () {
            mask.style.display = 'block';
            biger.style.display = 'block';
        }
        main.onmouseleave = function () {
            mask.style.display = 'none';
            biger.style.display = 'none';
        }
        main.onmousemove = function (e) {
            var e = e || window.event;
            var pagex = e.pageX || scroll().left + e.clientX;
            var pagey = e.pageY || scroll().top + e.clientY;
            pagex = pagex - wrap.offsetLeft - mask.offsetWidth;;
            pagey = pagey - wrap.offsetTop - mask.offsetHeight - 100;
            if (pagex < 0) {
                pagex = 0;
            }
            if (pagey < 0) {
                pagey = 0;
            }
            if (pagex > main.offsetWidth - mask.offsetWidth) {
                pagex = main.offsetWidth - mask.offsetWidth;
            }
            if (pagey > main.offsetHeight - mask.offsetHeight) {
                pagey = main.offsetHeight - mask.offsetHeight;
            }
            mask.style.left = pagex + 'px';
            mask.style.top = pagey + 'px';
            var scale = (bigPic.offsetWidth - biger.offsetWidth) / (main.offsetWidth - mask.offsetWidth);
            var xx = pagex * scale;
            var yy = pagey * scale;
            bigPic.style.left = -xx + 'px';
            bigPic.style.top = -yy + 'px';
        }

        $('.infos .title h3').html(`${res.title}`);
        $('.infos .meta .prc').html(`${res.price}`);
        $('.isku .nums').html(`${res.num}`);
        $('.main-wrap').html(`${res.details}`);
        $('.valid .a2').on('click',function(){
            addItem(res.id, $('#num').val());
        });



    }).catch(xhr => {
        console.log(xhr.status);
    });

});

// 向cookie中添加一项内容
// cookie存储的是 键值对 数据类型是 字符串

// 在cookie中存储JSON字符串 是最好的方式
// shop=[{"id":"100001","num":3},{"id":"100002","num":1}]
function addItem(id, num) {
    let product = { id, num };
  
    let shop = cookie.get('shop'); // 从cookie中读取shop
    // 在cookie中读取到的数据是字符串类型
  
    // 判断当前购物车是否有数据
    if (shop) {
      // 购物车已有数据
      shop = JSON.parse(shop);
  
      // 判断当前商品在购物车中是否已经存在 如果存在则修改数量 不存在则添加
      if (shop.some(el => el.id == id)) {
        // 判断出商品存在 需要修改这个商品id对应的num数据
        let index = shop.findIndex(elm => elm.id == id); // 找到当前商品的索引
        let count = parseInt(shop[index].num); // 当前该商品的数量
        count += parseInt(num);
        shop[index].num = count;
      } else {
        shop.push(product);
      }
  
    } else {
      shop = [];
      shop.push(product);
    }
    
    cookie.set('shop', JSON.stringify(shop));
  }