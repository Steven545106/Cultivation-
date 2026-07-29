const STORAGE_KEY = "idle-xianxia-single-save-v2";
const PLAYER_NAME = "本機修士";

const difficulties = {
  easy: { label: "簡單", rate: 2.5, cost: 0.6, bonus: 25 },
  normal: { label: "中等", rate: 1.5, cost: 0.8, bonus: 10 },
  hard: { label: "困難", rate: 1, cost: 1, bonus: 0 },
};

const realms = [
  { name: "凝氣一層", need: 120, material: "", qty: 0, atk: 2, hp: 15 },
  { name: "凝氣二層", need: 180, material: "小靈丹", qty: 1, atk: 2, hp: 16 },
  { name: "凝氣三層", need: 260, material: "聚氣丹", qty: 1, atk: 3, hp: 18 },
  { name: "凝氣四層", need: 360, material: "聚氣丹", qty: 1, atk: 3, hp: 20 },
  { name: "凝氣五層", need: 500, material: "強體丹", qty: 1, atk: 4, hp: 22 },
  { name: "凝氣六層", need: 680, material: "福運丹", qty: 1, atk: 4, hp: 24 },
  { name: "凝氣七層", need: 900, material: "聚氣丹", qty: 2, atk: 5, hp: 28 },
  { name: "凝氣八層", need: 1180, material: "強體丹", qty: 2, atk: 5, hp: 32 },
  { name: "凝氣九層", need: 1480, material: "福運丹", qty: 2, atk: 6, hp: 36 },
  { name: "凝氣十層大圓滿", need: 1900, material: "築基丹", qty: 1, atk: 8, hp: 44 },
  { name: "築基初期", need: 2600, material: "穩基丹", qty: 1, atk: 10, hp: 55 },
  { name: "築基中期", need: 3400, material: "穩基丹", qty: 1, atk: 11, hp: 60 },
  { name: "築基後期", need: 4400, material: "地脈丹", qty: 1, atk: 12, hp: 68 },
  { name: "築基大圓滿", need: 5600, material: "地脈丹", qty: 2, atk: 14, hp: 78 },
  { name: "結丹初期", need: 7200, material: "結丹丹", qty: 1, atk: 18, hp: 95 },
  { name: "結丹中期", need: 9200, material: "結丹丹", qty: 1, atk: 20, hp: 105 },
  { name: "結丹後期", need: 11800, material: "同心丹", qty: 1, atk: 23, hp: 118 },
  { name: "結丹大圓滿", need: 15000, material: "元嬰丹", qty: 1, atk: 28, hp: 140 },
  { name: "元嬰初期", need: 22000, material: "元嬰丹", qty: 2, atk: 36, hp: 180 },
];

const recipes = [
  { name: "小靈丹", effect: "立即增加修為", value: 180, cost: 60, unlock: 0 },
  { name: "聚氣丹", effect: "修為 +420", value: 420, cost: 140, unlock: 2 },
  { name: "強體丹", effect: "血量永久 +20", hp: 20, cost: 220, unlock: 4 },
  { name: "銳金丹", effect: "攻擊永久 +5", atk: 5, cost: 260, unlock: 6 },
  { name: "福運丹", effect: "幸運永久 +3", luck: 3, cost: 320, unlock: 5 },
  { name: "築基丹", effect: "築基突破材料", itemOnly: true, cost: 420, unlock: 8 },
  { name: "穩基丹", effect: "突破成功率 +10%", itemOnly: true, cost: 520, unlock: 10 },
  { name: "地脈丹", effect: "築基高階突破材料", itemOnly: true, cost: 680, unlock: 12 },
  { name: "結丹丹", effect: "結丹突破材料", itemOnly: true, cost: 880, unlock: 14 },
  { name: "同心丹", effect: "雙修親密度 +20", affection: 20, cost: 980, unlock: 15 },
  { name: "元嬰丹", effect: "元嬰突破材料", itemOnly: true, cost: 1250, unlock: 17 },
];

const partners = [
  { name: "侯小妹", unlock: 1, trait: "修為收益", stat: "rate", bonus: 0.05 },
  { name: "周心琪", unlock: 5, trait: "幸運與煉丹", stat: "luck", bonus: 2 },
  { name: "宋君婉", unlock: 10, trait: "攻擊與血量", stat: "battle", bonus: 0.04 },
  { name: "公孫婉兒", unlock: 14, trait: "稀有機緣", stat: "luck", bonus: 4 },
  { name: "杜凌菲", unlock: 17, trait: "突破成功率", stat: "break", bonus: 3 },
  { name: "紅塵女", unlock: 18, trait: "後期戰力", stat: "battle", bonus: 0.08 },
];

const techniques = [
  { name: "紫氣馭鼎功", unlock: 0, maxLevel: 5, cost: 180, effect: "每級修為速度 +4%", rate: 0.04 },
  { name: "不死長生功・不死皮", unlock: 1, maxLevel: 3, cost: 220, effect: "每級防禦 +8%、血量上限 +6%、天劫傷害 -2%", def: 0.08, hp: 0.06, tribulation: 0.02 },
  { name: "龍象化海經", unlock: 7, maxLevel: 3, cost: 520, effect: "每級攻擊 +4%、防禦 +4%、修為速度 +3%、突破率 +1%", atk: 0.04, def: 0.04, rate: 0.03, success: 1 },
  { name: "水澤國度", unlock: 8, maxLevel: 3, cost: 680, effect: "每級攻擊 +12%、突破率 +1%", atk: 0.12, success: 1 },
  { name: "不死長生功・不死金剛", unlock: 10, maxLevel: 3, cost: 900, effect: "每級攻擊 +4%、防禦 +10%、血量上限 +8%、天劫傷害 -3%", atk: 0.04, def: 0.1, hp: 0.08, tribulation: 0.03 },
  { name: "紫氣通天訣", unlock: 10, maxLevel: 4, cost: 900, effect: "每級修為速度 +6%、突破率 +1%", rate: 0.06, success: 1 },
  { name: "通天法眼", unlock: 11, maxLevel: 3, cost: 1050, effect: "每級幸運效果 +2、突破率 +1%", luck: 2, success: 1 },
  { name: "不死長生功・不死筋", unlock: 14, maxLevel: 3, cost: 1450, effect: "每級防禦 +8%、血量上限 +8%、天劫傷害 -4%", def: 0.08, hp: 0.08, tribulation: 0.04 },
  { name: "寒門養念訣", unlock: 14, maxLevel: 3, cost: 1500, effect: "每級修為速度 +4%、突破率 +1%", rate: 0.04, success: 1 },
  { name: "草木皆兵訣", unlock: 15, maxLevel: 3, cost: 1650, effect: "每級攻擊 +7%、煉丹大成功率 +4%", atk: 0.07, alchemy: 0.04 },
  { name: "不死長生功・不死骨", unlock: 15, maxLevel: 3, cost: 2600, effect: "每級攻擊 +6%、防禦 +15%、血量上限 +12%、天劫傷害 -6%", atk: 0.06, def: 0.15, hp: 0.12, tribulation: 0.06 },
  { name: "人山訣", unlock: 18, maxLevel: 3, cost: 1900, effect: "每級攻擊 +8%、防禦 +10%、血量上限 +10%、天劫傷害 -4%", atk: 0.08, def: 0.1, hp: 0.1, tribulation: 0.04 },
];

const techniqueLore = {
  "紫氣馭鼎功": "凝聚天地紫氣化作靈鼎，是凝氣階段穩固根基的核心功法，適合長時間自動修煉。",
  "不死長生功・不死皮": "不死卷第一階段，淬鍊皮膚與外在防禦，修成後可施展碎喉鎖。",
  "龍象化海經": "凝氣後期觀想龍象，兼修肉身與靈力，可銜接紫氣馭鼎功並提高築基根基。",
  "水澤國度": "觀摩百獸凝聚本命之靈，以水澤化形形成國度，是白小純凝氣後期取得的重要神通。",
  "不死長生功・不死金剛": "不死卷第二階段，以肉身凝聚金剛之力，可衍化撼山撞及不死金剛法相。",
  "紫氣通天訣": "吸收通天河靈力淬鍊靈海，兼顧修煉速度與境界突破，是築基後的重要傳承。",
  "通天法眼": "將靈力凝聚於眉心洞察氣機，在遊戲中可提升機緣判斷與突破成功率。",
  "不死長生功・不死筋": "不死卷第三階段，淬鍊全身筋脈、延展肉身力量，可衍生不死禁。",
  "寒門養念訣": "以寒養念、凝聚念力，一念之下八方冰寒，也可幫助凝聚引斥之力。",
  "草木皆兵訣": "激發草木靈性並以丹兵之方組合成戰力，兼具草木知識、煉丹與攻伐能力。",
  "人山訣": "將自身與山靈融合化作山人，兼具強悍力量與肉身防護，原著中屬神通而非主修心法。",
  "不死長生功・不死骨": "不死卷第四階段，淬骨至極以支撐肉身無窮之力，可施展不滅帝拳。",
};

const pets = [
  {
    name: "鐵蛋",
    sigil: "王",
    role: "王獸戰寵",
    unlock: 10,
    maxLevel: 5,
    bondCost: 700,
    trainCost: 420,
    effect: "每級攻擊 +8%、防禦 +5%",
    lore: "白小純以育獸種培育而生的王獸，不需契約便只認白小純為主，能震懾並統御其他戰獸。",
    atk: 0.08,
    def: 0.05,
  },
  {
    name: "小烏龜",
    sigil: "龜",
    role: "機緣靈伴",
    unlock: 14,
    maxLevel: 5,
    bondCost: 1100,
    trainCost: 620,
    effect: "每級修為速度 +4%、幸運 +2、煉丹大成功率 +3%",
    lore: "來歷神秘、性格難以捉摸的同行靈伴，在遊戲中主要帶來機緣、修煉與煉丹加成。",
    rate: 0.04,
    luck: 2,
    alchemy: 0.03,
  },
  {
    name: "天角墨龍",
    sigil: "龍",
    role: "守護靈獸",
    unlock: 18,
    maxLevel: 5,
    bondCost: 1800,
    trainCost: 900,
    effect: "每級防禦 +10%、血量上限 +8%、天劫傷害 -2%",
    lore: "靈溪宗的重要守護靈獸，曾以一滴精血幫助鐵蛋活命，後由元嬰境白小純救治。",
    def: 0.1,
    hp: 0.08,
    tribulation: 0.02,
  },
];

const recipeNotes = {
  "小靈丹": "入門修士常用的溫和丹藥，煉成後可直接服用，快速補充少量修為。",
  "聚氣丹": "凝聚周遭靈氣入體，適合凝氣階段加速修煉，可直接增加修為。",
  "強體丹": "以藥力滋養筋骨血肉，服用後永久提高基礎血量上限。",
  "銳金丹": "將銳金之氣融入經脈，服用後永久提高基礎攻擊。",
  "福運丹": "提升修士感應機緣的能力，服用後永久增加幸運。",
  "築基丹": "凝氣大圓滿衝擊築基時的重要材料，煉成後保留在背包即可。",
  "穩基丹": "穩固築基靈台的突破材料，煉成後保留在背包，突破時會自動消耗。",
  "地脈丹": "引導地脈靈力鞏固高階築基境界，作為指定境界的突破材料。",
  "結丹丹": "協助靈力凝結成丹的珍貴丹藥，作為結丹階段的突破材料。",
  "同心丹": "調和雙方靈力與心境，服用後提升目前已相識道侶的親密度。",
  "元嬰丹": "凝鍊元嬰所需的高階丹藥，是衝擊元嬰境界的重要突破材料。",
};

let state = loadState();
state.techniques = state.techniques || {};
state.pets = state.pets || {};
state.activePet = state.activePet || "";
if (state.techniques["不死長生功"]) {
  const legacyLevel = state.techniques["不死長生功"];
  state.techniques["不死長生功・不死皮"] = Math.max(state.techniques["不死長生功・不死皮"] || 0, Math.min(3, legacyLevel));
  if (legacyLevel > 2) {
    state.techniques["不死長生功・不死金剛"] = Math.max(state.techniques["不死長生功・不死金剛"] || 0, Math.min(3, legacyLevel - 2));
  }
  if (legacyLevel >= 5 && state.realmIndex >= 14) {
    state.techniques["不死長生功・不死筋"] = Math.max(state.techniques["不死長生功・不死筋"] || 0, 1);
  }
  delete state.techniques["不死長生功"];
}
state.currentHp = Number.isFinite(state.currentHp) ? state.currentHp : state.hp;
state.def = Number.isFinite(state.def)
  ? state.def
  : 8 + realms.slice(0, state.realmIndex).reduce((total, realm) => total + getRealmDefenseGain(realm), 0);
const $ = (id) => document.getElementById(id);
let breakthroughInProgress = false;
let activeGuideTab = "techniques";
let guideReturnFocus = null;

function createState() {
  const inventory = {};
  recipes.slice(0, 5).forEach((recipe) => {
    inventory[recipe.name] = 0;
  });
  return {
    difficulty: "easy",
    realmIndex: 0,
    cultivation: 0,
    atk: 12,
    def: 8,
    hp: 120,
    currentHp: 120,
    luck: 5,
    inventory,
    affection: {},
    dualUsed: {},
    techniques: {},
    pets: {},
    activePet: "",
    lastActive: Date.now(),
    createdAt: Date.now(),
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? saved : createState();
  } catch {
    return createState();
  }
}

function saveState() {
  state.lastActive = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getRealm() {
  return realms[Math.min(state.realmIndex, realms.length - 1)];
}

function getNeed() {
  return Math.ceil(getRealm().need * difficulties[state.difficulty].cost);
}

function getRate() {
  const difficulty = difficulties[state.difficulty].rate;
  const partnerRate = partners.reduce((sum, partner) => {
    const affection = state.affection[partner.name] || 0;
    return sum + (partner.stat === "rate" && affection >= 100 ? partner.bonus : 0);
  }, 0);
  const techniqueRate = getTechniqueBonus("rate");
  const petRate = getPetBonus("rate");
  return Math.ceil((24 + state.realmIndex * 9 + getEffectiveLuck() * 0.8) * difficulty * (1 + partnerRate + techniqueRate + petRate));
}

function getSuccessRate() {
  const difficultyBonus = difficulties[state.difficulty].bonus;
  const luckBonus = Math.floor(getEffectiveLuck() / 4);
  const partnerBonus = partners.reduce((sum, partner) => {
    const affection = state.affection[partner.name] || 0;
    return sum + (partner.stat === "break" && affection >= 100 ? partner.bonus : 0);
  }, 0);
  return Math.min(98, 55 + difficultyBonus + luckBonus + partnerBonus + getTechniqueBonus("success"));
}

function getTechniqueLevel(name) {
  return state.techniques?.[name] || 0;
}

function getTechniqueBonus(property) {
  return techniques.reduce((total, technique) => {
    if (state.realmIndex < technique.unlock) return total;
    return total + (technique[property] || 0) * getTechniqueLevel(technique.name);
  }, 0);
}

function getPetRecord(name) {
  return state.pets?.[name] || { owned: false, level: 0 };
}

function getPetBonus(property) {
  const pet = pets.find((item) => item.name === state.activePet);
  if (!pet || state.realmIndex < pet.unlock) return 0;
  const record = getPetRecord(pet.name);
  if (!record.owned) return 0;
  return (pet[property] || 0) * record.level;
}

function getEffectiveLuck() {
  return state.luck + getTechniqueBonus("luck") + getPetBonus("luck");
}

function getMaxHp() {
  return Math.floor(state.hp * (1 + getTechniqueBonus("hp") + getPetBonus("hp")));
}

function getAttackPower() {
  return Math.floor(state.atk * (1 + getTechniqueBonus("atk") + getPetBonus("atk")));
}

function getDefensePower() {
  return Math.floor(state.def * (1 + getTechniqueBonus("def") + getPetBonus("def")));
}

function getRealmDefenseGain(realm) {
  return Math.max(1, Math.ceil(realm.atk * 0.45 + realm.hp * 0.035));
}

function getTribulationReduction() {
  const techniqueReduction = Math.min(0.65, getTechniqueBonus("tribulation") + getPetBonus("tribulation"));
  const defenseReduction = getDefensePower() / (getDefensePower() + 350);
  return Math.min(0.75, 1 - (1 - techniqueReduction) * (1 - defenseReduction));
}

function getTechniqueCost(technique) {
  const level = getTechniqueLevel(technique.name);
  return Math.ceil(technique.cost * (1 + level * 0.75));
}

function getRealmTier(name) {
  if (name.startsWith("元嬰")) return 3;
  if (name.startsWith("結丹")) return 2;
  if (name.startsWith("築基")) return 1;
  return 0;
}

function getTribulationCount() {
  if (state.realmIndex >= realms.length - 1) return 0;
  const currentTier = getRealmTier(getRealm().name);
  const nextTier = getRealmTier(realms[state.realmIndex + 1].name);
  return nextTier > currentTier ? nextTier : 0;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function runTribulation(count) {
  const scene = $("tribulationScene");
  scene.classList.add("active");
  $("tribulationTitle").textContent = `${count} 道天劫降臨`;

  for (let strike = 1; strike <= count; strike += 1) {
    $("tribulationProgress").textContent = `第 ${strike} / ${count} 道`;
    scene.classList.remove("strike");
    void scene.offsetWidth;
    scene.classList.add("strike");
    await wait(260);
    const difficultyDamage = state.difficulty === "easy" ? 0.82 : state.difficulty === "hard" ? 1.15 : 1;
    const damageRate = 0.14 + count * 0.025 + (strike - 1) * 0.02;
    const damage = Math.max(1, Math.ceil(getMaxHp() * damageRate * difficultyDamage * (1 - getTribulationReduction())));
    state.currentHp = Math.max(0, state.currentHp - damage);
    playImpactEffect();
    $("hpValue").textContent = `${Math.floor(state.currentHp)} / ${getMaxHp()}`;
    $("tribulationProgress").textContent = `第 ${strike} / ${count} 道・血量 -${damage}`;
    showFloat(`第 ${strike} 道天劫，血量 -${damage}`);
    if (state.currentHp <= 0) {
      $("tribulationProgress").textContent = "氣血耗盡";
      await wait(720);
      scene.classList.remove("active", "strike");
      return false;
    }
    await wait(460);
  }

  await wait(260);
  scene.classList.remove("active", "strike");
  return true;
}

function updateOfflineGain() {
  const now = Date.now();
  const elapsedMinutes = Math.min(24 * 60, Math.max(0, Math.floor((now - state.lastActive) / 60000)));
  if (elapsedMinutes > 0) {
    const gain = elapsedMinutes * getRate();
    state.cultivation += gain;
    state.currentHp = Math.min(getMaxHp(), state.currentHp + getMaxHp() * elapsedMinutes * 0.1);
    playAbsorbEffect();
    $("offlineNotice").classList.remove("hidden");
    $("offlineNotice").textContent = `離線 ${elapsedMinutes} 分鐘，獲得修為 ${gain.toLocaleString()}`;
  } else {
    $("offlineNotice").classList.add("hidden");
  }
  state.lastActive = now;
}

function showFloat(text) {
  const el = $("floatingText");
  el.textContent = text;
  el.classList.remove("show");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => el.classList.add("show"));
  });
}

function playActionEffect(type, duration = 1300) {
  const stage = document.querySelector(".character-stage");
  const burst = $("actionBurst");
  if (!stage || !burst) return;
  const classes = ["absorbing", "alchemy-effect", "dual-effect", "technique-effect", "pet-effect"];
  classes.forEach((className) => stage.classList.remove(className));
  burst.className = "action-burst";
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      stage.classList.add(type);
      burst.classList.add("active", type);
    });
  });
  window.clearTimeout(playActionEffect.timer);
  playActionEffect.timer = window.setTimeout(() => {
    stage.classList.remove(type);
    burst.className = "action-burst";
  }, duration);
}

function playImpactEffect() {
  const screen = $("gameScreen");
  screen.classList.remove("impact");
  void screen.offsetWidth;
  screen.classList.add("impact");
  window.clearTimeout(playImpactEffect.timer);
  playImpactEffect.timer = window.setTimeout(() => screen.classList.remove("impact"), 420);
}

function playBreakthroughEffect() {
  const effect = $("breakthroughEffect");
  const image = effect?.querySelector("img");
  if (!effect || !image) return;
  window.clearTimeout(playBreakthroughEffect.timer);
  effect.classList.remove("show");
  image.removeAttribute("src");
  window.requestAnimationFrame(() => {
    image.src = image.dataset.src;
    effect.classList.add("show");
  });
  playBreakthroughEffect.timer = window.setTimeout(() => {
    effect.classList.remove("show");
    image.removeAttribute("src");
  }, 2300);
}

function playAbsorbEffect() {
  const effect = $("absorbEffect");
  if (!effect) return;
  effect.classList.remove("playing");
  void effect.offsetWidth;
  effect.classList.add("playing");
  playActionEffect("absorbing", 1400);
  window.clearTimeout(playAbsorbEffect.timer);
  playAbsorbEffect.timer = window.setTimeout(() => {
    effect.classList.remove("playing");
  }, 1550);
}

function render() {
  renderStats();
  renderPills();
  renderPartners();
  renderTechniques();
  renderPets();
  renderBag();
}

function renderStats() {
  const realm = getRealm();
  const need = getNeed();
  const pct = Math.min(100, (state.cultivation / need) * 100);
  $("playerName").textContent = PLAYER_NAME;
  $("realmTitle").textContent = realm.name;
  $("cultivationText").textContent = `${Math.floor(state.cultivation).toLocaleString()} / ${need.toLocaleString()}`;
  $("cultivationBar").style.width = `${pct}%`;
  state.currentHp = Math.min(getMaxHp(), state.currentHp);
  $("atkValue").textContent = getAttackPower();
  $("defValue").textContent = getDefensePower();
  $("hpValue").textContent = `${Math.floor(state.currentHp)} / ${getMaxHp()}`;
  $("luckValue").textContent = Math.floor(getEffectiveLuck());
  $("difficultyLabel").textContent = difficulties[state.difficulty].label;
  $("rateValue").textContent = getRate().toLocaleString();
  $("successRate").textContent = `${getSuccessRate()}%`;
  $("damageReductionValue").textContent = `${Math.round(getTribulationReduction() * 100)}%`;
  const tribulationCount = getTribulationCount();
  const atFinalRealm = state.realmIndex >= realms.length - 1;
  $("tribulationInfo").textContent = atFinalRealm ? "已達巔峰" : tribulationCount > 0 ? `${tribulationCount} 道天劫` : "一般突破";
  $("breakthroughBtn").textContent = atFinalRealm ? "已達目前最高境界" : tribulationCount > 0 ? `渡劫突破（${tribulationCount} 道）` : "嘗試突破";
  $("breakthroughBtn").disabled = breakthroughInProgress || atFinalRealm;
  const activePet = pets.find((pet) => pet.name === state.activePet && getPetRecord(pet.name).owned);
  $("activePetBadge").classList.toggle("hidden", !activePet);
  if (activePet) {
    $("activePetSigil").textContent = activePet.sigil;
    $("activePetName").textContent = activePet.name;
  }
}

function renderPills() {
  $("pillList").innerHTML = recipes
    .filter((recipe) => state.realmIndex >= recipe.unlock)
    .map((recipe) => {
      const owned = state.inventory[recipe.name] || 0;
      return `
        <article class="item">
          <div class="item-title"><span>${recipe.name}</span><span>持有 ${owned}</span></div>
          <p>${recipe.effect}，煉製消耗修為 ${recipe.cost}</p>
          <button data-action="brew" data-name="${recipe.name}">煉製</button>
        </article>
      `;
    })
    .join("");
}

function renderPartners() {
  $("partnerList").innerHTML = partners
    .filter((partner) => state.realmIndex >= partner.unlock)
    .map((partner) => {
      const affection = state.affection[partner.name] || 0;
      const used = state.dualUsed[partner.name] === todayKey();
      const level = affection >= 1000 ? "道侶" : affection >= 600 ? "情愫" : affection >= 300 ? "信賴" : affection >= 100 ? "熟悉" : "相識";
      return `
        <article class="item">
          <div class="item-title"><span>${partner.name}</span><span>${level}</span></div>
          <p>親密度 ${affection}，特色：${partner.trait}</p>
          <button data-action="dual" data-name="${partner.name}" ${used ? "disabled" : ""}>${used ? "今日已雙修" : "雙修一次"}</button>
        </article>
      `;
    })
    .join("") || "<article class=\"item\"><p>境界提升後會遇到更多親密角色。</p></article>";
}

function renderTechniques() {
  $("techniqueList").innerHTML = techniques.map((technique) => {
    const level = getTechniqueLevel(technique.name);
    const unlocked = state.realmIndex >= technique.unlock;
    const maxed = level >= technique.maxLevel;
    const cost = getTechniqueCost(technique);
    return `
      <article class="item technique-card ${unlocked ? "" : "locked"}">
        <div class="item-title">
          <span>${technique.name}</span>
          <span>${unlocked ? `${level} / ${technique.maxLevel} 重` : `${realms[technique.unlock]?.name || "後續境界"}解鎖`}</span>
        </div>
        <p>${technique.effect}</p>
        <button data-action="technique" data-name="${technique.name}" ${!unlocked || maxed ? "disabled" : ""}>
          ${maxed ? "已修至圓滿" : unlocked ? `領悟提升・${cost} 修為` : "尚未解鎖"}
        </button>
      </article>
    `;
  }).join("");
}

function getPetTrainCost(pet) {
  const level = getPetRecord(pet.name).level;
  return Math.ceil(pet.trainCost * (1 + Math.max(0, level - 1) * 0.7));
}

function renderPets() {
  $("petList").innerHTML = pets.map((pet) => {
    const unlocked = state.realmIndex >= pet.unlock;
    const record = getPetRecord(pet.name);
    const active = record.owned && state.activePet === pet.name;
    const maxed = record.level >= pet.maxLevel;
    return `
      <article class="item pet-card ${unlocked ? "" : "locked"} ${active ? "active" : ""}">
        <div class="pet-heading">
          <span class="pet-sigil" aria-hidden="true">${pet.sigil}</span>
          <div>
            <div class="item-title"><span>${pet.name}</span><span>${record.owned ? `${record.level} / ${pet.maxLevel} 級` : pet.role}</span></div>
            <p>${pet.effect}</p>
          </div>
        </div>
        <div class="pet-actions">
          ${
            !unlocked
              ? `<button disabled>${realms[pet.unlock]?.name || "後續境界"}解鎖</button>`
              : !record.owned
                ? `<button data-action="bond-pet" data-name="${pet.name}">締結・${pet.bondCost} 修為</button>`
                : `
                  <button data-action="train-pet" data-name="${pet.name}" ${maxed ? "disabled" : ""}>${maxed ? "培養圓滿" : `培養・${getPetTrainCost(pet)} 修為`}</button>
                  <button data-action="activate-pet" data-name="${pet.name}" ${active ? "disabled" : ""}>${active ? "同行中" : "設為同行"}</button>
                `
          }
        </div>
      </article>
    `;
  }).join("");
}

function renderBag() {
  const entries = Object.entries(state.inventory).filter(([, qty]) => qty > 0);
  $("bagList").innerHTML = entries.map(([name, qty]) => {
    const recipe = recipes.find((item) => item.name === name);
    return `
      <article class="item">
        <div class="item-title"><span>${name}</span><span>${qty}</span></div>
        <p>${recipe?.effect || "突破或煉丹材料"}</p>
        <button data-action="use" data-name="${name}">使用</button>
      </article>
    `;
  }).join("") || "<article class=\"item\"><p>目前沒有丹藥。先去煉丹房煉製。</p></article>";
}

function renderGuide(tab = activeGuideTab) {
  activeGuideTab = tab;
  document.querySelectorAll(".guide-tab").forEach((button) => {
    const active = button.dataset.guideTab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  if (tab === "pets") {
    $("guideContent").innerHTML = pets.map((pet) => {
      const unlocked = state.realmIndex >= pet.unlock;
      const record = getPetRecord(pet.name);
      return `
        <article class="guide-entry ${unlocked ? "" : "locked"}">
          <header>
            <h3>${pet.name}・${pet.role}</h3>
            <span>${record.owned ? `第 ${record.level} / ${pet.maxLevel} 級` : unlocked ? "可締結" : "尚未解鎖"}</span>
          </header>
          <p>${pet.lore}</p>
          <div class="guide-meta">
            <span><b>同行效果</b>${pet.effect}</span>
            <span><b>締結消耗</b>${pet.bondCost.toLocaleString()} 修為</span>
            <span><b>解鎖</b>${realms[pet.unlock]?.name || "後續境界"}</span>
          </div>
        </article>
      `;
    }).join("");
    return;
  }

  if (tab === "recipes") {
    $("guideContent").innerHTML = recipes.map((recipe) => {
      const unlocked = state.realmIndex >= recipe.unlock;
      const owned = state.inventory[recipe.name] || 0;
      return `
        <article class="guide-entry ${unlocked ? "" : "locked"}">
          <header>
            <h3>${recipe.name}</h3>
            <span>${unlocked ? `持有 ${owned}` : "尚未解鎖"}</span>
          </header>
          <p>${recipeNotes[recipe.name] || recipe.effect}</p>
          <div class="guide-meta">
            <span><b>功效</b>${recipe.effect}</span>
            <span><b>煉製</b>${recipe.cost.toLocaleString()} 修為</span>
            <span><b>解鎖</b>${realms[recipe.unlock]?.name || "後續境界"}</span>
          </div>
        </article>
      `;
    }).join("");
    return;
  }

  $("guideContent").innerHTML = techniques.map((technique) => {
    const unlocked = state.realmIndex >= technique.unlock;
    const level = getTechniqueLevel(technique.name);
    return `
      <article class="guide-entry ${unlocked ? "" : "locked"}">
        <header>
          <h3>${technique.name}</h3>
          <span>${unlocked ? `第 ${level} / ${technique.maxLevel} 重` : "尚未解鎖"}</span>
        </header>
        <p>${techniqueLore[technique.name] || technique.effect}</p>
        <div class="guide-meta">
          <span><b>功效</b>${technique.effect}</span>
          <span><b>初次領悟</b>${technique.cost.toLocaleString()} 修為</span>
          <span><b>解鎖</b>${realms[technique.unlock]?.name || "後續境界"}</span>
        </div>
      </article>
    `;
  }).join("");
}

function openGuide() {
  guideReturnFocus = document.activeElement;
  $("guideModal").classList.remove("hidden");
  document.body.classList.add("modal-open");
  renderGuide(activeGuideTab);
  $("guideCloseBtn").focus();
}

function closeGuide() {
  $("guideModal").classList.add("hidden");
  document.body.classList.remove("modal-open");
  if (guideReturnFocus instanceof HTMLElement) guideReturnFocus.focus();
}

function bondPet(name) {
  const pet = pets.find((item) => item.name === name);
  if (!pet || state.realmIndex < pet.unlock) return;
  const record = getPetRecord(name);
  if (record.owned) return;
  if (state.cultivation < pet.bondCost) {
    showFloat("修為不足，無法締結靈寵");
    return;
  }
  const oldMaxHp = getMaxHp();
  state.cultivation -= pet.bondCost;
  state.pets[name] = { owned: true, level: 1 };
  if (!state.activePet) state.activePet = name;
  state.currentHp = Math.min(getMaxHp(), state.currentHp + Math.max(0, getMaxHp() - oldMaxHp));
  playActionEffect("pet-effect", 1500);
  showFloat(`與 ${name} 締結成功`);
  saveState();
  render();
}

function trainPet(name) {
  const pet = pets.find((item) => item.name === name);
  if (!pet) return;
  const record = getPetRecord(name);
  if (!record.owned || record.level >= pet.maxLevel) return;
  const cost = getPetTrainCost(pet);
  if (state.cultivation < cost) {
    showFloat("修為不足，無法培養靈寵");
    return;
  }
  const oldMaxHp = getMaxHp();
  state.cultivation -= cost;
  record.level += 1;
  state.pets[name] = record;
  state.currentHp = Math.min(getMaxHp(), state.currentHp + Math.max(0, getMaxHp() - oldMaxHp));
  playActionEffect("pet-effect", 1400);
  showFloat(`${name} 提升至 ${record.level} 級`);
  saveState();
  render();
}

function activatePet(name) {
  const pet = pets.find((item) => item.name === name);
  const record = getPetRecord(name);
  if (!pet || !record.owned || state.activePet === name) return;
  const oldMaxHp = getMaxHp();
  const hpRatio = oldMaxHp > 0 ? state.currentHp / oldMaxHp : 1;
  state.activePet = name;
  state.currentHp = Math.min(getMaxHp(), Math.ceil(getMaxHp() * hpRatio));
  playActionEffect("pet-effect", 1200);
  showFloat(`${name} 開始同行`);
  saveState();
  render();
}

function upgradeTechnique(name) {
  const technique = techniques.find((item) => item.name === name);
  if (!technique || state.realmIndex < technique.unlock) return;
  const level = getTechniqueLevel(name);
  if (level >= technique.maxLevel) return;
  const cost = getTechniqueCost(technique);
  if (state.cultivation < cost) {
    showFloat("修為不足，無法領悟功法");
    return;
  }
  const oldMaxHp = getMaxHp();
  state.cultivation -= cost;
  state.techniques[name] = level + 1;
  const gainedHp = getMaxHp() - oldMaxHp;
  state.currentHp = Math.min(getMaxHp(), state.currentHp + gainedHp);
  playActionEffect("technique-effect", 1500);
  showFloat(`${name} 提升至第 ${level + 1} 重`);
  saveState();
  render();
}

function brew(name) {
  const recipe = recipes.find((item) => item.name === name);
  if (!recipe || state.cultivation < recipe.cost) {
    showFloat("修為不足");
    return;
  }
  state.cultivation -= recipe.cost;
  state.inventory[name] = (state.inventory[name] || 0) + 1;
  const alchemyChance = Math.min(50, getEffectiveLuck() + (getTechniqueBonus("alchemy") + getPetBonus("alchemy")) * 100);
  const successLuck = Math.random() * 100 < alchemyChance;
  if (successLuck) {
    state.inventory[name] += 1;
    showFloat(`大成功 ${name} x2`);
  } else {
    showFloat(`煉成 ${name}`);
  }
  playActionEffect("alchemy-effect", 1200);
  saveState();
  renderStats();
  renderPills();
  renderBag();
}

function usePill(name) {
  const recipe = recipes.find((item) => item.name === name);
  if (!recipe || !state.inventory[name]) return;
  if (recipe.itemOnly) {
    showFloat("突破材料已備妥");
    return;
  }
  state.inventory[name] -= 1;
  if (recipe.value) state.cultivation += recipe.value;
  if (recipe.atk) state.atk += recipe.atk;
  if (recipe.hp) {
    state.hp += recipe.hp;
    state.currentHp = Math.min(getMaxHp(), state.currentHp + recipe.hp);
  }
  if (recipe.luck) state.luck += recipe.luck;
  if (recipe.affection) {
    const first = partners.find((partner) => state.realmIndex >= partner.unlock);
    if (first) state.affection[first.name] = (state.affection[first.name] || 0) + recipe.affection;
  }
  if (recipe.value) playAbsorbEffect();
  showFloat(`使用 ${name}`);
  saveState();
  render();
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function dualCultivate(name) {
  const partner = partners.find((item) => item.name === name);
  if (!partner || state.dualUsed[name] === todayKey()) return;
  const dualBonus = getTechniqueBonus("dual");
  const gain = Math.ceil(getRate() * 18 * (1 + (state.affection[name] || 0) / 1600) * (1 + dualBonus));
  state.cultivation += gain;
  state.affection[name] = (state.affection[name] || 0) + Math.ceil(35 * (1 + dualBonus));
  state.dualUsed[name] = todayKey();
  if (partner.stat === "luck") state.luck += partner.bonus;
  if (partner.stat === "battle") {
    state.atk += Math.ceil(state.atk * partner.bonus);
    state.def += Math.ceil(state.def * partner.bonus);
    const hpGain = Math.ceil(state.hp * partner.bonus);
    state.hp += hpGain;
    state.currentHp = Math.min(getMaxHp(), state.currentHp + hpGain);
  }
  playAbsorbEffect();
  playActionEffect("dual-effect", 1600);
  showFloat(`雙修 +${gain} 修為`);
  saveState();
  render();
}

async function breakthrough() {
  if (breakthroughInProgress) return;
  const realm = getRealm();
  const need = getNeed();
  if (state.realmIndex >= realms.length - 1) {
    showFloat("已達元嬰初期");
    return;
  }
  if (state.cultivation < need) {
    const missing = Math.ceil(need - state.cultivation);
    showFloat(`修為不足，還差 ${missing.toLocaleString()}`);
    return;
  }
  if (realm.qty > 0 && (state.inventory[realm.material] || 0) < realm.qty) {
    showFloat(`需要 ${realm.material} x${realm.qty}`);
    return;
  }
  const tribulationCount = getTribulationCount();
  breakthroughInProgress = true;
  renderStats();
  showFloat(tribulationCount > 0 ? `引動 ${tribulationCount} 道天劫` : "開始嘗試突破");
  if (realm.qty > 0) state.inventory[realm.material] -= realm.qty;
  if (tribulationCount > 0) {
    const survived = await runTribulation(tribulationCount);
    if (!survived) {
      state.cultivation = Math.floor(state.cultivation * 0.9);
      state.luck += 1;
      state.currentHp = Math.ceil(getMaxHp() * 0.25);
      breakthroughInProgress = false;
      showFloat("渡劫失敗，休養後恢復 25% 血量");
      saveState();
      render();
      return;
    }
  }
  const ok = Math.random() * 100 < getSuccessRate();
  if (ok) {
    state.cultivation -= need;
    state.realmIndex += 1;
    state.atk += realm.atk;
    state.def += getRealmDefenseGain(realm);
    const oldMaxHp = getMaxHp();
    state.hp += realm.hp;
    state.currentHp = Math.min(getMaxHp(), state.currentHp + getMaxHp() - oldMaxHp);
    playBreakthroughEffect();
    showFloat(tribulationCount > 0 ? `渡過 ${tribulationCount} 道天劫，突破 ${getRealm().name}` : `突破 ${getRealm().name}`);
  } else {
    state.cultivation = Math.floor(state.cultivation * 0.82);
    state.luck += 1;
    showFloat(tribulationCount > 0 ? "渡劫失敗，感悟 +1" : "突破失敗，感悟 +1");
  }
  breakthroughInProgress = false;
  saveState();
  render();
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((el) => el.classList.toggle("active", el.id === tabId));
  document.querySelectorAll(".nav-btn").forEach((el) => el.classList.toggle("active", el.dataset.tab === tabId));
  $("tabTitle").textContent =
    tabId === "partnerPanel" ? "雙修閣" :
    tabId === "techniquePanel" ? "功法殿" :
    tabId === "petPanel" ? "靈獸谷" :
    tabId === "bagPanel" ? "背包" :
    "煉丹房";
}

$("breakthroughBtn").addEventListener("click", breakthrough);
$("guideBtn").addEventListener("click", openGuide);
$("guideCloseBtn").addEventListener("click", closeGuide);
$("guideModal").addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-guide")) closeGuide();
});

document.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  const name = event.target.dataset.name;
  if (action === "brew") brew(name);
  if (action === "use") usePill(name);
  if (action === "dual") dualCultivate(name);
  if (action === "technique") upgradeTechnique(name);
  if (action === "bond-pet") bondPet(name);
  if (action === "train-pet") trainPet(name);
  if (action === "activate-pet") activatePet(name);
  if (event.target.dataset.guideTab) renderGuide(event.target.dataset.guideTab);
  if (event.target.dataset.tab) switchTab(event.target.dataset.tab);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !$("guideModal").classList.contains("hidden")) closeGuide();
});

updateOfflineGain();
render();
saveState();

setInterval(() => {
  state.cultivation += getRate() / 12;
  state.currentHp = Math.min(getMaxHp(), state.currentHp + getMaxHp() / 120);
  playAbsorbEffect();
  saveState();
  renderStats();
}, 5000);
