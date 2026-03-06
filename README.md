# 🌿 Lipedema Tracker — v2.4

Aplicación de seguimiento de salud personalizada para mujeres con lipedema. Bilingüe (ES/EN), responsive, con onboarding guiado y navegación adaptativa.

---

## ✨ Funcionalidades

### Onboarding y perfil
- **Guía visual de bienvenida** (4 secciones): qué es el lipedema, tipos, estadios y síntomas — con ilustraciones SVG anatómicas
- **Onboarding en 6 pasos**: nombre, idioma, ubicación (detección automática o manual), estadio, uso de compresión y tipo de jornada laboral
- **Perfil completo**: nombre, estadio, fecha de diagnóstico, país, provincia, zonas activas, compresión y jornada

### Registro diario
- Peso, estado emocional (emojis), energía, dolor
- **Inflamación por zonas**: barras visuales 0–5 por zona corporal activa
- **Medidas corporales**: seguimiento en cm por zona
- **Suplementos del día**: marcar los tomados con un toque
- **Ciclo menstrual**: calendario mensual interactivo para marcar día a día menstruación (🩸), síntomas premenstruales / SPM (🟡) y mayor retención o hinchazón (💧) — incluye resumen automático del ciclo actual (fecha de último inicio, duración en días, total de días marcados). Los datos se guardan de forma independiente al registro diario y persisten entre sesiones.

### Módulos independientes
- **Historial**: vista cronológica completa con iconos de suplementos tomados
- **Gráficas**: evolución de peso, dolor vs energía, radar de inflamación por zonas, reacciones alimentarias
- **Alimentos**: registro de reacciones (bien / mal / neutro) por categoría, con notas
- **Suplementos**: 15 opciones predefinidas + personalizados, con dosis, fecha de inicio y efecto percibido
- **Centros especializados**: directorio de clínicas y especialistas filtrado por ubicación del perfil (en construcción)
- **Información**: artículos científicos, guías clínicas y recursos verificados, filtrables por categoría

### Navegación y UI
- **Sidebar** en escritorio (≥768px) agrupada en secciones: Seguimiento / Salud / Recursos / Cuenta
- **Bottom nav + drawer** en móvil con iconos Lucide SVG
- Paleta claro sage: fondo `#f0f5f2`, tarjetas blanco, texto verde oscuro — cumple WCAG AA
- Bilingüe ES/EN con cambio en tiempo real
- Persistencia completa en `localStorage` (sin cuenta, sin servidor)

---

## 🚀 Despliegue

### Opción A — GitHub + Vercel (recomendado)

1. Sube el proyecto a un repositorio GitHub
2. Ve a [vercel.com](https://vercel.com) → **Add New Project**
3. Selecciona el repositorio — Vercel detectará Vite automáticamente
4. Pulsa **Deploy**

> Si ves una versión antigua tras redesplegar, ve a Deployments → **Redeploy** para forzar una build limpia.

### Opción B — Vercel CLI

```bash
npm install -g vercel
cd lipedema-tracker
npm install
vercel
```

### Opción C — Desarrollo local

```bash
cd lipedema-tracker
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## 🗂 Estructura del proyecto

```
lipedema-tracker/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json          ← cabeceras de caché configuradas
└── src/
    ├── main.jsx
    ├── WelcomeGuide.jsx  ← guía visual de bienvenida (4 secciones)
    ├── Onboarding.jsx    ← onboarding en 6 pasos
    └── App.jsx           ← app principal (~1800 líneas)
```

---

## 📋 Suplementos incluidos

| Suplemento | Uso principal |
|---|---|
| Omega-3 | Antiinflamatorio |
| Vitamina D3 | Inmunidad y huesos |
| Magnesio | Calambres y sueño |
| Vitamina C | Colágeno y antioxidante |
| Rutina / Diosmina | Circulación y sistema linfático |
| Quercetina | Flavonoide antiinflamatorio |
| Selenio | Tiroides y antioxidante |
| Zinc | Inmunidad y piel |
| Probióticos | Microbiota intestinal |
| Cúrcuma / Curcumina | Antiinflamatorio potente |
| Coenzima Q10 | Energía celular |
| Hierro + B12 | Anemia y fatiga |
| Colágeno | Piel y tejido conjuntivo |
| Berberina | Glucosa e inflamación |
| Drenaje linfático | Hierbas linfáticas |
| + Personalizados | Los que añadas tú |

---

## 🔒 Privacidad

Todos los datos se guardan únicamente en el navegador (`localStorage`). No se envía ningún dato a servidores externos. La detección de ubicación usa la API de geolocalización del navegador + Nominatim (OpenStreetMap) solo en el momento del onboarding, sin almacenar coordenadas.

---

## 🛣 Próximas funcionalidades

- [ ] Login social con Google (Firebase Auth)
- [ ] Sincronización de datos entre dispositivos
- [ ] Directorio de centros especializados verificados por provincia
- [ ] Exportación de datos a PDF / CSV
- [ ] Notificaciones de registro diario
