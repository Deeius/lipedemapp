# 🌿 Lipedema Tracker

Aplicación de seguimiento de salud personalizada para mujeres con lipedema.

## ✨ Funcionalidades

- **Registro diario**: peso, energía, dolor, estado emocional
- **Inflamación por zonas**: barras visuales 0–5 por zona corporal afectada
- **Medidas corporales**: seguimiento en cm por zona
- **Alimentos**: registro de qué te sienta bien o mal, por categoría
- **Suplementación**: 15 opciones comunes + suplementos personalizados, con dosis, fecha de inicio y efecto percibido
- **Historial**: vista cronológica completa con iconos de suplementos
- **Gráficos**: evolución de peso, dolor vs energía, mapa radar de inflamación, reacciones alimentarias
- **Bilingüe**: Español / Inglés con cambio en tiempo real
- **Persistencia**: datos guardados en localStorage (no se pierden al cerrar)

## 🚀 Despliegue en Vercel

### Opción A: GitHub + Vercel (recomendado)

1. Sube este proyecto a un repositorio GitHub
2. Ve a [vercel.com](https://vercel.com) y haz login
3. Haz clic en **"Add New Project"**
4. Selecciona tu repositorio
5. Vercel detectará Vite automáticamente
6. Haz clic en **"Deploy"** — ¡listo!

### Opción B: Vercel CLI

```bash
npm install -g vercel
cd lipedema-tracker
npm install
vercel
```

### Opción C: Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## 🗂 Estructura del proyecto

```
lipedema-tracker/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── src/
    ├── main.jsx
    └── App.jsx
```

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
