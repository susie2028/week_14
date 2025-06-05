  // Firebase 초기화
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaPk-3NwSVd28tFK3BhcEJyjFFBlBHw0I",  // 네 값으로 대체
  authDomain: "dream-a5ea7.firebaseapp.com",
  projectId: "dream-a5ea7",
  storageBucket: "dream-a5ea7.appspot.com",
  messagingSenderId: "415046137671",
  appId: "1:415046137671:web:b7fc400127acfd13c23e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const imageMap = {
  "강물 위를 걷는 꿈": "river_walk.png",
  "강에서 헤엄치는 꿈": "river_swim.png",
  "맑은 강물이나 호수에 손이나 발을 담근 꿈": "river_hand.png",
  "물에 빠지는 꿈": "sea_help.png",
  "잔잔한 맑은 바다를 바라보는 꿈": "sea.png",
  "높은 산에 오르는 꿈": "mountain.png",
  "산에서 굴러 떨어지는 꿈": "mountain_fall.png",
  "해를 보고 절을 하는 꿈": "sun_hi.png",
  "머리 위에 해를 얹고 있는 꿈": "sun_head.png",
  "보름달을 보는 꿈": "moon_full.png",
  "반달을 보는 꿈": "moon_half.png",
  "머리카락이 빠지는 꿈": "hair_runaway.png",
  "치아가 흔들리는 꿈": "teeth_shaking.png",
  "지진이 일어나는 꿈": "earthquake.png",
  "집에 불이 나는 꿈": "house_fire.png",
  "학교에 불나는 꿈": "school_fire.png",
  "천둥소리를 듣는 꿈": "thunder_sound.png",
  "얼굴 다치는 꿈": "face_hurt.png",
  "코가 부러지는 꿈": "broken_nose.png",
  "코에서 피가 나는 꿈": "nose_bleed.png",
  "주름이 생기는 꿈": "face_wrinckle.png",
  "손가락이 잘리는 꿈": "finger_hurt.png",
  "발이 부러지는 꿈": "crutches.png",
  "앞니가 빠지는 꿈": "front_teetth.png",
  "아랫니가 빠지는 꿈": "bottom_teeth.png",
  "치아가 모두 빠지는 꿈": "all_teeth.png",
  "치아를 스스로 뽑는 꿈": "teetch_byself.png",
  "치아가 자라나는 꿈": "teetch_grow.png",
  "발에 상처가 나는 꿈": "foot_hurt.png",
  "개에게 물리는 꿈": "dog_bite.png",
  "개를 키우는 꿈": "dog.png",
  "고양이에게 물리는 꿈": "cat_bite.png",
  "고양이를 안는 꿈": "cat_hug.png",
  "뱀이 집에 들어오는 꿈": "snake_in_house.png",
  "뱀을 잡는 꿈": "snake_catch.png",
  "하늘로 용이 승천을 하는 꿈": "dragon_tothe_sky.png",
  "용이 하늘에서 떨어지는 꿈": "dragon_fall.png",
  "호랑이를 만나는 꿈": "tiger_see.png",
  "고래 떼가 나오는 꿈": "whales.png",
  "과일을 보는 꿈": "fruit.png",
  "돼지를 보는 꿈": "pig.png",
  "흰색 쥐를 보는 꿈": "white_mouse.png",
  "병원에 입원하는 꿈": "hospital.png",
  "전염병에 걸리는 꿈": "infection.png",
  "열이 나는 꿈": "heat.png",
  "반려동물이 아픈 꿈": "dog_sick.png",
  "도둑맞는 꿈": "thief.png",
  "지각하는 꿈": "late.png",
  "귀신이 나오는 꿈": "ghost.png",
  "시험 보는 꿈": "test.png",
  "비행기를 타는 꿈": "airplane.png",
  "쫓기는 꿈": "run.png",
  "돈 받는 꿈": "money.png",
  "가게에서 돈을 내고 물건을 사는 꿈": "shop.png",
  "조상에게 돈을 받는 꿈": "money_give.png",
  "남의 돈을 뺏는 꿈": "money_take.png",
  "거울이 깨지는 꿈": "broken_mirror.png",
  "무대에 서는 꿈": "stage.png",
  "하늘을 나는 꿈": "fly.png",
  "높은 곳에서 떨어지는 꿈": "sky_fall.png",
  "가구를 사는 꿈": "sofa.png",
  "가구를 고치는 꿈": "sofa_fix.png",
  "침대가 딱딱하여 불편한 꿈": "bed.png",
  "다른 사람 책상에 앉는 꿈": "desk.png",
  "자신의 의자에 다른 사람이 앉아있는 꿈": "chair.png",
  "운전하는 꿈": "handle.png",
  "교통사고를 피하는 꿈": "car_run.png",
  "온 가족이 한 자리에 모이는 꿈": "family.png",
  "부모님이 병으로 앓아누워 계시는 꿈": "parent_sick.png",
  "부모님이 돌아가시는 꿈": "parent_die.png",
  "모르는 사람이 가족 행세를 하는 꿈": "stranger_in_family.png",
  "조상이 나오는 꿈": "ancestor.png",
  "연예인과 결혼하는 꿈": "marry.png",
  "친구가 화를 내는 꿈": "angry_friend.png",
  "연예인이 집안으로 들어오는 꿈": "star_house.png",
  "옛 친구가 나오는 꿈": "meet_old_friend.png",
  "구타 당하는 꿈": "punch.png",
  "자신이 유명한 연예인이 되는 꿈": "become_star.png",
  "유명한 연예인을 만나는 꿈": "meet_star.png",
  "정치인을 만나는 꿈": "meet_politician.png",
  "정치인이 죽는 꿈": "politician_die.png",
  "군대가 정렬하여 전쟁터로 향하는 꿈": "war.png",
  "전쟁터에서 자신이 전사하는 꿈": "die_in_war.png",
  "전쟁이 나서 피난을 가는 꿈": "war_go.png",
  "차를 마신 꿈": "tea.png",
  "사탕을 먹는 꿈": "candy.png",
  "놀이공원에 가는 꿈": "theme_park.png",
  "교통사고가 나는 꿈": "car_crash.png",
  "순간이동을 하는 꿈": "movinf.png",
  "돼지가 도망가는 꿈": "pig_run.png",
  "우주로 가는 꿈": "galaxy.png",
  "외계인을 만나는 꿈": "alien.png",
  "끝이 없는 계단 꿈": "stairs.png",
  "성별이 바뀌는 꿈": "gender.png",
  "동물로 변신하는 꿈": "wearwolf.png",
  "다른 사람과 몸이 바뀌는 꿈": "change.png",
  "나무를 심는 꿈": "tree.png",
  "꽃을 보는 꿈": "flower.png",
  // ... (계속 추가)
};



  const data = {
      '자연': {
        '강/호수': ['맑은 강물이나 호수에 손이나 발을 담근 꿈','강물 위를 걷는 꿈',],
        '바다': [ '잔잔한 맑은 바다를 바라보는 꿈'],
        '산': ['높은 산에 오르는 꿈','산에서 굴러 떨어지는 꿈'],
        '해': ['해를 보고 절을 하는 꿈','머리 위에 해를 얹고 있는 꿈'],
        '달': ['보름달을 보는 꿈','반달을 보는 꿈'],
        '지진/홍수': ['지진이 일어나는 꿈'],
        '불': ['집에 불이 나는 꿈','학교에 불나는 꿈'],
        '벼락/천둥': ['천둥소리를 듣는 꿈',],

      },
      '신체': {
        '머리': ['머리카락이 빠지는 꿈'],
        '얼굴': ['얼굴 다치는 꿈','주름이 생기는 꿈'],
        '코': ['코가 부러지는 꿈','코에서 피가 나는 꿈'],
        '손':['손가락이 잘리는 꿈'],
        '발': ['발이 부러지는 꿈','발에 상처가 나는 꿈'],
        '치아': ['치아가 흔들리는 꿈','앞니가 빠지는 꿈','아랫니가 빠지는 꿈','치아가 모두 빠지는 꿈','치아가 자라나는 꿈','치아를 스스로 뽑는 꿈'],

      },
      '동물/식물': {
        '개': ['개를 키우는 꿈','개에게 물리는 꿈'],
        '뱀': ['뱀이 집에 들어오는 꿈','뱀을 잡는 꿈'],
        '용': ['하늘로 용이 승천을 하는 꿈','용이 하늘에서 떨어지는 꿈'],
        '돼지': ['돼지를 보는 꿈','돼지가 도망가는 꿈'],
        '그 외': ['흰색 쥐를 보는 꿈','호랑이를 만나는 꿈','고래 떼가 나오는 꿈','고양이를 안는 꿈','나무를 심는 꿈','꽃을 보는 꿈'],
      },
      '감정/상황': {
        '음식': ['과일을 보는 꿈','차를 마신 꿈','사탕을 먹는 꿈'],
        '장소':['놀이공원에 가는 꿈'],
        '죽음/질병/사고': ['병원에 입원하는 꿈','전염병에 걸리는 꿈','열이 나는 꿈','반려동물이 아픈 꿈', '교통사고가 나는 꿈',
        '물에 빠지는 꿈','구타 당하는 꿈'],
        '불안/공포': ['도둑맞는 꿈','지각하는 꿈','귀신이 나오는 꿈','시험 보는 꿈', '무대에 서는 꿈','쫓기는 꿈',],
        '높이': ['높은 곳에서 떨어지는 꿈',],
      },
      '상징/사물': {
        '돈/보석': ['돈 받는 꿈','조상에게 돈을 받는 꿈','가게에서 돈을 내고 물건을 사는 꿈','남의 돈을 뺏는 꿈'],
        '거울': ['거울이 깨지는 꿈',],
        '가구': ['가구를 사는 꿈','가구를 고치는 꿈','침대가 딱딱하여 불편한 꿈','다른 사람 책상에 앉는 꿈','자신의 의자에 다른 사람이 앉아있는 꿈'],
        '차/탈 것': ['운전하는 꿈', '교통사고를 피하는 꿈','비행기를 타는 꿈'],
      },
      '인물': {
        '가족': ['온 가족이 한 자리에 모이는 꿈','부모님이 병으로 앓아누워 계시는 꿈','부모님이 돌아가시는 꿈','모르는 사람이 가족 행세를 하는 꿈','조상이 나오는 꿈',],
        '친구': ['옛 친구가 나오는 꿈','친구가 화를 내는 꿈',],
        '연예인': ['연예인이 집안으로 들어오는 꿈','연예인과 결혼하는 꿈','자신이 유명한 연예인이 되는 꿈','유명한 연예인을 만나는 꿈'],
        '정치인': ['정치인을 만나는 꿈','정치인이 죽는 꿈'],
      },
      '기타/초현실': {
        '전쟁': ['군대가 정렬하여 전쟁터로 향하는 꿈', '전쟁터에서 자신이 전사하는 꿈','전쟁이 나서 피난을 가는 꿈'],
        '초능력': ['하늘을 나는 꿈','순간이동을 하는 꿈'],
        '변신': ['성별이 바뀌는 꿈','동물로 변신하는 꿈','다른 사람과 몸이 바뀌는 꿈'],
        '우주/외계': ['우주로 가는 꿈','외계인을 만나는 꿈'],
        '비현실적 장소': ['끝이 없는 계단 꿈',]
      },
    };

    const cardTexts = {
      '꽃을 보는 꿈': '행운이 찾아오거나 기쁜 일이 생길 가능성을 암시합니다. 꽃의 색상이 밝고 선명할수록 좋은 징조로 해석됩니다.',
      '나무를 심는 꿈': '새로운 시작, 변화, 번영 및 행운을 의미합니다.',
      '다른 사람과 몸이 바뀌는 꿈': '현재 삶에 지루함을 느끼거나 다른 사람과의 비교, 경쟁에서 스트레스를 받고 있는 상태를 반영합니다.',
      '동물로 변신하는 꿈': '자신이 억누르고 있는 욕망과 두려움을 의미합니다.',
      '성별이 바뀌는 꿈': '삶의 변화와 자신의 정체성을 재발견하려는 과정을 의미합니다.',
      '끝이 없는 계단 꿈': '목표나 꿈이 멀리 있어 도달하기 힘든 상태를 의미합니다.',
      '외계인을 만나는 꿈': '지금까지 자신이 경험해 본 적이 없던 새로운 환경을 접하게 될 것을 암시합니다.',
      '우주로 가는 꿈': '자신이 하고자 하는 일이나 하고 싶었던 일들이 이루어지게 될 것을 암시합니다.',
      '돼지가 도망가는 꿈': '가족이나 친구 등 가까운 사람과의 관계가 틀어지며, 자신의 실수로 인해 좋지 않은 결과를 초래할 수 있습니다.',
      '순간이동을 하는 꿈': '현실에서 벗아나고 싶은 욕망, 혹은 불확실한 미래에 대한 기대와 불안을 의미합니다.',
      '교통사고가 나는 꿈': '새로운 전환점, 인생의 변화, 성장을 암시합니다.',
      '놀이공원에 가는 꿈': '새로운 경험이나 자극을 갈망하는 마음을 반영합니다.',
      '사탕을 먹는 꿈': '평소 하고 싶었던 일을 하게 되거나 작은 소원이 이루어진다는 것을 의미합니다.',
      '차를 마신 꿈': '누군가에게 부탁을 받거나 또는 부탁을 할일이 생긴다는 것을 암시합니다.',
      '전쟁이 나서 피난을 가는 꿈': '현재 삶에서 어려움이나 갈등이 생길 것을 암시합니다.',
      '전쟁터에서 자신이 전사하는 꿈': '노력에 성과가 있어 사업이 번창하게 된다는 것을 의미합니다.',
      '군대가 정렬하여 전쟁터로 향하는 꿈': '새로운 사업을 시작하게 된다는 것을 의미합니다.',
      '정치인이 죽는 꿈': '현재 스트레스를 받고 있던 억압으로부터 해방이 된다는 것을 의미합니다. ',
      '정치인을 만나는 꿈': '사회적 영향력이나 권력에 대한 욕망을 반영합니다. 자신이 인정받고 싶거나 중요한 사람들과 연결되고 싶은 마음을 암시하기도 합니다.',
      '유명한 연예인을 만나는 꿈': '평소 원하고 있던 소망을 이루게 된다는 것을 의미합니다.',
      '돼지를 보는 꿈': '향후 삶이 풍요로워지거나 풍성해질 수 있다는 것을 암시합니다.',
      '자신이 유명한 연예인이 되는 꿈': '현실 도피, 현실에 대한 불만족을 의미합니다.',
      '연예인과 결혼하는 꿈': '큰 행운이 들어오고 운기가 상승하는 것을 의미합니다.',
      '연예인이 집안으로 들어오는 꿈': '뜻밖의 손님이 찾아와 기쁜 소식을 전해주거나 친인척, 귀빈이 찾아올 것을 암시합니다.',
      '친구가 화를 내는 꿈': '가까운 지인이나 친구와의 관계가 안좋아진다는 것을 의미합니다.',
      '옛 친구가 나오는 꿈': '좋은 소식을 듣거나 자신의 마음을 편안하게 만들어줄만한 사람을 만나게 될 것을 의미합니다.',
      '조상이 나오는 꿈': '조상이 밝고 친근한 모습으로 나온다면 기쁘고 경사스러운 일이 생기게 된다는 것을 의미합니다.',
      '모르는 사람이 가족 행세를 하는 꿈': '내면의 숨겨진 자아나 새로운 관계에 대한 갈망을 의미합니다.',
      '부모님이 돌아가시는 꿈': '현실에서 경제적으로 부유해지고 정신적인 안정을 찾게 될 것을 의미합니다.',
      '부모님이 병으로 앓아누워 계시는 꿈': '이제까지 힘들게 진행해오던 일에 막바지 어려움이 있거나 수정을 해야할 일이 생기다는 것을 의미합니다.',
      '가족이 한 자리에 모이는 꿈': '가까운 사람들과 다투어 좋지 않은 일이 생긴다는 것을 의미합니다.',
      '비행기를 타는 꿈': '신변의 변화, 새로운 시작 등을 의미합니다. 또한 큰 꿈이나 목표를 이루고자 하는 열망을 상징하기도 합니다.',
      '교통사고를 피하는 꿈': '자신의 신중한 판단으로 힘든 위기를 극복하고 일이 잘 풀린다는 것을 암시합니다.',
      '운전하는 꿈': '자신이 삶을 어떻게 통제하고 있는지를 반영합니다.',
      '자신의 의자에 다른 사람이 앉아있는 꿈': '자신의 자리를 탐내는 사람이 나타날 수 있음을 암시하는 꿈입니다.',
      '다른 사람 책상에 앉는 꿈': '구직에 성공하거나 직장에서 승진을 하게 될 것을 암시합니다.',
      '침대가 딱딱하여 불편한 꿈': '현재의 불편한 마음 상태를 나타내거나, 불안한 미래를 암시하는 꿈입니다.',
      '가구를 고치는 꿈': '손해를 보거나 어려움을 겪게 될 것을 암시합니다.',
      '가구를 사는 꿈': '새로운 기회나 변화가 생길것을 암시하는 꿈입니다.',
      '거울이 깨지는 꿈': '자아의 손상이나 현재 상태의 심리적 불안정을 의미합니다.',
      '남의 돈을 뺏는 꿈': '자신이 하는 일이 마음먹은대로 술술 잘 풀린다는 것을 암시합니다.',
      '가게에서 돈을 내고 물건을 사는 꿈': '꿈에서 구입한 물건의 크기에 따라 이익을 얻게 됨을 암시합니다.',
      '조상에게 돈을 받는 꿈': '뜻하지 않은 횡재로 예상치 못한 곳에서 재물이 들어올 수 있습니다.',
      '돈 받는 꿈': '반가운 기회나 좋은 변화를 암시합니다. 하는 일이 순조롭게 잘 풀리고 경제적으로 성장하게 됨을 의미합니다.',
      '하늘을 나는 꿈': '지금까지 소망했던 일들이 성취가 됨을 암시합니다.',
      '높은 곳에서 떨어지는 꿈': '자신감 부족과 중요한 상황에서의 불안감을 의미합니다.',
      '쫓기는 꿈': '불안감과 현재 상태에 대한 도피 심리를 의미합니다.',
      '무대에 서는 꿈': '자신을 표현하고 싶은 욕망, 사회적 인정에 대한 갈망을 상징합니다.',
      '시험 보는 꿈': '미래에 대한 불안감, 우려를 의미합니다.',
      '귀신이 나오는 꿈': '좋은 기회가 찾아오게 되어 하고자 하는 일들이 순조롭게 잘 풀리게 될 것을 암시합니다.',
      '지각하는 꿈': '현실에서의 불안감, 초조함, 스트레스를 의미합니다.',
      '도둑맞는 꿈': '근삼과 걱정거리가 해소될 것을 암시합니다.',
      '구타 당하는 꿈': '기대하지 않았던 금전이 생기거나, 하고 있는 일에서 큰 성취를 얻을 수 있음을 암시합니다.',
      '물에 빠지는 꿈': '맑은 물에 빠지는 꿈은 새로운 시작, 긍정적인 변화, 재생을 암시합니다. 하지만 더러운 물이라면 건강 문제, 인간관계의 갈등, 부정적인 상황에 대한 경고일 수 있습니다.',
      '반려동물이 아픈 꿈': '감정적 피로감이나 누군가에 대한 걱정을 의미합니다.',
      '열이 나는 꿈': '감정적 긴장, 열정, 고민 등을 상징합니다.',
      '전염병에 걸리는 꿈': '자기발전과 도약을 상징하여 자신이 추진하고 있는 일이 순조롭게 풀릴 것을 암시합니다.',
      '병원에 입원하는 꿈': '내면의 치유 욕구, 감정 회복, 현실 회피 심리를 의미합니다. 육체적 또는 정신적 회복이 필요하다는 신호일 수 있습니다.',
      '과일을 보는 꿈': '잘 익은 과일이라면 재물운이 상승하고 건강해지며 좋은 일이 생길 것으로 해석됩니다. 반대로 썩은 과일이라면 흉몽으로 해석될 수 있습니다.',
      '용이 하늘에서 떨어지는 꿈': '지위와 권력을 잃게 될 것을 의미합니다.',
      '하늘로 용이 승천을 하는 꿈': '큰 성공과 출세 그리고 높은 사회적 지위를 얻게 될 길몽입니다.',
      '뱀을 잡는 꿈': '재물과 금전이 들어오게 됨을 의미합니다. 뱀이 굵고 그 수가 많을수록 이익이 배가 될 수 있습니다.',
      '뱀이 집에 들어오는 꿈': '돈과 재물이 생기게되고, 기쁜 소식이나 귀한 손님이 찾아온다는 것을 의미합니다. 반대로 나가게 되면 재물과 행운을 잃게 될 수 있습니다.',
      '교통사고를 피하는 꿈': '자신의 판단으로 힘들고 어려운 상황을 피할 것을 암시합니다.',
      '운전하는 꿈': '자신이 삶을 어떻게 통제하는지를 보여줍니다. 능숙하게 운전한다면 삶의 주도권을 잘 가지고 있는 것을 뜻하지만, 만약 운전도중 사고가 난다면 상황을 잘 통제하지 못하고 있음을 암시합니다.',
      '개를 키우는 꿈': '개를 키우는 꿈은 책임감과 돌봄을 상징합니다.',
      '개에게 물리는 꿈': '현재 자기 자신에게 만족하지 못하고 있음을 의미합니다. 또한 내리기 힘든 결정을 고민하고 있음을 뜻하기도 합니다.',
      '고양이를 안는 꿈': '고양이를 안는 꿈은 위로와 정서적 안정감을 의미합니다.',
      '흰색 쥐를 보는 꿈': '금전적으로 부유해지거나 재산이 늘어나게 될 것을 암시합니다.',
      '고양이가 자신을 무는 꿈': '현실의 누군가에게 강한 질투심을 가지고 있다는 것을 의미합니다.',
      '폭풍 우는 꿈': '억눌린 감정이 터져 나오는 것을 뜻합니다.',
      '웃는 꿈': '긍정적 변화나 자신감의 신호일 수 있어요.',
      '사자에게 쫓기는 꿈': '강한 권력이나 두려움에서 도망치고 싶다는 의미합니다.',
      '호랑이를 만나는 꿈': '도전과 위협, 또는 새로운 기회와의 만남을 의미합니다.',
      '바다에 빠지는 꿈': '위험, 압도당하는 감정을 의미하고, 현재 삶에서 스트레스를 받고 있다는걸 의미합니다.',
      '잔잔한 맑은 바다를 바라보는 꿈': '자신의 마음이 바다와 같이 안정되고, 편안함을 얻게 되는 것을 암시합니다.',
      '맑은 강물이나 호수에 손이나 발을 담근 꿈': '자신이 하는 일에 만족감을 느끼게 되며 사회적으로나 가정적으로 모두 화기애애하며 원하던 일이 이루어질 것을 암시합니다.',
      '강물 위를 걷는 꿈': '큰 행운이 찾아온다는 것을 의미하는 길몽입니다.',
      '강에서 헤엄치는 꿈': '강이 깨끗하고 맑다면 길몽이지만, 반대로 더럽다면 흉몽입니다.',
      '높은 산에 오르는 꿈': '어떤 것을 이루기 위해 노력하는 과정을 나타낸 꿈입니다. 목표 달성에 대한 노력과 의지를 나타낼 수 있습니다.',
      '산에서 굴러 떨어지는 꿈': '잘 풀려가던 일에 갑작스러운 문제가 생길 수 있습니다. 다음에 더 좋은 기회가 올 때까지 버텨보세요!',
      '흰 족제비 보는 꿈': '다른 사람들의 질투나 시기로 인해 심적으로 힘든 시간을 보내게 될 수 있습니다.',
      '해를 보고 절을 하는 꿈': '자신이 원하는 일이 이루어진다는 암시입니다.',
      '머리 위에 해를 얹고 있는 꿈': '입학, 취업, 승진 등 원하던 일이 이루어진다는 의미입니다.',
      '보름달을 보는 꿈': '당신의 삶에서 긍정적인 변화와 풍요로운 기회가 찾아올 것이라는걸 암시합니다. 또한 당신이 현재 안정적인 삶을 살고 있다는걸 의미합니다.',
      '반달을 보는 꿈': '자신이 하고 있는 일이 아직은 준비 단계지만 점차 발전하여 성공하게 될 것을 암시합니다.',
      '지진이 일어나는 꿈': '큰 변화의 전조를 의미합니다. 부정적인 변화, 긍정적인 변화 모두 가능성이 있습니다.',
      '집에 불이 나는 꿈': '금전운이 상승해 삶이 풍요로워진다는 것을 암시하는 길몽입니다. 불길이 거셀수록 영향력이 크게 작용합니다. 만약 불을 끄게되면 어려운 상황이 찾아올 수도 있습니다.',
      '학교에 불나는 꿈': '인간관에 많은 갈등이 생겨날 징조입니다. 원만히 잘 해결한다면 자신이 바라던 바를 이룰 수 있게 됩니다.',
      '천둥소리를 듣는 꿈': '모든 일들이 자신이 원하는 대로 잘 진행되며 소원을 성취하게 됩니다.',
      '머리카락이 빠지는 꿈': '자신의 능력이나 지위가 하락할 것을 의미합니다. 지금 하고 있는 일이 잘 안풀리거나, 어려움을 겪게 될 수도 있습니다.',
      '얼굴 다치는 꿈': '군중이 많이 모인 가운데 인신공격을 당하고 모멸감을 느끼게 됩니다.',
      '주름이 생기는 꿈': '인생의 변화와 성장을 의미합니다. 주변 사람들에게 인정받을 일이 생길 수 있습니다.',
      '발이 부러지는 꿈': '여행이나 이동 중에 어려움을 겪을 가능성을 의미합니다.',
      '발에 상처가 나는 꿈': '일이나 사업에서 장애물을 만나거나 방해을 받을 수 있음을 암시합니다.',
      '등에 날개가 생기는 꿈': '신분이 상승하거나 명성과 재물이 생길 징조입니다.',
      '코가 부러지는 꿈': '자존감이 꺾이거나, 체면이 구겨지는 사건을 암시합니다. 진행하고 있는 일이나 인간관계를 돌아보는 것이 좋습니다.',
      '코에서 피가 나는 꿈': '재물운을 상징합니다. 코피의 양이 많을수록 운세가 더 상승되는 것을 의미합니다. 하지만 검은색에 가까운 코피의 경우에는 오히려 재물운에 문제가 생길 수 있으니 주의가 필요합니다.',
      '손가락이 잘리는 꿈': '가까운 주변 사람을 잃게 되거나, 관계가 멀어지게 될 것을 암시합니다.',
      '치아가 흔들리는 꿈': '현재 상황이 위태롭거나 불안하다는 것을 의미합니다. 또한 신변에 위험이 닥칠수도 있으니 각별한 주의가 필요합니다.',
      '앞니가 빠지는 꿈': '자신이나 가까운 가족에게 좋지 않은 일이 생긴다는 것을 의미합니다. ',
      '아랫니가 빠지는 꿈': '자신보다 아랫사람(동생, 후배, 자녀 등)에게 좋지 않은 일이 생긴다는 것을 의미합니다. ',
      '치아가 모두 빠지는 꿈': '인생에 예상치 못한 큰 변화가 생긴다는 것을 암시합니다. 긍정적인 변화일수도, 부정적인 변화일수도 있습니다. ',
      '치아가 자라나는 꿈': '새로운 시작과 성장, 변화를 의미합니다. 계획했던 일이 순조롭게 진행되고 건강도 좋아질 수 있습니다.',
      '치아를 스스로 뽑는 꿈': '상태가 좋지 않은 치아를 뽑았다면 길몽으로 해석할 수 있지만, 멀쩡한 치아였을경우 운세 하락을 의미하므로 주의가 필요합니다. ',
      '고래 떼가 나오는 꿈':'헤엄치는 고래 떼가 나오는 꿈은 평온함을 상징합니다. 가족운과 관련이 있어 집안이 화목해지거나, 평온한 일상을 유지한다는 것을 의미합니다.',

    };

// 👉 main.js 내용
const categoryBar = document.getElementById('categoryBar');
const subcategoryBar = document.getElementById('subcategoryBar');
const cardGrid = document.getElementById('cardGrid');
const guestbook = document.getElementById("guestbookSection");
const homeBtn = document.getElementById("homeButton");

// 카테고리 렌더링
function renderCategories() {
  categoryBar.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.textContent = '전체보기';
  allBtn.onclick = () => {
    document.querySelectorAll('.category-bar button').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    subcategoryBar.innerHTML = '';
    renderCards(null, null, 1);
  };
  categoryBar.prepend(allBtn);  // 왼쪽에 붙이기

  Object.keys(data).forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => {
      document.querySelectorAll('.category-bar button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSubcategories(cat);
    };
    categoryBar.appendChild(btn);
  });

  // 👇 이 줄 추가: 전체보기 강제 실행!
  allBtn.click();
}




// 서브카테고리 렌더링
function renderSubcategories(cat) {
  subcategoryBar.innerHTML = '';
  Object.keys(data[cat]).forEach((sub, idx) => {
    const btn = document.createElement('button');
    btn.textContent = sub;
    btn.onclick = () => {
      document.querySelectorAll('.subcategory-bar button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(cat, sub); // 소분류 클릭 시엔 sub 포함해서 렌더
    };
    subcategoryBar.appendChild(btn);
  });

  renderCards(cat); // 대분류 클릭 시에는 전체 소분류 카드 보여줌
}


// 카드 렌더링
function renderCards(cat, sub, page = 1) {
  const cardsPerPage = 21;
  cardGrid.innerHTML = '';
  document.getElementById('pagination').innerHTML = ''; // 기존 버튼 초기화

  let keys = [];

  if (!cat) {
    Object.keys(data).forEach(c => {
      Object.keys(data[c]).forEach(sub => {
        keys.push(...data[c][sub]);
      });
    });

    // ✅ 전체보기일 경우: 페이지 계산
    const totalPages = Math.ceil(keys.length / cardsPerPage);
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleKeys = keys.slice(start, end);

    // 페이지 버튼 생성
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === page) btn.classList.add('active');
      btn.onclick = () => renderCards(null, null, i);
      document.getElementById('pagination').appendChild(btn);
    }

    keys = visibleKeys;
  } else {
    keys = sub ? data[cat][sub] : Object.values(data[cat]).flat();
  }

  keys.forEach(text => {
    const card = document.createElement('div');
    card.className = 'card';

    const thumb = document.createElement('div');
    thumb.className = 'thumb';

    if (imageMap[text]) {
      thumb.style.backgroundImage = `url('./images/${imageMap[text]}')`;
      thumb.style.backgroundSize = 'contain';
      thumb.style.backgroundPosition = 'center';
      thumb.style.backgroundRepeat = 'no-repeat';
      thumb.style.backgroundColor = 'white';
    } else {
      thumb.style.background = '#ccc';
    }

    const p = document.createElement('p');
    p.textContent = text;
    card.appendChild(thumb);
    card.appendChild(p);

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = cardTexts[text] || '해몽 준비중입니다.';
    card.appendChild(tooltip);

    cardGrid.appendChild(card);
  });
}


// 검색
function searchCards(keyword) {
  cardGrid.innerHTML = '';
  const results = [];

  Object.keys(data).forEach(cat => {
    Object.keys(data[cat]).forEach(sub => {
      data[cat][sub].forEach(text => {
        if (text.includes(keyword)) results.push(text);
      });
    });
  });

  if (results.length > 0) {
    results.forEach(text => {
      const card = document.createElement('div');
      card.className = 'card';

      const thumb = document.createElement('div');
      thumb.className = 'thumb';

      if (imageMap[text]) {
        thumb.style.backgroundImage = `url('./images/${imageMap[text]}')`;
        thumb.style.backgroundSize = 'contain';
        thumb.style.backgroundPosition = 'center';
        thumb.style.backgroundRepeat = 'no-repeat';
        thumb.style.backgroundColor = 'white';
      } else {
        thumb.style.background = '#ccc';
      }

      const p = document.createElement('p');
      p.textContent = text;

      card.appendChild(thumb);
      card.appendChild(p);
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = cardTexts[text] || '해몽 준비중입니다.';
      card.appendChild(tooltip);

      cardGrid.appendChild(card);
    });
  } else {
    cardGrid.innerHTML = `<p style="font-size:2rem; color:#888;">검색 결과가 없습니다.</p>`;
  }
}


// 방명록 토글
function toggleGuestbook() {
  const isOpen = guestbook.style.display === 'block';
  guestbook.style.display = isOpen ? 'none' : 'block';
  categoryBar.style.display = isOpen ? 'flex' : 'none';
  subcategoryBar.style.display = isOpen ? 'flex' : 'none';
  cardGrid.style.display = isOpen ? 'flex' : 'none';

  // ✅ 페이지네이션도 같이 숨기기!
  document.getElementById('pagination').style.display = isOpen ? 'flex' : 'none';
}


// 이벤트 연결
window.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  loadDreams();

  document.getElementById("searchInput").addEventListener("input", function () {
    searchCards(this.value.trim());
  });

  document.getElementById("guestbookToggle").addEventListener("click", toggleGuestbook);

  document.getElementById("homeButton").addEventListener("click", () => {
    guestbook.style.display = 'none';
    categoryBar.style.display = 'flex';
    subcategoryBar.style.display = 'flex';
    cardGrid.style.display = 'flex';
    document.getElementById('pagination').style.display = 'flex';
    document.querySelectorAll('.category-bar button').forEach(b => b.classList.remove('active'));
    const allBtn = [...document.querySelectorAll('.category-bar button')].find(btn => btn.textContent === '전체보기');
    if (allBtn) allBtn.classList.add('active');
    subcategoryBar.innerHTML = '';
    renderCards(null, null, 1);
  });

  document.getElementById("saveDream").addEventListener("click", saveDream);

  document.querySelector(".close-btn").addEventListener("click", closeModal);
});  // ← 이게 닫는 괄호야! 위의 모든 이벤트가 여기 안에 들어있어야 돼


// JS 쪽
async function saveDream() {
  const name = document.getElementById('userName').value;
  const content = document.getElementById('userDream').value;
  const timestamp = new Date();

  if (!name || !content) {
    alert('이름과 꿈 내용을 입력해주세요!');
    return;
  }

  try {
    await addDoc(collection(db, "guestbook"), {
      name,
      content,
      timestamp
    });
    alert("저장되었습니다!");
    document.getElementById('userName').value = "";
    document.getElementById('userDream').value = "";
    loadDreams(); // 저장 후 다시 불러오기
  } catch (error) {
    console.error("저장 오류:", error);
    alert("오류가 발생했습니다. 콘솔을 확인해주세요.");
  }
}

// 방명록 불러오기
async function loadDreams() {
  const list = document.getElementById('dreamList');
  list.innerHTML = "";

  try {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement('div');
      item.innerHTML = `<strong>${data.name}</strong>: ${data.content}`;
      list.appendChild(item);
    });
  } catch (e) {
    console.error("불러오기 실패:", e);
  }
}


