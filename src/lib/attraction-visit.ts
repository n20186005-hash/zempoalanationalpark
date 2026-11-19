// Verified, place-specific visitor details; no assumed prices, hours or transport timetables.
type VisitDetails = {
  type: string; address: string; hours: string; fee: string; transport: string[]; stay: string;
  visitTitle: string; visitTips: string[]; highlightsTitle: string; highlights: string[];
  hoursTitle: string; feeTitle: string; transportTitle: string; stayTitle: string;
  reviewsTitle: string; reviewsText: string; directionsTitle: string; addressTitle: string; typeTitle: string;
  explorationTitle: string; featureTitle: string; featureText: string;
};
const details: Record<string, Record<string, VisitDetails>> = {
  es: {
    'laguna-zempoala': {
      type: 'Laguna natural de alta montaña y área de uso público de un parque nacional',
      address: 'Laguna de Zempoala, Parque Nacional Lagunas de Zempoala, zona de Huitzilac / Ocuilan, México',
      hours: 'El ingreso depende de los horarios y las restricciones vigentes del parque; no es un lugar de acceso libre las 24 horas.',
      fee: 'La cuota de acceso puede cambiar. Confirma la tarifa aplicable en el acceso oficial; no hay una tarifa exclusiva acreditada para esta laguna.',
      transport: ['En automóvil: desde Huitzilac toma la carretera federal hacia Toluca; CONANP sitúa el acceso a la zona de uso público alrededor del km 14.5. Sigue después la señalización local.', 'Desde Cuernavaca o Ciudad de México: llega primero a Huitzilac y comprueba la ruta de montaña antes de conducir al parque.', 'Transporte público: no se ha documentado un servicio regular que deje directamente en esta orilla; verifica conexiones y el último tramo antes de partir.'],
      stay: 'Para pernoctar, busca alojamientos en Huitzilac, Tres Marías o Cuernavaca y verifica el desplazamiento hasta la entrada al parque. No atribuyas cabañas o campamentos a la orilla sin comprobar su operador y funcionamiento.',
      visitTitle: 'Consejos para conocer el lago', visitTips: ['Prioriza la zona pública señalizada; la disponibilidad de senderos cambia con el clima.', 'Lleva una capa impermeable y calzado con suela firme: el terreno puede estar frío, húmedo o resbaladizo.', 'Reserva margen de tiempo para las vistas del bosque y la laguna sin dar por hecho que el circuito completo está abierto.'],
      highlightsTitle: 'Lo más característico', highlights: ['Cuenca natural de montaña, agua dulce y praderas de altura', 'Reflejos de las laderas con pinos y vegetación húmeda', 'Punto de partida para comprender las diferencias con Compila, Tonatiahua y Quila'],
      hoursTitle: 'Horarios de visita', feeTitle: 'Acceso y tarifas', transportTitle: 'Cómo llegar', stayTitle: 'Dónde alojarse',
      reviewsTitle: 'Valoraciones y experiencias', reviewsText: 'La cifra mostrada corresponde al conjunto del parque nacional, no a una ficha de Google Maps verificada exclusivamente para Laguna de Zempoala. Consulta el enlace de ubicación para opiniones recientes y condiciones observadas por visitantes.',
      directionsTitle: 'Dirección y navegación', addressTitle: 'Referencia geográfica', typeTitle: 'Tipo de atractivo', explorationTitle: 'Descubre Laguna de Zempoala', featureTitle: 'Paisaje, ecología y experiencia', featureText: 'Aquí no hay un conjunto arquitectónico: la identidad visual está en la orilla cambiante, el bosque templado y el relieve volcánico. La zona pública facilita contemplar el paisaje, mientras que cada laguna vecina tiene su propia cuenca y régimen de agua.'
    },
    'parroquia-san-juan-bautista-huitzilac': {
      type: 'Templo católico en activo y patrimonio histórico local',
      address: 'Plaza Principal, 62510 Huitzilac, Morelos, México',
      hours: 'La apertura al interior depende de los servicios religiosos y de la comunidad parroquial. La plaza pública y el templo no tienen necesariamente el mismo horario.',
      fee: 'No consta una tarifa turística oficial para ver el exterior desde la plaza. Para actividades o visitas especiales consulta a la parroquia.',
      transport: ['En automóvil: navega específicamente a la Parroquia de San Juan Bautista en la Plaza Principal de Huitzilac; no utilices la entrada del parque nacional.', 'Desde Cuernavaca: toma la ruta vial hacia Huitzilac y continúa al centro del poblado, siguiendo señales locales y las restricciones de estacionamiento.', 'A pie: desde la plaza principal se observa la fachada sin necesidad de desplazarse a la zona de las lagunas.'],
      stay: 'Si quieres combinar el templo con las lagunas, busca estancia en Huitzilac o Tres Marías. Cuernavaca ofrece una base urbana más amplia, pero requiere desplazarse por carretera a cada visita.',
      visitTitle: 'Consejos para la visita', visitTips: ['La vista más clara de la fachada y el campanario se obtiene desde la plaza.', 'Antes de entrar, observa si se celebra misa y sigue las indicaciones de la comunidad.', 'Considera la iglesia como una parada cultural independiente antes o después de recorrer el parque.'],
      highlightsTitle: 'Qué hace singular al templo', highlights: ['Fachada de piedra y campanario como referencia del centro de Huitzilac', 'Relación con la plaza, las calles y el patrimonio documental del INAH', 'Uso religioso vigente: las normas de visita difieren de las de un museo'],
      hoursTitle: 'Horarios de apertura', feeTitle: 'Precios y acceso', transportTitle: 'Cómo llegar al templo', stayTitle: 'Alojamiento para combinar visitas',
      reviewsTitle: 'Opiniones de visitantes', reviewsText: 'La valoración corresponde a la ficha de la parroquia consultada en Google Maps, no a la del parque. Consulta las reseñas en el enlace de esta página; el número puede cambiar con el tiempo.',
      directionsTitle: 'Dirección y mapa', addressTitle: 'Dirección', typeTitle: 'Tipo de lugar', explorationTitle: 'Descubre San Juan Bautista', featureTitle: 'Historia, arquitectura y vida local', featureText: 'El conjunto se entiende mejor desde el espacio público: fachada pétrea, torre y escala de la plaza. Los documentos patrimoniales del INAH permiten situarlo en la memoria del pueblo, sin atribuir fechas no documentadas a cada modificación del edificio.'
    }
  },
  en: {
    'laguna-zempoala': {
      type: 'Natural highland lake within a national park visitor area', address: 'Laguna de Zempoala, Lagunas de Zempoala National Park, Huitzilac / Ocuilan area, Mexico',
      hours: 'Entry follows current park opening and access rules; the shore should not be treated as a 24-hour public space.', fee: 'Entrance fees may change. Confirm the current park charge at the official access point; no separate lake-only price has been verified.',
      transport: ['By car: from Huitzilac take the federal road toward Toluca. CONANP places the public-use access around kilometre 14.5; follow local signs thereafter.', 'From Cuernavaca or Mexico City: reach Huitzilac first, then verify mountain-road conditions before continuing.', 'Public transport: a scheduled service directly to this lake shore has not been established; check connections and the final leg before travelling.'],
      stay: 'Consider accommodation in Huitzilac, Tres Marías or Cuernavaca and check travel time to the park. Do not assume a lakeside cabin or campsite is currently operating without checking its provider.',
      visitTitle: 'Visitor tips', visitTips: ['Stay within the marked public area; weather may affect which trails are open.', 'Pack a waterproof layer and sturdy shoes for cool, damp or slippery ground.', 'Leave time to enjoy forest and lake views without assuming that a complete lakeside loop is accessible.'],
      highlightsTitle: 'Distinctive features', highlights: ['Mountain basin with freshwater and upland meadows', 'Forest reflections and vegetation along the shore', 'A useful starting point for understanding nearby but separate lakes'],
      hoursTitle: 'Opening and access', feeTitle: 'Entrance fees', transportTitle: 'Transport and arrival', stayTitle: 'Where to stay',
      reviewsTitle: 'Visitor feedback', reviewsText: 'The displayed rating refers to the national park as a whole, not a verified stand-alone Google Maps listing for Laguna de Zempoala. Use the map link for current reports from visitors.',
      directionsTitle: 'Address and directions', addressTitle: 'Geographic reference', typeTitle: 'Place type', explorationTitle: 'Discover Laguna de Zempoala', featureTitle: 'Landscape and ecology', featureText: 'There is no built architectural ensemble here: the defining features are a changing shoreline, temperate forest and volcanic terrain. The visitor area provides views, while each adjacent lagoon occupies its own basin and has its own water regime.'
    },
    'parroquia-san-juan-bautista-huitzilac': {
      type: 'Active Catholic parish church and local historic landmark', address: 'Plaza Principal, 62510 Huitzilac, Morelos, Mexico',
      hours: 'Interior opening depends on worship services and parish arrangements; the square and church do not necessarily share opening hours.', fee: 'No official tourist fee has been established for viewing the exterior from the public square. Ask the parish about special visits or activities.',
      transport: ['By car: navigate specifically to San Juan Bautista Parish on Plaza Principal, Huitzilac, rather than to the national park entrance.', 'From Cuernavaca: follow the road route to Huitzilac town centre, respecting local traffic and parking rules.', 'On foot: the façade is visible from the main square without travelling toward the lakes.'],
      stay: 'For a combined church-and-lake trip, consider Huitzilac or Tres Marías. Cuernavaca offers a broader urban base but means travelling by road to both destinations.',
      visitTitle: 'Visiting tips', visitTips: ['View the full façade and tower from the public square.', 'Check whether worship is taking place before entering and follow parish guidance.', 'Treat the church as a separate cultural stop before or after the national park.'],
      highlightsTitle: 'What makes it distinctive', highlights: ['Stone façade and tower anchoring Huitzilac town centre', 'A strong relationship to the square, local streets and INAH photographic records', 'An active place of worship, not a museum'],
      hoursTitle: 'Visiting hours', feeTitle: 'Admission', transportTitle: 'Getting to the church', stayTitle: 'Accommodation nearby',
      reviewsTitle: 'Visitor reviews', reviewsText: 'The rating is from the parish’s own Google Maps listing, not the national park. Follow this page’s map link for individual reviews and current counts.',
      directionsTitle: 'Address and map', addressTitle: 'Street address', typeTitle: 'Attraction type', explorationTitle: 'Discover San Juan Bautista', featureTitle: 'Architecture and local life', featureText: 'Read the building as part of its square: masonry façade, tower and town-scale streets. INAH heritage records support the landmark’s local importance without requiring an unsupported construction date for every surviving feature.'
    }
  },
  zh: {
    'laguna-zempoala': {
      type: '国家公园公共游览区内的天然高山湖泊', address: 'Laguna de Zempoala，Lagunas de Zempoala 国家公园，Huitzilac／Ocuilan 一带，墨西哥',
      hours: '按国家公园现行开放安排与限制进入，不能当作全天二十四小时开放的公共湖岸。', fee: '入园收费可能调整，请以公园正式入口当日标准为准；目前没有核实到主湖单独收费项目。',
      transport: ['自驾：从 Huitzilac 沿前往 Toluca 的联邦公路行驶。CONANP 将公共游览区入口标在约 14.5 公里处，进入后继续按路牌行驶。', '从 Cuernavaca 或墨西哥城出发：先到 Huitzilac，再确认山区道路状况。', '公共交通：尚无可靠资料证明有固定班次直达该湖岸；请在出发前核实换乘和最后一段交通。'],
      stay: '可考虑住在 Huitzilac、Tres Marías 或 Cuernavaca，并核对到国家公园入口的车程。未经核对经营状况，不将湖边木屋或营地直接列为可订住宿。',
      visitTitle: '游览建议', visitTips: ['优先走设有标识的公共游览区域，步道可能因天气而调整开放。', '山区湿冷，准备防水外套与防滑鞋。', '为观湖、林缘与摄影留足时间，不要默认环湖步道全线开放。'],
      highlightsTitle: '景点特色', highlights: ['高山天然湖盆、淡水水面与草甸', '针叶林倒影及湖岸湿地植物', '认识邻近 Compila、Tonatiahua、Quila 不同水文特征的起点'],
      hoursTitle: '开放时间', feeTitle: '门票与费用', transportTitle: '交通方式', stayTitle: '周边住宿',
      reviewsTitle: '游客评分与评价', reviewsText: '页面展示的评分属于整个国家公园，并非已核实的 Laguna de Zempoala 单独地点评分。可从专属地图链接查看近期游客反馈。',
      directionsTitle: '地址与地图导航', addressTitle: '地理位置', typeTitle: '景点类型', explorationTitle: '探索 Laguna de Zempoala', featureTitle: '自然地貌与生态体验', featureText: '这里没有人工建筑群，特色在季节变化的湖岸、温带森林和火山地貌。主湖设有公共观景区域，但附近其他湖泊分属不同湖盆，水量和到达条件也不同。'
    },
    'parroquia-san-juan-bautista-huitzilac': {
      type: '仍在使用的天主教堂与地方历史地标', address: 'Plaza Principal, 62510 Huitzilac, Morelos, México',
      hours: '内部开放随宗教活动和堂区安排而变；镇中心公共广场与教堂内部并非同一开放时段。', fee: '从公共广场观看教堂外观没有已核实的专门游客票价；特殊参观或活动请向堂区咨询。',
      transport: ['自驾：独立导航至 Huitzilac 的 Plaza Principal 圣胡安洗者堂，不要使用国家公园入口作为目的地。', '从 Cuernavaca 出发：沿公路进入 Huitzilac 镇中心，并遵守当地交通与停车指示。', '步行：从镇中心广场即可观察教堂立面，不需要前往湖区。'],
      stay: '若教堂与湖区安排同日游览，可考虑 Huitzilac 或 Tres Marías 住宿；Cuernavaca 选择更多，但需要分别驾车前往两个地点。',
      visitTitle: '参观建议', visitTips: ['从公共广场观看石质立面和钟楼整体构图。', '进入内部前注意是否正在举行弥撒，尊重堂区指示。', '把教堂作为独立文化景点，与国家公园分别规划交通。'],
      highlightsTitle: '建筑与文化特色', highlights: ['石质立面与钟楼构成 Huitzilac 镇中心地标', '与广场、街道和 INAH 历史影像形成关联', '至今仍有宗教活动，参观礼仪与博物馆不同'],
      hoursTitle: '开放时间', feeTitle: '门票与参观', transportTitle: '到达教堂', stayTitle: '周边住宿建议',
      reviewsTitle: '游客评价', reviewsText: '所显示的评分来自教堂自己的 Google Maps 地点，而非国家公园。点击本页地图链接可查看最新评论与评价数量。',
      directionsTitle: '具体地址与导航', addressTitle: '街道地址', typeTitle: '景点类型', explorationTitle: '探索 Huitzilac 圣胡安洗者堂', featureTitle: '历史建筑与城镇生活', featureText: '从广场可以清楚看见教堂的石砌立面、钟楼与街道比例。INAH 历史影像证明其地方文化价值，但不应把没有证据的精确年代强加给每段建筑构件。'
    }
  }
};
export function getAttractionVisit(locale: string, topic: string): VisitDetails | undefined {
  return (details[locale] || details.en)?.[topic];
}
