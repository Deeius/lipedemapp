import Icon from "../shared/Icon";

const RECIPES_ES = [
  {
    name: "Batido antiinflamatorio de cúrcuma",
    time: "5 min",
    difficulty: "Fácil",
    ingredients: ["1 taza leche vegetal", "1 cdta cúrcuma", "½ cdta jengibre rallado", "1 cdta miel cruda", "pizca de pimienta negra"],
    steps: ["Calienta la leche vegetal sin que llegue a hervir.", "Añade la cúrcuma, el jengibre y la pimienta negra. Remueve bien.", "Endulza con miel y sirve inmediatamente."],
    nutrition: { kcal: 120, protein: "2g", carbs: "18g", fat: "4g" },
    tip: "La pimienta negra aumenta la absorción de curcumina hasta un 2000%.",
    allergens: [],
  },
  {
    name: "Ensalada de salmón y aguacate",
    time: "10 min",
    difficulty: "Fácil",
    ingredients: ["150g salmón ahumado", "1 aguacate maduro", "2 puñados espinacas", "½ limón", "2 cdas AOVE", "1 cdta semillas de chía"],
    steps: ["Lava y seca las espinacas, colócalas en un bol.", "Corta el aguacate en láminas y el salmón en tiras.", "Dispón sobre las espinacas. Aliña con zumo de limón y AOVE.", "Espolvorea las semillas de chía por encima."],
    nutrition: { kcal: 380, protein: "28g", carbs: "8g", fat: "28g" },
    tip: "Omega-3 del salmón + grasas saludables del aguacate = potente sinergia antiinflamatoria.",
    allergens: ["fish"],
  },
  {
    name: "Sopa de miso con algas",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["2 cdas miso blanco", "10g alga wakame seca", "150g tofu firme", "2 cebollinos", "1L agua caliente"],
    steps: ["Hidrata el alga wakame en agua fría 5 minutos. Escurre.", "Calienta el agua sin hervir. Disuelve el miso removiendo (no hiervas el miso — destruye los probióticos).", "Añade el tofu cortado en cubos y el alga hidratada.", "Sirve con cebollino picado por encima."],
    nutrition: { kcal: 95, protein: "9g", carbs: "7g", fat: "3g" },
    tip: "Los probióticos del miso apoyan la microbiota intestinal, clave en la modulación inflamatoria.",
    allergens: ["soy"],
  },
  {
    name: "Smoothie de frutos rojos y espinacas",
    time: "5 min",
    difficulty: "Fácil",
    ingredients: ["1 taza arándanos", "½ taza fresas", "1 puñado espinacas baby", "200ml leche de avena", "1 cdta semillas de chía"],
    steps: ["Congela los frutos rojos la noche anterior para textura más cremosa.", "Pon todos los ingredientes en la batidora.", "Tritura a máxima potencia 60 segundos.", "Sirve inmediatamente."],
    nutrition: { kcal: 165, protein: "4g", carbs: "30g", fat: "3g" },
    tip: "Los antioxidantes de los arándanos (antocianinas) reducen el estrés oxidativo asociado al lipedema.",
    allergens: ["gluten"],
  },
  {
    name: "Té de jengibre y limón",
    time: "5 min",
    difficulty: "Fácil",
    ingredients: ["2cm raíz de jengibre fresco", "½ limón (zumo)", "1 cdta miel cruda", "500ml agua caliente (no hirviendo)"],
    steps: ["Pela y ralla o lamina el jengibre fresco.", "Infusiona en agua a 80–85°C durante 4 minutos.", "Cuela, añade el zumo de limón y la miel.", "Bebe caliente o deja enfriar para tomar frío."],
    nutrition: { kcal: 25, protein: "0g", carbs: "6g", fat: "0g" },
    tip: "El gingerol del jengibre inhibe las ciclooxigenasas (COX), las mismas enzimas que bloquea el ibuprofeno.",
    allergens: [],
  },
  {
    name: "Bowl de quinoa con verduras asadas",
    time: "25 min",
    difficulty: "Media",
    ingredients: ["½ taza quinoa", "1 calabacín", "1 pimiento rojo", "½ cebolla morada", "2 cdas AOVE", "romero y tomillo al gusto"],
    steps: ["Precalienta el horno a 200°C.", "Corta las verduras en dados, aliña con AOVE, romero y tomillo. Hornea 20 minutos.", "Mientras, cuece la quinoa en el doble de agua con sal (12 min).", "Monta el bowl: quinoa de base, verduras asadas encima. Añade un chorrito de limón."],
    nutrition: { kcal: 310, protein: "10g", carbs: "42g", fat: "12g" },
    tip: "La quinoa es proteína completa sin gluten; su perfil de aminoácidos favorece la reparación del tejido conectivo.",
    allergens: [],
  },
  {
    name: "Crema de brócoli y almendras",
    time: "20 min",
    difficulty: "Media",
    ingredients: ["2 tazas brócoli", "½ taza almendras crudas", "2 dientes de ajo", "750ml caldo vegetal bajo en sodio", "nuez moscada al gusto"],
    steps: ["Cuece el brócoli al vapor 8 minutos (no más, para conservar el sulforafano).", "Sofríe el ajo laminado en un poco de AOVE 1 minuto.", "Tritura el brócoli, el ajo, las almendras y el caldo hasta textura suave.", "Calienta suavemente, sirve con nuez moscada rallada."],
    nutrition: { kcal: 220, protein: "9g", carbs: "16g", fat: "14g" },
    tip: "El sulforafano del brócoli (mayor concentración si no se supera 70°C al cocinar) activa el factor Nrf2, regulador maestro de la respuesta antioxidante.",
    allergens: ["nuts"],
  },
  {
    name: "Gazpacho antiinflamatorio",
    time: "10 min",
    difficulty: "Fácil",
    ingredients: ["4 tomates maduros", "½ pepino", "1 diente de ajo", "2 cdas AOVE", "1 cda vinagre de manzana", "sal y pimienta al gusto"],
    steps: ["Lava y trocea los tomates y el pepino.", "Tritura todo junto con el ajo, el AOVE y el vinagre hasta obtener una textura suave.", "Sazona con sal y pimienta. Refrigera al menos 30 minutos.", "Sirve frío con un hilo de AOVE por encima."],
    nutrition: { kcal: 110, protein: "2g", carbs: "12g", fat: "6g" },
    tip: "El licopeno del tomate es un potente antioxidante que se absorbe mejor con grasas saludables como el AOVE.",
    allergens: ["nightshades"],
  },
  {
    name: "Ensalada de lentejas y cúrcuma",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["1 taza lentejas cocidas", "1 zanahoria rallada", "½ pepino en cubos", "perejil fresco", "2 cdas AOVE", "1 cdta cúrcuma", "zumo de ½ limón"],
    steps: ["Mezcla las lentejas cocidas con la zanahoria y el pepino.", "Aliña con AOVE, cúrcuma y zumo de limón.", "Añade el perejil picado y mezcla bien.", "Sirve a temperatura ambiente o fría."],
    nutrition: { kcal: 250, protein: "14g", carbs: "32g", fat: "7g" },
    tip: "Las lentejas aportan hierro y fibra, y la cúrcuma potencia su efecto antiinflamatorio.",
    allergens: [],
  },
  {
    name: "Arroz integral con verduras al vapor",
    time: "30 min",
    difficulty: "Fácil",
    ingredients: ["1 taza arroz integral", "1 taza brócoli", "1 zanahoria", "½ calabacín", "1 cda AOVE", "sal y hierbas al gusto"],
    steps: ["Cuece el arroz integral según las instrucciones del paquete.", "Corta las verduras y cocínalas al vapor 8-10 minutos.", "Sirve el arroz con las verduras al vapor por encima.", "Aliña con AOVE y hierbas al gusto."],
    nutrition: { kcal: 290, protein: "7g", carbs: "52g", fat: "5g" },
    tip: "El arroz integral conserva la fibra y los minerales que el arroz blanco pierde en el refinado.",
    allergens: [],
  },
  {
    name: "Caldo de huesos con jengibre",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["500ml caldo de huesos casero o ecológico", "2cm jengibre fresco", "1 diente de ajo", "1 cda cúrcuma", "sal al gusto"],
    steps: ["Calienta el caldo de huesos a fuego medio.", "Ralla el jengibre y el ajo, añádelos al caldo.", "Agrega la cúrcuma y remueve bien.", "Deja infusionar 10 minutos a fuego bajo. Cuela y sirve caliente."],
    nutrition: { kcal: 60, protein: "6g", carbs: "2g", fat: "3g" },
    tip: "El caldo de huesos es rico en colágeno y glicina, nutrientes clave para el tejido conectivo afectado en lipedema.",
    allergens: [],
  },
  {
    name: "Ensalada de pepino, menta y limón",
    time: "5 min",
    difficulty: "Fácil",
    ingredients: ["2 pepinos", "hojas de menta fresca", "zumo de 1 limón", "2 cdas AOVE", "sal y pimienta al gusto"],
    steps: ["Corta los pepinos en rodajas finas.", "Pica las hojas de menta.", "Aliña con zumo de limón, AOVE, sal y pimienta.", "Mezcla bien y sirve fresca."],
    nutrition: { kcal: 80, protein: "1g", carbs: "6g", fat: "6g" },
    tip: "El pepino es altamente hidratante y la menta favorece la digestión y reduce la hinchazón.",
    allergens: [],
  },
  {
    name: "Batata asada con tahini y semillas",
    time: "35 min",
    difficulty: "Fácil",
    ingredients: ["2 batatas medianas", "2 cdas tahini", "1 cda semillas de calabaza", "1 cda semillas de girasol", "AOVE", "sal y pimentón"],
    steps: ["Precalienta el horno a 200°C.", "Corta las batatas por la mitad, pincela con AOVE y sazona.", "Hornea 30 minutos hasta que estén tiernas.", "Sirve con tahini por encima y espolvorea las semillas."],
    nutrition: { kcal: 280, protein: "6g", carbs: "38g", fat: "12g" },
    tip: "La batata es rica en betacaroteno, un antioxidante que protege las células del daño oxidativo.",
    allergens: ["sesame"],
  },
  {
    name: "Sopa de calabaza y jengibre",
    time: "25 min",
    difficulty: "Fácil",
    ingredients: ["500g calabaza pelada", "2cm jengibre fresco", "1 cebolla", "750ml caldo vegetal", "1 cda AOVE", "nuez moscada"],
    steps: ["Sofríe la cebolla picada en AOVE hasta que esté transparente.", "Añade la calabaza en cubos y el jengibre rallado. Cocina 3 minutos.", "Agrega el caldo y cuece 20 minutos hasta que la calabaza esté tierna.", "Tritura hasta obtener una crema suave. Sirve con nuez moscada rallada."],
    nutrition: { kcal: 140, protein: "3g", carbs: "22g", fat: "5g" },
    tip: "La calabaza es rica en potasio, que ayuda a regular la retención de líquidos asociada al lipedema.",
    allergens: [],
  },
  {
    name: "Agua de pepino, limón y hierbabuena",
    time: "5 min",
    difficulty: "Fácil",
    ingredients: ["1 pepino en rodajas", "1 limón en rodajas", "ramitas de hierbabuena", "1L agua fría"],
    steps: ["Coloca las rodajas de pepino y limón en una jarra.", "Añade las ramitas de hierbabuena.", "Vierte el agua fría y deja reposar en la nevera al menos 1 hora.", "Sirve bien fría."],
    nutrition: { kcal: 10, protein: "0g", carbs: "2g", fat: "0g" },
    tip: "Mantenerse hidratada es esencial en lipedema: el agua aromatizada ayuda a alcanzar los 2L diarios recomendados.",
    allergens: [],
  },
];

const RECIPES_EN = [
  {
    name: "Anti-inflammatory turmeric smoothie",
    time: "5 min",
    difficulty: "Easy",
    ingredients: ["1 cup plant milk", "1 tsp turmeric", "½ tsp fresh grated ginger", "1 tsp raw honey", "pinch black pepper"],
    steps: ["Warm the plant milk without boiling.", "Add turmeric, ginger and black pepper. Stir well.", "Sweeten with honey and serve immediately."],
    nutrition: { kcal: 120, protein: "2g", carbs: "18g", fat: "4g" },
    tip: "Black pepper increases curcumin absorption by up to 2000% through piperine.",
    allergens: [],
  },
  {
    name: "Salmon & avocado salad",
    time: "10 min",
    difficulty: "Easy",
    ingredients: ["150g smoked salmon", "1 ripe avocado", "2 handfuls spinach", "½ lemon", "2 tbsp olive oil", "1 tsp chia seeds"],
    steps: ["Wash and dry the spinach, place in a bowl.", "Slice the avocado and cut salmon into strips.", "Arrange over the spinach. Dress with lemon juice and olive oil.", "Sprinkle chia seeds on top."],
    nutrition: { kcal: 380, protein: "28g", carbs: "8g", fat: "28g" },
    tip: "Salmon omega-3 + avocado healthy fats create a powerful anti-inflammatory synergy.",
    allergens: ["fish"],
  },
  {
    name: "Miso soup with seaweed",
    time: "15 min",
    difficulty: "Easy",
    ingredients: ["2 tbsp white miso", "10g dried wakame seaweed", "150g firm tofu", "2 spring onions", "1L hot water"],
    steps: ["Rehydrate wakame in cold water for 5 minutes. Drain.", "Heat water to just below boiling. Dissolve miso by stirring (do not boil — destroys probiotics).", "Add tofu cut into cubes and the rehydrated seaweed.", "Serve with sliced spring onions on top."],
    nutrition: { kcal: 95, protein: "9g", carbs: "7g", fat: "3g" },
    tip: "Miso probiotics support the gut microbiome, a key regulator of the inflammatory response.",
    allergens: ["soy"],
  },
  {
    name: "Red berry & spinach smoothie",
    time: "5 min",
    difficulty: "Easy",
    ingredients: ["1 cup blueberries", "½ cup strawberries", "1 handful baby spinach", "200ml oat milk", "1 tsp chia seeds"],
    steps: ["Freeze the berries the night before for creamier texture.", "Put all ingredients in the blender.", "Blend at full speed for 60 seconds.", "Serve immediately."],
    nutrition: { kcal: 165, protein: "4g", carbs: "30g", fat: "3g" },
    tip: "Blueberry anthocyanins reduce the oxidative stress associated with lipedema tissue.",
    allergens: ["gluten"],
  },
  {
    name: "Ginger & lemon tea",
    time: "5 min",
    difficulty: "Easy",
    ingredients: ["2cm fresh ginger root", "½ lemon (juice)", "1 tsp raw honey", "500ml hot water (not boiling)"],
    steps: ["Peel and grate or slice the fresh ginger.", "Steep in water at 80–85°C for 4 minutes.", "Strain, add lemon juice and honey.", "Drink warm or leave to cool and serve cold."],
    nutrition: { kcal: 25, protein: "0g", carbs: "6g", fat: "0g" },
    tip: "Gingerol inhibits cyclooxygenases (COX) — the same enzymes blocked by ibuprofen.",
    allergens: [],
  },
  {
    name: "Quinoa bowl with roasted vegetables",
    time: "25 min",
    difficulty: "Medium",
    ingredients: ["½ cup quinoa", "1 courgette", "1 red pepper", "½ red onion", "2 tbsp olive oil", "rosemary and thyme to taste"],
    steps: ["Preheat oven to 200°C / 400°F.", "Dice the vegetables, toss with olive oil, rosemary and thyme. Roast 20 minutes.", "Meanwhile, cook quinoa in double the water with a pinch of salt (12 min).", "Build the bowl: quinoa base, roasted vegetables on top. Finish with a squeeze of lemon."],
    nutrition: { kcal: 310, protein: "10g", carbs: "42g", fat: "12g" },
    tip: "Quinoa is a gluten-free complete protein; its amino acid profile supports connective tissue repair.",
    allergens: [],
  },
  {
    name: "Broccoli & almond cream soup",
    time: "20 min",
    difficulty: "Medium",
    ingredients: ["2 cups broccoli", "½ cup raw almonds", "2 garlic cloves", "750ml low-sodium vegetable stock", "nutmeg to taste"],
    steps: ["Steam broccoli for 8 minutes (not more, to preserve sulforaphane).", "Sauté sliced garlic in a little olive oil for 1 minute.", "Blend broccoli, garlic, almonds and stock until smooth.", "Gently reheat and serve with freshly grated nutmeg."],
    nutrition: { kcal: 220, protein: "9g", carbs: "16g", fat: "14g" },
    tip: "Broccoli sulforaphane (highest when not cooked above 70°C) activates Nrf2, the master antioxidant regulator.",
    allergens: ["nuts"],
  },
  {
    name: "Anti-inflammatory gazpacho",
    time: "10 min",
    difficulty: "Easy",
    ingredients: ["4 ripe tomatoes", "½ cucumber", "1 garlic clove", "2 tbsp olive oil", "1 tbsp apple cider vinegar", "salt and pepper to taste"],
    steps: ["Wash and chop the tomatoes and cucumber.", "Blend everything with garlic, olive oil and vinegar until smooth.", "Season with salt and pepper. Refrigerate for at least 30 minutes.", "Serve cold with a drizzle of olive oil on top."],
    nutrition: { kcal: 110, protein: "2g", carbs: "12g", fat: "6g" },
    tip: "Tomato lycopene is a powerful antioxidant that is better absorbed with healthy fats like olive oil.",
    allergens: ["nightshades"],
  },
  {
    name: "Turmeric lentil salad",
    time: "20 min",
    difficulty: "Easy",
    ingredients: ["1 cup cooked lentils", "1 grated carrot", "½ diced cucumber", "fresh parsley", "2 tbsp olive oil", "1 tsp turmeric", "juice of ½ lemon"],
    steps: ["Mix the cooked lentils with carrot and cucumber.", "Dress with olive oil, turmeric and lemon juice.", "Add chopped parsley and mix well.", "Serve at room temperature or chilled."],
    nutrition: { kcal: 250, protein: "14g", carbs: "32g", fat: "7g" },
    tip: "Lentils provide iron and fibre, and turmeric enhances their anti-inflammatory effect.",
    allergens: [],
  },
  {
    name: "Brown rice with steamed vegetables",
    time: "30 min",
    difficulty: "Easy",
    ingredients: ["1 cup brown rice", "1 cup broccoli", "1 carrot", "½ courgette", "1 tbsp olive oil", "salt and herbs to taste"],
    steps: ["Cook brown rice according to package instructions.", "Chop the vegetables and steam for 8–10 minutes.", "Serve the rice topped with the steamed vegetables.", "Drizzle with olive oil and season with herbs."],
    nutrition: { kcal: 290, protein: "7g", carbs: "52g", fat: "5g" },
    tip: "Brown rice retains the fibre and minerals that white rice loses during processing.",
    allergens: [],
  },
  {
    name: "Ginger bone broth",
    time: "15 min",
    difficulty: "Easy",
    ingredients: ["500ml bone broth (homemade or organic)", "2cm fresh ginger", "1 garlic clove", "1 tsp turmeric", "salt to taste"],
    steps: ["Heat the bone broth over medium heat.", "Grate the ginger and garlic, add to the broth.", "Stir in the turmeric.", "Simmer on low for 10 minutes. Strain and serve hot."],
    nutrition: { kcal: 60, protein: "6g", carbs: "2g", fat: "3g" },
    tip: "Bone broth is rich in collagen and glycine — key nutrients for the connective tissue affected in lipedema.",
    allergens: [],
  },
  {
    name: "Cucumber, mint & lemon salad",
    time: "5 min",
    difficulty: "Easy",
    ingredients: ["2 cucumbers", "fresh mint leaves", "juice of 1 lemon", "2 tbsp olive oil", "salt and pepper to taste"],
    steps: ["Slice the cucumbers thinly.", "Chop the mint leaves.", "Dress with lemon juice, olive oil, salt and pepper.", "Toss well and serve fresh."],
    nutrition: { kcal: 80, protein: "1g", carbs: "6g", fat: "6g" },
    tip: "Cucumber is highly hydrating and mint aids digestion and reduces bloating.",
    allergens: [],
  },
  {
    name: "Roasted sweet potato with tahini & seeds",
    time: "35 min",
    difficulty: "Easy",
    ingredients: ["2 medium sweet potatoes", "2 tbsp tahini", "1 tbsp pumpkin seeds", "1 tbsp sunflower seeds", "olive oil", "salt and paprika"],
    steps: ["Preheat oven to 200°C / 400°F.", "Halve the sweet potatoes, brush with olive oil and season.", "Roast for 30 minutes until tender.", "Drizzle with tahini and sprinkle seeds on top."],
    nutrition: { kcal: 280, protein: "6g", carbs: "38g", fat: "12g" },
    tip: "Sweet potato is rich in beta-carotene, an antioxidant that protects cells from oxidative damage.",
    allergens: ["sesame"],
  },
  {
    name: "Pumpkin & ginger soup",
    time: "25 min",
    difficulty: "Easy",
    ingredients: ["500g peeled pumpkin", "2cm fresh ginger", "1 onion", "750ml vegetable stock", "1 tbsp olive oil", "nutmeg"],
    steps: ["Sauté the diced onion in olive oil until translucent.", "Add the cubed pumpkin and grated ginger. Cook for 3 minutes.", "Pour in the stock and simmer 20 minutes until the pumpkin is tender.", "Blend until smooth. Serve with freshly grated nutmeg."],
    nutrition: { kcal: 140, protein: "3g", carbs: "22g", fat: "5g" },
    tip: "Pumpkin is rich in potassium, which helps regulate fluid retention associated with lipedema.",
    allergens: [],
  },
  {
    name: "Cucumber, lemon & mint infusion",
    time: "5 min",
    difficulty: "Easy",
    ingredients: ["1 sliced cucumber", "1 sliced lemon", "sprigs of fresh mint", "1L cold water"],
    steps: ["Place cucumber and lemon slices in a pitcher.", "Add the mint sprigs.", "Pour in cold water and refrigerate for at least 1 hour.", "Serve well chilled."],
    nutrition: { kcal: 10, protein: "0g", carbs: "2g", fat: "0g" },
    tip: "Staying hydrated is essential with lipedema: infused water helps reach the recommended 2L daily intake.",
    allergens: [],
  },
];

export default function DailyRecipe({ profile, lang, C, recipeExpanded, setRecipeExpanded }) {
  const recipes = lang === "es" ? RECIPES_ES : RECIPES_EN;
  const userAllergens = profile.intolerances || [];
  const safeRecipes = recipes.filter((r) => !r.allergens?.some((a) => userAllergens.includes(a)));
  const pool = safeRecipes.length > 0 ? safeRecipes : recipes;
  const recipe = pool[new Date().getDate() % pool.length];

  const diffColor =
    recipe.difficulty === "Fácil" || recipe.difficulty === "Easy" ? C.sage : C.accent;

  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: 14,
        marginBottom: 8,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Header — always visible */}
      <div
        onClick={() => setRecipeExpanded((o) => !o)}
        style={{ padding: "16px 18px", cursor: "pointer", userSelect: "none" }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: C.sage,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
            marginBottom: 8,
          }}
        >
          <Icon name="leaf" size={12} color={C.sage} />{" "}
          {lang === "es" ? "Receta antiinflamatoria del día" : "Anti-inflammatory recipe of the day"}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div
            style={{ fontSize: 14, fontWeight: 800, color: C.cream, letterSpacing: "-0.3px", flex: 1 }}
          >
            {recipe.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end", flexShrink: 0 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.creamMuted,
                background: C.creamFaint,
                padding: "3px 8px",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Icon name="clock" size={11} color={C.creamMuted} /> {recipe.time}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: diffColor,
                background: `${diffColor}15`,
                padding: "2px 7px",
                borderRadius: 20,
              }}
            >
              {recipe.difficulty}
            </div>
          </div>
        </div>

        {/* Nutrition */}
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          {Object.entries(recipe.nutrition).map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.cream }}>{v}</div>
              <div style={{ fontSize: 9, color: C.creamMuted, textTransform: "uppercase" }}>
                {k === "kcal" ? "kcal" : k === "protein" ? "prot" : k === "carbs" ? (lang === "es" ? "hidr" : "carbs") : "fat"}
              </div>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {recipe.ingredients.map((ing, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                background: C.creamFaint,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "3px 9px",
                color: C.cream,
              }}
            >
              {ing}
            </span>
          ))}
        </div>

        {/* Expand hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            marginTop: 10,
            fontSize: 11,
            color: C.creamMuted,
          }}
        >
          <span>
            {recipeExpanded
              ? lang === "es" ? "Ocultar preparación" : "Hide preparation"
              : lang === "es" ? "Ver preparación paso a paso" : "View step-by-step"}
          </span>
          <span
            style={{
              transition: "transform 0.2s",
              display: "inline-block",
              transform: recipeExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▾
          </span>
        </div>
      </div>

      {/* Expandable: steps + tip */}
      {recipeExpanded && (
        <div
          style={{ borderTop: `1px solid ${C.border}`, padding: "16px 18px", background: C.bg }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: C.creamMuted,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 10,
            }}
          >
            {lang === "es" ? "Preparación" : "Preparation"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            {recipe.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: C.sage,
                    color: "white",
                    fontSize: 11,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 13, color: C.cream, lineHeight: 1.6, paddingTop: 2 }}>
                  {step}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.sage,
              lineHeight: 1.6,
              padding: "10px 12px",
              background: `${C.sage}0d`,
              borderRadius: 8,
              borderLeft: `3px solid ${C.sage}`,
            }}
          >
            <span style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
              <Icon name="lightbulb" size={13} color={C.sage} />
              {recipe.tip}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
