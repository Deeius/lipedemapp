# CLAUDE.md — Lipedemapp

## Descripción del Proyecto

Aplicación web de seguimiento de salud para mujeres con lipedema. Permite registrar peso, dolor, energía, estado emocional, inflamación por zonas, suplementos, ciclo menstrual y alimentos. Funciona offline (localStorage) con sincronización opcional a Supabase vía Google OAuth.

- **Stack**: React 18.2 + Vite 5 + Supabase + Recharts
- **Despliegue**: Vercel
- **Versión actual**: 1.0.37
- **Idiomas**: Español / Inglés (bilingüe con ternarios `lang === "es"`)

---

## Estructura del Proyecto

```
src/
├── App.jsx                  # Componente principal (~2700 líneas, gestiona estado global)
├── Onboarding.jsx           # Flujo de onboarding (6 pasos)
├── WelcomeGuide.jsx         # Guía de bienvenida
├── main.jsx                 # Punto de entrada
├── components/
│   ├── home/                # HomeTab, HealthSummary, CycleSummary, SupplementsSummary, DailyRecipe, DailyPhrase, QuickLinks, Treatments
│   ├── today/               # TodayTab, SupplementsCheck, CycleCalendar, PillTracker, InflammationTracker, WaterTracker
│   ├── history/             # HistoryTab, LogEntry
│   ├── foods/               # FoodsTab, AddFoodForm, FoodsList
│   ├── info/                # InfoTab, SuggestionsTab, CentersSection, AdminTab, CommunityForum, ResourceItem
│   ├── profile/             # ProfileTab
│   └── shared/              # Icon (componente SVG reutilizable)
├── hooks/
│   └── useAuth.js           # Hook de autenticación Supabase
└── lib/
    ├── db.js                # Funciones CRUD para Supabase
    └── supabase.js          # Cliente Supabase (env vars)
```

---

## Comandos

```bash
npm run dev            # Servidor de desarrollo (localhost:5173)
npm run build          # Build de producción (dist/)
npm run preview        # Preview del build
npm run lint           # ESLint
npm run format         # Prettier (auto-fix)
npm run format:check   # Verificar formato (usado en CI)
npm run release        # standard-version (bump + changelog + tag)
```

---

## Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase → `HomeTab.jsx`, `AddFoodForm.jsx`
- **Funciones/variables**: camelCase → `getProfile()`, `cycleData`
- **Constantes estáticas**: UPPERCASE → `MOOD_EMOJIS`, `ALL_ZONES`, `ALLERGENS`
- **Archivos utilidad/hooks**: camelCase → `useAuth.js`, `db.js`

### Componentes
- Solo funciones declaradas: `export default function ComponentName({ props }) {}`
- Sin arrow functions para componentes
- Solo `export default`, nunca named exports para componentes
- Props siempre desestructuradas en los parámetros
- Sin PropTypes ni TypeScript

### Estilos
- **Solo inline styles** (objetos de estilo). No CSS modules, no styled-components, no archivos CSS
- Sistema de colores via prop `C`: `C.cream`, `C.sage`, `C.bg`, `C.accent`, `C.border`
- Sistema de estilos via prop `S`: `S.input`, `S.btn`, `S.tag(color)`, `S.btnSm()`
- Composición con spread: `style={{ ...S.input, marginBottom: 10 }}`

### Estado
- `useState` para todo el estado local. Sin Context API, sin Redux, sin Zustand
- Props drilling extensivo (especialmente `C`, `S`, `t`, `lang`)
- Actualizaciones inmutables con spread: `setProfile({ ...profile, name: value })`

### Manejo de errores
- `console.error("functionName:", error)` en funciones de DB
- Error PGRST116 (not found) se ignora en queries `.single()`
- Sin throw/catch, los errores son silenciosos
- Fallback con nullish coalescing: `data ?? null`

### Event handlers
- Inline arrow functions directamente: `onClick={() => doSomething()}`
- No se usa patrón `handleX`

### Strings / i18n
- Template literals con ternarios: `` lang === "es" ? `Hola ${name}` : `Hello ${name}` ``
- Traducciones en objeto `LANG` dentro de `App.jsx`

### Imports (orden)
1. React (`useState`, `useEffect`, `useCallback`)
2. Librerías externas (`recharts`, `supabase`)
3. Componentes locales
4. Hooks personalizados
5. Utilidades/DB

### Comentarios
- Divisores de sección: `// ─── PROFILE ──────────────────`
- Comentarios inline mínimos, solo cuando no es obvio
- Sin JSDoc

---

## Esquema de Base de Datos (Supabase)

### profiles
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario (PK) |
| name | Nombre del usuario |
| stage | Etapa de lipedema (1-4) |
| diagnosis | Fecha de diagnóstico |
| country | País |
| region | Región/comunidad |
| pillActive | Anticonceptivos activos (boolean) |
| pillBrand | Marca del anticonceptivo |
| intolerances | Array de intolerancias |
| activeZones | Zonas corporales afectadas |
| updated_at | Timestamp de última actualización |

### logs
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario |
| date | Fecha del registro (YYYY-MM-DD) |
| weight | Peso en kg |
| pain | Nivel de dolor (0-10) |
| energy | Nivel de energía (0-10) |
| mood | Estado emocional (emoji) |
| water | Vasos de agua (0-12) |
| inflammationZones | Inflamación por zona (objeto, 0-5) |
| measures | Medidas corporales en cm por zona |
| suppsTaken | Suplementos tomados (array) |
| pillTaken | Anticonceptivo tomado (boolean) |
| inflammationNote | Nota de inflamación |
| notes | Notas generales |

### supplements
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario |
| id | ID del suplemento |
| (datos del suplemento) | Nombre, dosis, fecha inicio, efecto percibido |

### foods
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario |
| id | ID del alimento |
| name | Nombre del alimento |
| category | Categoría |
| reaction | Reacción (bien/mal/neutro) |
| notes | Notas |

### cycle
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario |
| data | Datos del ciclo (JSON) |
| updated_at | Timestamp |

### forum_posts
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario |
| author_name | Nombre del autor |
| text | Contenido del post |
| stage | Etapa de lipedema |
| country | País |
| treatment | Tratamiento |
| created_at | Fecha de creación |
| reactions | Reacciones al post |

### suggestions
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario |
| type | Tipo de sugerencia |
| description | Descripción |
| email | Email de contacto |
| created_at | Fecha |
| status | Estado (pendiente/aprobado) |

### centers
| Columna | Descripción |
|---------|-------------|
| user_id | UUID del usuario |
| name | Nombre del centro |
| status | Estado (approved/pending) |

---

## Persistencia de Datos

**localStorage keys:**
- `lt_profile` → perfil del usuario
- `lt_logs` → registros diarios
- `lt_supps` → suplementos (`{ active: [], custom: [] }`)
- `lt_foods` → alimentos
- `lt_cycle` → datos del ciclo
- `lt_migrated` → flag de migración a Supabase

**Flujo de datos:**
1. Sin auth → datos solo en localStorage
2. Google OAuth login → migración automática única a Supabase
3. Con auth → lectura/escritura directa a Supabase

---

## Git Workflow

- **Branch principal**: `main`
- **Branches de feature**: `feature/nombre-descriptivo`
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`)
- **PRs**: Merge a `main` vía Pull Request
- **Releases**: Automáticas con `standard-version` en push a `main`
- **CI**: GitHub Actions → lint + format:check en cada push/PR

---

## Variables de Entorno

```
VITE_SUPABASE_URL=<url>
VITE_SUPABASE_ANON_KEY=<anon_key>
```

Acceso via `import.meta.env.VITE_*`

---

## Estrategia de Testing

### Framework
- **Vitest** (integración nativa con Vite)
- **React Testing Library** para tests de componentes
- **MSW (Mock Service Worker)** para mocks de Supabase

### Alcance Inicial: Rutas Críticas

#### 1. Autenticación (`useAuth.js`)
- Verificar que `getSession()` establece el usuario correctamente
- Verificar que `onAuthStateChange` actualiza estado en login/logout
- Verificar que la migración de localStorage a Supabase se ejecuta en primer login
- Verificar que `lt_migrated` previene migraciones duplicadas

#### 2. Persistencia de Datos (`db.js`)
- `getProfile` / `upsertProfile`: lectura y escritura correcta
- `getLogs` / `upsertLog`: CRUD de registros diarios
- `getFoods` / `upsertFood` / `deleteFood`: gestión de alimentos
- `getSupplements` / `upsertSupplements`: gestión de suplementos
- `getCycle` / `upsertCycle`: datos del ciclo menstrual
- `migrateFromLocalStorage`: migración completa de todos los datos

#### 3. Funcionalidades Core (componentes)
- **WaterTracker**: incremento/decremento correcto de vasos
- **InflammationTracker**: registro por zona con valores 0-5
- **CycleCalendar**: marcado de días con símbolos correctos
- **AddFoodForm**: validación de campos requeridos y guardado
- **Onboarding**: flujo completo de 6 pasos, datos guardados correctamente

### Convenciones de Tests
- Archivos: `ComponentName.test.jsx` junto al componente
- Nombrar tests en español: `it("debe guardar el perfil correctamente")`
- Mock de Supabase en todas las pruebas de DB
- Mock de localStorage con `vi.spyOn(Storage.prototype, ...)`

### Comandos (a configurar)
```bash
npm run test           # Vitest en modo watch
npm run test:run       # Una sola ejecución
npm run test:coverage  # Con cobertura
```

---

## Estrategia de Seguridad

### 1. Supabase / Autenticación
- [ ] Verificar que las **RLS policies** están activas en todas las tablas
- [ ] Verificar que cada tabla filtra por `user_id = auth.uid()`
- [ ] Confirmar que la **anon key** no permite acceso directo sin RLS
- [ ] Revisar que el flujo OAuth de Google no expone tokens en URL
- [ ] Verificar expiración y refresh de sesiones

### 2. Exposición de API Keys
- [ ] Confirmar que `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` son públicas (anon key es segura si RLS está activo)
- [ ] Verificar que NO hay service_role key en el frontend
- [ ] Revisar que `.env` está en `.gitignore`
- [ ] Buscar secrets hardcodeados en el código fuente

### 3. Client-side / XSS
- [ ] Verificar que inputs del usuario se renderizan con React (auto-escape)
- [ ] Revisar que no hay uso de `dangerouslySetInnerHTML`
- [ ] Verificar sanitización de datos del foro comunitario (forum_posts)
- [ ] Revisar que las notas/texto libre no permiten inyección de scripts

### 4. Datos Sensibles en localStorage
- [ ] Auditar qué datos de salud se guardan en localStorage sin cifrar
- [ ] Evaluar riesgo de acceso físico al dispositivo
- [ ] Considerar cifrado de datos sensibles (peso, diagnóstico, etapa)
- [ ] Verificar que localStorage se limpia en logout

### 5. Dependencias
- [ ] Ejecutar `npm audit` regularmente
- [ ] Verificar que no hay dependencias con CVEs conocidos
- [ ] Mantener Supabase SDK actualizado
- [ ] Revisar que `package-lock.json` está comiteado

### 6. Headers de Seguridad (Vercel)
- [ ] Content-Security-Policy (CSP)
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy (cámara, micro, geolocation)

### 7. OWASP Top 10 — Checklist
- [ ] **Injection**: Sin SQL directo (Supabase SDK parametriza queries)
- [ ] **Broken Auth**: Verificar sesiones, tokens, flujo OAuth
- [ ] **Sensitive Data Exposure**: Datos de salud en localStorage sin cifrar
- [ ] **Broken Access Control**: RLS policies en cada tabla
- [ ] **Security Misconfiguration**: Headers, CORS, permisos de Supabase
- [ ] **XSS**: React auto-escapa, pero revisar foro y notas libres
- [ ] **Insecure Deserialization**: `JSON.parse()` de localStorage sin validación
- [ ] **Components with Known Vulns**: `npm audit`
- [ ] **Insufficient Logging**: Sin logging de intentos de acceso no autorizados
- [ ] **SSRF**: No aplica (no hay server-side en frontend)

### Herramientas de Testing de Seguridad
```bash
npm audit                          # Vulnerabilidades en dependencias
npx is-website-vulnerable          # Scan de librerías JS en producción
```

### Tests de Seguridad Automatizados (a implementar con Vitest)
- Test que verifica que no existe `dangerouslySetInnerHTML` en el código
- Test que verifica que `.env` está en `.gitignore`
- Test que verifica que no hay secrets hardcodeados (regex en source)
- Test que verifica que `JSON.parse` tiene try/catch en datos de localStorage

---

## Notas para Claude

- **No crear archivos CSS**. Todo se estila con inline styles.
- **No instalar librerías** sin confirmación del usuario.
- **No usar TypeScript**. El proyecto es JavaScript puro.
- **No añadir PropTypes**. No se usan en el proyecto.
- **Respetar el patrón bilingüe** `lang === "es" ? "..." : "..."` para todo texto visible.
- **Props `C`, `S`, `t`** se pasan a todos los componentes: colores, estilos, traducciones.
- **App.jsx es monolítico**. Cambios grandes requieren cuidado con el estado.
- **Supabase**: usar siempre las funciones de `db.js`, no llamar `supabase.from()` directamente en componentes.
- **Commits**: usar Conventional Commits en español o inglés.
