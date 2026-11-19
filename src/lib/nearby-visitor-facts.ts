// Visitor facts checked against the linked venue/authority pages in November 2026.
// Keep these separate from historical editorial so changes to fees and hours are easy to audit.
type Lang = 'es' | 'en' | 'zh';
type Fact = { category: Record<Lang, string>; hours: Record<Lang, string>; fee: Record<Lang, string>; arrival: Record<Lang, string>; duration: Record<Lang, string>; reference: string };
const tr = (es: string, en: string, zh: string): Record<Lang, string> => ({ es, en, zh });
export const NEARBY_VISITOR_FACTS: Record<string, Fact> = {
  'jardin-borda-cuernavaca': {
    category: tr('Jardín histórico y centro cultural', 'Historic garden and cultural centre', '历史园林与文化中心'),
    hours: tr('Martes a domingo, 10:00–17:00 según el mapa turístico municipal de 2026; confirmar antes de acudir.', 'Tuesday–Sunday, 10:00–17:00 per the 2026 municipal visitor map; confirm before visiting.', '据 2026 年市旅游图：周二至周日 10:00–17:00；出发前复核。'),
    fee: tr('Hay entrada de pago y posibles descuentos; los importes publicados por distintas guías no coinciden. Confirma en taquilla.', 'Ticketed entry with possible concessions; published guide prices differ, so confirm at the ticket desk.', '通常需要购票，部分人群有优惠；公开指南价格不一致，以现场票价为准。'),
    arrival: tr('En Av. Morelos 271, a pie desde el centro histórico de Cuernavaca; combina la visita con la catedral. Desde Huitzilac es necesario desplazarse por carretera.', 'At Av. Morelos 271, walk from Cuernavaca historic centre and combine with the cathedral. Travel by road from Huitzilac.', '入口在 Morelos 大道 271 号，从 Cuernavaca 老城步行可达，可联游大教堂；从 Huitzilac 需先公路抵达市区。'),
    duration: tr('Reserva 45–90 minutos para jardines y espacios culturales abiertos.', 'Allow 45–90 minutes for the gardens and any open cultural rooms.', '建议留出 45–90 分钟游园与参观开放展区。'), reference: 'https://s3.us-east-2.amazonaws.com/gacetas.cuernavaca.gob.mx/Mapa-cartel-2026.pdf'
  },
  'teopanzolco-cuernavaca': {
    category: tr('Zona arqueológica tlahuica y mexica', 'Tlahuica–Mexica archaeological site', 'Tlahuica／Mexica 考古遗址'),
    hours: tr('Miércoles a domingo, 09:00–16:00 (INAH).', 'Wednesday–Sunday, 09:00–16:00 (INAH).', '周三至周日 09:00–16:00（INAH）。'),
    fee: tr('INAH: $105 MXN nacionales; $210 MXN extranjeros. Domingo gratuito para mexicanos y exenciones reglamentarias.', 'INAH: MXN $105 for Mexican visitors; MXN $210 for foreign visitors. Free Sundays for Mexican citizens and statutory exemptions.', 'INAH：墨西哥籍游客 105 比索，外国游客 210 比索；墨西哥公民周日及符合规定者可免票。'),
    arrival: tr('Acceso por Río Balsas s/n, colonia Vista Hermosa; llegar en taxi, transporte urbano o automóvil desde el centro.', 'Enter via Río Balsas s/n in Vista Hermosa; take a taxi, local transport or car from the centre.', '从 Vista Hermosa 区 Río Balsas 无门牌号入口进入；可从市中心乘出租车、市区交通或驾车抵达。'),
    duration: tr('Calcula 45–75 minutos para el circuito abierto y la observación de basamentos.', 'Allow 45–75 minutes for the open circuit and platforms.', '参观开放线路与台基建议 45–75 分钟。'), reference: 'https://lugares.inah.gob.mx/es/node/5611'
  },
  'ex-convento-natividad-tepoztlan': {
    category: tr('Convento dominico del siglo XVI, museo y templo en uso', '16th-century Dominican convent, museum and active church', '16 世纪多明我会修道院、博物馆与宗教建筑'),
    hours: tr('INAH: lunes a domingo, 09:00–18:00; último acceso 17:00. Actualmente solo planta baja; mirador con reserva.', 'INAH: daily 09:00–18:00, last admission 17:00. Ground floor only; viewpoint requires booking.', 'INAH：每日 09:00–18:00，17:00 停止入场；目前仅开放底层，观景处需预约。'),
    fee: tr('INAH señala entrada gratuita, tanto para visitantes nacionales como extranjeros.', 'INAH lists free admission for both Mexican and international visitors.', 'INAH 公示墨西哥及外国游客均免费入场。'),
    arrival: tr('En Envila y No Reelección s/n, en el centro de Tepoztlán; llega por carretera desde Cuernavaca y continúa a pie por el casco urbano.', 'At Envila and No Reelección in central Tepoztlán; travel by road from Cuernavaca and walk through the town centre.', '位于 Tepoztlán 镇中心 Envila 与 No Reelección 交界处；从 Cuernavaca 公路抵达后可在老城步行。'),
    duration: tr('Reserva 45–90 minutos; el circuito se ajusta a las zonas habilitadas.', 'Allow 45–90 minutes; the visit depends on which areas are accessible.', '建议 45–90 分钟，以当日实际开放区域为准。'), reference: 'https://lugares.inah.gob.mx/es/node/4327'
  },
  'el-tepozteco': {
    category: tr('Santuario prehispánico en la cima y sendero de montaña', 'Hilltop pre-Hispanic sanctuary and steep trail', '山顶前西班牙时期圣所与登山路线'),
    hours: tr('INAH: miércoles a domingo, 09:00–16:00; último acceso 15:00, sujeto a condiciones del sendero.', 'INAH: Wednesday–Sunday, 09:00–16:00; last entry 15:00, subject to trail conditions.', 'INAH：周三至周日 09:00–16:00，15:00 停止入场；步道亦受现场条件限制。'),
    fee: tr('INAH: $105 MXN nacionales y $210 MXN extranjeros; comprobar restricciones y exenciones.', 'INAH: MXN $105 for Mexican visitors and MXN $210 for foreign visitors; confirm restrictions and exemptions.', 'INAH：墨西哥籍 105 比索、外国游客 210 比索；须核对限制与免票条件。'),
    arrival: tr('Inicio a pie en avenida del Tepozteco s/n, barrio de Santa Cruz, Tepoztlán; ascenso empinado por sendero oficial, nunca desde Zempoala.', 'Begin on foot at Av. del Tepozteco, Santa Cruz district, Tepoztlán; steep climb on the official trail, not from Zempoala.', '从 Tepoztlán Santa Cruz 区 Avenida del Tepozteco 的正式登山入口徒步爬升，不能从 Zempoala 公园步行接入。'),
    duration: tr('Reserva varias horas para subida y descenso; la duración depende de condición física y clima.', 'Set aside several hours for the ascent and descent; fitness and weather affect the time.', '上下山需预留数小时，具体取决于体力、天气与步道状态。'), reference: 'https://lugares.inah.gob.mx/es/node/4473'
  },
  'palacio-de-cortes': {
    category: tr('Museo regional en edificio histórico', 'Regional museum in a historic palace', '历史宫殿内的地区博物馆'),
    hours: tr('INAH: martes a domingo, 09:00–18:00.', 'INAH: Tuesday–Sunday, 09:00–18:00.', 'INAH：周二至周日 09:00–18:00。'),
    fee: tr('INAH: $105 MXN nacionales; $210 MXN extranjeros. Domingos gratuitos para mexicanos; hay otras exenciones.', 'INAH: MXN $105 Mexican visitors; MXN $210 foreign visitors. Free Sundays for Mexican citizens; other exemptions apply.', 'INAH：墨西哥籍 105 比索、外国游客 210 比索；墨西哥公民周日可免票，另有规定减免。'),
    arrival: tr('Dirección del museo: Francisco Leyva 100, Centro. Acceso público por Jardín Juárez, junto al zócalo.', 'Museum address: Francisco Leyva 100, Centro. Public entry is via Jardín Juárez beside the main square.', '博物馆地址为 Centro 区 Francisco Leyva 100 号；公共入口位于中央广场旁的 Jardín Juárez。'),
    duration: tr('Calcula 90–150 minutos para salas y edificio histórico.', 'Allow 90–150 minutes for the galleries and historic building.', '展厅与历史建筑建议预留 90–150 分钟。'), reference: 'https://lugares.inah.gob.mx/es/node/4249'
  },
  'catedral-cuernavaca': {
    category: tr('Catedral católica y antiguo conjunto franciscano', 'Active Catholic cathedral and former Franciscan complex', '仍在使用的天主教大教堂与方济各会建筑群'),
    hours: tr('Templo activo: el acceso turístico puede variar con misas, celebraciones y mantenimiento; comprobar con la diócesis.', 'Active church: visitor access may change for services, ceremonies or maintenance; check with the diocese.', '现役宗教场所：弥撒、庆典及维护会影响参观时间，请以教区安排为准。'),
    fee: tr('No se publica una tarifa general confirmada para entrar al templo; museos o actividades anexas pueden cobrar por separado.', 'No confirmed general ticket price is published for entry to the church; adjoining museums or activities may charge separately.', '教堂入内未查到可靠的统一门票价；相邻博物馆与特别活动可能另收费。'),
    arrival: tr('Miguel Hidalgo 17, centro histórico; a pie desde Jardín Borda o el zócalo. Respeta los accesos destinados al culto.', 'Miguel Hidalgo 17 in the historic centre; walk from Jardín Borda or the main square. Respect worship entrances.', '老城 Miguel Hidalgo 17 号；可从 Jardín Borda 或中央广场步行抵达，注意礼拜活动入口。'),
    duration: tr('Entre 20 y 45 minutos para el atrio y las áreas abiertas.', 'Allow 20–45 minutes for the atrium and accessible areas.', '庭院与开放区域可安排 20–45 分钟。'), reference: 'https://visitmexico.com/es/destino/2333/convento-de-la-asuncion'
  },
  'museo-robert-brady': {
    category: tr('Casa museo y colección artística', 'Historic house museum and art collection', '历史宅邸艺术博物馆'),
    hours: tr('Museo: martes a domingo, 10:00–18:00.', 'Museum: Tuesday–Sunday, 10:00–18:00.', '博物馆：周二至周日 10:00–18:00。'),
    fee: tr('Museo: general $70 MXN; estudiantes, docentes e INAPAM con credencial $50 MXN. Visitas guiadas con reserva, aparte.', 'Museum: MXN $70 general; MXN $50 for eligible students, teachers and INAPAM cardholders. Reserved guided tours cost extra.', '馆方公示：普通票 70 比索，符合资格的学生、教师与 INAPAM 持证人 50 比索；预约导览另收费。'),
    arrival: tr('Netzahualcóyotl 4, Centro, a pocos pasos de la catedral; conviene llegar caminando desde el casco histórico.', 'Netzahualcóyotl 4, Centro, a short walk from the cathedral; easiest to approach through the historic centre.', '老城 Netzahualcóyotl 4 号，离大教堂不远，适合在老城步行游览。'),
    duration: tr('Entre 45 y 75 minutos para apreciar habitaciones y colección.', 'Allow 45–75 minutes for the rooms and collection.', '参观宅邸与藏品建议 45–75 分钟。'), reference: 'https://museorobertbrady.com/contacto'
  },
  'museo-arte-popular-morelos': {
    category: tr('Museo de artes populares de Morelos', 'Morelos folk-art museum', '莫雷洛斯民间艺术博物馆'),
    hours: tr('Consultar la programación actual del MMAPO; las exposiciones y horarios pueden cambiar.', 'Check MMAPO’s current programme; exhibitions and visiting hours may change.', '展览与开放时间可能变化，须核对 MMAPO 当期安排。'),
    fee: tr('Las exposiciones publicadas incluyen actividades gratuitas, pero no se ha corroborado una tarifa única para todas las visitas.', 'Some listed exhibitions are free; no single admission rate for all visits has been verified.', '部分公开展览免费，但未核实所有参观项目的统一票价。'),
    arrival: tr('Hidalgo 239, centro de Cuernavaca, dentro del circuito cultural a pie próximo a la catedral.', 'Hidalgo 239 in central Cuernavaca, on the walkable cultural circuit near the cathedral.', '位于 Cuernavaca 老城 Hidalgo 239 号，可纳入大教堂周边文化步行线路。'),
    duration: tr('Deja 30–60 minutos según las exposiciones disponibles.', 'Allow 30–60 minutes depending on current exhibitions.', '依据当期展览建议 30–60 分钟。'), reference: 'https://mexicoescultura.com/index.php/recinto/66898/museo-morelense-de-arte-popular-mmapo.html'
  },
  'parque-ecologico-chapultepec': {
    category: tr('Parque estatal urbano de barranca y naturaleza', 'State urban ravine and nature park', '州立城市峡谷生态公园'),
    hours: tr('El horario y las actividades se anuncian por la administración del parque; la apertura temprana y el acceso general tienen modalidades distintas.', 'Hours and activities are posted by park management; early-morning access and general entry have different conditions.', '开放时间与活动由园方公布；晨间通行和日间普通入园条件不同。'),
    fee: tr('Gobierno de Morelos: acceso a la trotapista matutina desde febrero de 2026 por $3 MXN; la entrada general y atracciones se cobran de forma distinta.', 'Morelos government: early-morning jogging-track access is MXN $3 from February 2026; general entry and activities have separate pricing.', '州政府公告：2026 年 2 月起晨间慢跑道入场 3 比索；普通入园及游乐项目费用另计。'),
    arrival: tr('Busca “Parque Estatal Urbano Barranca de Chapultepec” en Cuernavaca, no el Chapultepec de CDMX; utiliza los accesos oficiales habilitados.', 'Navigate to “Parque Estatal Urbano Barranca de Chapultepec” in Cuernavaca, not Mexico City’s park; use the designated public entrance.', '导航选择 Cuernavaca 的 Parque Estatal Urbano Barranca de Chapultepec，勿与墨西哥城同名公园混淆，并走正式入口。'),
    duration: tr('Prepara 60–120 minutos para caminos y puntos de observación habilitados.', 'Allow 60–120 minutes for open paths and viewpoints.', '开放步道及观景区域建议 60–120 分钟。'), reference: 'https://www.morelos.gob.mx/ultimas-noticias/anuncia-secretaria-de-desarrollo-sustentable-actualizacion-en-el-costo-de-acceso-al-parque-barranca-chapultepec'
  }
};
