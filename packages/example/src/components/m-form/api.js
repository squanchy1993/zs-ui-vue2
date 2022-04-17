/*
 * @Author: your name
 * @Date: 2022-04-17 12:08:34
 * @LastEditTime: 2022-04-17 12:36:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue/packages/example/src/components/m-form/api.js
 */

// 创建或修改
export function getBookList() {
  return new Promise((resolve) => {
    const data = {
      list: [
        {
          id: 1,
          uuid: '99956220fb3311eb9ccceb357ad2bc2f',
          name: '百年孤独',
          author: '加西亚·马尔克斯',
          book_id: '11581424',
          cover: '7e93ee60fb3311eb9ccceb357ad2bc2f',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:08:04.000Z',
          updated_time: '2022-03-14T08:54:10.000Z',
          author_prefile:
                        '加西亚·马尔克斯（García Márquez），哥伦比亚著名作家，魔幻现实主义文学代表人物。  　　1927年出生于哥伦比亚马格达莱纳海滨小镇阿拉卡塔卡。童年与外祖父母一起生活。1936年随父母迁居苏克雷。1947年考入波哥大国立大学。1948年因内战辍学，进入报界。五十年代开始出版文学作品。六十年代初移居墨西哥。1967年出版《百年孤独》。1982年获诺贝尔文学奖。  　　主要作品有长篇小说《百年孤独》、《族长的没落》、《霍乱时期的爱情》、《迷宫中的将军》、《苦妓追忆录》，中篇小说《枯枝败叶》、《恶时辰》《没有人给他写信的上校》、《一件事先张扬的凶杀案》，短篇小说集《蓝宝石般的眼睛》、《格兰德大妈的葬礼》等。  　　作为魔幻现实主义文学的代表作，《百年孤独》酝酿达十数年之久，1965年开始创作，1967年出版，在拉丁美洲乃至全球引起巨大轰动，被誉为“再现拉丁美洲社会历史图景的鸿篇巨著”、“值得全人类阅读的文学巨著”。',
          book_prefile:
                        '《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云变幻的历史。作品融入神话传说、民间故事、宗教典故等神秘因素，巧妙地糅合了现实与虚幻，展现出一个瑰丽的想象世界，成为20世纪重要的经典文学巨著之一。1982年加西亚·马尔克斯获得诺贝尔文学奖，奠定世界级文学大师的地位，很大程度上乃是凭借《百年孤独》的巨大影响。',
          banner:
                        'b2385490317a11ec9a38f70c463259f5,bb130600317a11ec9a38f70c463259f5,c0367bd0317a11ec9a38f70c463259f5,c91c77e0317a11ec9a38f70c463259f5',
          book_detail: '44860e10317a11ec9a38f70c463259f5',
          publish_time: '2011-06-11',
          publisher: '南海出版公司',
          category_uuid: '99956220fb3311eb9ccceb357ad2bc2f',
          sale_tag: [
            {
              id: 66,
              uuid: '32d153409eae11ec879a09ecfebd6b21',
              name: '教辅',
              deleted: 0,
              created_time: '2022-03-08T07:05:55.000Z',
              updated_time: '2022-03-08T07:05:55.000Z',
              value: 'l0hsg6t08sk',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:28:56.000Z',
                updated_time: '2022-03-10T02:28:56.000Z',
                book_uuid: '99956220fb3311eb9ccceb357ad2bc2f',
                sale_tag_uuid: '32d153409eae11ec879a09ecfebd6b21'
              }
            },
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:22:03.000Z',
                updated_time: '2022-03-10T02:22:03.000Z',
                book_uuid: '99956220fb3311eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            }
          ],
          category_info: {
            uuid: '99956220fb3311eb9ccceb357ad2bc2f',
            title: '其他'
          },
          sale_tag_uuids: [
            '32d153409eae11ec879a09ecfebd6b21',
            'c70689f04ac511ec8ce49f72480132d9'
          ]
        },
        {
          id: 2,
          uuid: 'b4ca41f0fb3311eb9ccceb357ad2bc2f',
          name: '沉默的病人1',
          author: '[英]亚历克斯·麦克利兹',
          book_id: '47509149',
          cover: 'a0e15d40fb3311eb9ccceb357ad2bc2f',
          borrow_state: 2,
          deleted: 0,
          created_time: '2021-10-19T07:08:48.000Z',
          updated_time: '2022-04-01T03:21:04.000Z',
          author_prefile:
                        'Alex Michaelides  悬疑界横空出世的超新星。百万级畅销书作家、编剧。父亲是希腊裔塞浦路斯人，母亲是英国人。拥有剑桥大学英语文学硕士学位与美国电影学院编剧艺术硕士学位。  2019年，亚历克斯出版了第一本小说《沉默的病人》，瞬间引爆沉默多时 的欧美悬疑推理界。《沉默的病人》一出版，即登上《纽约时报》畅销榜，此后霸占榜单长达392天之久。目前，《沉默的病人》在世界范围内印量已突破300万册，热销45国。  阿加莎·克里斯蒂是亚历克斯的偶像，他十二岁时读了《无人生还》，从此一发不可收，强迫症般读完了克里斯蒂的所有小说。  希腊神话是亚历克斯永恒的灵感。希腊神话中的命运纠葛，以及其暗合的心理学理论，都深深地吸引着他，引导他在小说中注入希腊神话般的深刻内核。  在《沉默的病人》中，亚历克斯将克里斯蒂式的推理与过硬的心理学知识相结合，完成了这本推理界的独特...',
          book_prefile:
                        '世界狂销300万册的烧脑悬疑神作！  多少看似完美的夫妻，都在等待杀死对方的契机。  ——————  杀死丈夫时，艾丽西亚33岁。  她往丈夫脸上连开五枪，从此不再说一个字。她被精神诊所收容，成为臭名昭著的“沉默的病人”，唯一留给外界的，只有一副诡异的自画像。  我，心理治疗师西 奥，被她的故事所吸引，希望能通过心理 治疗，帮助她走出沉默的死局。我确信，只有她能述说真相，只有我能使她开口。  哪怕艾丽西亚的沉默背后，是远超我想象的黑暗深渊，正引诱我步步深入，直到万劫不复……  当她真的开始述说真相，我又真的有胆量倾听吗？  ——————  多少看似完美的夫妻，都在等待杀死对方的契机。  一起残酷的谋杀，一则诡异的希腊神话；一段漫长的沉默，一场致命的心理治疗！',
          banner:
                        'ccb5aec0317b11ec9a38f70c463259f5,d23ffcb0317b11ec9a38f70c463259f5,d6814fe0317b11ec9a38f70c463259f5,d90b7d30317b11ec9a38f70c463259f5',
          book_detail: '05a703a0317c11ec9a38f70c463259f5,0f10aea0317c11ec9a38f70c463259f5',
          publish_time: '2020-12',
          publisher: '河南文艺出版社',
          category_uuid: '99956220fb3311eb9ccceb357ad2bc2f',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: 'b4ca41f0fb3311eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            }
          ],
          category_info: {
            uuid: '99956220fb3311eb9ccceb357ad2bc2f',
            title: '其他'
          },
          sale_tag_uuids: ['c70689f04ac511ec8ce49f72480132d9']
        },
        {
          id: 3,
          uuid: 'd5a66d90fb3311eb9ccceb357ad2bc2f',
          name: '哈利·波特与魔法石',
          author: '[英]J.K.罗琳',
          book_id: '85582675',
          cover: 'b97d1ba0fb3311eb9ccceb357ad2bc2f',
          borrow_state: 3,
          deleted: 0,
          created_time: '2021-10-19T07:09:32.000Z',
          updated_time: '2022-03-03T14:57:40.000Z',
          author_prefile:
                        'J.K.罗琳是畅销书“哈利?波特”系列的作者，该系列小说深受读者喜爱，屡创销量纪录。迄今为止，“哈利?波特”系列销量已逾500,000,000册，被翻译成80种语言，并被改编成8部好莱坞大片。J.K.罗琳还为慈善组织撰写过3部“哈利?波特”系列衍生作品，分别是《神奇的魁地奇球》《神奇动物在哪里》（用于资助喜剧救济基金会和“荧光闪烁”）以及《诗翁彼豆故事集》（用于资助“荧光闪烁”）。她还创作了一部以《神奇动物在哪里》为灵感来源的电影剧本，该影片开启了“神奇动物在哪里”电影系列（共5部）。她与他人合作的舞台剧《哈利?波特与被诅咒的孩子》（第一部和第二部）于2016年夏天在伦敦西区上演。2012年，J.K.罗琳正式推出数字化公司Pottermore，哈迷们可以在网站上浏览新闻、专题和文章，更可以畅读她的原创内容。J.K.罗琳还为成年读者写过小说《偶发空缺》，并以笔名罗伯特?加尔布雷思创作过推理小说。她曾荣获众多奖项和荣誉，其中包括表彰她为儿童文学做出巨大贡献的大英帝国勋章、法国荣誉军团勋章，以及安徒生文学奖。',
          book_prefile:
                        ' 书目 哈利·波特与魔法石 哈利·波特与魔法石 作者 [英]J.K.罗琳 著；马爱农、马爱新 译 出版社 人民文学出版社 出版时间 2018年10月 第1版 ISBN 9787020144532 定价 42.00 内容简介 迄今为止，哈利?波特的人生中没有魔法。他和一点都不友善的德思礼夫妇，还有他们令人厌恶的儿子达力住在一起。哈利的房间是一个窄小的储物间，就在楼梯下面，而且十一年来他从未有过生日派对。但是有一天，猫头鹰信使突然送来一封神秘的信件，令人不敢相信的是，信里附着一张来自霍格沃茨魔法学校的录取哈利入学的通知书。哈利于九月一日带着他的猫头鹰乘着特快列车来到魔法学校。在学校里，他遇到了他一生中两个最好的朋友，体验了骑着飞天扫帚打球的运动，从课堂上和生活中的所有事物里学到了魔法。不仅如此，他还得知自己将有一个伟大而不可思议的命运……不过，他要先让自己死里逃生才行……“沉湎于虚幻的梦想，而忘记现实的生活，这是毫无益处的，千万记住。”——阿不思·邓布利多 作者简介 J.K.罗琳J.K.罗琳是畅销书“哈利?波特”系列的作者，该系列小说深受读者喜爱，屡创销量纪录。迄今为止，“哈利?波特”系列销量已逾500,000,000册，被翻译成80种语言，并被改编成8部好莱坞大片。J.K.罗琳还为慈善组织撰写过3部“哈利?波特”系列衍生作品，分别是《神奇的魁地奇球》《神奇动物在哪里》（用于资助喜剧救济基金会和“荧光闪烁”）以及《诗翁彼豆故事集》（用于资助“荧光闪烁”）。她还创作了一部以《神奇动物在哪里》为灵感来源的电影剧本，该影片开启了“神奇动物在哪里”电影系列（共5部）。她与他人合作的舞台剧《哈利?波特与被诅咒的孩子》（第一部和第二部）于2016年夏天在伦敦西区上演。2012年，J.K.罗琳正式推出数字化公司Pottermore，哈迷们可以在网站上浏览新闻、专题和文章，更可以畅读她的原创内容。J.K.罗琳还为成年读者写过小说《偶发空缺》，并以笔名罗伯特?加尔布雷思创作过推理小说。她曾荣获众多奖项和荣誉，其中包括表彰她为儿童文学做出巨大贡献的大英帝国勋章、法国荣誉军团勋章，以及安徒生文学奖。 目录 在售商品 1124家店有售 新书762家￥2.00起 综合价格品相店铺 只看全新 哈利·波特与魔法石 哈利·波特与魔法石 ￥ 27.91 全新 快递6.50元 桑梓图书专营书城 > 哈利·波特与魔石+百科全书 儿童文学 (英)j.k.罗琳(j.k.rowling) 新华正版 哈利·波特与魔石+百科全书 儿童文学 (英)j.k.罗琳(j.k.rowling) 新华正版 ￥ 108.60 全新 快递5.50元 智胜图书专营店 > 哈利·波特与魔法石 哈利·波特与魔法石 ￥ 17.64 全新 快递7元 齐鲁淘宝书店 > 新书--哈利·波特与魔法石 新书--哈利·波特与魔法石 ￥ 27.78 全新 快递7元 齐鲁淘宝书店 > 哈利·波特与魔法石（《语文》教材推荐阅读书目，外国儿童文学经典，新英国版封面平装版） 哈利·波特与魔法石（《语文》教材推荐阅读书目，外国儿童文学经典，新英国版封面平装版） ￥ 23.50 九品 快递5.50元 粤读二手书店 > 哈利·波特与魔法石 哈利·波特与魔法石 ￥ 3.00 八五品 快递5元 自有来书店 > 哈利·波特与魔法石+百科全书(英)J.K.罗琳|译者:苏农人民文学出版社 等9787020144532童书 哈利·波特与魔法石+百科全书(英)J.K.罗琳|译者:苏农人民文学出版社 等9787020144532童书 ￥ 108.90 全新 快递5元 文轩图书旗舰店 > 哈利·波特与魔法石 哈利·波特与魔法石 ￥ 5.00 八五品 快递8元 昆明齐全书店 > 哈利·波特与魔法石 哈利·波特与魔法石 ￥ 15.00 八五品 快递包裹5元 满50.00包邮 天雅轩书店 > 哈利·波特与魔法石 哈利·波特与魔法石 ￥ 15.44 九五品 快递7元 华夏书屋 > —  END  —  内容简介作者简介目录 迄今为止，哈利?波特的人生中没有魔法。他和一点都不友善的德思礼夫妇，还有他们令人厌恶的儿子达力住在一起。哈利的房间是一个窄小的储物间，就在楼梯下面，而且十一年来他从未有过生日派对。 但是有一天，猫头鹰信使突然送来一封神秘的信件，令人不敢相信的是，信里附着一张来自霍格沃茨魔法学校的录取哈利入学的通知书。 哈利于九月一日带着他的猫头鹰乘着特快列车来到魔法学校。在学校里，他遇到了他一生中两个最好的朋友，体验了骑着飞天扫帚打球的运动，从课堂上和生活中的所有事物里学到了魔法。不仅如此，他还得知自己将有一个伟大而不可思议的命运…… 不过，他要先让自己死里逃生才行…… “沉湎于虚幻的梦想，而忘记现实的生活，这是毫无益处的，千万记住。” ——阿不思·邓布利多',
          banner:
                        'd3f446f0317c11ec9a38f70c463259f5,d681a890317c11ec9a38f70c463259f5,d914fda0317c11ec9a38f70c463259f5',
          book_detail: '4bcd6df0317d11ec9a38f70c463259f5',
          publish_time: ' 2018年10月 第1版',
          publisher: '人民文学出版社',
          category_uuid: '99956220fb3311eb9ccceb357ad2bc2f',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: 'd5a66d90fb3311eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            },
            {
              id: 65,
              uuid: 'c46c6c209e8d11eca3fc0b2b5a46d40f',
              name: '奇幻小说',
              deleted: 0,
              created_time: '2022-03-08T03:13:46.000Z',
              updated_time: '2022-03-08T03:13:46.000Z',
              value: 'l0hk5n1ebos',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:28:12.000Z',
                updated_time: '2022-03-10T02:28:12.000Z',
                book_uuid: 'd5a66d90fb3311eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c46c6c209e8d11eca3fc0b2b5a46d40f'
              }
            },
            {
              id: 66,
              uuid: '32d153409eae11ec879a09ecfebd6b21',
              name: '教辅',
              deleted: 0,
              created_time: '2022-03-08T07:05:55.000Z',
              updated_time: '2022-03-08T07:05:55.000Z',
              value: 'l0hsg6t08sk',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:28:56.000Z',
                updated_time: '2022-03-10T02:28:56.000Z',
                book_uuid: 'd5a66d90fb3311eb9ccceb357ad2bc2f',
                sale_tag_uuid: '32d153409eae11ec879a09ecfebd6b21'
              }
            }
          ],
          category_info: {
            uuid: '99956220fb3311eb9ccceb357ad2bc2f',
            title: '其他'
          },
          sale_tag_uuids: [
            'c70689f04ac511ec8ce49f72480132d9',
            'c46c6c209e8d11eca3fc0b2b5a46d40f',
            '32d153409eae11ec879a09ecfebd6b21'
          ]
        },
        {
          id: 4,
          uuid: 'f0f787f0fb3311eb9ccceb357ad2bc2f',
          name: '价值共生：数字化时代的组织管理',
          author: '[中]陈春花',
          book_id: '25254682',
          cover: 'd8f30080fb3311eb9ccceb357ad2bc2f',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:10:12.000Z',
          updated_time: '2022-02-10T13:38:47.000Z',
          author_prefile:
                        ' 北京大学王宽诚讲席教授、国家发展研究院BiMBA商学院院长。华南理工大学工商管理学院教授。新华都商学院理事会理事长。新加坡国立大学商学院兼任教授。   先后出任新希望六和股份有限公司联席董事长兼首-席执行官，山东六和集团总裁，并于2017年、2016年、2015年连续三年入选《财富》“中国25位ZUI具影响力商界女性”，2016年入选《财富》ZUI具影响力50位商界领-袖榜单，2016年入选《清华管理评论》管理创新思想家，2015入选《福布斯》“中国ZUI具影响力的商界女性”TOP10。  其畅销著作《激活个体：互联时代的组织管理新范式》于2018年获得“第六届管理科学奖（学术类）”，其著作《激活组织》一书获得2017年DI12届书业年度评选“年度作者”大奖，其2015年的著作《经营的本质》获得第七届教育部高等学校人文社会科学优-秀著作二等奖。',
          book_prefile:
                        '北京大学国家发展研究院教授陈春花老师，通过十年数字化组织管理研究与实践，从个人和企业两个角度，把数字化时代的企业管理和个人成长之道拆分为：数字化及其对组织的影响、新个体、新“组织”、新价值、新知识5个部分。帮助人们透彻理解数字时代组织的本质和特点，认识组织的边界和新内涵；深刻理解领-先企业如何能在新环境下迅速崛起，帮助企业寻找新价值的来源；通过激发更多创造力，重新构建发挥个体和组织价值的效能，创造价值共生组织形态的企业，唯有如此，企业才能更好适应复杂、不确定的未来。   《价值共生 数字化时代的组织管理》以数字化生存为背景，尝试梳理数字技术带来变化的场景下，完整呈现新的组织管理体系，深入探索组织价值重构的未来。   从个人角度，给身处数字化时代的职场人提供了详细的职业规划解决方案，从工作内容到工作方式上都落脚在通过企业给自我赋能的基点上。通过对数字化时代的管理的解读，让读者认知到数字化时代超级个体，所需的基础能力。也充分说明了“个体”对于组织的价值，在数字化时代的组织发展中将成为关键。   从企业管理角度，针对数字化转型的困难，从工作环境、组织、目标3个方向，对企业管理者提出了：管理层需要做好四个改变、对管理层的三个要求、管理者要做好四件事。帮助企业管理者更好的把握数字化转变的4个关键节点：从管控到赋能、从科层固化到平台利他、从分工到协同共生、从实现组织目标到兼顾人的意义，促使企业完成数字化过程中的新功能、新结构、新能力、新目标的转变。   《价值共生 数字化时代的组织管理》针对数字化时代的管理真问题进行深入研究，既有新理论的阐述，让大家对企业组织受到的冲击有新的认识，还依托持续跟踪研究华为、腾讯、海尔、新希望六和等50多家中国优-秀企业，提出了切实可执行性的解决方案。',
          banner:
                        '151aa1f0317e11ec9a38f70c463259f5,1a2b5310317e11ec9a38f70c463259f5,1e2a1f00317e11ec9a38f70c463259f5,2175c790317e11ec9a38f70c463259f5',
          book_detail: '9965a050317d11ec9a38f70c463259f5',
          publish_time: ' 2021年4月 第1版',
          publisher: '人民邮电出版社',
          category_uuid: 'aac66c2043a811ecade355501eededd9',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: 'f0f787f0fb3311eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            }
          ],
          category_info: {
            uuid: 'aac66c2043a811ecade355501eededd9',
            title: '热门'
          },
          sale_tag_uuids: ['c70689f04ac511ec8ce49f72480132d9']
        },
        {
          id: 5,
          uuid: '15ee6bf0fb3411eb9ccceb357ad2bc2f',
          name: '平行宇宙',
          author: '[美]加来道雄 著；伍义生、包新周 译',
          book_id: '14336506',
          cover: 'f47a9430fb3311eb9ccceb357ad2bc2f',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:13:03.000Z',
          updated_time: '2021-11-12T11:09:18.000Z',
          author_prefile:
                        '　　[美]加来道雄博士，弦理论创始人之一，世界知名理论物理学家，纽约城市大学理论物理学教授，世界知名科学畅销书作者，家喻户晓的科学纪录频道主持人，所著七本书均畅销全世界。  　　伍义生，中国译协专业翻译家。',
          book_prefile:
                        '　《科学可以这么看系列 平行宇宙（新版）》三部分，一部分宇宙，描述了宇宙诞生时的情景、大爆炸理论、目前主流的宇宙膨胀理论和平行宇宙概念。第二部分多元宇宙，描述了多元宇宙的空间维度与时间旅行、平行量子宇宙、弦理论和M理论。第三部分遁入超空间，描述了当我们的宇宙濒临死亡进入大冻结时，如何借助超空间逃往与我们宇宙平行的其他宇宙，将人类文明传承下来。',
          banner:
                        'dba7cb90317e11ec9a38f70c463259f5,e011b560317e11ec9a38f70c463259f5,e29245c0317e11ec9a38f70c463259f5,e4eb02d0317e11ec9a38f70c463259f5',
          book_detail: 'ea05c610317e11ec9a38f70c463259f5',
          publish_time: '2014年5月',
          publisher: '重庆出版社',
          category_uuid: 'aac66c2043a811ecade355501eededd9',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: '15ee6bf0fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            },
            {
              id: 17,
              uuid: '04d858304ac611ec8ce49f72480132d9',
              name: '侠客行',
              deleted: 0,
              created_time: '2021-11-21T12:24:48.000Z',
              updated_time: '2022-03-08T03:14:11.000Z',
              value: 'wuxiad',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:27:50.000Z',
                updated_time: '2022-03-10T02:27:50.000Z',
                book_uuid: '15ee6bf0fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: '04d858304ac611ec8ce49f72480132d9'
              }
            },
            {
              id: 67,
              uuid: '3ec293809eae11ec879a09ecfebd6b21',
              name: '科学秘境',
              deleted: 0,
              created_time: '2022-03-08T07:06:15.000Z',
              updated_time: '2022-03-10T02:30:48.000Z',
              value: 'l0hsgm9kze6',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:29:29.000Z',
                updated_time: '2022-03-10T02:29:29.000Z',
                book_uuid: '15ee6bf0fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: '3ec293809eae11ec879a09ecfebd6b21'
              }
            },
            {
              id: 64,
              uuid: '90bbec409de111ecbf17a95bb89eb4ba',
              name: '天文奇观',
              deleted: 0,
              created_time: '2022-03-07T06:41:06.000Z',
              updated_time: '2022-03-10T02:27:14.000Z',
              value: 'l0gc4f0kz4z',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:31:03.000Z',
                updated_time: '2022-03-10T02:31:03.000Z',
                book_uuid: '15ee6bf0fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: '90bbec409de111ecbf17a95bb89eb4ba'
              }
            }
          ],
          category_info: {
            uuid: 'aac66c2043a811ecade355501eededd9',
            title: '热门'
          },
          sale_tag_uuids: [
            'c70689f04ac511ec8ce49f72480132d9',
            '04d858304ac611ec8ce49f72480132d9',
            '3ec293809eae11ec879a09ecfebd6b21',
            '90bbec409de111ecbf17a95bb89eb4ba'
          ]
        },
        {
          id: 6,
          uuid: '34eb7750fb3411eb9ccceb357ad2bc2f',
          name: '人类简史：从动物到上帝（新版）',
          author: '[以色列]尤瓦尔·赫拉利 著；林俊宏 译',
          book_id: '08161890',
          cover: '1f33ed20fb3411eb9ccceb357ad2bc2f',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:14:09.000Z',
          updated_time: '2021-11-12T11:09:22.000Z',
          author_prefile:
                        '尤瓦尔·赫拉利，1976年生，牛津大学历史学博士，现为耶路撒冷希伯来大学的历史系教授，青年怪才，全球瞩目的新锐历史学家。他擅长世界历史和宏观历史进程研究。在学术领域和大众出版领域都有很大的兴趣。他的《人类简史》一书让他一举成名，成为以色列超级畅销书，目前这本书已授43个国家版权，在历史学之外，人类学、生态学、基因学等领域的知识信手拈来，根据图书改变的课程上传YOUTUBE后风靡全球，拥有大批青年粉丝。写书，视频课程之外，他还开设有专栏。 ',
          book_prefile:
                        '《人类简史 从动物到上帝》是以色列新锐历史学家的一部重磅作品。从十万年前有生命迹象开始到21世纪资本、科技交织的人类发展史。十万年前，地球上至少有六个人种，为何今天却只剩下了我们自己？我们曾经只是非洲角落一个毫不起眼的族群，对地球上生态的影响力和萤火虫、猩猩或者水母相差无几。为何我们能登上生物链的顶端，最终成为地球的主宰？   　　从认知革命、农业革命到科学革命，我们真的了解自己吗？我们过得更加快乐吗？我们知道金钱和宗教从何而来，为何产生吗？人类创建的帝国为何一个个衰亡又兴起？为什么地球上几乎每一个社会都有男尊女卑的观念？为何一神教成为为广泛接受的宗教？科学和资本主义如何成为现代社会重要的信条？理清影响人类发展的重大脉络，挖掘人类文化、宗教、法律、国家、信贷等产生的根源。这是一部宏大的人类简史，更见微知著、以小写大，让人类重新审视自己。',
          banner:
                        '4ddeafd0317f11ec9a38f70c463259f5,50f5b3d0317f11ec9a38f70c463259f5,54385bb0317f11ec9a38f70c463259f5,58826170317f11ec9a38f70c463259f5',
          book_detail: '601c7c90317f11ec9a38f70c463259f5',
          publish_time: '2017年3月',
          publisher: '中信出版集团',
          category_uuid: 'aac66c2043a811ecade355501eededd9',
          sale_tag: [
            {
              id: 66,
              uuid: '32d153409eae11ec879a09ecfebd6b21',
              name: '教辅',
              deleted: 0,
              created_time: '2022-03-08T07:05:55.000Z',
              updated_time: '2022-03-08T07:05:55.000Z',
              value: 'l0hsg6t08sk',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:28:56.000Z',
                updated_time: '2022-03-10T02:28:56.000Z',
                book_uuid: '34eb7750fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: '32d153409eae11ec879a09ecfebd6b21'
              }
            },
            {
              id: 67,
              uuid: '3ec293809eae11ec879a09ecfebd6b21',
              name: '科学秘境',
              deleted: 0,
              created_time: '2022-03-08T07:06:15.000Z',
              updated_time: '2022-03-10T02:30:48.000Z',
              value: 'l0hsgm9kze6',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:29:29.000Z',
                updated_time: '2022-03-10T02:29:29.000Z',
                book_uuid: '34eb7750fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: '3ec293809eae11ec879a09ecfebd6b21'
              }
            },
            {
              id: 17,
              uuid: '04d858304ac611ec8ce49f72480132d9',
              name: '侠客行',
              deleted: 0,
              created_time: '2021-11-21T12:24:48.000Z',
              updated_time: '2022-03-08T03:14:11.000Z',
              value: 'wuxiad',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:27:50.000Z',
                updated_time: '2022-03-10T02:27:50.000Z',
                book_uuid: '34eb7750fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: '04d858304ac611ec8ce49f72480132d9'
              }
            },
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: '34eb7750fb3411eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            }
          ],
          category_info: {
            uuid: 'aac66c2043a811ecade355501eededd9',
            title: '热门'
          },
          sale_tag_uuids: [
            '32d153409eae11ec879a09ecfebd6b21',
            '3ec293809eae11ec879a09ecfebd6b21',
            '04d858304ac611ec8ce49f72480132d9',
            'c70689f04ac511ec8ce49f72480132d9'
          ]
        },
        {
          id: 7,
          uuid: '6b2c35b0fb3511eb9ccceb357ad2bc2f',
          name: '三国志',
          author: '作者：（晋代）陈寿',
          book_id: '07368215',
          cover: 'b1baa6d0317f11ec9a38f70c463259f5',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:15:08.000Z',
          updated_time: '2021-11-12T11:09:28.000Z',
          author_prefile: '[晋]陈寿 著；[宋]裴松之 注',
          book_prefile:
                        '　　《三国志》与《史记》、《汉书》、《后汉书》并称为“四史”。作者陈寿，以其史识及叙事能力，在当时已有“良史之才”的称誉。 《三国志》在二十四史中，有它自己的特点，它既不像《史记》那样的通史，也不像《汉书》一类史书那样的断代史，它平行地叙述东汉末年魏、蜀、吴三国鼎峙的史实。虽然名之为“志”，但是书里面只有纪和传，没有志。 本书是裴松之的注释本。从现代人的角度论，裴注不单单是陈书的助读 “功臣”，甚至可以将之和陈书视为反映魏蜀吴三国六十年鼎立历史的“双璧”；两著合刊，才算得上是记载中国古代这段辉煌历史的完整充实的巨著。 　　《三国志》与《史记》、《汉书》、《后汉书》并称为“四史”。作者陈寿，以其史识及叙事能力，在当时已有“良史之才”的称誉。 　　《三国志》在二十四史中，有它自己的特点，它既不像《史记》那样的通史，也不像《汉书》一类史书那样的断代史，它平行地叙述东汉末年魏、蜀、吴三国鼎峙的史实。虽然名之为“志”，但是书里面只有纪和传，没有志。 　　本书兼具普及性和学术性，其文字，以中华书局1959年点校本《三国志》为底本，参校了清乾隆四年武英殿刻本、清同治六年金陵书局活字印本、清光绪十三年江南书局刻本等旧刻本和以中华书局标点本为代表的多种新版本。书中所选图片资料，遵循忠实于历史的原则，力求选取富含历史文化价值的图片，配入《三国志》相应的文字部分，以图辅文，以图证史，图文结合，内容涉及当时政治、经济、文化、军事、外交、风俗等方方面面，具有较高的历史文化价值，真实反映三国时期的历史原貌，方便读者对这一时期丰富的历史文化有一个较为形象的、直观的认识。',
          banner:
                        'cbe6c930317f11ec9a38f70c463259f5,cfabe780317f11ec9a38f70c463259f5,d25bec50317f11ec9a38f70c463259f5',
          book_detail: '0cc6e8e0318011ec9a38f70c463259f5',
          publish_time: '2006年9月',
          publisher: '中华书局',
          category_uuid: 'aac66c2043a811ecade355501eededd9',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: '6b2c35b0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            },
            {
              id: 17,
              uuid: '04d858304ac611ec8ce49f72480132d9',
              name: '侠客行',
              deleted: 0,
              created_time: '2021-11-21T12:24:48.000Z',
              updated_time: '2022-03-08T03:14:11.000Z',
              value: 'wuxiad',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:26:13.000Z',
                updated_time: '2022-03-10T02:26:13.000Z',
                book_uuid: '6b2c35b0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: '04d858304ac611ec8ce49f72480132d9'
              }
            },
            {
              id: 66,
              uuid: '32d153409eae11ec879a09ecfebd6b21',
              name: '教辅',
              deleted: 0,
              created_time: '2022-03-08T07:05:55.000Z',
              updated_time: '2022-03-08T07:05:55.000Z',
              value: 'l0hsg6t08sk',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:28:56.000Z',
                updated_time: '2022-03-10T02:28:56.000Z',
                book_uuid: '6b2c35b0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: '32d153409eae11ec879a09ecfebd6b21'
              }
            }
          ],
          category_info: {
            uuid: 'aac66c2043a811ecade355501eededd9',
            title: '热门'
          },
          sale_tag_uuids: [
            'c70689f04ac511ec8ce49f72480132d9',
            '04d858304ac611ec8ce49f72480132d9',
            '32d153409eae11ec879a09ecfebd6b21'
          ]
        },
        {
          id: 8,
          uuid: '83c275d0fb3511eb9ccceb357ad2bc2f',
          name: '三年模拟五年高考',
          author: '曲一线 著',
          book_id: '85989548',
          cover: '6f8381e0fb3511eb9ccceb357ad2bc2f',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:16:29.000Z',
          updated_time: '2021-11-12T11:09:31.000Z',
          author_prefile:
                        '2018B版专项测试 高考物理 5年高考3年模拟（全国卷Ⅲ适用）五年高考三年模拟 曲一线科学备考',
          book_prefile:
                        '五年高考：这是多少命题专家的心血啊，这是多少命题学者的汗滴。这是智慧的结晶，这是精心的设计，这是苦心的创作，这是优美的诗句。洞悉高考试题及命题规律就等于抓住了上帝的一只手，就等于揭开了上帝手中的谜底!',
          banner: '8d991ec0318011ec9a38f70c463259f5,92b4a550318011ec9a38f70c463259f5',
          book_detail: '99b629f0318011ec9a38f70c463259f5',
          publish_time: '2017年6月',
          publisher: '首都师范大学出版社',
          category_uuid: 'aac66c2043a811ecade355501eededd9',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: '83c275d0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            }
          ],
          category_info: {
            uuid: 'aac66c2043a811ecade355501eededd9',
            title: '热门'
          },
          sale_tag_uuids: ['c70689f04ac511ec8ce49f72480132d9']
        },
        {
          id: 9,
          uuid: '986338d0fb3511eb9ccceb357ad2bc2f',
          name: '三体Ⅲ：死神永生',
          author: '[中]刘慈欣',
          book_id: '07210607',
          cover: '86f9ac00fb3511eb9ccceb357ad2bc2f',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:17:17.000Z',
          updated_time: '2022-03-03T14:48:10.000Z',
          author_prefile:
                        '　　刘慈欣，祖籍河南，长于山西，中国科普作家协会会员，山西省作家协会会员，高级工程师。 　　自1999年处女作《鲸歌》问世以来，刘慈欣已发表短篇科幻小说三十余篇、出版长篇科幻小说六部，并创下连续八年荣获中国科幻高奖“银河奖”的纪录。其长篇力作《三体》开创《科幻世界》月刊连载原创作品之先河，一举成为2006年度受关注、畅销的科幻小说，在百万科幻迷中引起极大的反响，《三体Ⅱ：黑暗森林》也因此被读者誉为“值得期待的科幻小说”。 　　刘慈欣的作品宏伟大气、想象绚丽，既注重极端空灵与厚重现实的结合，也讲求科学的内涵和美感，具有浓郁的中国特色和鲜明的个人风格，为中国科幻确立了一个新高度。',
          book_prefile:
                        '　　《中国科幻基石丛书·三体（3）：死神永生》是“中国当代科幻di一人”刘慈欣“三体”系列科幻的第三部，它延续了《三体1》和《三体2》“星球战争”的故事，讲述人类在阻止三体世界占领地球、毁灭人类文明的侵略后所发生的故事。人类文明还将受到哪些威胁？人类能否拯救自己？人类在宇宙星球战争中还将书写哪些传奇？ 　　与三体文明的战争使人类首次看到了宇宙黑暗的真相，地球文明像一个恐惧的孩子，熄灭了寻友的篝火，在暗夜中发抖。 　　自以为历经沧桑，其实刚刚蹒跚学步；自以为悟出了生存竞争的秘密，其实还远没有竞争的资格。 　　使两个文明命悬一线的黑暗森林打击，不过是宇宙战场上的一个微不足道的插曲，一个在战场上乱跑的无知孩童被堑壕中的狙击手射杀，仅此而已。 　　真正的星际战争没人见过，也不可能见到。因为战争的方式和武器已经远超出人类的想象，目睹战场之日，就是灭亡之时。 　　人类没有想到，面对这巨大的存在，从社会学的结论，却可以推导出宇宙学的结果。 　　宇宙的田园时代已经远去，那时，万物的美曾昙花一现，现在已经变成任何大脑和智慧体都无法做出的梦，变成游吟诗人飘渺的残歌；宇宙的物竞天择已到了惨烈的时刻，在亿万光年暗无天日的战场上，深渊最底层的毁灭力量被唤醒，太空变成了死神广阔的披风。 　　太阳系中的人们永远不会知道这一切，最后面对真相的，只有两双眼睛。',
          banner:
                        '1e7c0830318111ec9a38f70c463259f5,2143b3b0318111ec9a38f70c463259f5,26663f20318111ec9a38f70c463259f5,2d6bbb60318111ec9a38f70c463259f5',
          book_detail: '38195810318111ec9a38f70c463259f5',
          publish_time: '2010年11月',
          publisher: '重庆出版社',
          category_uuid: 'aac66c2043a811ecade355501eededd9',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: '986338d0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            },
            {
              id: 17,
              uuid: '04d858304ac611ec8ce49f72480132d9',
              name: '侠客行',
              deleted: 0,
              created_time: '2021-11-21T12:24:48.000Z',
              updated_time: '2022-03-08T03:14:11.000Z',
              value: 'wuxiad',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:26:13.000Z',
                updated_time: '2022-03-10T02:26:13.000Z',
                book_uuid: '986338d0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: '04d858304ac611ec8ce49f72480132d9'
              }
            },
            {
              id: 65,
              uuid: 'c46c6c209e8d11eca3fc0b2b5a46d40f',
              name: '奇幻小说',
              deleted: 0,
              created_time: '2022-03-08T03:13:46.000Z',
              updated_time: '2022-03-08T03:13:46.000Z',
              value: 'l0hk5n1ebos',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:28:27.000Z',
                updated_time: '2022-03-10T02:28:27.000Z',
                book_uuid: '986338d0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c46c6c209e8d11eca3fc0b2b5a46d40f'
              }
            },
            {
              id: 67,
              uuid: '3ec293809eae11ec879a09ecfebd6b21',
              name: '科学秘境',
              deleted: 0,
              created_time: '2022-03-08T07:06:15.000Z',
              updated_time: '2022-03-10T02:30:48.000Z',
              value: 'l0hsgm9kze6',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:29:41.000Z',
                updated_time: '2022-03-10T02:29:41.000Z',
                book_uuid: '986338d0fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: '3ec293809eae11ec879a09ecfebd6b21'
              }
            }
          ],
          category_info: {
            uuid: 'aac66c2043a811ecade355501eededd9',
            title: '热门'
          },
          sale_tag_uuids: [
            'c70689f04ac511ec8ce49f72480132d9',
            '04d858304ac611ec8ce49f72480132d9',
            'c46c6c209e8d11eca3fc0b2b5a46d40f',
            '3ec293809eae11ec879a09ecfebd6b21'
          ]
        },
        {
          id: 10,
          uuid: 'aa5e0920fb3511eb9ccceb357ad2bc2f',
          name: '时间简史',
          author: '[英]霍金',
          book_id: '41349912',
          cover: '9b61f9e0fb3511eb9ccceb357ad2bc2f',
          borrow_state: 1,
          deleted: 0,
          created_time: '2021-10-19T07:18:43.000Z',
          updated_time: '2021-11-12T11:09:40.000Z',
          author_prefile:
                        '　　史蒂芬·霍金 （Stephen Hawking）， 于1942年1月8日生于牛津，那一天刚好是伽利略逝世三百年。可能因为他出生在第二次世界大战的时代，所以小时候对模型特别着迷。他十几岁时不但喜欢做模型飞机和轮船，还和学友制作了很多不同种类的战争游戏，反映出他研究和操控事物的渴望。这种渴望驱使他攻读博士学位，并在黑洞和宇宙论的研究上获得重大成就。 　　霍金十三、四岁时已下定决心要从事物理学和天文学的研究。十七岁那年，他考到了自然科学的奖学金，顺利入读牛津大学。学士毕业后他转到剑桥大学攻读博士，研究宇宙学。不久他发现自己患上了会导致肌肉萎缩的卢伽雷病。由于医生对此病束手无策，起初他打算放弃从事研究的理想，但后来病情恶化的速度减慢了，他便重拾心情，排除万难，从挫折中站起来，勇敢地面对这次的不幸，继续醉心研究。 　　七十年代，他和彭罗斯证明了知名的奇性定理，并在1988年共同获得沃尔夫物理奖。他还证明了黑洞的面积不会随时间减少。1973年，他发现黑洞辐射的温度和其质量成反比，即黑洞会因为辐射而变小，但温度却会升高，最终会发生爆炸而消失。 　　八十年代，他开始研究量子宇宙论。这时他的行动已经出现问题，后来由于得了肺炎而接受穿气管手术，使他从此再不能说话。现在他全身瘫痪，要靠电动轮椅代替双脚，不但说话和写字要靠计算机和语言合成器帮忙，连阅读也要别人替他把每页纸摊平在桌上，让他驱动着轮椅逐页去看。 　　霍金一生贡献于理论物理学的研究，被誉为当今杰出的科学家之一。他的著作包括《时间简史》及《黑洞与婴儿宇宙以及相关文章》。虽然大家都觉得他非常不幸，但他在科学上的成就却是在他在病发后获得的。他凭着坚毅不屈的意志，战胜了疾病，创造了一个奇迹，也证明了残疾并非成功的障碍。他对生命的热爱和对科学研究的热诚，是值得年轻一代学习的。',
          book_prefile:
                        '　　尽管霍金教授的著述极为清晰而机智，有些读者仍然觉得难以掌握复杂的概念。为了使读者加深理解，《时间简史》（插图版）还增加了240多幅彩色插图，包括卫星图像和照片。这些都应归功于诸如哈勃空间望远镜和电脑三维和四维实体成像等技术进步之赐。详细的插图说明使读者能体验到星系际太空的广漠、黑洞的奇妙性质以及物质和反物质碰撞的粒子物理的微观世界。作为一本飨以读者宇宙学的全新理解的经典著作，《时间简史》（插图版）是探索时间和空间核心秘密的引人入胜的故事。',
          banner: '11f04030318211ec9a38f70c463259f5,14ee3df0318211ec9a38f70c463259f5',
          book_detail: '1dbb5ad0318211ec9a38f70c463259f5',
          publish_time: '2015年4月',
          publisher: '湖南科学技术出版社',
          category_uuid: 'aac66c2043a811ecade355501eededd9',
          sale_tag: [
            {
              id: 16,
              uuid: 'c70689f04ac511ec8ce49f72480132d9',
              name: '热门推荐',
              deleted: 0,
              created_time: '2021-11-21T12:23:04.000Z',
              updated_time: '2022-03-08T03:13:01.000Z',
              value: 'kehuan',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:24:30.000Z',
                updated_time: '2022-03-10T02:24:30.000Z',
                book_uuid: 'aa5e0920fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: 'c70689f04ac511ec8ce49f72480132d9'
              }
            },
            {
              id: 17,
              uuid: '04d858304ac611ec8ce49f72480132d9',
              name: '侠客行',
              deleted: 0,
              created_time: '2021-11-21T12:24:48.000Z',
              updated_time: '2022-03-08T03:14:11.000Z',
              value: 'wuxiad',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:27:50.000Z',
                updated_time: '2022-03-10T02:27:50.000Z',
                book_uuid: 'aa5e0920fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: '04d858304ac611ec8ce49f72480132d9'
              }
            },
            {
              id: 67,
              uuid: '3ec293809eae11ec879a09ecfebd6b21',
              name: '科学秘境',
              deleted: 0,
              created_time: '2022-03-08T07:06:15.000Z',
              updated_time: '2022-03-10T02:30:48.000Z',
              value: 'l0hsgm9kze6',
              required: 0,
              book_sale_tag: {
                created_time: '2022-03-10T02:29:41.000Z',
                updated_time: '2022-03-10T02:29:41.000Z',
                book_uuid: 'aa5e0920fb3511eb9ccceb357ad2bc2f',
                sale_tag_uuid: '3ec293809eae11ec879a09ecfebd6b21'
              }
            }
          ],
          category_info: {
            uuid: 'aac66c2043a811ecade355501eededd9',
            title: '热门'
          },
          sale_tag_uuids: [
            'c70689f04ac511ec8ce49f72480132d9',
            '04d858304ac611ec8ce49f72480132d9',
            '3ec293809eae11ec879a09ecfebd6b21'
          ]
        }
      ],
      total: 16
    };
    resolve({ data });
  });
}

export function getBookCategoryList() {
  return new Promise((resolve) => {
    const data = {
      "list": [
        {
          "id": 1,
          "uuid": "99956220fb3311eb9ccceb357ad2bc2f",
          "title": "其他",
          "thumb": "5fc825d083e311ec9806c7db9509ee10",
          "pre": 81,
          "next": null,
          "deleted": 0,
          "created_time": "2021-11-12T11:06:08.000Z",
          "updated_time": "2022-03-10T02:24:00.000Z"
        },
        {
          "id": 65,
          "uuid": "aac66c2043a811ecade355501eededd9",
          "title": "热门",
          "thumb": "afb80e6083e411ec9806c7db9509ee10",
          "pre": null,
          "next": 74,
          "deleted": 0,
          "created_time": "2021-11-12T11:07:04.000Z",
          "updated_time": "2022-03-10T02:24:00.000Z"
        },
        {
          "id": 74,
          "uuid": "f71f20d060cc11ecad9c13eab05da66a",
          "title": "剧情",
          "thumb": "6fb65d4083e311ec9806c7db9509ee10",
          "pre": 65,
          "next": 81,
          "deleted": 0,
          "created_time": "2021-12-19T13:09:57.000Z",
          "updated_time": "2022-03-10T02:24:00.000Z"
        },
        {
          "id": 80,
          "uuid": "28c6b550662f11ec85d1cb5cf2302655",
          "title": "经济123",
          "thumb": "7592312083e411ec9806c7db9509ee10",
          "pre": 74,
          "next": 81,
          "deleted": 0,
          "created_time": "2021-12-26T09:35:27.000Z",
          "updated_time": "2022-02-04T16:16:59.000Z"
        },
        {
          "id": 81,
          "uuid": "d8a4a5c085d511ec927e9587c4d13034",
          "title": "仙侠",
          "thumb": "d5afa8b085d511ec927e9587c4d13034",
          "pre": 74,
          "next": 1,
          "deleted": 0,
          "created_time": "2022-02-04T16:16:45.000Z",
          "updated_time": "2022-03-10T02:24:00.000Z"
        }
      ],
      "total": 5
    }
    resolve({ data });
  });
}

export function getTagList() {
  return new Promise((resolve) => {
    const data = {
      "list": [
        {
          "id": 16,
          "uuid": "c70689f04ac511ec8ce49f72480132d9",
          "name": "热门推荐",
          "deleted": 0,
          "created_time": "2021-11-21T12:23:04.000Z",
          "updated_time": "2022-03-08T03:13:01.000Z",
          "value": "kehuan",
          "required": 0
        },
        {
          "id": 17,
          "uuid": "04d858304ac611ec8ce49f72480132d9",
          "name": "侠客行",
          "deleted": 0,
          "created_time": "2021-11-21T12:24:48.000Z",
          "updated_time": "2022-03-08T03:14:11.000Z",
          "value": "wuxiad",
          "required": 0
        },
        {
          "id": 64,
          "uuid": "90bbec409de111ecbf17a95bb89eb4ba",
          "name": "天文奇观",
          "deleted": 0,
          "created_time": "2022-03-07T06:41:06.000Z",
          "updated_time": "2022-03-10T02:27:14.000Z",
          "value": "l0gc4f0kz4z",
          "required": 0
        },
        {
          "id": 65,
          "uuid": "c46c6c209e8d11eca3fc0b2b5a46d40f",
          "name": "奇幻小说",
          "deleted": 0,
          "created_time": "2022-03-08T03:13:46.000Z",
          "updated_time": "2022-03-08T03:13:46.000Z",
          "value": "l0hk5n1ebos",
          "required": 0
        },
        {
          "id": 66,
          "uuid": "32d153409eae11ec879a09ecfebd6b21",
          "name": "教辅",
          "deleted": 0,
          "created_time": "2022-03-08T07:05:55.000Z",
          "updated_time": "2022-03-08T07:05:55.000Z",
          "value": "l0hsg6t08sk",
          "required": 0
        },
        {
          "id": 67,
          "uuid": "3ec293809eae11ec879a09ecfebd6b21",
          "name": "科学秘境",
          "deleted": 0,
          "created_time": "2022-03-08T07:06:15.000Z",
          "updated_time": "2022-03-10T02:30:48.000Z",
          "value": "l0hsgm9kze6",
          "required": 0
        }
      ],
      "total": 6
    }
    resolve({ data });
  });
}

export function uploadImage() {
  return new Promise()
}