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
