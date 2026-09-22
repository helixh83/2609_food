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
