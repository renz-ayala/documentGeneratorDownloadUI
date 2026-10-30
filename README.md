# UiDownload
```bash
ng add @angular-architects/module-federation --project ui-download --port 12102 --type remote
```

# Sistema de lectura y exportación de Documentos mediante IA

Arquitectura basada en Microfrontends para la digitalización de documentos mediante Inteligencia Artificial (Gemini API), permitiendo la extracción de contenido y su posterior exportación a formatos estandarizados (DOCX / PDF).

---

## Arquitectura y Repositorios

El ecosistema está fragmentado bajo un esquema de Microfrontends (Module Federation):

* **Shell (Contenedor):** [documentGeneratorShell](https://github.com/renz-ayala/documentGeneratorShell) - Aplicación contenedora y orquestadora de los microfrontends.
* **Backend de Procesamiento:** [DocumentGeneratorAI](https://github.com/renz-ayala/DocumentGeneratorAI) - API de procesamiento y análisis mediante IA.
* **Módulo de Carga (Upload UI):** [documentGeneratorUploadUI](https://github.com/renz-ayala/documentGeneratorUploadUI) - Interfaz para la selección, previsualización y envío de documentos.
* **Módulo de Descarga (Download UI):** [documentGeneratorDownloadUI](https://github.com/renz-ayala/documentGeneratorDownloadUI) - Interfaz de renderizado de resultados, estructuración en HTML y exportación final.

---

## Especificaciones del Flujo de Trabajo

1. **Ingesta:** El usuario carga una imagen o archivo de documento a través del microfrontend de subida (`Upload UI`).
2. **Procesamiento por IA:** El backend (`DocumentGeneratorAI`) utiliza modelos de Gemini para analizar la estructura visual y extraer la información textual y tabular.
3. **Generación HTML:** El contenido extraído es estructurado dinámicamente en formato HTML optimizado para lectura y edición.
4. **Exportación:** Desde el módulo de descarga (`Download UI`), el usuario consolida el archivo para su exportación definitiva en documentos editables (Word / PDF).

---

## Requisitos Previos

* Node.js
* Java
* Gestor de paquetes npm o yarn
* Clave de API configurada para el acceso a los servicios de IA de Gemini.

---

## Guía de Despliegue Local

Para ejecutar el ecosistema de microfrontends en entorno de desarrollo local, clone los repositorios correspondientes en un mismo nivel de directorios y ejecute la instalación de dependencias en cada módulo:

### 1. Shell (Contenedor Principal)
```bash
npm install
npm start
```

### 2. Microfrontend de Carga (Upload)
```bash
npm install
npm start
```

### 3. Microfrontend de Descarga (Download)
```bash
npm install
npm start
```
