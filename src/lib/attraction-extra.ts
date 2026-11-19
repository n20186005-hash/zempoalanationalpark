// Location-specific editorial additions. Existing page copy and media stay intact.
type Extra = { aboutTitle: string; about: string; historyTitle: string; history: string; routeTitle: string; route: string[]; photoTitle: string; photoTips: string[]; adviceTitle: string; advice: string };

const details: Record<string, Record<string, Extra>> = {
  es: {
    'laguna-zempoala': {
      aboutTitle: 'Sobre la Laguna de Zempoala y su administración',
      about: 'La Laguna de Zempoala forma parte del Parque Nacional Lagunas de Zempoala, área natural protegida federal decretada en 1936 y administrada por la Comisión Nacional de Áreas Naturales Protegidas (CONANP). El sitio protege un paisaje de agua dulce, praderas de altura y bosques templados. La laguna principal concentra la visita pública, pero el manejo del parque no implica que todos los senderos, orillas o actividades estén abiertos. Esta guía es independiente y no representa a CONANP.',
      historyTitle: 'Un paisaje protegido, no un jardín construido',
      history: 'A diferencia de un parque urbano trazado por un arquitecto, el atractivo aquí es natural: una cuenca de montaña y sus cambios estacionales. El decreto de 1936 dio protección al sistema de lagunas y bosques. Observa cómo el borde de la pradera, los árboles y el espejo de agua forman capas distintas; el nivel del agua y el aspecto de la ribera pueden variar.',
      routeTitle: 'Paseo recomendado desde el área pública',
      route: ['Llega al acceso público señalizado y verifica con el personal qué senderos están habilitados ese día.', 'Acércate al primer mirador o tramo permitido de la ribera y observa el lago completo antes de avanzar.', 'Sigue únicamente el camino abierto junto a la pradera; detente en los puntos firmes para contemplar el bosque y las aves.', 'Regresa por el acceso autorizado; no continúes por atajos hacia Compila, Tonatiahua o Quila sin información de campo.'],
      photoTitle: 'Puntos de observación y fotografía',
      photoTips: ['Ribera pública: encuadra el agua en primer plano y las laderas boscosas detrás; evita la orilla resbaladiza.', 'Borde de la pradera: usa las líneas naturales del pasto para dar profundidad, sin pisar vegetación húmeda.', 'Vista hacia el bosque: con luz suave de mañana o tarde, intenta captar la transición entre coníferas, nubes y lago.'],
      adviceTitle: 'Antes de salir',
      advice: 'La altitud trae cambios rápidos de niebla, viento y temperatura. Lleva abrigo impermeable, calzado con agarre y agua; comprueba acceso, cuotas y reglas actuales. No presupongas alquiler de embarcaciones, natación ni un circuito completo de la ribera.'
    },
    'parroquia-san-juan-bautista-huitzilac': {
      aboutTitle: 'Sobre la Parroquia de San Juan Bautista y quién la administra',
      about: 'La Parroquia de San Juan Bautista es un templo católico en activo situado en la Plaza Principal de Huitzilac. Su vida religiosa corresponde a la comunidad parroquial bajo la Diócesis de Cuernavaca; no forma parte de la administración de CONANP ni del parque nacional. El INAH conserva registros fotográficos y patrimoniales del edificio. Es una parada cultural que ayuda a conocer el pueblo antes o después de visitar las lagunas; esta página es una guía turística independiente, no una comunicación oficial de la parroquia.',
      historyTitle: 'Patrimonio del pueblo y lectura arquitectónica',
      history: 'Los registros del INAH permiten identificar la parroquia en el paisaje histórico de Huitzilac, pero no bastan para atribuir a cada muro una fecha exacta. Desde la plaza, observa la composición de la fachada pétrea y la vertical del campanario frente a la escala de las casas y calles. Distingue esa observación directa de las historias sobre la evangelización de la región: no todas las partes visibles tienen necesariamente la misma antigüedad.',
      routeTitle: 'Paseo corto por el centro de Huitzilac',
      route: ['Llega a la Plaza Principal con la navegación específica a la parroquia; identifica un lugar permitido para estacionar.', 'Contempla la fachada y el campanario desde el espacio público de la plaza, dejando libre el paso.', 'Rodea únicamente los lados accesibles desde las calles públicas para observar la relación con el caserío.', 'Si el templo está abierto y no hay restricciones, entra con discreción; después continúa hacia el parque con otra ruta de navegación.'],
      photoTitle: 'Encuadres de la parroquia',
      photoTips: ['Desde la plaza: incluye fachada y campanario para que el lugar sea reconocible.', 'Esquina de la plaza: fotografía el templo en contexto con el trazado del pueblo, evitando personas identificables sin permiso.', 'Detalle exterior: registra las texturas de piedra y los remates arquitectónicos sin tocar muros ni interrumpir ceremonias.'],
      adviceTitle: 'Visita respetuosa',
      advice: 'No se ha confirmado un horario turístico continuo. Si tu objetivo es entrar, consulta previamente con la comunidad parroquial. Durante misas o celebraciones, evita flash, trípodes y fotografías de asistentes; no se debe confundir la entrada a la iglesia con la entrada al parque.'
    }
  },
  en: {
    'laguna-zempoala': {
      aboutTitle: 'About Laguna de Zempoala and its management',
      about: 'Laguna de Zempoala lies within Lagunas de Zempoala National Park, a federally protected area established in 1936 and administered by Mexico’s National Commission of Natural Protected Areas (CONANP). The protected landscape combines freshwater, upland meadows and temperate forest. The main lake is a focus of public visits, but this does not mean every shoreline, path or activity is accessible. This is an independent visitor guide, not an official CONANP publication.',
      historyTitle: 'A protected natural landscape, not a designed garden',
      history: 'Unlike a landscaped city park, the main attraction is a mountain basin shaped by natural and seasonal processes. The 1936 protection covers its lakes and forests. Look for the changing layers of meadow, tree line and open water. Water levels and shoreline conditions can vary with the season.',
      routeTitle: 'A practical walk from the visitor area',
      route: ['Arrive at the signed public entrance and check which paths are open with park staff.', 'From an authorized lakeside viewpoint, take in the whole lake and surrounding slope before walking on.', 'Follow open paths by the meadow, stopping on firm ground to watch birds and the forest edge.', 'Return via the authorized access; do not take unverified shortcuts toward Compila, Tonatiahua or Quila.'],
      photoTitle: 'Views and photography positions',
      photoTips: ['Public shoreline: frame the forested slopes beyond the water, staying clear of slippery edges.', 'Meadow edge: use natural grass lines for depth without stepping on wetland plants.', 'Forest-facing view: soft morning or late-afternoon light may reveal layers of conifers, clouds and water.'],
      adviceTitle: 'Before you go',
      advice: 'Mountain weather can change quickly. Bring waterproof layers, sturdy shoes and drinking water; check current access, fees and rules. Do not assume swimming, boating rentals or a complete shoreline circuit is available.'
    },
    'parroquia-san-juan-bautista-huitzilac': {
      aboutTitle: 'About San Juan Bautista Parish and its management',
      about: 'San Juan Bautista is an active Catholic parish on Huitzilac’s main square. Parish life is overseen by its local community within the Diocese of Cuernavaca; the church is not managed by CONANP or part of the national park. INAH records document the building as local heritage. It is a distinct cultural stop before or after a lake visit. This independent visitor guide is not an official parish publication.',
      historyTitle: 'Village heritage and architectural details',
      history: 'INAH’s photographic records establish the church’s place in historic Huitzilac, but do not justify assigning an exact date to every surviving wall. From the square, study the stone façade, bell tower and their scale against the surrounding streets. Separate visible architectural evidence from the broader history of evangelization in the region: the structure may contain work from different periods.',
      routeTitle: 'A short walk around central Huitzilac',
      route: ['Navigate to the parish on Plaza Principal and find permitted parking.', 'View the façade and bell tower from the public square without blocking access.', 'Use public streets to see the church within the village streetscape.', 'If the doors are open and entry is appropriate, visit quietly; then start a separate navigation route to the national park.'],
      photoTitle: 'Church photography positions',
      photoTips: ['Across the square: include both façade and bell tower for a recognizable view.', 'Square corner: include part of the village streetscape while respecting others’ privacy.', 'Exterior detail: capture stone textures and architectural finishings without touching walls or interrupting worship.'],
      adviceTitle: 'A respectful visit',
      advice: 'Regular tourist opening hours have not been verified. Ask the parish before planning an interior visit. During services, avoid flash, tripods and photographs of worshippers; park admission and parish access are entirely separate.'
    }
  },
  zh: {
    'laguna-zempoala': {
      aboutTitle: '关于 Zempoala 主湖与管理主体',
      about: 'Laguna de Zempoala 位于 1936 年设立的 Lagunas de Zempoala 国家公园内。公园是墨西哥联邦自然保护地，由国家自然保护区委员会 CONANP 负责管理，保护高海拔淡水湖、草甸和温带森林。主湖是主要公共游览区域，但不代表每一段湖岸、步道或活动都对游客开放。本站为独立旅游资料网站，并非 CONANP 官方页面。',
      historyTitle: '天然高山湖泊，而非人工园林',
      history: '这里的特色不是人工设计的花园建筑，而是山间盆地、季节性水文、草甸与针叶林的组合。1936 年设立的国家公园保护湖群及周围森林。可特别观察水面、湖岸草甸和树林形成的不同层次；湖水高度与岸边状况会随季节改变。',
      routeTitle: '从公共游览区出发的步行建议',
      route: ['从有标识的公园公共入口进入，先向工作人员确认当日开放步道。', '在允许停留的湖岸观景处观察整片主湖和山坡，确定安全的行进方向。', '沿开放的草甸旁步道慢行，在稳固地面上停留观察水鸟和林缘。', '原路或按已开放路线返回；不要沿未经确认的小径擅自前往 Compila、Tonatiahua 或 Quila。'],
      photoTitle: '观察重点与实景拍摄机位',
      photoTips: ['公共湖岸：以前景湖水衬托远处林坡，避免站在湿滑边缘。', '草甸边缘：利用草地天然线条形成纵深，不进入脆弱湿地植物区域。', '朝向林坡：清晨或傍晚柔和光线下拍摄针叶林、云层与湖面。'],
      adviceTitle: '出发前确认',
      advice: '高海拔山区天气、雾和温度变化快。请带防水保暖层、抓地力良好的鞋和饮水，核对当日开放与收费情况。不要默认允许游泳、租船或完整环湖。'
    },
    'parroquia-san-juan-bautista-huitzilac': {
      aboutTitle: '关于 Huitzilac 圣胡安洗者堂及其管理主体',
      about: 'San Juan Bautista 是 Huitzilac 镇中心广场仍在使用的天主教堂，其宗教事务由 Cuernavaca 教区体系内的当地堂区负责，并不归 CONANP 或国家公园管理。墨西哥国家人类学与历史研究所 INAH 留存了该教堂的历史影像资料。这里适合成为湖区行程前后的独立文化停留点。本站是独立旅游指南，并非堂区官方公告。',
      historyTitle: '城镇历史与建筑细部',
      history: 'INAH 的影像记录能够证明教堂在 Huitzilac 历史城镇景观中的位置，但不足以精确断定每一面现存墙体的年代。从广场观察石质立面、钟楼高度，以及教堂与周围街巷的比例关系。地区早期传教史不等于今天所见各部分建筑都建于同一时期。',
      routeTitle: 'Huitzilac 镇中心短程步行',
      route: ['用教堂专属定位抵达 Plaza Principal，在准许的区域停车。', '从公共广场正面观察立面与钟楼，保持出入口畅通。', '沿开放的公共街道观察教堂与周边民居的关系，不进入私人区域。', '若教堂开放且适宜入内，可安静参观；之后另行设置国家公园导航终点。'],
      photoTitle: '教堂专属摄影机位',
      photoTips: ['广场对侧：将石质立面与钟楼同时纳入画面，突出景点识别度。', '广场转角：把部分镇中心街景纳入构图，尊重居民隐私。', '外立面细节：近距离观察石材和建筑线条，不触碰古迹、不打扰宗教活动。'],
      adviceTitle: '尊重日常宗教活动',
      advice: '尚未核实固定游客开放时间，若专程入内应先联系堂区。弥撒时避免闪光灯、三脚架和未经同意拍摄参与者；教堂参观与国家公园入园是两件不同的事。'
    }
  }
};

export function getAttractionExtra(locale: string, topic: string): Extra | undefined {
  return (details[locale] || details.en)?.[topic];
}
