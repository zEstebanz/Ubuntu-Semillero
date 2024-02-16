## Configuraciones Generales

## Instalación

1. Clona el repositorio
2. Instala las dependencias: npm install
3.1. Ejecutar con npm run dev. 
3.2. URL utilizada: http://localhost:5173

## Contribuciones

Para contribuir, por favor sigue estos pasos:

1. *Clonar* el repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz *commit* (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz *push* a la rama (`git push origin feature/nueva-funcionalidad`).

## Consideraciones generales

1. No Realizar Push sobre la Rama Main:

- La rama main es la rama principal del repositorio y debe mantenerse estable en todo momento. Evitar realizar push directamente a esta rama ayuda a prevenir conflictos y errores en el código base.
- En su lugar, todas las contribuciones y cambios deben realizarse a través de ramas secundarias.
- Utilizar la Rama "Develop" como la más Actualizada:

2. Se recomienda crear y utilizar una rama llamada develop como rama principal para el desarrollo continuo.
- Esta rama debe reflejar siempre la última versión del código que está en proceso de desarrollo, integrando todas las nuevas características y correcciones de errores.
- La rama develop sirve como punto de integración para las características desarrolladas por diferentes colaboradores antes de ser fusionadas en la rama main.
- Al mantener la rama develop actualizada, se facilita la colaboración y se reducen los conflictos durante la integración de cambios.