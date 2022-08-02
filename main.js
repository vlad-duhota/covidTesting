
// call anim function on window resize
window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 992px)").matches) {
        anim();
    } else {
        return;
    }
});

// call anim function on document ready function
$(document).ready(function () {
    $('body').addClass('no-scroll');
    setTimeout(function () {
        $('body').removeClass('no-scroll');
        }, 5000); // время в мс
        
    if (window.matchMedia("(min-width: 992px)").matches) {
        anim();
    } else {
        return;
    }
});

// conditions object
let conditions = {
    // percents
    nums: {
        var1: 16,
        var2: 36,
        var3: 60,
    },
    // flags
    objects_flags: {
        var1: '.flag_1',
        var2: '.flag_2',
        var3: '.flag_3',
    },
    // text list items
    objects_items: {
        var1: '.car__item_1',
        var2: '.car__item_2',
        var3: '.car__item_3',
    }
}

// animation function
function anim() {
    $(window).scroll(function () {
        var scrollY = window.scrollY - 175;
        // if user scrolled to anim section
        if (scrollY > 0) {
            // calc value
            var width = $('.car').css('width').replace('px', '');
            var value = scrollY / width * 350;
            $('.car-img').css("left", value * .3 + "%")
            $('.car').addClass('fixed');
            // conditions check
            for (let key in conditions.nums) {
                if (value * .3 > conditions.nums[key]) {
                    // add classes if condition true
                    $(conditions.objects_flags[key]).addClass('active');
                    $(conditions.objects_items[key]).addClass('active');
                }else{
                    // remove classes if condition false
                    $(conditions.objects_flags[key]).removeClass('active');
                    $(conditions.objects_items[key]).removeClass('active');
                }
            }
            // if anim has been ended
            if (value * .3 > 84) {
                // null values and remove class
                $('.car').removeClass('fixed');
                value = 0
            }
        } else {
            $('.car').removeClass('fixed');
        }
    });
}

// observer options
const options = {
    // родитель целевого элемента - область просмотра
    root: null,
    // без отступов
    rootMargin: '0px',
    // процент пересечения - половина изображения
    threshold: .75
}

// observer location section
const location_observer = new IntersectionObserver((entries, observer) => {
    // для каждой записи-целевого элемента
    entries.forEach(entry => {
        // если элемент является наблюдаемым
        if (entry.isIntersecting) {
            $('.location__img path').addClass('anim');
        }
    })
}, options)

// observer faq section
const faq_observer = new IntersectionObserver((entries, observer) => {
    // для каждой записи-целевого элемента
    entries.forEach(entry => {
        // если элемент является наблюдае
        if (entry.isIntersecting) {
            $('.faq__img path').addClass('anim');
        }
    })
}, options)

// call observers
location_observer.observe(document.querySelector('.location'));
faq_observer.observe(document.querySelector('.faq__img'));


// pop up form function
function form(has_next, has_prev, th, open_btn, close_btn, prev_btn, next_btn) {
    if (has_next) {
        $(th).change(function () {
            $(next_btn).addClass('active');
        });
    }
    if (has_prev) {
        $(prev_btn).click(function (e) {
            e.preventDefault();
            $(th).removeClass('active');
        });
    }
    $(open_btn).click(function (e) {
        e.preventDefault();
        $('body').addClass('no-scroll');
        $(th).addClass('active');
    })
    $(close_btn).click(function (e) {
        e.preventDefault();
        $('body').removeClass('no-scroll');
        $('.pop-up').removeClass('active');
    })
}



// call pop-up forms functions
form(true, false, '.pop-up_1', '.book', '.close-btn_1', '', '.pop-up__next_1');
form(true, true, '.pop-up_2', '.pop-up__next_1', '.close-btn_2', '.pop-up__prev_1', '.pop-up__next_2');
form(false, true, '.pop-up_3', '.pop-up__next_2', '.close-btn_3', '.pop-up__prev_2', '');

// pop up 3 data get test variation on first form change function
$('.pop-up_1').change(function () {
    var name = $('.services__input:checked').attr("data-name");
    var time = $('.services__input:checked').attr("data-time");
    $('.test__title').text(name);
    $('.test__time').text(time);
});