/* =====================================================================
   PROJECT DATA  —  edit this file to add / change projects.
   Every project card on the home page and the details page
   (project.html?id=...) is built from this list.

   - id      : short unique name, used in the link (no spaces)
   - cat     : "gov" (Government) or "pvt" (Private)
   - status  : "done" (Completed) or "ongoing"
   - start / end : "YYYY-MM-DD"  (end can be "" for ongoing work)
   - images  : first image is the cover photo
   NOTE: all photos, dates and details below are DUMMY placeholders.
   ===================================================================== */

const U = (id, w = 1400) => `https://images.unsplash.com/${id}?w=${w}&q=72&auto=format&fit=crop`;

const PROJECTS = [
  {
    id: "police-station-dhola",
    cat: "gov",
    status: "done",
    start: "2022-06-15",
    end: "2023-08-30",
    images: [
      "photo-1487958449943-2429e8be8625",
      "photo-1541888946425-d81bb19240f5",
      "photo-1504307651254-35680f356dfd",
      "photo-1621905251189-08b45d6a269e",
      "photo-1503387762-592deb58ef4e"
    ],
    title:    { en: "Police Station, Dhola", gu: "પોલીસ સ્ટેશન, ધોળા" },
    location: { en: "Dhola, Ta. Umrala, Dist. Bhavnagar", gu: "ધોળા, તા. ઉમરાળા, જિ. ભાવનગર" },
    client:   { en: "Government of Gujarat", gu: "ગુજરાત સરકાર" },
    desc: {
      en: "Construction of a new police station building at Dhola, executed through a government tender. The work covered the complete civil structure — foundation, RCC frame, masonry, plaster, flooring, doors-windows, electrical and plumbing — as per the approved drawings and government specifications.",
      gu: "સરકારી ટેન્ડર દ્વારા ધોળા ખાતે નવા પોલીસ સ્ટેશન બિલ્ડીંગનું બાંધકામ. આ કામમાં પાયો, RCC ફ્રેમ, ચણતર, પ્લાસ્ટર, ફ્લોરિંગ, બારી-દરવાજા, ઇલેક્ટ્રિક અને પ્લમ્બિંગ સહિતનું સંપૂર્ણ સિવિલ કામ મંજૂર ડ્રોઇંગ અને સરકારી ધોરણ મુજબ કરવામાં આવ્યું."
    },
    scope: [
      { en: "Foundation & RCC frame structure", gu: "પાયો અને RCC ફ્રેમ સ્ટ્રક્ચર" },
      { en: "Brick masonry & plaster", gu: "ઈંટનું ચણતર અને પ્લાસ્ટર" },
      { en: "Flooring, doors & windows", gu: "ફ્લોરિંગ, બારી અને દરવાજા" },
      { en: "Electrical & plumbing work", gu: "ઇલેક્ટ્રિક અને પ્લમ્બિંગ કામ" },
      { en: "Painting & final finishing", gu: "કલર કામ અને ફાઇનલ ફિનિશિંગ" }
    ]
  },
  {
    id: "gram-panchayat-dhola",
    cat: "gov",
    status: "done",
    start: "2021-01-10",
    end: "2021-12-20",
    images: [
      "photo-1504307651254-35680f356dfd",
      "photo-1429497419816-9ca5cfb4571a",
      "photo-1581094794329-c8112a89af12",
      "photo-1574359411659-15573a27fd0c"
    ],
    title:    { en: "Gram Panchayat Bhavan, Dhola", gu: "ગ્રામ પંચાયત ભવન, ધોળા" },
    location: { en: "Dhola, Ta. Umrala, Dist. Bhavnagar", gu: "ધોળા, તા. ઉમરાળા, જિ. ભાવનગર" },
    client:   { en: "Gram Panchayat, Dhola", gu: "ગ્રામ પંચાયત, ધોળા" },
    desc: {
      en: "New Gram Panchayat office building for Dhola village with office rooms, meeting hall and record room. Built under a government scheme with focus on durability and low maintenance.",
      gu: "ધોળા ગામ માટે ઓફિસ રૂમ, મીટિંગ હોલ અને રેકોર્ડ રૂમ સાથેનું નવું ગ્રામ પંચાયત ભવન. સરકારી યોજના હેઠળ, મજબૂતી અને ઓછા મેન્ટેનન્સને ધ્યાનમાં રાખીને બાંધકામ."
    },
    scope: [
      { en: "Site levelling & foundation", gu: "જમીન સમતળ અને પાયો" },
      { en: "RCC structure & slab", gu: "RCC સ્ટ્રક્ચર અને સ્લેબ" },
      { en: "Office rooms & meeting hall", gu: "ઓફિસ રૂમ અને મીટિંગ હોલ" },
      { en: "Compound wall & gate", gu: "કમ્પાઉન્ડ વોલ અને ગેટ" }
    ]
  },
  {
    id: "government-school-dhola",
    cat: "gov",
    status: "done",
    start: "2023-03-01",
    end: "2024-02-15",
    images: [
      "photo-1503387762-592deb58ef4e",
      "photo-1517581177682-a085bb7ffb15",
      "photo-1503708928676-1cb796a0891e",
      "photo-1523217582562-09d0def993a6"
    ],
    title:    { en: "Government School, Dhola", gu: "સરકારી શાળા, ધોળા" },
    location: { en: "Dhola, Ta. Umrala, Dist. Bhavnagar", gu: "ધોળા, તા. ઉમરાળા, જિ. ભાવનગર" },
    client:   { en: "Education Department, Govt. of Gujarat", gu: "શિક્ષણ વિભાગ, ગુજરાત સરકાર" },
    desc: {
      en: "Construction of new classrooms and toilet block for the government primary school, with ramps for accessibility and a safe, well-ventilated design for students.",
      gu: "સરકારી પ્રાથમિક શાળા માટે નવા વર્ગખંડો અને ટોઇલેટ બ્લોકનું બાંધકામ — રેમ્પ સાથે, અને વિદ્યાર્થીઓ માટે સલામત અને હવા-ઉજાસવાળી ડિઝાઇન."
    },
    scope: [
      { en: "New classrooms", gu: "નવા વર્ગખંડો" },
      { en: "Toilet block", gu: "ટોઇલેટ બ્લોક" },
      { en: "Ramp & verandah", gu: "રેમ્પ અને ઓસરી" },
      { en: "Painting & finishing", gu: "કલર કામ અને ફિનિશિંગ" }
    ]
  },
  {
    id: "bungalow-umrala",
    cat: "pvt",
    status: "done",
    start: "2023-09-05",
    end: "2024-06-25",
    images: [
      "photo-1564013799919-ab600027ffc6",
      "photo-1600585154340-be6161a56a0c",
      "photo-1600607687939-ce8a6c25118c",
      "photo-1568605114967-8130f3a36994"
    ],
    title:    { en: "Residential Bungalow, Umrala", gu: "રહેણાંક બંગલો, ઉમરાળા" },
    location: { en: "Umrala, Dist. Bhavnagar", gu: "ઉમરાળા, જિ. ભાવનગર" },
    client:   { en: "Private Client", gu: "ખાનગી ગ્રાહક" },
    desc: {
      en: "A modern G+1 family bungalow — complete planning, elevation design, estimate and construction handled by TM Construction, from the first drawing to key handover.",
      gu: "આધુનિક G+1 કૌટુંબિક બંગલો — પ્લાનિંગ, એલિવેશન ડિઝાઇન, એસ્ટીમેટ અને બાંધકામ, પહેલા ડ્રોઇંગથી ચાવી સોંપણી સુધી બધું TM કન્સ્ટ્રક્શન દ્વારા."
    },
    scope: [
      { en: "Planning & elevation design", gu: "પ્લાનિંગ અને એલિવેશન ડિઝાઇન" },
      { en: "Estimate & material planning", gu: "એસ્ટીમેટ અને મટીરીયલ પ્લાનિંગ" },
      { en: "Complete construction", gu: "સંપૂર્ણ બાંધકામ" },
      { en: "Finishing & handover", gu: "ફિનિશિંગ અને સોંપણી" }
    ]
  },
  {
    id: "shop-complex-bhavnagar",
    cat: "pvt",
    status: "ongoing",
    start: "2025-07-01",
    end: "",
    images: [
      "photo-1531834685032-c34bf0d84c77",
      "photo-1486406146926-c627a92ad1ab",
      "photo-1574359411659-15573a27fd0c",
      "photo-1595846519845-68e298c2edd8"
    ],
    title:    { en: "Shop Complex, Bhavnagar", gu: "દુકાન કોમ્પ્લેક્સ, ભાવનગર" },
    location: { en: "Bhavnagar", gu: "ભાવનગર" },
    client:   { en: "Private Client", gu: "ખાનગી ગ્રાહક" },
    desc: {
      en: "A ground-floor shopping complex with RCC frame structure, designed for strength and easy future expansion. Work is currently in progress.",
      gu: "RCC ફ્રેમ સ્ટ્રક્ચર સાથેનું ગ્રાઉન્ડ ફ્લોર દુકાન કોમ્પ્લેક્સ — મજબૂતી અને ભવિષ્યમાં સરળ વિસ્તરણ માટે ડિઝાઇન. કામ હાલમાં ચાલુ છે."
    },
    scope: [
      { en: "Structural design", gu: "સ્ટ્રક્ચરલ ડિઝાઇન" },
      { en: "RCC frame & slab", gu: "RCC ફ્રેમ અને સ્લેબ" },
      { en: "Shop shutters & finishing", gu: "દુકાનના શટર અને ફિનિશિંગ" }
    ]
  },
  {
    id: "residence-amreli",
    cat: "pvt",
    status: "done",
    start: "2022-11-10",
    end: "2023-07-05",
    images: [
      "photo-1580587771525-78b9dba3b914",
      "photo-1568605114967-8130f3a36994",
      "photo-1600607687939-ce8a6c25118c",
      "photo-1595846519845-68e298c2edd8"
    ],
    title:    { en: "Residence, Amreli", gu: "રહેઠાણ, અમરેલી" },
    location: { en: "Amreli", gu: "અમરેલી" },
    client:   { en: "Private Client", gu: "ખાનગી ગ્રાહક" },
    desc: {
      en: "A single-storey family residence with practical planning, good natural light and quality finishing, completed on schedule.",
      gu: "વ્યવહારુ પ્લાનિંગ, સારા કુદરતી પ્રકાશ અને ગુણવત્તાયુક્ત ફિનિશિંગ સાથેનું એક માળનું રહેઠાણ — સમયસર પૂરું."
    },
    scope: [
      { en: "House planning", gu: "ઘરનું પ્લાનિંગ" },
      { en: "Construction", gu: "બાંધકામ" },
      { en: "Tiles, plaster & painting", gu: "ટાઇલ્સ, પ્લાસ્ટર અને કલર કામ" }
    ]
  }
].map(p => ({ ...p, images: p.images.map(id => ({ full: U(id, 1600), thumb: U(id, 400), card: U(id, 800) })) }));
