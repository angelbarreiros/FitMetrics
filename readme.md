
# 🚀 Despliegue

## 1. Construir la Aplicación

Primero, genera los archivos de producción ejecutando:

```bash
pnpm run build
```

Esto creará una carpeta (usualmente llamada `dist` o `build`) que contiene el archivo `index.html` y los archivos estáticos necesarios.

---

## 2. Servir la Aplicación Localmente

Para probar tu build localmente y asegurarte de que las rutas funcionan, puedes usar el paquete [`serve`](https://www.npmjs.com/package/serve):

### Instalar `serve` de forma global

```bash
pnpm add -g serve
```


### Servir la carpeta de build en modo "single page application"

```bash
serve -s dist
```

> Cambia `dist` por el nombre de tu carpeta de build si es diferente.

- El parámetro `-s` (o `--single`) es **muy importante**: le indica al servidor que todas las rutas deben devolver `index.html`, permitiendo que React Router DOM maneje la navegación.

---

