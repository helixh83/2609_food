const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.chapter-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

const placeDetails = {
  sumang: '수망리에서는 봄마다 고사리를 매개로 마을과 방문객이 만납니다. 넓은 중산간 초지와 오름의 풍경이 제주 고사리 문화를 보여 주는 대표 장면이 되었습니다.',
  gasi: '가시리는 오름과 목장 지대가 이어지는 남동부 중산간 마을입니다. 비가 머문 초지와 숲 가장자리에서 제주 봄의 생태를 함께 읽을 수 있습니다.',
  east: '구좌와 조천의 동부 중산간에도 고사리 채취 풍경이 이어집니다. 한 마을을 생산량 대표로 단정하기보다, 여러 생활권에 걸친 계절 문화로 살펴봅니다.'
};

document.querySelectorAll('.place').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.place;
    document.querySelectorAll('.place, .map-pin').forEach((el) => el.classList.toggle('active', el.dataset.place === key));
    document.querySelector('#place-detail').textContent = placeDetails[key];
  });
});

const stages = {
  spore: ['포자는 바람을 타고 흩어집니다', '성숙한 잎 뒷면에 생긴 포자가 퍼집니다. 땅에 닿은 포자는 작은 배우체를 거쳐 새로운 고사리로 이어집니다.'],
  winter: ['땅속줄기로 겨울을 건넙니다', '지상부가 시든 뒤에도 땅속줄기는 살아 있습니다. 뿌리처럼 이어진 줄기에 저장한 에너지로 다음 봄을 준비합니다.'],
  shoot: ['둥글게 말린 어린순이 올라옵니다', '기온이 오르고 봄비가 내리면 어린순이 땅을 뚫고 나옵니다. 잎이 펴지기 전 이 짧은 시기가 사람이 먹는 고사리의 때입니다.'],
  leaf: ['잎을 펴고 햇빛을 모읍니다', '채취하지 않은 순은 빠르게 키가 자라고 잎을 활짝 펼칩니다. 이 잎이 광합성을 하며 군락의 다음 계절을 준비합니다.'],
  return: ['성숙한 잎에서 생이 이어집니다', '잎 뒷면에 포자낭이 발달하고 포자가 다시 바람과 습기를 따라 흩어집니다. 보이는 잎과 보이지 않는 땅속줄기가 함께 한살이를 잇습니다.']
};

document.querySelectorAll('.life-step').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.life-step').forEach((el) => el.classList.toggle('active', el === button));
    const [title, copy] = stages[button.dataset.stage];
    document.querySelector('#stage-title').textContent = title;
    document.querySelector('#stage-copy').textContent = copy;
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.chapter-nav a')];
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-20% 0px -65%', threshold: [0, .2, .5] });
sections.forEach((section) => observer.observe(section));

const shellDetails = {
  suduri: ['수두리보말', '제주 해양수산연구원이 ‘팽이고둥’으로 확인한 지역명입니다. 조간대를 포함한 수심 5m 이내의 얕은 바다에 주로 살며, 제주 보말 가운데 비교적 크고 식용 가치가 높은 종류로 소개됩니다.'],
  meok: ['먹보말', '제주어 구술에서는 검고 매끈한 껍데기를 가진 고둥으로 묘사됩니다. 구술 자료의 표준어 풀이에는 ‘밤고둥’으로 제시된 사례가 있으나, 지역마다 가리키는 대상이 같은지는 현장 확인이 필요합니다.'],
  dol: ['돌포말', '여러 마을의 구술에 등장하는 이름입니다. 자료에 따라 눈알고둥 등으로 풀이되기도 하지만, 생활 이름과 생물학적 종명이 항상 일대일로 맞지는 않습니다.'],
  others: ['ᄎᆞᆷᄀᆞ메기·메옹이·가메기보말', '제주에는 껍데기 모양, 색, 맛, 사는 자리에 따라 보말을 더 잘게 부르는 말이 남아 있습니다. 같은 말의 뜻이 지역과 세대에 따라 달라질 수 있다는 점 자체가 중요한 기록입니다.']
};

document.querySelectorAll('.shell-tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.shell-tab').forEach((el) => el.classList.toggle('active', el === button));
    const [title, copy] = shellDetails[button.dataset.shell];
    document.querySelector('#shell-title').textContent = title;
    document.querySelector('#shell-copy').textContent = copy;
  });
});

const fieldGuideIssues = [
  ['gosari', '01', '제주 고사리'],
  ['bomal', '02', '보말'],
  ['meljeot', '03', '멜젓'],
  ['bingtteok', '04', '빙떡'],
  ['seongge', '05', '제주 성게'],
  ['dombegogi', '06', '돔베고기'],
  ['momguk', '07', '몸국'],
  ['jaridom', '08', '자리돔'],
  ['okdom', '09', '옥돔'],
  ['jiseul', '10', '지슬'],
  ['shwindari', '11', '쉰다리'],
  ['kkwongyeot', '12', '꿩엿']
];

const currentIssueSlug = window.location.pathname.split('/').filter(Boolean).at(-1);
const currentIssueIndex = fieldGuideIssues.findIndex(([slug]) => slug === currentIssueSlug);

const foodStops = {
  gosari: {
    type: '향토음식점', name: '김재훈고사리육개장', location: '제주시 이도이동',
    menu: '고사리육개장',
    copy: '제주산 고사리를 갈지 않고 손으로 찢어 돼지사골 육수와 메밀가루에 푹 끓입니다. 도감에서 읽은 부드러운 고사리의 결을 한 그릇에서 살펴보기 좋습니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_300000000015661&menuId=DOM_000001719000000000'
  },
  bomal: {
    type: '보말 전문점', name: '갱이네보말칼국수', location: '제주시 이도이동',
    menu: '보말칼국수 · 보말죽',
    copy: '보말과 미역을 넣어 끓인 칼국수와 죽을 냅니다. 작은 고둥의 살과 바다 향이 국물에 어떻게 남는지 비교하며 먹기 좋은 곳입니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_200000000014779'
  },
  meljeot: {
    type: '흑돼지 전문점', name: '해월향', location: '서귀포시 성산읍',
    menu: '흑돼지구이와 멜젓',
    copy: '흑돼지 여러 부위를 굽고 제주식 멜젓을 곁들입니다. 고기의 지방과 멜젓의 짠맛·감칠맛이 만나는 방식을 직접 확인할 수 있습니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_000000000001157&menuId=DOM_000001719000000000'
  },
  bingtteok: {
    type: '시장 식당', name: '제주토속', location: '제주시 보성시장',
    menu: '제주 메밀 빙떡',
    copy: '제주산 메밀전 안에 무나물을 넣어 말아 냅니다. 화려한 양념보다 메밀과 무채의 담백한 조합을 살펴보기 좋은 시장의 한 접시입니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000501363'
  },
  seongge: {
    type: '해녀 음식점', name: '용두암 해녀촌', location: '제주시 용담동',
    menu: '성게미역국',
    copy: '해녀가 채취한 해산물을 중심으로 한 상을 내고 성게미역국을 함께 맛볼 수 있습니다. 채취물에서 따뜻한 국 한 그릇으로 이어지는 흐름을 보기 좋습니다.',
    url: 'https://m.visitjeju.net/kr/detail/view?contentsid=CNTS_200000000012766'
  },
  dombegogi: {
    type: '향토음식점', name: '제주돔베고기집', location: '제주시 노형동',
    menu: '돔베고기 · 몸국',
    copy: '부드럽게 삶은 돼지고기를 썰어 내고 몸국을 함께 구성합니다. 돔베고기와 잔칫국이 같은 돼지 조리 과정에서 갈라진 관계를 한 상에서 볼 수 있습니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_200000000014930'
  },
  momguk: {
    type: '향토음식점', name: '신설오름', location: '제주시 일도이동',
    menu: '몸국 · 몸국수',
    copy: '모자반과 돼지고기 육수를 걸쭉하게 끓인 몸국이 대표 메뉴입니다. 돔베고기도 함께 있어 제주 잔칫상의 두 갈래를 나란히 경험할 수 있습니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_000000000020185'
  },
  jaridom: {
    type: '물회 전문점', name: '산지물 제주공항본점', location: '제주시 건입동',
    menu: '자리물회',
    copy: '자리돔을 포함한 여러 제주 물회를 냅니다. 뼈째 가늘게 썬 자리의 식감과 된장·식초를 바탕으로 한 국물을 살펴보기 좋습니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000501269'
  },
  okdom: {
    type: '생선요리점', name: '명물', location: '제주시 삼도이동',
    menu: '옥돔구이',
    copy: '옥돔을 비롯한 제주 생선을 구이로 냅니다. 소금간해 말린 옥돔의 응축된 맛과 단단해진 살결을 다른 생선구이와 비교해 보기 좋습니다.',
    url: 'https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_000000000001275&menuId=DOM_000001719001000000'
  },
  jiseul: {
    type: '일정형 미식 체험', name: '제주미행', location: '제주소통협력센터 공유주방',
    menu: '지슬밥 만들기와 시식',
    copy: '제주 향토음식 명인과 시장에서 재료를 고르고 지슬밥을 직접 만들어 맛보는 프로그램입니다. 상시 식당이 아니므로 다음 회차와 주제를 먼저 확인해야 합니다.',
    url: 'https://www.visitjeju.net/kr/festival/view?contentsid=CNTS_300000000014436'
  },
  shwindari: {
    type: '전통음식 체험', name: '폴개협동조합', location: '서귀포시 남원읍',
    menu: '누룩·쉰다리 만들기',
    copy: '남은 밥과 누룩이 음료가 되는 과정을 직접 다루는 체험을 운영합니다. 예약형 프로그램이므로 체험 가능일과 시음 여부를 방문 전에 확인해야 합니다.',
    url: 'https://www.xn--6-ql4f73knwc95ai5j.com/files/2023/6%EC%B0%A8%EC%82%B0%EC%97%85%EC%9C%BC%EB%A1%9C%20%EC%B0%BE%EC%95%84%EA%B0%80%EB%8A%94%20%EC%A0%9C%EC%A3%BC%EC%97%AC%ED%96%89%EC%A7%80%EB%8F%840914.pdf'
  },
  kkwongyeot: {
    type: '전통식품 생산자', name: '제주민속식품', location: '제주시 구좌읍',
    menu: '제주 꿩엿',
    copy: '식당에서 즉석으로 먹기 어려운 꿩엿을 전통식품 제품으로 만날 수 있습니다. 원재료와 제조 표시를 읽으며 도감의 기록과 오늘의 상품을 비교하기 좋습니다.',
    url: 'https://www.tamnao.com/web/sv/detailPrdt.do?prdtNum=SV00000200'
  }
};

if (currentIssueIndex >= 0 && foodStops[currentIssueSlug]) {
  const stop = foodStops[currentIssueSlug];
  const tasteStop = document.createElement('section');
  tasteStop.className = 'taste-stop section-shell';
  tasteStop.setAttribute('aria-labelledby', 'taste-stop-title');
  tasteStop.innerHTML = `
    <div class="taste-stop-heading">
      <div class="section-kicker"><span>현장</span> 이 음식을 만나는 식탁</div>
      <h2 id="taste-stop-title">도감에서 읽은 맛을<br>한 곳에서 이어 봅니다</h2>
    </div>
    <article class="taste-stop-card">
      <div class="taste-stop-meta"><span>${stop.type}</span><small>${stop.location}</small></div>
      <h3>${stop.name}</h3>
      <p>${stop.copy}</p>
      <div class="taste-stop-foot">
        <span><small>살펴볼 메뉴</small><strong>${stop.menu}</strong></span>
        <span><small>정보 확인</small><strong>2026. 09</strong></span>
        <a href="${stop.url}" target="_blank" rel="noreferrer">장소 정보 ↗</a>
      </div>
    </article>
    <p class="taste-stop-criteria"><strong>선정 기준</strong> 도감의 재료와 조리법을 실제 메뉴·체험·제품으로 확인할 수 있고 제주 공공 관광·지역 자료에서 확인되는 곳을 골랐습니다. 순위나 광고가 아니며, 방문 전 영업·예약 여부를 다시 확인해 주세요.</p>
  `;
  document.querySelector('main')?.append(tasteStop);
}

if (currentIssueIndex >= 0) {
  const makeIssueLink = (issue, direction) => {
    const link = document.createElement('a');
    link.className = `series-page-link ${direction}`;
    link.href = `../${issue[0]}/`;
    link.innerHTML = `<small>${direction === 'previous' ? '← 이전 편' : '다음 편 →'}</small><strong>${issue[1]} · ${issue[2]}</strong>`;
    return link;
  };

  const pagination = document.createElement('nav');
  pagination.className = 'series-pagination';
  pagination.setAttribute('aria-label', '제주 음식 도감 이어 읽기');

  const previousIssue = fieldGuideIssues[currentIssueIndex - 1];
  const nextIssue = fieldGuideIssues[currentIssueIndex + 1];
  if (previousIssue) pagination.append(makeIssueLink(previousIssue, 'previous'));

  const collectionLink = document.createElement('a');
  collectionLink.className = 'series-collection-link';
  collectionLink.href = '../index.html#issues';
  collectionLink.innerHTML = '<small>JEJU FOOD FIELD GUIDE</small><strong>열두 편 전체 보기</strong>';
  pagination.append(collectionLink);

  if (nextIssue) pagination.append(makeIssueLink(nextIssue, 'next'));
  document.querySelector('main')?.insertAdjacentElement('afterend', pagination);
}
