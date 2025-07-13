# <img src="https://i.imgur.com/J4h8NOO.png" width="30" height="30"> Dota 2 News Bot

<p align="center">
  <img src="https://i.imgur.com/J4h8NOO.png" width="200" alt="Dota 2 News Logo">
</p>

<h3 align="center">✨ Настраиваемый Discord-бот для новостей Dota 2 ✨</h3>

<div align="center">
  
[![News](https://img.shields.io/badge/NEWS-Автоматические-blueviolet?style=flat-square&logo=bookstack)](https://)
[![Streams](https://img.shields.io/badge/STREAMS-Twitch/YouTube-red?style=flat-square&logo=twitch)](https://)
[![Custom](https://img.shields.io/badge/SETUP-Гибкая_настройка-orange?style=flat-square&logo=settings)](https://)

</div>

## 🔥 Основные функции

```diff
# Новостной модуль
+ Автоматический сбор новостей с 10+ источников
+ Гибкие настройки формата (текст/эмбед/мини)
+ Фильтры по темам: патчи, турниры, моды
+ Поддержка мультиязычности

# Стрим-модуль
+ PIP-плеер для Twitch/YouTube
+ Уведомления о live-трансляциях
+ Система рекомендаций стримов
```

## ⚡️ Быстрый старт

```bash
# Установка
bun install

# Конфигурация
cp config.example.json config.json

# Запуск
bun start
```

```json
// config.json
{
  "news": {
    "style": "rich_embed",
    "interval": 30,
    "language": "ru"
  },
  "streams": {
    "quality": "720p",
    "pip": true
  }
}
```

## 🎮 Команды

| Команда       | Описание                  | Пример               |
|--------------|--------------------------|----------------------|
| `!news`      | Последние новости        | `!news 3`           |
| `!watch`     | Запустить стрим          | `!watch url`        |
| `!setup`     | Настройка канала         | `!setup #general`   |

<div align="center">

[![Добавить бота](https://img.shields.io/badge/-ДОБАВИТЬ_БОТА-7289DA?style=for-the-badge&logo=discord)](https://)
[![Документация](https://img.shields.io/badge/-ДОКУМЕНТАЦИЯ-white?style=for-the-badge)](https://)

</div>

<p align="center">
  <sub>Created with ❤️ for Dota 2 community</sub>
</p>
