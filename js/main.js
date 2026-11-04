/* main */
(function () {
  var b = document.querySelector('.menu-btn');
  var u = document.querySelector('.nav ul');

  if (b && u) {
    b.addEventListener('click', function () {
      u.classList.toggle('open');
    });
  }

  var t = document.getElementById('top');

  if (t) {
    window.addEventListener('scroll', function () {
      t.style.display = window.pageYOffset > 400 ? 'block' : 'none';
    });
    t.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var nums = document.querySelectorAll('[data-count]');

  function run(el) {
    var end = +el.getAttribute('data-count');
    var n = 0;
    var step = Math.max(1, Math.round(end / 60));
    var timer = setInterval(function () {
      n += step;

      if (n >= end) {
        n = end;
        clearInterval(timer);
      }

      el.textContent = n;
    }, 25);
  }

  if (nums.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          run(e.target);
        }
      });
    }, { threshold: .5 });

    nums.forEach(function (n) {
      io.observe(n);
    });
  } else {
    nums.forEach(function (n) {
      n.textContent = n.getAttribute('data-count');
    });
  }
})();

/* journey */
(function () {
  var data = [
    {
      d: '1934年11月',
      t: '南梁 · 陕甘边根据地',
      x: '陕甘边区革命委员会在南梁成立，西北地区的红色火种在陇东高原扎下根来，为后来红军落脚西北奠定了基础。'
    },
    {
      d: '1935年9月',
      t: '迭部 · 俄界会议',
      x: '红军翻越雪山草地进入甘南迭部，在俄界召开会议，统一思想、整编队伍，明确继续北上。'
    },
    {
      d: '1935年9月',
      t: '腊子口 · 天险突破',
      x: '腊子口两崖壁立、一水中流。红军指战员奋勇强攻，打开了北上入甘的通道，这是长征途中极为关键的一仗。'
    },
    {
      d: '1935年9月',
      t: '哈达铺 · 转折驿站',
      x: '红军在宕昌哈达铺休整，从报纸上获知陕北有红军和根据地，坚定了落脚陕北的决心，这里被称为长征的转折点之一。'
    },
    {
      d: '1936年10月',
      t: '会宁 · 三军会师',
      x: '红一、二、四方面军在会宁胜利会师，宣告长征胜利结束。城楼上的欢呼，至今仍回响在黄土高原。'
    },
    {
      d: '1936年10月起',
      t: '河西走廊 · 西路军',
      x: '红西路军西渡黄河，转战河西走廊，在极其艰苦的条件下浴血奋战，书写了悲壮的英雄篇章。'
    }
  ];

  var i = 0;
  var nodes = document.querySelectorAll('.node');
  var lis = document.querySelectorAll('.tl li');
  var D = document.getElementById('pd');
  var T = document.getElementById('pt');
  var X = document.getElementById('px');
  var C = document.getElementById('pc');

  function show(n) {
    i = (n + data.length) % data.length;
    D.textContent = data[i].d;
    T.textContent = data[i].t;
    X.textContent = data[i].x;
    C.textContent = (i + 1) + ' / ' + data.length;

    nodes.forEach(function (e, k) {
      e.classList.toggle('on', k === i);
    });
    lis.forEach(function (e, k) {
      e.classList.toggle('on', k === i);
    });
  }

  nodes.forEach(function (e, k) {
    e.addEventListener('click', function () {
      show(k);
    });
    e.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        show(k);
      }
    });
  });

  lis.forEach(function (e, k) {
    e.addEventListener('click', function () {
      show(k);
    });
  });

  document.getElementById('prev').addEventListener('click', function () {
    show(i - 1);
  });
  document.getElementById('next').addEventListener('click', function () {
    show(i + 1);
  });

  show(0);
})();

/* fields */
(function () {
  var rows = document.querySelectorAll('#tab tbody tr');
  var note = document.getElementById('note');

  rows.forEach(function (r) {
    r.addEventListener('click', function () {
      rows.forEach(function (x) {
        x.classList.remove('on');
      });
      r.classList.add('on');
      note.textContent = r.getAttribute('data-n');
    });
  });

  var b = document.getElementById('bn');
  setTimeout(function () {
    b.style.width = b.getAttribute('data-w') + '%';
  }, 300);
})();

/* spirit */
(function () {
  document.querySelectorAll('.flip').forEach(function (c) {
    c.addEventListener('click', function () {
      c.classList.toggle('on');
    });
  });

  var inp = document.getElementById('pledge');
  var nm = document.getElementById('who');
  var ul = document.getElementById('notes');
  var err = document.getElementById('err');

  document.getElementById('add').addEventListener('click', function () {
    var v = inp.value.trim();
    var n = nm.value.trim() || '一名农大学子';

    if (!v) {
      err.textContent = '请先写下你的寄语，再点亮红星。';
      return;
    }

    err.textContent = '';

    var li = document.createElement('li');
    var s = document.createElement('small');
    li.textContent = '★ ' + v;
    s.textContent = '—— ' + n;
    li.appendChild(s);
    ul.insertBefore(li, ul.firstChild);
    inp.value = '';
  });
})();

/* quiz */
(function () {
  var qs = [
    {
      q: '红军长征中，攻克“天险”腊子口发生在哪个省份？',
      o: ['四川', '甘肃', '陕西'],
      a: 1,
      e: '腊子口位于甘肃迭部，1935年9月红军在此突破天险。'
    },
    {
      q: '红军在甘肃宕昌哈达铺获知了什么重要消息？',
      o: ['敌军主力位置', '陕北有红军和根据地', '粮食补给点'],
      a: 1,
      e: '哈达铺的休整让红军确定了落脚陕北的方向。'
    },
    {
      q: '红一、二、四方面军会师于哪里？',
      o: ['会宁', '延安', '遵义'],
      a: 0,
      e: '1936年10月，三大主力红军在甘肃会宁会师。'
    },
    {
      q: '“陕甘边革命根据地”的核心区域南梁位于哪个地区？',
      o: ['河西走廊', '陇东', '甘南'],
      a: 1,
      e: '南梁位于今庆阳市华池县，属陇东地区。'
    },
    {
      q: '红西路军西渡黄河后主要转战在哪里？',
      o: ['河西走廊', '江南水乡', '云贵高原'],
      a: 0,
      e: '西路军在河西走廊艰苦转战，付出巨大牺牲。'
    },
    {
      q: '甘肃农业大学的前身国立兽医学院创立于哪一年？',
      o: ['1939年', '1946年', '1958年'],
      a: 1,
      e: '1946年10月，国立兽医学院在兰州小西湖创立。'
    },
    {
      q: '1958年学校合并成立甘肃农业大学后，迁到了哪里？',
      o: ['武威黄羊镇', '天水', '酒泉'],
      a: 0,
      e: '迁到武威县黄羊镇，1981年经国务院批准迁回兰州。'
    },
    {
      q: '陇油系列冬油菜品种把种植区域向北推了多少个纬度？',
      o: ['3个', '8个', '13个'],
      a: 2,
      e: '报道称，陇油系列超强抗寒品种使冬油菜种植区北移13个纬度。'
    }
  ];

  var i = 0;
  var score = 0;
  var box = document.getElementById('box');
  var bar = document.getElementById('bar');

  function render() {
    if (i >= qs.length) {
      var msg = score === qs.length
        ? '满分！红色记忆，你已了然于心。'
        : score >= 3
          ? '不错！再去看看长征路线，会有更多收获。'
          : '继续加油！先回到长征路和甘农路重温一遍吧。';

      box.innerHTML = '<h3>答题完成：' + score + ' / ' + qs.length + '</h3><p>' + msg +
        '</p><button class="btn" id="again">再答一次</button> ' +
        '<a class="btn ghost" href="#journey">重温长征路</a>';
      bar.style.width = '100%';

      document.getElementById('again').addEventListener('click', function () {
        i = 0;
        score = 0;
        render();
      });
      return;
    }

    var q = qs[i];
    bar.style.width = (i / qs.length * 100) + '%';
    box.innerHTML = '<h3>第' + (i + 1) + '题：' + q.q + '</h3>';

    q.o.forEach(function (t, k) {
      var b = document.createElement('button');
      b.className = 'opt';
      b.textContent = String.fromCharCode(65 + k) + '. ' + t;
      b.addEventListener('click', function () {
        pick(k);
      });
      box.appendChild(b);
    });

    var f = document.createElement('p');
    f.id = 'fb';
    box.appendChild(f);
  }

  function pick(k) {
    var q = qs[i];
    var bs = box.querySelectorAll('.opt');

    bs.forEach(function (b, n) {
      b.disabled = true;
      if (n === q.a) {
        b.classList.add('ok');
      }
    });

    if (k === q.a) {
      score++;
    } else {
      bs[k].classList.add('bad');
    }

    document.getElementById('fb').textContent =
      (k === q.a ? '回答正确。' : '再想想。') + q.e;

    var nx = document.createElement('button');
    nx.className = 'btn';
    nx.textContent = i === qs.length - 1 ? '查看结果' : '下一题';
    nx.addEventListener('click', function () {
      i++;
      render();
    });
    box.appendChild(nx);
  }

  render();
})();

/* 路由与图片配置 */
(function () {
  /* 网络图片：在 src 填图片地址、credit 填出处，即可替换原创插图；加载失败会自动回退 */
  var PHOTOS = {
    journey: { src: '', credit: '' },
    campus: { src: '', credit: '' },
    field: { src: '', credit: '' }
  };

  document.querySelectorAll('img[data-slot]').forEach(function (img) {
    var c = PHOTOS[img.getAttribute('data-slot')];
    var old = img.getAttribute('src');
    var cap = img.parentNode.querySelector('.cap');
    var oldCap = cap.textContent;

    if (!c || !c.src) {
      return;
    }

    img.onerror = function () {
      img.onerror = null;
      img.src = old;
      cap.textContent = oldCap;
    };
    img.src = c.src;
    cap.textContent = '图片来源：' + (c.credit || '网络');
  });

  var views = document.querySelectorAll('.view');
  var links = document.querySelectorAll('.nav li a');
  var names = ['home', 'journey', 'campus', 'fields', 'spirit', 'quiz'];
  var titles = {
    home: '红色甘农',
    journey: '长征路 - 红色甘农',
    campus: '甘农路 - 红色甘农',
    fields: '田间答卷 - 红色甘农',
    spirit: '精神传承 - 红色甘农',
    quiz: '红色答题 - 红色甘农'
  };

  function go() {
    var h = location.hash.replace('#', '');
    if (names.indexOf(h) < 0) {
      h = 'home';
    }

    views.forEach(function (v) {
      v.classList.toggle('on', v.id === h);
    });
    links.forEach(function (a) {
      a.classList.toggle('on', a.getAttribute('data-v') === h);
    });

    document.title = titles[h];
    window.scrollTo(0, 0);

    var ul = document.querySelector('.nav ul');
    if (ul) {
      ul.classList.remove('open');
    }

    var b = document.getElementById('bn');
    if (b) {
      b.style.width = '0';
      if (h === 'fields') {
        setTimeout(function () {
          b.style.width = b.getAttribute('data-w') + '%';
        }, 300);
      }
    }
  }

  window.addEventListener('hashchange', go);
  go();
})();
