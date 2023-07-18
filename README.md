<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="https://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# _NoteApp-SolidNaranja-Backend_

Este es el Backend de la aplicación NoteApp, desarrollado usando el framework NestJS por el equipo Solid Coders Naranja.

## NoteApp

NoteApp es una aplicación de gestión de notas que te permite crear y organizar tus ideas de manera fácil y eficiente. Con NoteApp, puedes crear notas con texto, imágenes y esbozos a mano, y además, puedes utilizar el reconocimiento de voz a texto y el reconocimiento óptico de caracteres para transformar tus notas de audio o imágenes en texto.

También puedes agregar una lista de tareas en tus notas para mantenerte organizado y asegurarte de que no se te olvide nada importante. Además, puedes agregar la geolocalización donde fue creada la nota, lo que te permite recordar fácilmente dónde y cuándo tuviste una idea o inspiración.

NoteApp te permite organizar tus notas por carpetas, etiquetas y otras funcionalidades, para que puedas encontrar fácilmente lo que necesitas cuando lo necesites. Con NoteApp, nunca perderás una idea o inspiración importante, y podrás acceder a tus notas e ideas en cualquier momento y lugar.

## Instalación

Se deben instalar las dependencias usando el manejador de paquetes de Node: _npm_

```bash
#npm packages
$ npm install
```

Se debe crear el archivo _.env_ en el directorio _notes-project_ con las siguientes variables de entorno (PostgreSQL):

```bash
DB_HOST = your_host
DB_PORT = your_port
DB_USER = your_db_user
DB_PASSWORD = your_db_password
DB_NAME = your_db_name
```

## Correr la Aplicación

Al tener todo instalado y configurado, se deben ejecutar los siguientes comandos en consola estando dentro del directorio _notes-project_

```bash
# development
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

```bash
# production mode
$ npm run start:prod
```
