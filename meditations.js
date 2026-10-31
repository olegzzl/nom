"use strict";

const contact = {
  email: "olegzzl@zohomail.eu",
  manifestRu: "Неоорбитальная медитация выросла из даосской орбиты и практики мантры. В этом разделе собраны практики, с которыми можно познакомиться самостоятельно, в своём темпе и без спешки.",
  manifestEn: "Neo Orbital Meditation grew out of the Taoist orbit and the practice of mantra. This section gathers the practices you can explore on your own, at your own pace and without haste.",
  manifestUk: "Неоорбітальна медитація виросла з даоської орбіти й практики мантри. У цьому розділі зібрані практики, з якими можна познайомитися самостійно, у своєму темпі й без поспіху."
};

const content = {
  ru: {
    metaTitle: "Медитации | Неоорбитальная медитация",
    metaDescription: "Одиннадцать медитаций: микрокосмическая орбита, метта, мудхита, шаматха, випассана, чакры, дыхание позвоночника, шамбхави мудра и практики осознанности.",
    skip: "Перейти к содержимому",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    top: "Наверх",
    eyebrow: "Практики",
    title: "Медитации",
    lead: "Одиннадцать практик, которые можно делать дома: от даосской орбиты и буддийской метты до осознанной еды и медленной ходьбы.",
    indexTitle: "Содержание",
    howKicker: "Перед началом",
    howTitle: "Как выбрать практику",
    how: [
      { title: "С чего начать", text: "Со сканирования тела или шаматхи. Десяти минут в день достаточно, чтобы привыкнуть к формату и понять, как ведёт себя внимание." },
      { title: "Как часто", text: "Лучше коротко и регулярно, чем долго и раз в месяц. Три или четыре раза в неделю уже дают разницу, которую можно заметить." },
      { title: "Чего ждать", text: "Тишина не приходит по заказу. Практика это тренировка возвращения, а не экзамен на пустую голову, и отвлекаться на ней нормально." }
    ],
    groups: [
      {
        id: "classical",
        num: "01",
        title: "Классические практики",
        subtitle: "Традиции, в которых внимание и дыхание складываются в устойчивую форму.",
        practices: [
          {
            id: "microcosmic-orbit",
            num: "01",
            name: "Микрокосмическая орбита",
            kicker: "Даосизм, цигун",
            image: "orbit",
            alt: "Сидящая фигура из тонких золотых линий, вокруг неё замкнутый круг света",
            lead: "Замкнутый круг внимания: вверх по позвоночнику и вниз по передней линии тела.",
            body: [
              "Микрокосмическая орбита, или сяо чжоу тянь, одна из базовых практик даосской внутренней алхимии и цигун. Дыхание здесь соединяют с движением внимания по двум каналам: Управляющему, который идёт вдоль спины, и Функциональному, который проходит по передней стороне тела. Вместе они образуют замкнутый контур, отсюда и слово «орбита».",
              "Смысл не в том, чтобы ускорить энергию или добиться ярких ощущений. Скорее наоборот: внимание движется медленно, вслед за дыханием, а ощущения остаются мягкими. Многие описывают практику как тёплый ток, который постепенно наполняет живот, спину и голову."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте удобно, спина прямая, руки на бёдрах или сложены под животом.",
              "Соберите внимание в точке на два или три сантиметра ниже пупка и постойте там несколько вдохов.",
              "На вдохе ведите внимание от промежности вверх по позвоночнику, через затылок, до макушки.",
              "На выдохе ведите его вниз по лицу, груди и животу, возвращаясь в исходную точку.",
              "Сделайте девять или восемнадцать кругов и посидите в тишине ещё минуту."
            ],
            note: "Если в голове появляется напряжение, остановитесь и подышите животом. Движение внимания не должно превращаться в усилие.",
            time: "15-20 минут",
            place: "сидя"
          },
          {
            id: "metta",
            num: "02",
            name: "Метта",
            kicker: "Буддизм тхеравады",
            image: "metta",
            alt: "Открытые ладони держат сердце из света, вокруг расходящиеся кольца",
            lead: "Медитация любящей доброты: пожелание блага себе и другим, произносимое мысленно.",
            body: [
              "Метта, или медитация любящей доброты, пришла из буддийской традиции тхеравады. Она входит в четыре безмерных состояния вместе с состраданием, сорадостью и равностностью. В основе простой жест: вы мысленно желаете благополучия, начиная с себя и постепенно расширяя круг.",
              "Формула обычно короткая: «Пусть мне будет спокойно. Пусть мне будет хорошо. Пусть мне будет легко». Слова не нужно повторять механически, важнее намерение, которое за ними стоит. Если тепло не появляется, это нормально: достаточно честного пожелания, даже сухого."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте или лягте удобно и сделайте несколько спокойных вдохов.",
              "Направьте пожелание себе: пусть мне будет спокойно, пусть мне будет хорошо.",
              "Вспомните близкого человека и пожелайте того же ему.",
              "Затем нейтрального человека, например соседа или прохожего.",
              "В конце того, с кем отношения сложные, насколько это получается без насилия над собой.",
              "Расширьте пожелание на всех людей и существ вокруг."
            ],
            note: "Если становится тяжело, вернитесь к себе и к самому простому пожеланию. Метта не требует героизма.",
            time: "10-20 минут",
            place: "сидя или лёжа"
          },
          {
            id: "mudita",
            num: "03",
            name: "Мудхита",
            kicker: "Буддизм, брахмавихары",
            image: "mudita",
            alt: "Две сферы света поднимаются над тёмной водой, вокруг мягкие круги",
            lead: "Сорадость: радость за чужую удачу, которую можно тренировать так же, как внимание.",
            body: [
              "Мудхита это третье из четырёх безмерных состояний, сорадость. Это способность искренне радоваться, когда хорошо другому: его успеху, здоровью, спокойствию, маленькой удаче. В традиции её считают самой трудной из четырёх, потому что она напрямую встречается с завистью.",
              "Практика начинается с простого: вспомните человека, которому сейчас действительно хорошо, и попробуйте порадоваться за него без оговорок. Не «хорошо, что у него получилось, но», а просто «хорошо». Постепенно круг расширяется, и в него входят люди, чьи успехи задевают больше."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Вспомните человека, чья радость вам приятна, и мысленно скажите: мне радостно за тебя.",
              "Заметьте, где в теле отзывается эта радость: в груди, в животе, в лице.",
              "Позвольте чувству быть, не усиливая его.",
              "Расширьте пожелание: пусть хорошее приходит ко всем, кто мне дорог.",
              "Если появляется зависть, отметьте её спокойно и вернитесь к пожеланию."
            ],
            note: "Мудхита не про вежливость. Если радости нет, честнее заметить это, чем изображать чувство, которого не существует.",
            time: "10-15 минут",
            place: "сидя"
          },
          {
            id: "shamatha",
            num: "04",
            name: "Шаматха",
            kicker: "Индийская традиция",
            image: "shamatha",
            alt: "Один ровный огонь внутри тонкого золотого круга над спокойной водой",
            lead: "Одно внимание, один объект и спокойное возвращение каждый раз, когда ум ушёл.",
            body: [
              "Шаматха, или успокоение ума, это практика однонаправленного внимания. В ней выбирают один объект, чаще всего дыхание, и учатся возвращаться к нему каждый раз, когда ум уходит. Уход ума здесь не ошибка, а часть работы: именно возвращение тренирует устойчивость.",
              "Плод шаматхи в классических текстах описывают как самадхи, сосредоточение, в котором ум остаётся на объекте без усилия. Путь к нему традиционно делят на девять стадий, от первых попыток удержать внимание до полной безмятежности. На практике важнее не считать стадии, а замечать, что возвращаться становится легче."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте с прямой спиной, глаза можно прикрыть.",
              "Выберите точку опоры: ощущение воздуха у носа или движение живота.",
              "Держите внимание на одном месте, не контролируя дыхание.",
              "Когда заметили, что ум ушёл, мягко вернитесь, без упрёка.",
              "Считайте возвращения, а не минуты."
            ],
            note: "Скука и сонливость на этой практике обычное дело. Если они приходят, выпрямите спину и откройте глаза на минуту.",
            time: "10-25 минут",
            place: "сидя"
          },
          {
            id: "vipassana",
            num: "05",
            name: "Випассана",
            kicker: "Буддизм тхеравады",
            image: "vipassana",
            alt: "Маленькая фигура в тёмном поле, вокруг неё плывут золотые частицы света",
            lead: "Наблюдение того, что происходит, без выбора и без оценки.",
            body: [
              "Випассана переводится как прозрение и означает видение вещей такими, какие они есть. Вместо одного объекта внимание свободно перемещается по телесным ощущениям: тепло, прохлада, покалывание, давление, вибрация. Всё, что появляется, отмечают и отпускают.",
              "Классический курс випассаны длится десять дней и включает долгие часы сидения, ранние подъёмы и запрет на разговоры, чтение и письмо. Домашняя версия мягче: короткие сессии, в которых вы наблюдаете, как ощущения появляются и исчезают. Смысл не в том, чтобы найти приятное состояние, а в том, чтобы увидеть непостоянство."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте удобно и закройте глаза.",
              "Начните с ощущений в области живота и груди.",
              "Перемещайте внимание по телу, отмечая всё, что заметно.",
              "Не задерживайтесь на приятном и не отталкивайте неприятное.",
              "Замечайте момент, когда ощущение меняется или исчезает."
            ],
            note: "Если поднимается сильная эмоция, вернитесь к дыханию и к опоре под собой. К глубокому материалу лучше идти с опытным наставником.",
            time: "15-45 минут",
            place: "сидя"
          }
        ]
      },
      {
        id: "body",
        num: "02",
        title: "Тело, энергия и взгляд",
        subtitle: "Практики, где работа идёт с образом тела, дыханием и направлением глаз.",
        practices: [
          {
            id: "chakras",
            num: "06",
            name: "Медитация на раскрытие чакр",
            kicker: "Йогическая традиция",
            image: "chakras",
            alt: "Вертикальная колонна из семи светящихся кругов в тёмном пространстве",
            lead: "Семь центров, семь огней и медленное движение внимания снизу вверх.",
            body: [
              "Медитация на раскрытие чакр работает с образом: вдоль позвоночника представляют семь светящихся центров, от основания тела до макушки. Каждому традиция приписывает свой цвет, звук и качество. Здесь важен не точный оттенок, а сама практика внимания к телу и его состояниям.",
              "Обычно движение идёт снизу вверх: вы останавливаетесь на каждом центре, представляете мягкое свечение и наблюдаете, что происходит в теле. Если образ не появляется, достаточно просто направить внимание в эту область и почувствовать её. Чакры в этой практике остаются языком описания, а не анатомией."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте прямо, закройте глаза и сделайте несколько вдохов.",
              "Направьте внимание в основание тела и представьте тёплый свет.",
              "Медленно поднимайтесь к следующему центру на каждом выдохе.",
              "На каждом центре задержитесь на три или пять вдохов.",
              "Дойдите до макушки и представьте, что свет выходит за пределы тела.",
              "Вернитесь вниманием к дыханию и посидите в тишине."
            ],
            note: "Не нужно давить на себя и вызывать видения. Достаточно смутного ощущения света и тепла в области.",
            time: "15-20 минут",
            place: "сидя"
          },
          {
            id: "spinal-breathing",
            num: "07",
            name: "Дыхание позвоночника",
            kicker: "Крийя-йога",
            image: "spine",
            alt: "Профиль сидящего человека, вдоль спины канал света от основания до межбровья",
            lead: "Вдох вверх по позвоночнику, выдох вниз, без напряжения и задержек.",
            body: [
              "Дыхание позвоночника это базовая практика крийя-йоги, которую популяризировал Парамаханса Йогананда. Внимание движется вместе с дыханием по позвоночному столбу: на вдохе от основания вверх, к точке между бровями, на выдохе обратно вниз.",
              "Это не дыхание животом и не задержки. Дыхание остаётся ровным и тихим, а движение происходит скорее в воображении и в тонких ощущениях. Практику часто делают перед основной медитацией, чтобы собрать внимание и разогреть тело."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте с прямой спиной, расслабьте плечи и челюсть.",
              "Положите внимание у основания позвоночника.",
              "На вдохе ведите его вверх, вдоль позвоночника, до межбровья.",
              "На выдохе ведите вниз, тем же путём, обратно.",
              "Дышите медленно, без задержек, десять или пятнадцать циклов."
            ],
            note: "Если появляется головокружение, вернитесь к обычному дыханию и сделайте паузу. Ровный ритм важнее глубины.",
            time: "5-10 минут",
            place: "сидя, перед медитацией"
          },
          {
            id: "shambhavi-mudra",
            num: "08",
            name: "Шамбхави мудра",
            kicker: "Хатха-йога",
            image: "shambhavi",
            alt: "Закрытые глаза и мягкое свечение в точке между бровями",
            lead: "Мягкий взгляд в пространство перед собой и внимание в центре лба.",
            body: [
              "Шамбхави мудра, её также называют бхайрави мудра, это практика из хатха-йоги, связанная с аджна-чакрой. Глаза остаются открытыми, но взгляд не цепляется за предметы: он мягко расфокусирован и направлен в пространство перед собой, а внимание собрано в точке между бровями.",
              "Внешне это выглядит как спокойное созерцание. Внутри происходит тонкая работа: глаза расслаблены, ум не занят разбором увиденного, внимание удерживается в одной точке. Многие описывают состояние как ясное и тихое одновременно."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте удобно, спина прямая, подбородок чуть опущен.",
              "Не закрывая глаз, направьте взгляд вперёд и слегка вверх.",
              "Расфокусируйте взгляд, не сводя глаза к переносице.",
              "Соберите внимание в точке между бровями.",
              "Дышите спокойно. Если глаза устали, закройте их и отдохните."
            ],
            note: "При напряжении в глазах, головной боли или дискомфорте практику стоит прекратить. Это упражнение для расслабленного взгляда, а не для усилия.",
            time: "5-15 минут",
            place: "сидя"
          }
        ]
      },
      {
        id: "mindfulness",
        num: "03",
        title: "Осознанность в повседневности",
        subtitle: "Практики без подушки и таймера: в движении, за столом, в обычном дне.",
        practices: [
          {
            id: "mindful-walking",
            num: "09",
            name: "Осознанность в движении",
            kicker: "Практики осознанности",
            image: "walking",
            alt: "Цепочка золотых следов уходит в туман, на песке лежит тонкий круг",
            lead: "Ходьба, в которой важна не цель, а сам шаг.",
            body: [
              "Медитация в движении переносит внимание с подушки в обычную жизнь. Самый простой вариант это медленная ходьба по прямой: вы идёте некуда, а просто замечаете, как стопа касается пола, как переносится вес, как меняется дыхание.",
              "Тот же принцип работает в любой деятельности: мытьё посуды, подъём по лестнице, дорога до метро. Достаточно выбрать одно действие и делать его чуть медленнее обычного, целиком оставаясь в нём."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Выберите ровный отрезок дороги длиной пять или десять метров.",
              "Идите медленнее обычного, без цели дойти.",
              "Замечайте по очереди: пятка, стопа, перенос веса.",
              "На повороте остановитесь, осознайте движение и идите обратно.",
              "В конце постойте минуту, чувствуя тело целиком."
            ],
            note: "На улице удобно совмещать ходьбу с обычной дорогой по делам. Тогда практика не требует отдельного времени.",
            time: "10-20 минут",
            place: "на улице или дома"
          },
          {
            id: "mindful-eating",
            num: "10",
            name: "Осознанное принятие пищи",
            kicker: "Практики осознанности",
            image: "eating",
            alt: "Одна пиала с плодом на тёмном столе, тёплый свет по краю",
            lead: "Одна еда, без экрана, с полным вниманием к вкусу.",
            body: [
              "Осознанное принятие пищи это одна из самых доступных практик, потому что еда случается каждый день. Суть в том, чтобы есть не на автомате: замечать вид, запах, текстуру, вкус и момент, когда появляется сытость.",
              "Классическое упражнение это съесть одну изюминку за пять минут. Это может показаться странным, но именно такое замедление показывает, сколько слоёв опыта мы обычно пропускаем. За столом достаточно убрать телефон и первые три минуты есть молча."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Сядьте за стол, уберите телефон и выключите экран.",
              "Посмотрите на еду, отметьте цвет и запах.",
              "Первые три кусочка жуйте медленно, не отвлекаясь.",
              "Отложите прибор между кусочками.",
              "Заметьте момент, когда еды достаточно."
            ],
            note: "Практика не про диету и не про ограничения. Это только про внимание к тому, что уже происходит.",
            time: "15-20 минут",
            place: "за столом"
          },
          {
            id: "body-scan",
            num: "11",
            name: "Сканирование тела",
            kicker: "Практики осознанности",
            image: "bodyscan",
            alt: "Лежащая фигура из одной золотой линии, по ней проходит полоса света",
            lead: "Медленный проход внимания от стоп до макушки.",
            body: [
              "Сканирование тела это базовая практика осознанности, знакомая всем, кто проходил курсы снижения стресса. Вы лежите или сидите и последовательно проводите внимание по телу, от стоп к голове, отмечая всё, что есть: тепло, тяжесть, пустоту, покалывание.",
              "Обычно это первая практика, с которой начинают: она не требует ни концентрации на дыхании, ни образов. Задача простая и механическая, поэтому ум меньше сопротивляется. Многие засыпают, и это тоже нормально: значит, тело действительно отдыхает."
            ],
            stepsTitle: "Как практиковать",
            steps: [
              "Лягте на спину, руки вдоль тела, глаза закрыты.",
              "Начните с пальцев ног и медленно поднимайтесь выше.",
              "На каждой области задержитесь на два или три вдоха.",
              "Не меняйте ощущения, просто отмечайте их.",
              "Закончите на макушке и почувствуйте тело целиком."
            ],
            note: "Если сон одолевает, попробуйте сидеть. Сканирование работает и в вертикальном положении.",
            time: "10-20 минут",
            place: "лёжа"
          }
        ]
      }
    ],
    closingKicker: "Темп",
    closingTitle: "Практикуйте в своём ритме",
    closingText: "Ни одну из этих практик не нужно делать каждый день и не нужно делать идеально. Достаточно возвращаться к той, которая отзывается, и замечать, что меняется в обычной жизни.",
    disclaimer: "Описания даны в культурном и историческом контексте. Это не медицинская рекомендация: при проблемах со здоровьем и в острых состояниях стоит сначала посоветоваться с врачом.",
    manifest: contact.manifestRu,
    footerBrand: "Неоорбитальная медитация",
    footerNote: "Практика тишины, внимания и контакта с телом."
  },
  en: {
    metaTitle: "Meditations | Neo Orbital Meditation",
    metaDescription: "Eleven meditations: the microcosmic orbit, metta, mudita, shamatha, vipassana, chakras, spinal breathing, shambhavi mudra and mindfulness practices.",
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    top: "Back to top",
    eyebrow: "Practices",
    title: "Meditations",
    lead: "Eleven practices you can do at home, from the Taoist orbit and Buddhist metta to mindful eating and slow walking.",
    indexTitle: "Contents",
    howKicker: "Before you begin",
    howTitle: "How to choose a practice",
    how: [
      { title: "Where to start", text: "With the body scan or shamatha. Ten minutes a day is enough to get used to the format and to see how attention behaves." },
      { title: "How often", text: "Short and regular beats long and rare. Three or four times a week already makes a difference you can notice." },
      { title: "What to expect", text: "Quiet does not arrive on demand. Practice is training in returning, not an exam in having an empty head, and getting distracted is normal." }
    ],
    groups: [
      {
        id: "classical",
        num: "01",
        title: "Classical practices",
        subtitle: "Traditions in which attention and breath settle into a steady form.",
        practices: [
          {
            id: "microcosmic-orbit",
            num: "01",
            name: "Microcosmic Orbit",
            kicker: "Taoism, qigong",
            image: "orbit",
            alt: "A seated figure drawn in thin gold lines inside a circle of light",
            lead: "A closed circuit of attention: up the spine and down the front of the body.",
            body: [
              "The microcosmic orbit, or xiao zhou tian, is one of the foundational practices of Taoist inner alchemy and qigong. Breath is joined to the movement of attention along two channels: the Governing vessel, which runs up the back, and the Conception vessel, which runs down the front of the body. Together they form a closed loop, hence the word orbit.",
              "The point is not to speed up energy or to chase vivid sensations. It is closer to the opposite: attention moves slowly, following the breath, and the sensations stay soft. Many people describe the practice as a warm current that gradually fills the belly, the back and the head."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit comfortably with a straight back, hands on the thighs or folded below the navel.",
              "Gather attention two or three centimetres below the navel and rest there for a few breaths.",
              "On the inhale, move attention from the perineum up the spine, through the back of the head, to the crown.",
              "On the exhale, move it down the face, chest and belly, back to the starting point.",
              "Make nine or eighteen circles, then sit in silence for another minute."
            ],
            note: "If tension builds in the head, stop and breathe into the belly. Moving attention should not become an effort.",
            time: "15-20 minutes",
            place: "seated"
          },
          {
            id: "metta",
            num: "02",
            name: "Metta",
            kicker: "Theravada Buddhism",
            image: "metta",
            alt: "Open palms holding a heart of light with rings spreading outward",
            lead: "Loving-kindness: a silent wish of well-being for yourself and for others.",
            body: [
              "Metta, or loving-kindness meditation, comes from the Theravada Buddhist tradition. It is one of the four immeasurables, together with compassion, sympathetic joy and equanimity. The core gesture is simple: you wish well-being, starting with yourself and gradually widening the circle.",
              "The formula is usually short: may I be calm, may I be well, may I be at ease. The words should not be repeated mechanically; the intention behind them matters more. If warmth does not appear, that is fine: an honest wish is enough, even a dry one."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit or lie down comfortably and take a few quiet breaths.",
              "Direct the wish to yourself: may I be calm, may I be well.",
              "Bring to mind someone close to you and wish the same for them.",
              "Then a neutral person, a neighbour or a passer-by.",
              "Finally someone difficult, as far as this is possible without forcing yourself.",
              "Widen the wish to all people and beings around you."
            ],
            note: "If it becomes heavy, return to yourself and to the simplest wish. Metta does not ask for heroism.",
            time: "10-20 minutes",
            place: "seated or lying down"
          },
          {
            id: "mudita",
            num: "03",
            name: "Mudita",
            kicker: "Buddhism, brahmaviharas",
            image: "mudita",
            alt: "Two spheres of light rising above dark water with soft rings",
            lead: "Sympathetic joy: delight in another person's good fortune, trainable like attention.",
            body: [
              "Mudita is the third of the four immeasurables, sympathetic joy. It is the capacity to be genuinely glad when things go well for someone else: their success, health, calm, a small piece of luck. Tradition considers it the hardest of the four, because it meets envy directly.",
              "The practice starts simply: recall someone who is genuinely doing well right now, and try to be glad for them without qualifications. Not glad that it worked out, with a caveat attached, but simply glad. Gradually the circle widens to include people whose success touches you more."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Recall someone whose happiness is easy for you to enjoy and think: I am glad for you.",
              "Notice where this joy registers in the body: chest, belly, face.",
              "Let the feeling be there without amplifying it.",
              "Widen the wish: may good things come to everyone I care about.",
              "If envy appears, note it calmly and return to the wish."
            ],
            note: "Mudita is not politeness. If joy is absent, it is more honest to notice that than to perform a feeling that is not there.",
            time: "10-15 minutes",
            place: "seated"
          },
          {
            id: "shamatha",
            num: "04",
            name: "Shamatha",
            kicker: "Indian tradition",
            image: "shamatha",
            alt: "A single steady flame inside a thin gold circle above still water",
            lead: "One attention, one object, and a calm return each time the mind wanders.",
            body: [
              "Shamatha, or calm abiding, is the practice of one-pointed attention. You choose a single object, most often the breath, and learn to return to it every time the mind moves away. Wandering is not a mistake here; it is part of the work, because the returning is what trains stability.",
              "Classical texts describe the fruit of shamatha as samadhi, a collected state in which the mind rests on its object without effort. The path is traditionally divided into nine stages, from the first attempts to hold attention to full serenity. In practice, counting stages matters less than noticing that returning becomes easier."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit with a straight back and let the eyes close or soften.",
              "Choose one anchor: the feeling of air at the nose or the movement of the belly.",
              "Keep attention in that one place, without controlling the breath.",
              "When you notice the mind has gone, return gently, without reproach.",
              "Count the returns, not the minutes."
            ],
            note: "Boredom and drowsiness are ordinary here. If they arrive, straighten the spine and open the eyes for a minute.",
            time: "10-25 minutes",
            place: "seated"
          },
          {
            id: "vipassana",
            num: "05",
            name: "Vipassana",
            kicker: "Theravada Buddhism",
            image: "vipassana",
            alt: "A small figure in a dark field with golden particles drifting around",
            lead: "Observing what is happening, without choosing and without judging.",
            body: [
              "Vipassana translates as insight: seeing things as they are. Instead of one object, attention moves freely through bodily sensations, warmth, coolness, tingling, pressure, vibration. Whatever appears is noted and released.",
              "A classic course lasts ten days and includes long hours of sitting, early rising and no talking, reading or writing. The home version is gentler: short sessions in which you watch sensations arise and pass. The point is not to find a pleasant state but to see impermanence."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit comfortably and close your eyes.",
              "Begin with sensations in the belly and chest.",
              "Move attention through the body, noting whatever is noticeable.",
              "Do not linger on the pleasant, and do not push away the unpleasant.",
              "Notice the moment when a sensation changes or disappears."
            ],
            note: "If a strong emotion rises, return to the breath and to the ground beneath you. Deep material is better met with an experienced teacher.",
            time: "15-45 minutes",
            place: "seated"
          }
        ]
      },
      {
        id: "body",
        num: "02",
        title: "Body, energy and gaze",
        subtitle: "Practices that work with the image of the body, the breath and the direction of the eyes.",
        practices: [
          {
            id: "chakras",
            num: "06",
            name: "Chakra meditation",
            kicker: "Yogic tradition",
            image: "chakras",
            alt: "A vertical column of seven glowing circles in dark space",
            lead: "Seven centres, seven lights, and a slow movement of attention from the base upward.",
            body: [
              "Chakra meditation works with an image: along the spine you picture seven luminous centres, from the base of the body to the crown. Tradition gives each one a colour, a sound and a quality. The exact shade matters less than the practice itself: attention to the body and to its states.",
              "Movement usually goes upward. You pause at each centre, imagine a soft glow and observe what happens in the body. If no image appears, it is enough to place attention in that area and feel it. In this practice the chakras remain a language of description, not anatomy."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit upright, close your eyes and take a few breaths.",
              "Place attention at the base of the body and imagine a warm light.",
              "Move slowly to the next centre with each exhale.",
              "Rest at each centre for three to five breaths.",
              "Reach the crown and imagine the light extending beyond the body.",
              "Return attention to the breath and sit quietly."
            ],
            note: "There is no need to force visions. A faint sense of light and warmth in the area is enough.",
            time: "15-20 minutes",
            place: "seated"
          },
          {
            id: "spinal-breathing",
            num: "07",
            name: "Spinal breathing",
            kicker: "Kriya yoga",
            image: "spine",
            alt: "A seated figure in profile with a channel of light from the base of the spine to the brow",
            lead: "Inhale upward along the spine, exhale downward, without strain or holds.",
            body: [
              "Spinal breathing is a foundational kriya yoga practice, popularised by Paramahansa Yogananda. Attention travels with the breath along the spinal column: on the inhale from the base upward to the point between the eyebrows, on the exhale back down.",
              "This is not belly breathing and not breath retention. The breath stays even and quiet, while the movement happens mostly in imagination and in subtle sensation. The practice is often done before main meditation, to gather attention and warm the body."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit with a straight back and relax the shoulders and jaw.",
              "Place attention at the base of the spine.",
              "On the inhale, move it up along the spine to the point between the eyebrows.",
              "On the exhale, move it down the same path, back to the base.",
              "Breathe slowly, without holds, for ten or fifteen cycles."
            ],
            note: "If you feel light-headed, return to ordinary breathing and pause. An even rhythm matters more than depth.",
            time: "5-10 minutes",
            place: "seated, before meditation"
          },
          {
            id: "shambhavi-mudra",
            num: "08",
            name: "Shambhavi Mudra",
            kicker: "Hatha yoga",
            image: "shambhavi",
            alt: "Closed eyes with a soft glow at the point between the eyebrows",
            lead: "A soft gaze into the space ahead and attention at the centre of the forehead.",
            body: [
              "Shambhavi mudra, also called bhairavi mudra, comes from hatha yoga and is connected with the ajna chakra. The eyes stay open, but the gaze does not catch on objects: it is gently unfocused and directed into the space ahead, while attention is gathered between the eyebrows.",
              "From the outside it looks like quiet contemplation. Inside, the work is subtle: the eyes are relaxed, the mind is not busy analysing what it sees, and attention rests in one point. Many describe the state as clear and quiet at the same time."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit comfortably with a straight back and the chin slightly lowered.",
              "Without closing the eyes, direct the gaze forward and slightly upward.",
              "Soften the focus, without crossing the eyes toward the nose.",
              "Gather attention at the point between the eyebrows.",
              "Breathe calmly. If the eyes tire, close them and rest."
            ],
            note: "If the eyes strain, a headache appears or you feel discomfort, stop. This is an exercise in a relaxed gaze, not in effort.",
            time: "5-15 minutes",
            place: "seated"
          }
        ]
      },
      {
        id: "mindfulness",
        num: "03",
        title: "Mindfulness in daily life",
        subtitle: "Practices without a cushion or a timer: in movement, at the table, in an ordinary day.",
        practices: [
          {
            id: "mindful-walking",
            num: "09",
            name: "Mindfulness in movement",
            kicker: "Mindfulness practices",
            image: "walking",
            alt: "A line of golden footprints fading into mist with a thin circle on the ground",
            lead: "Walking in which the step matters, not the destination.",
            body: [
              "Meditation in movement carries attention off the cushion and into ordinary life. The simplest version is slow walking along a straight line: you are not going anywhere, you simply notice the foot meeting the floor, the shift of weight, the change in the breath.",
              "The same principle works in any activity: washing dishes, climbing stairs, the walk to the station. Choose one action and do it a little slower than usual, staying entirely inside it."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Choose a level stretch of five to ten metres.",
              "Walk slower than usual, with no goal of arriving.",
              "Notice in turn: heel, foot, the shift of weight.",
              "At the turn, stop, register the movement and walk back.",
              "At the end, stand for a minute and feel the whole body."
            ],
            note: "Outdoors, walking can be combined with an ordinary errand, so the practice needs no separate time.",
            time: "10-20 minutes",
            place: "outdoors or at home"
          },
          {
            id: "mindful-eating",
            num: "10",
            name: "Mindful eating",
            kicker: "Mindfulness practices",
            image: "eating",
            alt: "A single bowl with fruit on a dark table, warm rim light",
            lead: "One meal, no screen, full attention on taste.",
            body: [
              "Mindful eating is one of the most accessible practices, because eating happens every day. The point is to eat not on autopilot: to notice the look, the smell, the texture, the taste and the moment when fullness arrives.",
              "The classic exercise is to eat one raisin in five minutes. It may seem strange, yet that slowing down shows how many layers of experience we usually skip. At the table it is enough to put the phone away and eat the first three minutes in silence."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Sit at the table, put the phone away and turn off the screen.",
              "Look at the food, noting colour and smell.",
              "Chew the first three bites slowly, without distraction.",
              "Put the cutlery down between bites.",
              "Notice the moment when there is enough."
            ],
            note: "This is not about dieting or restriction. It is only about attention to what is already happening.",
            time: "15-20 minutes",
            place: "at the table"
          },
          {
            id: "body-scan",
            num: "11",
            name: "Body scan",
            kicker: "Mindfulness practices",
            image: "bodyscan",
            alt: "A reclining figure drawn in a single gold line with a band of light passing over it",
            lead: "A slow passage of attention from the feet to the crown of the head.",
            body: [
              "The body scan is a basic mindfulness practice, familiar to anyone who has taken a stress reduction course. You lie or sit and move attention through the body in sequence, from the feet to the head, noting whatever is there: warmth, weight, emptiness, tingling.",
              "It is usually the first practice people meet, because it needs neither breath concentration nor imagery. The task is simple and mechanical, so the mind resists less. Many people fall asleep, and that is fine too: it means the body is genuinely resting."
            ],
            stepsTitle: "How to practise",
            steps: [
              "Lie on your back, arms along the body, eyes closed.",
              "Begin with the toes and move slowly upward.",
              "Rest in each area for two or three breaths.",
              "Do not change the sensations, simply note them.",
              "Finish at the crown and feel the body as a whole."
            ],
            note: "If sleep takes over, try sitting. The scan works in an upright position as well.",
            time: "10-20 minutes",
            place: "lying down"
          }
        ]
      }
    ],
    closingKicker: "Pace",
    closingTitle: "Practise at your own rhythm",
    closingText: "None of these practices has to be done every day, and none has to be done perfectly. It is enough to return to the one that resonates and to notice what changes in ordinary life.",
    disclaimer: "These descriptions are offered in a cultural and historical context. They are not medical advice: with health concerns or acute conditions, speak to a doctor first.",
    manifest: contact.manifestEn,
    footerBrand: "Neo Orbital Meditation",
    footerNote: "A practice of quiet, attention and connection with the body."
  },
  uk: {
    metaTitle: "Медитації | Неоорбітальна медитація",
    metaDescription: "Одинадцять медитацій: мікрокосмічна орбіта, метта, мудіта, шаматха, віпассана, чакри, дихання хребта, шамбхаві мудра та практики усвідомленості.",
    skip: "Перейти до вмісту",
    menuOpen: "Відкрити меню",
    menuClose: "Закрити меню",
    top: "Догори",
    eyebrow: "Практики",
    title: "Медитації",
    lead: "Одинадцять практик, які можна робити вдома: від даоської орбіти й буддійської метти до усвідомленого харчування та повільної ходьби.",
    indexTitle: "Зміст",
    howKicker: "Перед початком",
    howTitle: "Як вибрати практику",
    how: [
      { title: "З чого почати", text: "Зі сканування тіла або шаматхи. Десяти хвилин на день достатньо, щоб звикнути до формату й зрозуміти, як поводиться увага." },
      { title: "Як часто", text: "Краще коротко й регулярно, ніж довго й раз на місяць. Три-чотири рази на тиждень уже дають різницю, яку можна помітити." },
      { title: "Чого чекати", text: "Тиша не приходить на замовлення. Практика — це тренування повернення, а не іспит на порожню голову, і відволікатися на ній нормально." }
    ],
    groups: [
      {
        id: "classical",
        num: "01",
        title: "Класичні практики",
        subtitle: "Традиції, у яких увага й дихання складаються у стійку форму.",
        practices: [
          {
            id: "microcosmic-orbit",
            num: "01",
            name: "Мікрокосмічна орбіта",
            kicker: "Даосизм, цигун",
            image: "orbit",
            alt: "Сидяча фігура з тонких золотих ліній, навколо неї замкнене коло світла",
            lead: "Замкнене коло уваги: вгору хребтом і вниз передньою лінією тіла.",
            body: [
              "Мікрокосмічна орбіта, або сяо чжоу тянь, — одна з базових практик даоської внутрішньої алхімії та цигуну. Дихання тут поєднують із рухом уваги двома каналами: Керуючим, що йде вздовж спини, і Функціональним, що проходить передньою стороною тіла. Разом вони утворюють замкнений контур — звідси й слово «орбіта».",
              "Сенс не в тому, щоб прискорити енергію чи досягти яскравих відчуттів. Скоріше навпаки: увага рухається повільно, вслід за диханням, а відчуття залишаються м'якими. Багато хто описує практику як теплий струмінь, що поступово наповнює живіт, спину й голову."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте зручно, спина пряма, руки на стегнах або складені під животом.",
              "Зберіть увагу в точці на два-три сантиметри нижче пупка й побудьте там кілька вдихів.",
              "На вдиху ведіть увагу від промежини вгору хребтом, через потилицю, до маківки.",
              "На видиху ведіть її вниз обличчям, грудьми й животом, повертаючись у вихідну точку.",
              "Зробіть дев'ять або вісімнадцять кіл і посидьте в тиші ще хвилину."
            ],
            note: "Якщо в голові з'являється напруга, зупиніться й подихайте животом. Рух уваги не має перетворюватися на зусилля.",
            time: "15-20 хвилин",
            place: "сидячи"
          },
          {
            id: "metta",
            num: "02",
            name: "Метта",
            kicker: "Буддизм тхеравади",
            image: "metta",
            alt: "Відкриті долоні тримають серце зі світла, навколо розходяться кільця",
            lead: "Медитація люблячої доброти: побажання добра собі й іншим, промовлене подумки.",
            body: [
              "Метта, або медитація люблячої доброти, прийшла з буддійської традиції тхеравади. Вона входить до чотирьох безмірних станів разом зі співчуттям, спорадістю й рівністю. В основі простий жест: ви подумки бажаєте благополуччя, починаючи з себе й поступово розширюючи коло.",
              "Формула зазвичай коротка: «Нехай мені буде спокійно. Нехай мені буде добре. Нехай мені буде легко». Слова не потрібно повторювати механічно, важливіше намір, що за ними стоїть. Якщо тепло не з'являється, це нормально: достатньо щирого побажання, навіть сухого."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте або ляжте зручно й зробіть кілька спокійних вдихів.",
              "Спрямуйте побажання собі: нехай мені буде спокійно, нехай мені буде добре.",
              "Згадайте близьку людину й побажайте того самого їй.",
              "Потім нейтральну людину, наприклад сусіда чи перехожого.",
              "Наприкінці — того, з ким стосунки складні, наскільки це виходить без насильства над собою.",
              "Розширте побажання на всіх людей і істот навколо."
            ],
            note: "Якщо стає важко, поверніться до себе й до найпростішого побажання. Метта не вимагає героїзму.",
            time: "10-20 хвилин",
            place: "сидячи або лежачи"
          },
          {
            id: "mudita",
            num: "03",
            name: "Мудіта",
            kicker: "Буддизм, брахмавіхари",
            image: "mudita",
            alt: "Дві сфери світла піднімаються над темною водою, навколо м'які кола",
            lead: "Спорадість: радість за чужий успіх, яку можна тренувати так само, як увагу.",
            body: [
              "Мудіта — це третій із чотирьох безмірних станів, спорадість. Це здатність щиро радіти, коли добре іншому: його успіху, здоров'ю, спокою, маленькій удачі. У традиції її вважають найскладнішою з чотирьох, бо вона безпосередньо зустрічається із заздрістю.",
              "Практика починається з простого: згадайте людину, якій зараз справді добре, і спробуйте порадіти за неї без застережень. Не «добре, що в нього вийшло, але», а просто «добре». Поступово коло розширюється, і до нього входять люди, чиї успіхи зачіпають більше."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Згадайте людину, чия радість вам приємна, і подумки скажіть: я радію за тебе.",
              "Помітьте, де в тілі відгукується ця радість: у грудях, у животі, в обличчі.",
              "Дозвольте почуттю бути, не підсилюючи його.",
              "Розширте побажання: нехай добре приходить до всіх, хто мені дорогий.",
              "Якщо з'являється заздрість, відзначте її спокійно й поверніться до побажання."
            ],
            note: "Мудіта не про ввічливість. Якщо радості немає, чесніше помітити це, ніж зображувати почуття, якого не існує.",
            time: "10-15 хвилин",
            place: "сидячи"
          },
          {
            id: "shamatha",
            num: "04",
            name: "Шаматха",
            kicker: "Індійська традиція",
            image: "shamatha",
            alt: "Один рівний вогонь усередині тонкого золотого кола над спокійною водою",
            lead: "Одна увага, один об'єкт і спокійне повернення щоразу, коли розум пішов.",
            body: [
              "Шаматха, або заспокоєння розуму, — це практика односпрямованої уваги. У ній обирають один об'єкт, найчастіше дихання, і вчаться повертатися до нього щоразу, коли розум іде. Відхід розуму тут не помилка, а частина роботи: саме повернення тренує стійкість.",
              "Плід шаматхи в класичних текстах описують як самадхі — зосередження, у якому розум залишається на об'єкті без зусилля. Шлях до нього традиційно ділять на дев'ять стадій, від перших спроб утримати увагу до повної безтурботності. На практиці важливіше не рахувати стадії, а помічати, що повертатися стає легше."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте з прямою спиною, очі можна прикрити.",
              "Виберіть точку опори: відчуття повітря біля носа або рух живота.",
              "Тримайте увагу в одному місці, не контролюючи дихання.",
              "Коли помітили, що розум пішов, м'яко поверніться, без докорів.",
              "Рахуйте повернення, а не хвилини."
            ],
            note: "Нудьга й сонливість на цій практиці — звична річ. Якщо вони приходять, випростайте спину й розплющте очі на хвилину.",
            time: "10-25 хвилин",
            place: "сидячи"
          },
          {
            id: "vipassana",
            num: "05",
            name: "Віпассана",
            kicker: "Буддизм тхеравади",
            image: "vipassana",
            alt: "Маленька фігура в темному полі, навколо неї пливуть золоті часточки світла",
            lead: "Спостереження того, що відбувається, без вибору й без оцінки.",
            body: [
              "Віпассана перекладається як прозріння і означає бачення речей такими, якими вони є. Замість одного об'єкта увага вільно переміщується тілесними відчуттями: тепло, прохолода, поколювання, тиск, вібрація. Усе, що з'являється, відзначають і відпускають.",
              "Класичний курс віпассани триває десять днів і включає довгі години сидіння, ранні підйоми й заборону на розмови, читання та письмо. Домашня версія м'якша: короткі сесії, у яких ви спостерігаєте, як відчуття з'являються й зникають. Сенс не в тому, щоб знайти приємний стан, а в тому, щоб побачити непостійність."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте зручно й заплющте очі.",
              "Почніть із відчуттів у ділянці живота й грудей.",
              "Переміщуйте увагу тілом, відзначаючи все, що помітно.",
              "Не затримуйтеся на приємному й не відштовхуйте неприємне.",
              "Помічайте момент, коли відчуття змінюється або зникає."
            ],
            note: "Якщо піднімається сильна емоція, поверніться до дихання й до опори під собою. До глибокого матеріалу краще йти з досвідченим наставником.",
            time: "15-45 хвилин",
            place: "сидячи"
          }
        ]
      },
      {
        id: "body",
        num: "02",
        title: "Тіло, енергія і погляд",
        subtitle: "Практики, де робота йде з образом тіла, диханням і напрямком очей.",
        practices: [
          {
            id: "chakras",
            num: "06",
            name: "Медитація на розкриття чакр",
            kicker: "Йогічна традиція",
            image: "chakras",
            alt: "Вертикальна колона із семи сяючих кіл у темному просторі",
            lead: "Сім центрів, сім вогнів і повільний рух уваги знизу вгору.",
            body: [
              "Медитація на розкриття чакр працює з образом: уздовж хребта уявляють сім сяючих центрів, від основи тіла до маківки. Кожному традиція приписує свій колір, звук і якість. Тут важливий не точний відтінок, а сама практика уваги до тіла та його станів.",
              "Зазвичай рух іде знизу вгору: ви зупиняєтеся на кожному центрі, уявляєте м'яке світіння й спостерігаєте, що відбувається в тілі. Якщо образ не з'являється, достатньо просто спрямувати увагу в цю ділянку й відчути її. Чакри в цій практиці залишаються мовою опису, а не анатомією."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте прямо, заплющте очі й зробіть кілька вдихів.",
              "Спрямуйте увагу в основу тіла й уявіть тепле світло.",
              "Повільно піднімайтеся до наступного центру на кожному видиху.",
              "На кожному центрі затримайтеся на три-п'ять вдихів.",
              "Дійдіть до маківки й уявіть, що світло виходить за межі тіла.",
              "Поверніться увагою до дихання й посидьте в тиші."
            ],
            note: "Не потрібно тиснути на себе й викликати видіння. Достатньо нечіткого відчуття світла й тепла в ділянці.",
            time: "15-20 хвилин",
            place: "сидячи"
          },
          {
            id: "spinal-breathing",
            num: "07",
            name: "Дихання хребта",
            kicker: "Крія-йога",
            image: "spine",
            alt: "Профіль сидячої людини, уздовж спини канал світла від основи до міжбрів'я",
            lead: "Вдих угору хребтом, видих униз, без напруження й затримок.",
            body: [
              "Дихання хребта — це базова практика крія-йоги, яку популяризував Парамаханса Йогананда. Увага рухається разом із диханням по хребетному стовпу: на вдиху від основи вгору, до точки між бровами, на видиху — назад униз.",
              "Це не дихання животом і не затримки. Дихання залишається рівним і тихим, а рух відбувається радше в уяві й у тонких відчуттях. Практику часто роблять перед основною медитацією, щоб зібрати увагу й розігріти тіло."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте з прямою спиною, розслабте плечі й щелепу.",
              "Покладіть увагу біля основи хребта.",
              "На вдиху ведіть її вгору, уздовж хребта, до міжбрів'я.",
              "На видиху ведіть униз тим самим шляхом назад.",
              "Дихaйте повільно, без затримок, десять-п'ятнадцять циклів."
            ],
            note: "Якщо з'являється запаморочення, поверніться до звичайного дихання й зробіть паузу. Рівний ритм важливіший за глибину.",
            time: "5-10 хвилин",
            place: "сидячи, перед медитацією"
          },
          {
            id: "shambhavi-mudra",
            num: "08",
            name: "Шамбхаві мудра",
            kicker: "Хатха-йога",
            image: "shambhavi",
            alt: "Заплющені очі й м'яке світіння в точці між бровами",
            lead: "М'який погляд у простір перед собою й увага в центрі лоба.",
            body: [
              "Шамбхаві мудра, її також називають бхайраві мудра, — це практика з хатха-йоги, пов'язана з аджна-чакрою. Очі залишаються розплющеними, але погляд не чіпляється за предмети: він м'яко розфокусований і спрямований у простір перед собою, а увага зібрана в точці між бровами.",
              "Зовні це виглядає як спокійне споглядання. Усередині відбувається тонка робота: очі розслаблені, розум не зайнятий розбором побаченого, увага утримується в одній точці. Багато хто описує стан як ясний і тихий одночасно."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте зручно, спина пряма, підборіддя трохи опущене.",
              "Не заплющуючи очей, спрямуйте погляд уперед і трохи вгору.",
              "Розфокусуйте погляд, не зводячи очі до перенісся.",
              "Зберіть увагу в точці між бровами.",
              "Дихaйте спокійно. Якщо очі втомилися, заплющте їх і відпочиньте."
            ],
            note: "При напруженні в очах, головному болю або дискомфорті практику варто припинити. Це вправа для розслабленого погляду, а не для зусилля.",
            time: "5-15 хвилин",
            place: "сидячи"
          }
        ]
      },
      {
        id: "mindfulness",
        num: "03",
        title: "Усвідомленість у повсякденні",
        subtitle: "Практики без подушки й таймера: у русі, за столом, у звичайному дні.",
        practices: [
          {
            id: "mindful-walking",
            num: "09",
            name: "Усвідомленість у русі",
            kicker: "Практики усвідомленості",
            image: "walking",
            alt: "Ланцюжок золотих слідів іде в туман, на піску лежить тонке коло",
            lead: "Ходьба, у якій важлива не мета, а сам крок.",
            body: [
              "Медитація в русі переносить увагу з подушки у звичайне життя. Найпростіший варіант — повільна ходьба прямою: ви йдете нікуди, а просто помічаєте, як стопа торкається підлоги, як переноситься вага, як змінюється дихання.",
              "Той самий принцип працює в будь-якій діяльності: миття посуду, підйом сходами, дорога до метро. Достатньо вибрати одну дію й робити її трохи повільніше за звичайне, цілком у ній залишаючись."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Виберіть рівний відрізок дороги завдовжки п'ять-десять метрів.",
              "Ідіть повільніше за звичайне, без мети дійти.",
              "Помічайте по черзі: п'ята, стопа, перенесення ваги.",
              "На повороті зупиніться, усвідомте рух і йдіть назад.",
              "Наприкінці постоїть хвилину, відчуваючи тіло цілком."
            ],
            note: "На вулиці зручно поєднувати ходьбу зі звичайною дорогою у справах. Тоді практика не потребує окремого часу.",
            time: "10-20 хвилин",
            place: "на вулиці або вдома"
          },
          {
            id: "mindful-eating",
            num: "10",
            name: "Усвідомлене приймання їжі",
            kicker: "Практики усвідомленості",
            image: "eating",
            alt: "Одна піала з плодом на темному столі, тепле світло по краю",
            lead: "Одна їжа, без екрана, з повною увагою до смаку.",
            body: [
              "Усвідомлене приймання їжі — одна з найдоступніших практик, бо їжа трапляється щодня. Суть у тому, щоб їсти не на автоматі: помічати вигляд, запах, текстуру, смак і момент, коли з'являється ситість.",
              "Класична вправа — з'їсти одну родзинку за п'ять хвилин. Це може здатися дивним, але саме таке уповільнення показує, скільки шарів досвіду ми зазвичай пропускаємо. За столом достатньо прибрати телефон і перші три хвилини їсти мовчки."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Сядьте за стіл, приберіть телефон і вимкніть екран.",
              "Подивіться на їжу, відзначте колір і запах.",
              "Перші три шматочки жуйте повільно, не відволікаючись.",
              "Відкладайте прибор між шматочками.",
              "Помітьте момент, коли їжі достатньо."
            ],
            note: "Практика не про дієту й не про обмеження. Це лише про увагу до того, що вже відбувається.",
            time: "15-20 хвилин",
            place: "за столом"
          },
          {
            id: "body-scan",
            num: "11",
            name: "Сканування тіла",
            kicker: "Практики усвідомленості",
            image: "bodyscan",
            alt: "Лежача фігура з однієї золотої лінії, по ній проходить смуга світла",
            lead: "Повільний прохід уваги від стоп до маківки.",
            body: [
              "Сканування тіла — базова практика усвідомленості, знайома всім, хто проходив курси зниження стресу. Ви лежите або сидите й послідовно проводите увагу тілом, від стоп до голови, відзначаючи все, що є: тепло, важкість, порожнечу, поколювання.",
              "Зазвичай це перша практика, з якої починають: вона не потребує ні концентрації на диханні, ні образів. Завдання просте й механічне, тому розум менше опирається. Багато хто засинає, і це теж нормально: отже, тіло справді відпочиває."
            ],
            stepsTitle: "Як практикувати",
            steps: [
              "Ляжте на спину, руки вздовж тіла, очі заплющені.",
              "Почніть із пальців ніг і повільно піднімайтеся вище.",
              "На кожній ділянці затримайтеся на два-три вдихи.",
              "Не змінюйте відчуття, просто відзначайте їх.",
              "Закінчіть на маківці й відчуйте тіло цілком."
            ],
            note: "Якщо сон долає, спробуйте сидіти. Сканування працює і у вертикальному положенні.",
            time: "10-20 хвилин",
            place: "лежачи"
          }
        ]
      }
    ],
    closingKicker: "Темп",
    closingTitle: "Практикуйте у своєму ритмі",
    closingText: "Жодну з цих практик не потрібно робити щодня і не потрібно робити ідеально. Достатньо повертатися до тієї, що відгукується, і помічати, що змінюється у звичайному житті.",
    disclaimer: "Описи подано в культурному й історичному контексті. Це не медична рекомендація: за проблем зі здоров'ям і в гострих станах варто спершу порадитися з лікарем.",
    manifest: contact.manifestUk,
    footerBrand: "Неоорбітальна медитація",
    footerNote: "Практика тиші, уваги й контакту з тілом."
  }
};

const byId = (id) => document.getElementById(id);
const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function closeMenu() {
  const toggle = byId("menu-toggle");
  if (!toggle) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", content[currentLanguage].menuOpen);
  byId("primary-nav").classList.remove("is-open");
}

function renderNav() {
  const list = byId("nav-list");
  if (!list || !window.NOMNav) return;
  window.NOMNav.render(list, { lang: currentLanguage, fromMeditations: true });
  list.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

function renderIndex(copy) {
  const list = byId("med-index");
  list.replaceChildren();
  const all = copy.groups.flatMap((group) => group.practices);
  all.forEach((practice) => {
    const li = create("li");
    const a = create("a", "med-index-link");
    a.href = `#${practice.id}`;
    const num = create("span", "med-index-num", practice.num);
    const name = create("span", "med-index-name", practice.name);
    a.append(num, name);
    li.append(a);
    list.append(li);
  });
}

function renderHow(copy) {
  const list = byId("how-list");
  list.replaceChildren();
  copy.how.forEach((card) => {
    const li = create("li", "how-card");
    li.append(create("h3", "", card.title), create("p", "", card.text));
    list.append(li);
  });
}

function buildPractice(practice, index) {
  const article = create("article", "practice");
  article.id = practice.id;
  if (index % 2 === 1) article.classList.add("practice--flip");

  const figure = create("figure", "practice-media");
  const img = document.createElement("img");
  img.src = `assets/meditations/${practice.image}-1400.webp`;
  img.srcset = `assets/meditations/${practice.image}-700.webp 700w, assets/meditations/${practice.image}-1400.webp 1400w`;
  img.sizes = "(max-width: 900px) 100vw, 520px";
  img.alt = practice.alt;
  img.width = 1400;
  img.height = 1050;
  img.loading = "lazy";
  img.decoding = "async";
  figure.append(img);

  const body = create("div", "practice-body");
  body.append(create("p", "practice-kicker", `${practice.num} / ${practice.kicker}`));
  body.append(create("h3", "", practice.name));
  body.append(create("p", "practice-lead", practice.lead));

  const prose = create("div", "practice-prose");
  practice.body.forEach((paragraph) => prose.append(create("p", "", paragraph)));
  body.append(prose);

  body.append(create("h4", "steps-title", practice.stepsTitle));
  const steps = create("ol", "steps");
  practice.steps.forEach((step) => steps.append(create("li", "", step)));
  body.append(steps);

  if (practice.note) body.append(create("p", "practice-note", practice.note));

  const meta = create("p", "practice-meta");
  meta.append(create("span", "", practice.time), create("span", "", practice.place));
  body.append(meta);

  article.append(figure, body);
  return article;
}

function renderGroups(copy) {
  const holder = byId("med-groups");
  holder.replaceChildren();
  let counter = 0;
  copy.groups.forEach((group) => {
    const section = create("section", "practice-group");
    section.id = group.id;
    section.setAttribute("aria-labelledby", `${group.id}-title`);

    const head = create("header", "group-head");
    const marker = create("span", "group-num", group.num);
    const heading = create("h2", "", group.title);
    heading.id = `${group.id}-title`;
    head.append(marker, heading, create("p", "group-sub", group.subtitle));
    section.append(head);

    group.practices.forEach((practice) => {
      section.append(buildPractice(practice, counter));
      counter += 1;
    });

    holder.append(section);
  });
}

let currentLanguage = "ru";

function setLanguage(lang) {
  if (!content[lang]) return;
  currentLanguage = lang;
  const copy = content[lang];
  document.documentElement.lang = lang;
  document.title = copy.metaTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = copy.metaDescription;

  byId("skip").textContent = copy.skip;
  byId("med-eyebrow").textContent = copy.eyebrow;
  byId("med-title").textContent = copy.title;
  byId("med-lead").textContent = copy.lead;
  byId("med-index-title").textContent = copy.indexTitle;
  byId("how-kicker").textContent = copy.howKicker;
  byId("how-title").textContent = copy.howTitle;
  byId("closing-kicker").textContent = copy.closingKicker;
  byId("closing-title").textContent = copy.closingTitle;
  byId("closing-text").textContent = copy.closingText;
  byId("med-disclaimer").textContent = copy.disclaimer;
  byId("manifest-text").textContent = copy.manifest;
  byId("footer-brand").textContent = copy.footerBrand;
  byId("footer-note").textContent = copy.footerNote;
  byId("footer-brand").href = "index.html";
  byId("contact-email").textContent = contact.email;
  byId("contact-email").href = `mailto:${contact.email}`;
  byId("menu-toggle").setAttribute("aria-label", copy.menuOpen);
  document.querySelector(".back-to-top").setAttribute("aria-label", copy.top);
  document.querySelector(".primary-nav").setAttribute("aria-label", lang === "ru" ? "Основная навигация" : lang === "uk" ? "Головна навігація" : "Main navigation");
  document.querySelector(".brand").setAttribute("aria-label", lang === "ru" ? "Neo Orbital Meditation, на главную" : lang === "uk" ? "Neo Orbital Meditation, на головну" : "Neo Orbital Meditation, home");

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === lang));
  });

  renderNav();
  renderIndex(copy);
  renderHow(copy);
  renderGroups(copy);
  closeMenu();

  try { localStorage.setItem("nom-language", lang); } catch (_) { /* Local storage may be disabled. */ }
}

byId("menu-toggle").addEventListener("click", () => {
  const toggle = byId("menu-toggle");
  const nav = byId("primary-nav");
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? content[currentLanguage].menuClose : content[currentLanguage].menuOpen);
  nav.classList.toggle("is-open", open);
});

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

let initialLanguage = "ru";
try {
  const saved = localStorage.getItem("nom-language");
  if (saved === "ru" || saved === "en" || saved === "uk") initialLanguage = saved;
} catch (_) { /* The default is Russian. */ }
setLanguage(initialLanguage);

if (window.location.hash) {
  const jumpToHash = () => {
    try {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView();
    } catch (_) { /* Ignore an invalid hash. */ }
  };
  window.requestAnimationFrame(() => window.requestAnimationFrame(jumpToHash));
}
